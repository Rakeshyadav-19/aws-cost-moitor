"use client";
import { useState, useEffect } from 'react'
import { 
  DollarSign, Wallet, TrendingUp, Download, 
  Layers, Scale, Globe, Webhook, Route, Shield, 
  MessageSquare, Users, Activity, Server, Zap, HardDrive
} from 'lucide-react'
import PageHeader from '@/components/dashboard/PageHeader'
import StatCard from '@/components/dashboard/StatCard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { exportToCSV } from '@/lib/export'

const IconMap: Record<string, any> = {
  layers: Layers,
  scale: Scale,
  globe: Globe,
  webhook: Webhook,
  route: Route,
  shield: Shield,
  message: MessageSquare,
  users: Users,
  activity: Activity,
  server: Server,
  zap: Zap,
  storage: HardDrive
}

interface Props {
  serviceName: string
  title: string
  subtitle: string
  iconName: string
}

export default function ServiceCostPage({ serviceName, title, subtitle, iconName }: Props) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  
  const Icon = IconMap[iconName] || DollarSign

  const fetchCostData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    try {
      const res = await fetch('/api/aws/costs').then(r => r.json())
      if (!res.error && res.serviceBreakdown) {
        const match = res.serviceBreakdown.find((s: any) => 
          s.service.toLowerCase().includes(serviceName.toLowerCase())
        ) || { cost: 0 }
        setData({ ...res, serviceCost: match.cost })
      }
    } finally { setLoading(false); setRefreshing(false) }
  }

  useEffect(() => { fetchCostData() }, [])

  const handleExport = () => {
    if (data) exportToCSV([{ service: serviceName, cost: data.serviceCost }], `${serviceName.toLowerCase()}-cost-report`)
  }

  return (
    <div style={{ padding: '32px 40px' }}>
      <PageHeader 
        title={title} 
        subtitle={subtitle} 
        onRefresh={() => fetchCostData(true)} 
        refreshing={refreshing}
      >
        <button className="btn-secondary" onClick={handleExport} style={{ fontSize: 13 }}>
          <Download size={14} /> Export CSV
        </button>
      </PageHeader>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard 
          title="Service Cost" 
          value={`$${data?.serviceCost?.toFixed(2) ?? '0.00'}`} 
          icon={<Icon size={20} />} 
          iconColor="var(--blue)" 
          iconBg="var(--blue-subtle)" 
          loading={loading} 
        />
        <StatCard 
          title="Monthly Budget" 
          value={data?.budget ? `$${data.budget.monthlyLimit.toFixed(2)}` : '—'} 
          icon={<Wallet size={20} />} 
          iconColor="var(--green)" 
          iconBg="var(--green-subtle)" 
          loading={loading} 
        />
        <StatCard 
          title="Total Bill Share" 
          value={data?.total > 0 ? `${((data.serviceCost / data.total) * 100).toFixed(1)}%` : '0%'} 
          icon={<TrendingUp size={20} />} 
          iconColor="var(--accent)" 
          iconBg="var(--accent-subtle)" 
          loading={loading} 
        />
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ margin: '0 0 20px', fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {serviceName} Spend Profile
        </h3>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[{ name: serviceName, value: data?.serviceCost || 0 }, { name: 'Other Services', value: (data?.total || 0) - (data?.serviceCost || 0) }]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12 }} />
              <Bar dataKey="value" fill="var(--accent)" radius={[6, 6, 0, 0]} barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
