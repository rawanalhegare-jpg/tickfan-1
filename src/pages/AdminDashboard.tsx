import { DashboardLayout } from "@/components/DashboardLayout";
import { useAdminStats } from "@/hooks/use-api";
import { Users, AlertTriangle, ArrowRightLeft, DollarSign, ShieldCheck, Clock, CheckCircle, XCircle, Eye, TrendingUp, Lock, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

const verificationQueue = [
  { id: "TCK-9901", event: "Champions League QF", seller: "mike.h@email.com", status: "Pending", time: "2 min ago" },
  { id: "TCK-9902", event: "NBA Finals Game 1", seller: "anna.s@email.com", status: "Pending", time: "5 min ago" },
  { id: "TCK-9903", event: "Wimbledon Final", seller: "carlos.r@email.com", status: "Under Review", time: "12 min ago" },
  { id: "TCK-9904", event: "Premier League Derby", seller: "tom.j@email.com", status: "Pending", time: "18 min ago" },
];

const fraudAlerts = [
  { id: "TCK-8912", desc: "Multiple rapid transfers detected", user: "unknown_proxy_44", severity: "High", type: "scalping", time: "3 min ago" },
  { id: "TCK-8922", desc: "Duplicate QR scan attempt at gate", user: "test_acct_11", severity: "High", type: "fraud", time: "15 min ago" },
  { id: "TCK-8930", desc: "Resale price exceeds 130% cap (+105%)", user: "unknown_proxy_44", severity: "High", type: "scalping", time: "22 min ago" },
  { id: "TCK-8935", desc: "Bot-pattern account: 12 resales/24h", user: "bot_acc_8812", severity: "High", type: "scalping", time: "31 min ago" },
  { id: "TCK-8940", desc: "Suspicious registration pattern", user: "new_user_9987", severity: "Low", type: "fraud", time: "1 hr ago" },
];

const scalpingMonitor = [
  { event: "Champions League QF", totalListings: 24, flagged: 2, avgMarkup: "+18%", status: "Monitored" },
  { event: "Premier League Derby", totalListings: 18, flagged: 1, avgMarkup: "+105%", status: "Alert" },
  { event: "NBA Finals Game 1", totalListings: 31, flagged: 1, avgMarkup: "+94%", status: "Alert" },
  { event: "Wimbledon Men's Final", totalListings: 12, flagged: 0, avgMarkup: "+12%", status: "Clean" },
];

const organizerApprovals = [
  { org: "Madrid FC", contact: "events@madridfc.com", events: 3, status: "Pending" },
  { org: "LA Sports Arena", contact: "booking@lasp.com", events: 1, status: "Under Review" },
];

export function AdminDashboard() {
  const { data: stats } = useAdminStats();

  const kpis = [
    { title: "Total Users", value: (stats?.totalUsers || 145000).toLocaleString(), icon: Users, color: "bg-blue-50 text-blue-600", trend: "+2.4% this week" },
    { title: "Active Listings", value: (stats?.activeListings || 1205).toLocaleString(), icon: ArrowRightLeft, color: "bg-primary/10 text-primary", trend: "Resale marketplace" },
    { title: "Scalping Flags", value: String(stats?.fraudFlags ?? 12), icon: AlertTriangle, color: "bg-red-50 text-red-600", trend: "Needs attention", alert: true },
    { title: "Platform GMV", value: `$${((stats?.platformRevenue || 2450000) / 1000000).toFixed(2)}M`, icon: DollarSign, color: "bg-green-50 text-green-600", trend: "+12% this month" },
  ];

  return (
    <DashboardLayout role="admin">
      <h1 className="text-3xl font-bold mb-2">Admin Control Center</h1>
      <p className="text-muted-foreground mb-8">Platform-wide monitoring, anti-scalping enforcement, and fraud management.</p>

      {/* Anti-Scalping Summary Banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-5 mb-8 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <Ban size={20} className="text-red-600" />
          </div>
          <div>
            <p className="font-bold text-red-800 text-sm">Anti-Scalping System Active</p>
            <p className="text-xs text-red-600">4 listings blocked · 2 accounts under review · $0 in above-cap transactions</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 ml-auto">
          {[
            { label: "Price Cap Violations", value: "4", color: "text-red-600" },
            { label: "Bot Accounts Detected", value: "2", color: "text-orange-600" },
            { label: "Blocked Transactions", value: "$2,540", color: "text-foreground" },
            { label: "Protected Buyers", value: "147", color: "text-green-600" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className={`text-xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((stat, i) => (
          <div key={i} className={`rounded-2xl shadow-sm p-5 border ${stat.alert ? "border-red-200 bg-red-50/40" : "border-border/60 bg-white"}`}>
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={20} />
            </div>
            <div className="text-2xl font-extrabold text-foreground">{stat.value}</div>
            <div className="text-sm font-semibold text-foreground mt-0.5">{stat.title}</div>
            <div className={`text-xs mt-0.5 ${stat.alert ? "text-red-500 font-medium" : "text-muted-foreground"}`}>{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Revenue Overview */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2"><TrendingUp size={18} className="text-green-600" /> Revenue Overview</h2>
          <span className="text-xs text-muted-foreground bg-slate-100 px-3 py-1 rounded-full">Last 6 months</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Gross Revenue", value: "$2.45M", change: "+12%", up: true },
            { label: "Platform Fees (5%)", value: "$122.5K", change: "+8%", up: true },
            { label: "Refunds Issued", value: "$14.2K", change: "-3%", up: false },
          ].map((item, i) => (
            <div key={i} className="text-center p-4 bg-slate-50 rounded-xl border border-border/40">
              <div className="text-2xl font-extrabold text-foreground">{item.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
              <div className={`text-xs font-bold mt-1 ${item.up ? "text-green-600" : "text-red-500"}`}>{item.change} vs prev period</div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-2 h-24 px-2">
          {[40, 55, 35, 65, 75, 90].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-primary rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }} />
              <span className="text-[10px] text-muted-foreground">{["Jan","Feb","Mar","Apr","May","Jun"][i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Anti-Scalping Monitor + Fraud Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* Anti-Scalping by Event */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
            <Lock size={18} className="text-primary" /> Anti-Scalping Monitor
          </h2>
          <div className="space-y-3">
            {scalpingMonitor.map((row, i) => (
              <div key={i} className={`p-4 rounded-xl border ${row.status === "Alert" ? "bg-red-50/40 border-red-100" : row.status === "Monitored" ? "bg-amber-50/30 border-amber-100" : "bg-green-50/30 border-green-100"}`}>
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-sm text-foreground">{row.event}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    row.status === "Alert" ? "bg-red-100 text-red-700"
                    : row.status === "Monitored" ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700"
                  }`}>{row.status}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{row.totalListings} listings</span>
                  <span className={row.flagged > 0 ? "text-red-600 font-bold" : "text-green-600 font-medium"}>
                    {row.flagged} flagged
                  </span>
                  <span>Avg markup: <span className={parseFloat(row.avgMarkup) > 30 ? "text-red-600 font-bold" : "text-foreground font-medium"}>{row.avgMarkup}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fraud Alerts */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-bold mb-5 text-red-600 flex items-center gap-2">
            <AlertTriangle size={18} /> Fraud & Scalping Alerts
            <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">{fraudAlerts.length} Active</span>
          </h2>
          <div className="space-y-3">
            {fraudAlerts.map((alert, i) => (
              <div key={i} className="p-3 border border-red-100 bg-red-50/40 rounded-xl">
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <p className="font-semibold text-xs text-foreground">{alert.desc}</p>
                    <p className="text-[10px] text-muted-foreground">{alert.id} · {alert.user}</p>
                  </div>
                  <div className="flex gap-1 ml-2 shrink-0">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${alert.severity === "High" ? "bg-red-200 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {alert.severity}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${alert.type === "scalping" ? "bg-orange-100 text-orange-700" : "bg-purple-100 text-purple-700"}`}>
                      {alert.type}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="h-6 text-[10px] rounded-md px-2"><Eye size={10} className="mr-1" />Review</Button>
                    <Button size="sm" variant="destructive" className="h-6 text-[10px] rounded-md px-2"><XCircle size={10} className="mr-1" />Block</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Queue + Organizer Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
            <ShieldCheck size={18} className="text-primary" /> Verification Queue
            <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{verificationQueue.length} Pending</span>
          </h2>
          <div className="space-y-3">
            {verificationQueue.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-border/40">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Clock size={14} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{item.event}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.id} · {item.seller} · {item.time}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="sm" className="h-7 text-xs rounded-lg px-2 bg-green-600 hover:bg-green-700"><CheckCircle size={12} /></Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs rounded-lg px-2 border-red-200 text-red-500 hover:bg-red-50"><XCircle size={12} /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
            <Users size={18} className="text-primary" /> Organizer Approvals
            <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">{organizerApprovals.length} Awaiting</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  {["Organization", "Contact", "Events", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {organizerApprovals.map((org, i) => (
                  <tr key={i} className="border-b border-border/30 hover:bg-slate-50">
                    <td className="py-3 px-3 font-semibold">{org.org}</td>
                    <td className="py-3 px-3 text-muted-foreground text-xs">{org.contact}</td>
                    <td className="py-3 px-3">{org.events} planned</td>
                    <td className="py-3 px-3"><span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">{org.status}</span></td>
                    <td className="py-3 px-3">
                      <div className="flex gap-1">
                        <Button size="sm" className="h-7 text-xs rounded-lg px-2 bg-green-600 hover:bg-green-700">Approve</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs rounded-lg px-2 border-red-200 text-red-500">Decline</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
