"use client";
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

export default function HeroSection() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 65%)', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', pointerEvents: 'none' }} />
      
      <div style={{ maxWidth: 780, position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--accent-subtle)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: 20, padding: '5px 14px', marginBottom: 28 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse-dot 2s infinite' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>Live AWS Monitoring · No agents required</span>
        </div>
        <h1 style={{ fontSize: 'clamp(38px, 6vw, 66px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 24px' }}>
          Your AWS infrastructure,<br /><span className="gradient-text">finally unified.</span>
        </h1>
        <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 580, margin: '0 auto 40px' }}>
          CloudPulse aggregates EC2, S3, Lambda, and costs into a single intelligent dashboard. Real-time metrics, trend analysis, and anomaly detection.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" className="btn-primary" style={{ padding: '14px 28px', fontSize: 16, textDecoration: 'none', borderRadius: 12, boxShadow: '0 8px 24px rgba(255,107,53,0.35)' }}>
            Start for free <ArrowRight size={18} />
          </Link>
          <Link href="/login" className="btn-secondary" style={{ padding: '14px 28px', fontSize: 16, textDecoration: 'none', borderRadius: 12 }}>
            Sign in to dashboard
          </Link>
        </div>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
          {['No credit card', 'Free to use', 'Read-only safe'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)' }}>
              <Check size={14} color="var(--green)" />{item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
