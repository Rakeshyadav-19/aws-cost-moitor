"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type Props = { data: { date: string; cost: number }[] };

export default function DailyChart({ data }: Props) {
  const formatted = data.map((d) => ({
    ...d,
    day: new Date(d.date).getDate(),
    formattedDate: new Date(d.date).toLocaleDateString('default', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="card" style={{ padding: 20 }}>
      <h3 style={{ margin: '0 0 20px', fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Daily Spending Trend
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={formatted} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--blue)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--blue)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 11, fill: "var(--text-muted)", fontWeight: 500 }} 
            axisLine={false} 
            tickLine={false}
            dy={10}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: "var(--text-muted)", fontWeight: 500 }} 
            axisLine={false} 
            tickLine={false}
            tickFormatter={(v) => `$${v}`} 
          />
          <Tooltip
            contentStyle={{ 
              background: "var(--bg-card)", 
              border: "1px solid var(--border)", 
              borderRadius: 12, 
              fontSize: 12,
              boxShadow: 'var(--shadow-lg)'
            }}
            labelStyle={{ fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}
            itemStyle={{ color: 'var(--blue)', fontWeight: 600 }}
            formatter={(v: number) => [`$${v.toFixed(2)}`, "Daily Cost"]}
            labelFormatter={(l, items) => items[0]?.payload?.formattedDate || `Day ${l}`} 
          />
          <Area 
            type="monotone" 
            dataKey="cost" 
            stroke="var(--blue)" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorCost)" 
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
