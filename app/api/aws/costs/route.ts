// app/api/aws/costs/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encrypt";
import { getCostExplorerClient, getMonthlyCostsByService, getDailyCosts, getCurrentMonthTotal } from "@/lib/aws";

function isRealServiceName(name: string) {
  const n = name.trim().toLowerCase();
  if (!n || n === "unknown") return false;
  if (n.includes("tax")) return false;
  if (n.includes("credit")) return false;
  if (n.includes("refund")) return false;
  if (n.includes("discount")) return false;
  return true;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cred = await prisma.awsCredential.findUnique({ where: { userId: session.user.id } });
  if (!cred) return NextResponse.json({ error: "No AWS credentials found. Please set up your account." }, { status: 404 });

  try {
    const accessKeyId = decrypt(cred.encryptedKeyId);
    const secretAccessKey = decrypt(cred.encryptedSecret);
    const client = getCostExplorerClient(accessKeyId, secretAccessKey, cred.region);

    const [monthly, daily, total] = await Promise.all([
      getMonthlyCostsByService(client, 6),
      getDailyCosts(client),
      getCurrentMonthTotal(client),
    ]);

    // Process monthly data for charts
    const monthlyChart = monthly.map((r) => ({
      period: r.TimePeriod?.Start ?? "",
      total: Object.values(r.Total ?? {}).reduce((sum, v) => sum + parseFloat(v.Amount ?? "0"), 0),
      services: Object.fromEntries(
        (r.Groups ?? []).map((g) => [
          g.Keys?.[0] ?? "Unknown",
          parseFloat(g.Metrics?.UnblendedCost?.Amount ?? "0"),
        ])
      ),
    }));

    // Process daily data
    const dailyChart = daily.map((r) => ({
      date: r.TimePeriod?.Start ?? "",
      cost: parseFloat(r.Total?.UnblendedCost?.Amount ?? "0"),
    }));

    // Top services this month (from last monthly entry)
    const lastMonth = monthly[monthly.length - 1];
    const billableServices = (lastMonth?.Groups ?? [])
      .map((g) => ({
        service: g.Keys?.[0] ?? "Unknown",
        cost: parseFloat(g.Metrics?.UnblendedCost?.Amount ?? "0"),
      }))
      .filter((s) => isRealServiceName(s.service) && s.cost > 0)
      .sort((a, b) => b.cost - a.cost);

    const serviceBreakdown = billableServices.slice(0, 10);

    const budget = await prisma.budget.upsert({
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id },
    });

    const thresholdValue = (budget.monthlyLimit * budget.alertThresholdPct) / 100;
    const alertTriggered = total >= thresholdValue;
    const percentUsed = budget.monthlyLimit > 0 ? (total / budget.monthlyLimit) * 100 : 0;

    if (alertTriggered) {
      const monthKey = new Date().toISOString().slice(0, 7);
      await prisma.budgetAlert.upsert({
        where: {
          userId_service_period: {
            userId: session.user.id,
            service: "TOTAL_MONTHLY_BUDGET",
            period: `monthly-${monthKey}`,
          },
        },
        update: {
          threshold: thresholdValue,
          notifyEmail: true,
        },
        create: {
          userId: session.user.id,
          service: "TOTAL_MONTHLY_BUDGET",
          threshold: thresholdValue,
          period: `monthly-${monthKey}`,
          notifyEmail: true,
        },
      });
    }

    return NextResponse.json({
      total,
      monthlyChart,
      dailyChart,
      serviceBreakdown,
      allServicesCount: billableServices.length,
      billableServicesCount: billableServices.length,
      budget: {
        monthlyLimit: budget.monthlyLimit,
        alertThresholdPct: budget.alertThresholdPct,
        thresholdValue,
        alertTriggered,
        percentUsed,
        currency: budget.currency,
      },
    });
  } catch (err: any) {
    console.error("AWS Cost Explorer error:", err);
    if (err.name === 'DataUnavailableException' || (err.message && err.message.includes('Data is not available'))) {
      return NextResponse.json({ 
        error: "AWS Cost Explorer is preparing your data. This usually takes 24-48 hours after enabling.",
        isDataUnavailable: true
      }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to fetch AWS data. Check your credentials." }, { status: 500 });
  }
}
