"use client";
import { Server, Shield, Database, BarChart3, Cloud, Cpu, Layout, Lock } from 'lucide-react'

const stack = [
  { icon: <Layout size={24} />, name: "Next.js 14", role: "Framework" },
  { icon: <Cpu size={24} />, name: "Tailwind CSS", role: "Styling" },
  { icon: <Lock size={24} />, name: "NextAuth.js", role: "Auth" },
  { icon: <Database size={24} />, name: "NeonDB", role: "Database" },
  { icon: <Shield size={24} />, name: "Prisma", role: "ORM" },
  { icon: <Cloud size={24} />, name: "AWS SDK", role: "Cloud" },
  { icon: <BarChart3 size={24} />, name: "Recharts", role: "Analytics" },
  { icon: <Server size={24} />, name: "Vercel", role: "Deployment" },
];

export default function TechStack() {
  return (
    <section id="stack" style={{ padding: '96px 24px', maxWidth: 1160, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>ARCHITECTURE</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 16px' }}>Built on modern standards</h2>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto' }}>CloudPulse is lightweight, secure, and ready to scale with your cloud footprint.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 20 }}>
        {stack.map((s) => (
          <div key={s.name}
            className="card"
            style={{ padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ color: 'var(--accent)' }}>{s.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, fontWeight: 500 }}>{s.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
