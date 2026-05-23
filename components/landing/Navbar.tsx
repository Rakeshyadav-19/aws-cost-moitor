"use client";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cloud, Sun, Moon, ArrowRight } from 'lucide-react'
import { useTheme } from '@/app/providers'
import { useSession } from 'next-auth/react'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const { data: session } = useSession()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'var(--bg-card)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.25s ease',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, var(--accent), #ff9a6c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Cloud size={17} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.02em' }}>CloudPulse</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {['Features', 'How it Works'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="hidden md:block" style={{ padding: '8px 12px', fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none' }}>{item}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={toggle} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: 7, cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex' }}>
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          {session ? (
            <Link href="/dashboard" className="btn-primary" style={{ padding: '9px 18px', fontSize: 14, textDecoration: 'none' }}>
              Dashboard <ArrowRight size={14} />
            </Link>
          ) : (
            <>
              <Link href="/login" style={{ padding: '8px 16px', fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none' }}>Sign in</Link>
              <Link href="/signup" className="btn-primary" style={{ padding: '9px 18px', fontSize: 14, textDecoration: 'none' }}>
                Get Started <ArrowRight size={14} />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
