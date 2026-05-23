"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const monthlyData = [
  { month: "Nov", cost: 3200 }, { month: "Dec", cost: 3800 },
  { month: "Jan", cost: 4100 }, { month: "Feb", cost: 3600 },
  { month: "Mar", cost: 4400 }, { month: "Apr", cost: 4820 },
];

const cards = [
  { label: "Monthly Spend", value: "$4,820", iconBg: "var(--accent-subtle)", iconColor: "var(--accent)" },
  { label: "Budget Used", value: "84%", iconBg: "var(--red-subtle)", iconColor: "var(--red)" },
  { label: "Top Service", value: "EC2", iconBg: "var(--blue-subtle)", iconColor: "var(--blue)" },
  { label: "Savings Found", value: "$640", iconBg: "var(--green-subtle)", iconColor: "var(--green)" },
];

export default function DashboardPreview() {
  return (
    <section style={{ padding: '0 24px 96px', maxWidth: 1160, margin: '0 auto' }}>
      <div className="card" style={{ overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 24, boxShadow: 'var(--shadow-lg)' }}>
        {/* Window chrome */}
        <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
          <div style={{ marginLeft: 12, fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.02em' }}>CloudPulse Analytics — Production Account</div>
        </div>

        <div style={{ padding: 32, background: 'var(--bg-card)' }}>
          {/* Summary cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
            {cards.map((c) => (
              <div key={c.label} className="card" style={{ padding: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>{c.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>{c.value}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="card" style={{ padding: 24, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 20 }}>MONTHLY SPENDING TREND (USD)</div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip
                  contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                  itemStyle={{ color: 'var(--accent)', fontWeight: 600 }}
                />
                <Bar dataKey="cost" fill="var(--accent)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
