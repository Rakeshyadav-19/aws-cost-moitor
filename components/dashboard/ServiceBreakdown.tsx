"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = [
  '#ff6b35', // accent
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#10b981', // green
  '#f59e0b', // yellow
  '#ef4444', // red
  '#06b6d4', // cyan
  '#84cc16', // lime
];

type Props = { data: { service: string; cost: number }[] };

export default function ServiceBreakdown({ data }: Props) {
  const total = data.reduce((s, d) => s + d.cost, 0);

  return (
    <div className="card" style={{ padding: 20 }}>
      <h3 style={{ margin: '0 0 20px', fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Service Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie 
            data={data} 
            dataKey="cost" 
            nameKey="service" 
            cx="50%" 
            cy="50%"
            innerRadius={65} 
            outerRadius={95} 
            paddingAngle={4}
            stroke="none"
          >
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip
            contentStyle={{ 
              background: "var(--bg-card)", 
              border: "1px solid var(--border)", 
              borderRadius: 12, 
              fontSize: 12,
              boxShadow: 'var(--shadow-lg)'
            }}
            formatter={(v: number) => [`$${v.toFixed(2)} (${((v / (total || 1)) * 100).toFixed(1)}%)`, "Cost"]} 
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconSize={8} 
            iconType="circle"
            wrapperStyle={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', paddingTop: 20 }} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
