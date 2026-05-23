"use client";

export default function StatsBar() {
  const stats = [
    { val: '5+', label: 'AWS Services' },
    { val: '< 60s', label: 'Setup Time' },
    { val: '100%', label: 'Read-Only' },
    { val: '∞', label: 'History' },
    { val: '24/7', label: 'Real-Time' }
  ];

  return (
    <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '32px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24, textAlign: 'center' }}>
        {stats.map(s => (
          <div key={s.label}>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>{s.val}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
