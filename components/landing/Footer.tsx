"use client";
import { Cloud, Globe, ExternalLink, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '64px 24px 32px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--accent), #ff9a6c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cloud size={16} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>CloudPulse</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 320 }}>
              Unified AWS monitoring and cost analytics platform. Secure, read-only, and easy to set up.
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              {[Globe, ExternalLink, Mail].map((Icon, i) => (
                <a key={i} href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.15s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Features', 'Dashboard', 'Security', 'Integrations'].map(item => (
                <a key={item} href="#" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>{item}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Documentation', 'API Reference', 'Setup Guide', 'Open Source'].map(item => (
                <a key={item} href="#" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>{item}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>© 2026 CloudPulse. Built for SEM VIII Honor SAN.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
