import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}
