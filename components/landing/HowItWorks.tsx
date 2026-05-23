"use client";
import Link from 'next/link'

export default function HowItWorks() {
  const steps = [
    { num: '01', title: 'Create your account', desc: 'Sign up with email and password. No credit card required. Takes 30 seconds.', cta: 'Register free', href: '/signup' },
    { num: '02', title: 'Add AWS credentials', desc: 'Securely add your AWS Access Key and Secret. We use a read-only IAM policy for security.', cta: 'Setup guide', href: '#' },
    { num: '03', title: 'Start Monitoring', desc: 'Your dashboard is ready. Track spending, set alerts, and optimize your cloud costs instantly.', cta: 'Go to dashboard', href: '/dashboard' }
  ];

  return (
    <section id="how-it-works" style={{ padding: '96px 24px', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>HOW IT WORKS</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Up and running in 3 steps</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {steps.map((s) => (
          <div key={s.num} className="card" style={{ padding: 32, position: 'relative' }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--border)', marginBottom: 16, lineHeight: 1 }}>{s.num}</div>
            <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 700 }}>{s.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>{s.desc}</p>
            <Link href={s.href} style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>{s.cta} →</Link>
          </div>
        ))}
      </div>
    </section>
  )
}
