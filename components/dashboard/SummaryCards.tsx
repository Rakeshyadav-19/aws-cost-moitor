"use client";
import type { CostData } from "@/app/(dashboard)/dashboard/page";
import StatCard from "./StatCard";
import { CreditCard, TrendingUp, Zap, Layers, Wallet } from 'lucide-react'

export default function SummaryCards({ data }: { data: CostData }) {
  const prev = data.monthlyChart[data.monthlyChart.length - 2]?.total ?? 0;
  const change = prev > 0 ? (((data.total - prev) / prev) * 100).toFixed(1) : null;
  const topService = data.serviceBreakdown[0];
  const budget = data.budget;
  const budgetUsage = budget ? `${budget.percentUsed.toFixed(1)}% used` : "No budget set";
  const activeServices = data.allServicesCount ?? data.serviceBreakdown.length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 14, marginBottom: 28 }}>
      <StatCard
        title="This Month"
        value={`$${data.total.toFixed(2)}`}
        subtitle={change ? `${Number(change) > 0 ? "+" : ""}${change}% vs last month` : "Current period"}
        icon={<TrendingUp size={18} />}
        iconColor="var(--accent)"
        iconBg="var(--accent-subtle)"
      />
      <StatCard
        title="Budget Usage"
        value={budget ? `$${budget.thresholdValue.toFixed(2)}` : "—"}
        subtitle={budgetUsage}
        icon={<Wallet size={18} />}
        iconColor={budget?.alertTriggered ? 'var(--red)' : 'var(--green)'}
        iconBg={budget?.alertTriggered ? 'var(--red-subtle)' : 'var(--green-subtle)'}
      />
      <StatCard
        title="Top Service"
        value={topService?.service ?? "—"}
        subtitle={topService ? `$${topService.cost.toFixed(2)}` : "No data"}
        icon={<Zap size={18} />}
        iconColor="var(--purple)"
        iconBg="var(--purple-subtle)"
      />
      <StatCard
        title="Daily Avg"
        value={`$${(data.total / (new Date().getDate())).toFixed(2)}`}
        subtitle="Based on days elapsed"
        icon={<CreditCard size={18} />}
        iconColor="var(--blue)"
        iconBg="var(--blue-subtle)"
      />
      <StatCard
        title="Active Services"
        value={activeServices}
        subtitle="Billable this month"
        icon={<Layers size={18} />}
        iconColor="var(--green)"
        iconBg="var(--green-subtle)"
      />
    </div>
  );
}
