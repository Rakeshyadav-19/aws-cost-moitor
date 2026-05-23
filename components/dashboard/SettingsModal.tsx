"use client";
import { useEffect, useState } from "react";
import { X, Cloud, Wallet, Bell, Shield, Info, AlertTriangle } from 'lucide-react'

const regions = [
  "us-east-1","us-east-2","us-west-1","us-west-2",
  "ap-south-1","ap-southeast-1","ap-southeast-2","ap-northeast-1",
  "eu-west-1","eu-west-2","eu-central-1","ca-central-1","sa-east-1",
];

const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "SGD"];

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
};

export default function SettingsModal({ open, onClose, onSaved }: Props) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [storedCiphers, setStoredCiphers] = useState({ keyId: "", secret: "" });
  const [form, setForm] = useState({
    accessKeyId: "",
    secretAccessKey: "",
    region: "us-east-1",
    monthlyLimit: "100",
    alertThresholdPct: "80",
    currency: "USD",
    period: "monthly",
    notifyEmail: true,
  });

  useEffect(() => {
    if (!open) return;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (res.ok) {
          setStoredCiphers({
            keyId: data.awsCredential.encryptedKeyId || "",
            secret: data.awsCredential.encryptedSecret || ""
          });
          setForm((prev) => ({
            ...prev,
            region: data.awsCredential.region || "us-east-1",
            monthlyLimit: String(data.budget.monthlyLimit),
            alertThresholdPct: String(data.budget.alertThresholdPct),
            currency: data.budget.currency || "USD",
            period: data.budget.period || "monthly",
            notifyEmail: data.budget.notifyEmail ?? true,
          }));
        }
      } catch (e) {
        setError("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [open]);

  if (!open) return null;

  const handleSave = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          monthlyLimit: Number(form.monthlyLimit),
          alertThresholdPct: Number(form.alertThresholdPct),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save settings.");
      } else {
        onSaved?.();
        onClose();
      }
    } catch (e) {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--accent-subtle)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cloud size={18} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Configuration</h2>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>AWS Credentials & Budget Settings</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* AWS Section */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Shield size={16} color="var(--accent)" />
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>AWS Connectivity</h3>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Access Key ID {storedCiphers.keyId && <span style={{ color: 'var(--accent)', fontSize: 10, fontFamily: 'monospace' }}>({storedCiphers.keyId})</span>}
                  </label>
                  <input
                    className="input"
                    type="text"
                    autoComplete="off"
                    placeholder="Update with new Key ID..."
                    value={form.accessKeyId}
                    onChange={(e) => setForm({ ...form, accessKeyId: e.target.value })}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Secret Access Key {storedCiphers.secret && <span style={{ color: 'var(--accent)', fontSize: 10, fontFamily: 'monospace' }}>({storedCiphers.secret})</span>}
                  </label>
                  <input
                    className="input"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Update with new Secret..."
                    value={form.secretAccessKey}
                    onChange={(e) => setForm({ ...form, secretAccessKey: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Default Region</label>
                <select
                  className="input"
                  value={form.region}
                  onChange={(e) => setForm({ ...form, region: e.target.value })}
                >
                  {regions.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </section>

            {/* Budget Section */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Wallet size={16} color="var(--green)" />
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Budget & Alerts</h3>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Monthly Limit</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'var(--text-muted)' }}>$</span>
                    <input
                      className="input"
                      style={{ paddingLeft: 24 }}
                      type="number"
                      value={form.monthlyLimit}
                      onChange={(e) => setForm({ ...form, monthlyLimit: e.target.value })}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Alert Threshold (%)</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'var(--text-muted)' }}>%</span>
                    <input
                      className="input"
                      type="number"
                      value={form.alertThresholdPct}
                      onChange={(e) => setForm({ ...form, alertThresholdPct: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </section>

            {error && (
              <div style={{ padding: '12px 16px', background: 'var(--red-subtle)', border: '1px solid var(--red)', borderRadius: 8, color: 'var(--red)', fontSize: 13, display: 'flex', gap: 10 }}>
                <AlertTriangle size={16} />
                {error}
              </div>
            )}
            
            <div style={{ padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <Info size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ margin: 0, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Credentials are encrypted using AES-256 and stored securely. Create an IAM User with the <strong>AWSBillingReadOnlyAccess</strong> policy, or attach this custom inline policy:
                </p>
              </div>
              <pre style={{ margin: 0, padding: 10, background: 'var(--bg)', borderRadius: 4, fontSize: 11, color: 'var(--text)', overflowX: 'auto', border: '1px solid var(--border)', fontFamily: 'monospace' }}>
{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ce:GetCostAndUsage",
        "ce:GetCostForecast",
        "ce:GetDimensionValues"
      ],
      "Resource": "*"
    }
  ]
}`}
              </pre>
            </div>
          </div>

          <div style={{ padding: '16px 24px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" className="btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving || loading}>
              {saving ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
