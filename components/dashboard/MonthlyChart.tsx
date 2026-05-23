"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type Props = { data: { period: string; total: number }[] };

export default function MonthlyChart({ data }: Props) {
  const formatted = data.map((d) => ({
    ...d,
    month: new Date(d.period).toLocaleString("default", { month: "short" }),
  }));

  return (
    <div className="card" style={{ padding: 20 }}>
      <h3 style={{ margin: '0 0 20px', fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Monthly Spend
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={formatted} barSize={36} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 11, fill: "var(--text-muted)", fontWeight: 500 }} 
            axisLine={false} 
            tickLine={false} 
            dy={10}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: "var(--text-muted)", fontWeight: 500 }} 
            axisLine={false} 
            tickLine={false}
            tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`} 
          />
          <Tooltip
            cursor={{ fill: 'var(--bg-secondary)', opacity: 0.4 }}
            contentStyle={{ 
              background: "var(--bg-card)", 
              border: "1px solid var(--border)", 
              borderRadius: 12, 
              fontSize: 12,
              boxShadow: 'var(--shadow-lg)'
            }}
            itemStyle={{ color: 'var(--accent)', fontWeight: 600 }}
            formatter={(v: number) => [`$${v.toFixed(2)}`, "Total Spend"]} 
          />
          <Bar dataKey="total" fill="var(--accent)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
