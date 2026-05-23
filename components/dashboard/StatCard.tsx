"use client";
import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: ReactNode
  iconColor: string
  iconBg: string
  loading?: boolean
}

export default function StatCard({ title, value, subtitle, icon, iconColor, iconBg, loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="card skeleton" style={{ height: 104, border: 'none' }} />
    )
  }

  return (
    <div className="card" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{title}</span>
        <div style={{ 
          width: 36, height: 36, borderRadius: 10, 
          background: iconBg, color: iconColor, 
          display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          {icon}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          {value}
        </div>
        {subtitle && (
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, fontWeight: 500 }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}
