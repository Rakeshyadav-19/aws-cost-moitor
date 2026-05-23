import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/encrypt";

function maskEncrypted(value: string | null | undefined) {
  if (!value) return null;
  if (value.length <= 20) return value;
  return `${value.slice(0, 12)}...${value.slice(-12)}`;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const [cred, budget] = await Promise.all([
    prisma.awsCredential.findUnique({ where: { userId } }),
    prisma.budget.upsert({
      where: { userId },
      update: {},
      create: { userId },
    }),
  ]);

  return NextResponse.json({
    awsCredential: {
      hasCredentials: !!cred,
      region: cred?.region ?? "us-east-1",
      encryptedKeyId: maskEncrypted(cred?.encryptedKeyId),
      encryptedSecret: maskEncrypted(cred?.encryptedSecret),
      updatedAt: cred?.updatedAt ?? null,
    },
    budget: {
      monthlyLimit: budget.monthlyLimit,
      alertThresholdPct: budget.alertThresholdPct,
      currency: budget.currency,
      period: budget.period,
      notifyEmail: budget.notifyEmail,
      updatedAt: budget.updatedAt,
    },
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const body = await req.json();
  const accessKeyId = (body.accessKeyId ?? "").trim();
  const secretAccessKey = (body.secretAccessKey ?? "").trim();
  const region = (body.region ?? "us-east-1").trim();
  const monthlyLimit = Number(body.monthlyLimit);
  const alertThresholdPct = Number(body.alertThresholdPct);
  const currency = (body.currency ?? "USD").trim();
  const period = (body.period ?? "monthly").trim();
  const notifyEmail = body.notifyEmail === true;

  if (!Number.isFinite(monthlyLimit) || monthlyLimit <= 0) {
    return NextResponse.json({ error: "Monthly budget must be greater than 0." }, { status: 400 });
  }

  if (!Number.isFinite(alertThresholdPct) || alertThresholdPct <= 0 || alertThresholdPct > 100) {
    return NextResponse.json({ error: "Alert threshold must be between 1 and 100." }, { status: 400 });
  }

  await prisma.budget.upsert({
    where: { userId },
    update: { monthlyLimit, alertThresholdPct, currency, period, notifyEmail },
    create: { userId, monthlyLimit, alertThresholdPct, currency, period, notifyEmail },
  });

  if (accessKeyId || secretAccessKey) {
    if (!accessKeyId || !secretAccessKey || !region) {
      return NextResponse.json({ error: "Provide both AWS key fields and region to update credentials." }, { status: 400 });
    }

    await prisma.awsCredential.upsert({
      where: { userId },
      update: {
        encryptedKeyId: encrypt(accessKeyId),
        encryptedSecret: encrypt(secretAccessKey),
        region,
      },
      create: {
        userId,
        encryptedKeyId: encrypt(accessKeyId),
        encryptedSecret: encrypt(secretAccessKey),
        region,
      },
    });
  } else if (region) {
    await prisma.awsCredential.updateMany({
      where: { userId },
      data: { region },
    });
  }

  return NextResponse.json({ ok: true });
}
