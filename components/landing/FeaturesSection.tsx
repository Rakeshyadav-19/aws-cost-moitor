"use client";
import { Activity, Bell, Shield, BarChart2, RefreshCw } from 'lucide-react'

const features = [
  { icon: <Activity size={22} />, color: 'var(--accent)', bg: 'var(--accent-subtle)', title: 'Real-Time Monitoring', desc: 'Live metrics from Cost Explorer with daily auto-refresh. See your spending as it happens.' },
  { icon: <Bell size={22} />, color: 'var(--red)', bg: 'var(--red-subtle)', title: 'Budget Alerts', desc: 'Set service-specific thresholds. Identify overspending instantly and drill into cost anomalies.' },
  { icon: <Shield size={22} />, color: 'var(--blue)', bg: 'var(--blue-subtle)', title: 'Secure by Design', desc: 'Credentials encrypted at rest, per-user IAM isolation. Your keys never leave your secure environment.' },
  { icon: <BarChart2 size={22} />, color: 'var(--purple)', bg: 'var(--purple-subtle)', title: 'Interactive Charts', desc: 'Area charts, bar charts, pie charts. Correlate spending across services with beautiful visualizations.' },
  { icon: <RefreshCw size={22} />, color: 'var(--yellow)', bg: 'var(--yellow-subtle)', title: 'Daily Analysis', desc: 'Automatic daily cost analysis and trend forecasting. Always know your projected monthly bill.' },
]

export default function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '96px 24px', maxWidth: 1160, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>FEATURES</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 16px' }}>Everything you need to control AWS costs</h2>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto' }}>From raw metrics to intelligent insights — CloudPulse gives your team full visibility.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {features.map((f, i) => (
          <div key={i} className="card" style={{ padding: 24 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: f.bg, color: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>{f.icon}</div>
            <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700 }}>{f.title}</h3>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
