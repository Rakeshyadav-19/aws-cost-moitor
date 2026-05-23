"use client";
import { ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  children?: ReactNode
  onRefresh?: () => void
  refreshing?: boolean
}

export default function PageHeader({ title, subtitle, children, onRefresh, refreshing }: PageHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>{title}</h1>
        {subtitle && <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {onRefresh && (
          <button 
            className="btn-secondary" 
            onClick={onRefresh} 
            disabled={refreshing}
            style={{ padding: '8px 12px' }}
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
