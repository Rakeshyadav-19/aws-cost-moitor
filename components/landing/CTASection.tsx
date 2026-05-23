"use client";
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section style={{ padding: '0 24px 96px', maxWidth: 1160, margin: '0 auto' }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 24,
        padding: '64px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 16px' }}>Ready to optimize your AWS costs?</h2>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.6 }}>
            Join hundreds of teams using CloudPulse to gain visibility and control over their cloud infrastructure spend.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn-primary" style={{ padding: '14px 28px', fontSize: 16, textDecoration: 'none', borderRadius: 12 }}>
              Get Started for Free <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="btn-secondary" style={{ padding: '14px 28px', fontSize: 16, textDecoration: 'none', borderRadius: 12 }}>
              Sign in to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
