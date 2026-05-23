"use client";
import { useEffect, useState } from "react";
import { Sparkles, AlertCircle, Info, TrendingDown } from 'lucide-react'

type Props = {
  serviceBreakdown: { service: string; cost: number }[];
  total: number;
  budget?: any;
};

type Recommendation = {
  icon: string;
  title: string;
  desc: string;
  saving: string;
  severity: "high" | "medium" | "low";
};

const severityColor: Record<string, string> = {
  high: "var(--red)",
  medium: "var(--yellow)",
  low: "var(--green)",
};

const severityBg: Record<string, string> = {
  high: "var(--red-subtle)",
  medium: "var(--yellow-subtle)",
  low: "var(--green-subtle)",
};

export default function Recommendations({ serviceBreakdown, total, budget }: Props) {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAI() {
      try {
        const res = await fetch("/api/aws/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ serviceBreakdown, total, budget }),
        });
        const data = await res.json();
        
        if (!res.ok) {
          setError(data.error || "Failed to load AI recommendations.");
        } else {
          setRecs(data.recommendations);
        }
      } catch (err) {
        setError("Network error fetching AI recommendations.");
      } finally {
        setLoading(false);
      }
    }
    fetchAI();
  }, [serviceBreakdown, total, budget]);

  return (
    <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', minHeight: "360px" }}>
      <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Sparkles size={18} color="var(--accent)" />
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            AI Recommendations
          </h3>
        </div>
        {!loading && !error && (
          <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
            {recs.length} INSIGHTS
          </span>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loading ? (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div className="skeleton" style={{ width: 40, height: 40, borderRadius: '50%', marginBottom: 12 }} />
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Analyzing infrastructure...</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Gemini AI is identifying savings</p>
          </div>
        ) : error ? (
          <div style={{ padding: 16, background: 'var(--red-subtle)', border: '1px solid var(--red)', borderRadius: 12, color: 'var(--red)', fontSize: 13, display: 'flex', gap: 10 }}>
            <AlertCircle size={16} />
            {error}
          </div>
        ) : recs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>No recommendations at this time.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recs.map((r, i) => (
              <div key={i} style={{ padding: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 12, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{r.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{r.title}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {r.saving !== "—" && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--green)', fontSize: 12, fontWeight: 700 }}>
                        <TrendingDown size={14} /> {r.saving}
                      </div>
                    )}
                    <span style={{ 
                      fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4, 
                      background: severityBg[r.severity] || severityBg.low, 
                      color: severityColor[r.severity] || severityColor.low,
                      textTransform: 'uppercase'
                    }}>
                      {r.severity}
                    </span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Info size={12} color="var(--text-muted)" />
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Insights powered by Google Gemini Pro</span>
      </div>
    </div>
  );
}
