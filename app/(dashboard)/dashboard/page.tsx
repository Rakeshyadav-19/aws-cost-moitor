"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import SummaryCards from "@/components/dashboard/SummaryCards";
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import DailyChart from "@/components/dashboard/DailyChart";
import ServiceBreakdown from "@/components/dashboard/ServiceBreakdown";
import Recommendations from "@/components/dashboard/Recommendations";
import SettingsModal from "@/components/dashboard/SettingsModal";
import PageHeader from "@/components/dashboard/PageHeader";
import { Settings, Download } from 'lucide-react';
import { exportToPDF } from "@/lib/export";

export type CostData = {
  total: number;
  monthlyChart: { period: string; total: number; services: Record<string, number> }[];
  dailyChart: { date: string; cost: number }[];
  serviceBreakdown: { service: string; cost: number }[];
  allServicesCount?: number;
  billableServicesCount?: number;
  budget?: {
    monthlyLimit: number;
    alertThresholdPct: number;
    thresholdValue: number;
    alertTriggered: boolean;
    percentUsed: number;
    currency: string;
  };
};

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<CostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDataUnavailable, setIsDataUnavailable] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      // Check if credentials exist
      const keyRes = await fetch("/api/keys");
      const keyData = await keyRes.json();
      if (!keyData.hasCredentials) {
        setSettingsOpen(true);
        setLoading(false);
        setRefreshing(false);
        return;
      }

      // Fetch cost data
      const res = await fetch("/api/aws/costs");
      const d = await res.json();
      if (!res.ok) {
        setError(d.error);
        setIsDataUnavailable(d.isDataUnavailable || false);
      } else {
        setData(d);
        setError("");
        setIsDataUnavailable(false);
      }
    } catch (err: any) {
      setError(err.message);
      setIsDataUnavailable(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const handleExportPDF = async () => {
    if (!data) return;
    setExporting(true);
    try {
      await exportToPDF('AWS Cost Analysis', [
        { heading: 'Monthly Spend', data: data.monthlyChart, columns: ['period', 'total'] },
        { heading: 'Service Breakdown', data: data.serviceBreakdown, columns: ['service', 'cost'] },
        { heading: 'Daily Trend', data: data.dailyChart, columns: ['date', 'cost'] }
      ], 'aws-cost-report');
    } catch (e) {
      console.error(e);
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="skeleton" style={{ height: 40, width: 200 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
          {[1,2,3,4,5].map(i => <div key={i} className="skeleton" style={{ height: 104 }} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <div className="skeleton" style={{ height: 350 }} />
          <div className="skeleton" style={{ height: 350 }} />
        </div>
      </div>
    );
  }

  if (isDataUnavailable) {
    return (
      <div style={{ padding: 80, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 20 }}>⏳</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Data Processing</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.6 }}>
          AWS Cost Explorer is currently gathering and processing your billing data. If you just enabled Cost Explorer on this AWS account, it typically takes <strong>24 to 48 hours</strong> before data becomes available.
        </p>
        <button className="btn-primary" onClick={() => loadData(true)} disabled={refreshing}>
          {refreshing ? 'Checking...' : 'Check Again'}
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 80, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 20 }}>⚠️</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Failed to load dashboard</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>{error}</p>
        <button className="btn-primary" onClick={() => setSettingsOpen(true)}>
          <Settings size={16} /> Update Credentials
        </button>
        <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} onSaved={() => loadData()} />
      </div>
    );
  }

  return (
    <div style={{ padding: '32px 40px' }}>
      <PageHeader 
        title="Cost Dashboard" 
        subtitle="AWS spending overview and optimization"
        onRefresh={() => loadData(true)}
        refreshing={refreshing}
      >
        <button className="btn-secondary" onClick={handleExportPDF} disabled={exporting}>
          <Download size={14} /> {exporting ? 'Exporting...' : 'Export PDF'}
        </button>
        <button className="btn-secondary" onClick={() => setSettingsOpen(true)}>
          <Settings size={14} /> Settings
        </button>
      </PageHeader>

      {data && (
        <>
                  <SummaryCards data={data} />
          
                  {/* Active Services Inventory Box */}
                  <div className="card" style={{ padding: 24, marginBottom: 18 }}>
                    <h3 style={{ margin: '0 0 20px', fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Active Services Inventory
                    </h3>
                    <div style={{ overflowX: 'auto' }}>
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Service Name</th>
                            <th>Monthly Cost</th>
                            <th>% of Total</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.serviceBreakdown.map((s, i) => (
                            <tr key={i}>
                              <td><div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.service}</div></td>
                              <td><div style={{ fontWeight: 600, color: 'var(--accent)' }}>${s.cost.toFixed(2)}</div></td>
                              <td><div style={{ fontSize: 12 }}>{((s.cost / (data.total || 1)) * 100).toFixed(1)}%</div></td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <span className="status-dot running" />
                                  <span style={{ fontSize: 12, fontWeight: 600 }}>Active</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
          
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
          
            <MonthlyChart data={data.monthlyChart} />
            <DailyChart data={data.dailyChart} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <ServiceBreakdown data={data.serviceBreakdown} />
            <Recommendations serviceBreakdown={data.serviceBreakdown} total={data.total} budget={data.budget} />
          </div>
        </>
      )}

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} onSaved={() => loadData()} />
    </div>
  );
}
