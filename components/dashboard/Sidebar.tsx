"use client";
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import {
  LayoutDashboard, Server, HardDrive, Zap,
  Settings, LogOut, Cloud, Sun, Moon,
  Database, ChevronRight, Globe, Webhook,
  Route, Shield, MessageSquare, Users, Activity, Scale, Layers
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from '@/app/providers'
import SettingsModal from './SettingsModal'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/dashboard', label: 'Cost Overview', icon: LayoutDashboard },
    ]
  },
  {
    label: 'Compute Costs',
    items: [
      { href: '/dashboard/ec2', label: 'EC2 Instances', icon: Server },
      { href: '/dashboard/lambda', label: 'Lambda Functions', icon: Zap },
      { href: '/dashboard/ecs', label: 'ECS / Containers', icon: Layers },
    ]
  },
  {
    label: 'Storage & DB Costs',
    items: [
      { href: '/dashboard/s3', label: 'S3 Storage', icon: HardDrive },
      { href: '/dashboard/rds', label: 'RDS Databases', icon: Database },
    ]
  },
  {
    label: 'Networking Costs',
    items: [
      { href: '/dashboard/loadbalancer', label: 'Load Balancers', icon: Scale },
      { href: '/dashboard/cloudfront', label: 'CloudFront CDN', icon: Globe },
      { href: '/dashboard/apigateway', label: 'API Gateway', icon: Webhook },
      { href: '/dashboard/route53', label: 'Route 53 DNS', icon: Route },
      { href: '/dashboard/network', label: 'VPC & Network', icon: Shield },
    ]
  },
  {
    label: 'Messaging & Others',
    items: [
      { href: '/dashboard/queues', label: 'SNS / SQS', icon: MessageSquare },
      { href: '/dashboard/iam', label: 'IAM Security', icon: Users },
      { href: '/dashboard/alarms', label: 'CloudWatch', icon: Activity },
    ]
  }
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const user = session?.user
  const { theme, toggle } = useTheme()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const initials = user?.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() || 'U'

  return (
    <>
      <aside className="sidebar">
        {/* Logo */}
        <div style={{ padding: '16px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, var(--accent), #ff9a6c)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Cloud size={17} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, lineHeight: 1.2, letterSpacing: '-0.02em' }}>CloudPulse</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>AWS Cost Monitor</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
          {navGroups.map(group => (
            <div key={group.label} style={{ marginBottom: 12 }}>
              <div style={{ padding: '4px 8px 8px', color: 'var(--text-muted)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {group.label}
              </div>
              {group.items.map(item => {
                const Icon = item.icon
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} className={`nav-item ${active ? 'active' : ''}`}>
                    <Icon size={15} />
                    <span style={{ flex: 1, fontSize: 13 }}>{item.label}</span>
                    {active && <ChevronRight size={12} style={{ opacity: 0.5 }} />}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '8px', borderTop: '1px solid var(--border)' }}>
          <button onClick={toggle} className="nav-item" style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}>
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span style={{ fontSize: 13 }}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button onClick={() => setSettingsOpen(true)} className="nav-item" style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}>
            <Settings size={15} />
            <span style={{ fontSize: 13 }}>Configuration</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 10px', marginTop: 4, borderRadius: 8, background: 'var(--bg-secondary)' }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #ff9a6c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'User'}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
            </div>
            <button onClick={() => signOut({ callbackUrl: '/' })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, borderRadius: 6 }} title="Logout">
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </aside>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} onSaved={() => window.location.reload()} />
    </>
  )
}
