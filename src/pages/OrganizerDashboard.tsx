import { DashboardLayout } from "@/components/DashboardLayout";
import { useOrganizerStats } from "@/hooks/use-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Ticket, DollarSign, CalendarRange, QrCode, ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Clock, TrendingUp, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";

const checkIns = [
  { id: "TCK-T1-998877", name: "John Doe", seat: "Block 120, Row 14, Seat 5", time: "19:48", status: "Admitted" },
  { id: "TCK-T4-667788", name: "Maria L.", seat: "Centre Court, Row G, Seat 22", time: "19:51", status: "Admitted" },
  { id: "TCK-T3-112233", name: "—", seat: "Section 101, Row A", time: "19:53", status: "Denied — Duplicate Scan" },
  { id: "TCK-X9-000012", name: "—", seat: "—", time: "19:55", status: "Denied — Not Found" },
  { id: "TCK-T2-443322", name: "Lisa M.", seat: "Block 5, Row 2, Seat 12", time: "20:01", status: "Pending" },
];

const suspiciousResales = [
  { id: "r4", event: "Premier League Derby", seller: "unknown_proxy_44", originalPrice: 95, askingPrice: 195, markup: "+105%", trust: 12, reason: "Price exceeds 130% cap" },
  { id: "r5", event: "NBA Finals Game 1", seller: "bot_acc_8812", originalPrice: 250, askingPrice: 485, markup: "+94%", trust: 3, reason: "12 resales in 24h — bot suspected" },
];

export function OrganizerDashboard() {
  const { data: stats } = useOrganizerStats();
  const [scanCode, setScanCode] = useState("");
  const [scanResult, setScanResult] = useState<"valid" | "invalid" | null>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanCode.trim()) return;
    const valid = scanCode.toLowerCase().includes("t1") || scanCode.toLowerCase().includes("t4");
    setScanResult(valid ? "valid" : "invalid");
  };

  return (
    <DashboardLayout role="organizer">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Organizer Overview</h1>
        <Link href="/organizer/create-event">
          <Button className="rounded-xl">Create New Event</Button>
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Revenue", value: `$${(stats?.revenue || 0).toLocaleString()}`, icon: DollarSign, color: "text-green-500" },
          { title: "Tickets Sold", value: (stats?.ticketsSold || 0).toLocaleString(), icon: Ticket, color: "text-primary" },
          { title: "Check-ins Today", value: (stats?.checkIns || 0).toLocaleString(), icon: Users, color: "text-secondary" },
          { title: "Active Events", value: stats?.totalEvents || 0, icon: CalendarRange, color: "text-accent" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">

        {/* Gate Check-in Scanner */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
            <QrCode size={18} className="text-primary" /> Gate Validation
          </h2>
          <p className="text-xs text-muted-foreground mb-5">Scan or enter a ticket code to grant or deny entry</p>

          <form onSubmit={handleScan} className="mb-5">
            <div className="relative mb-3">
              <input
                value={scanCode}
                onChange={(e) => { setScanCode(e.target.value); setScanResult(null); }}
                placeholder="Ticket code or QR scan..."
                className="w-full border border-border rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50"
              />
            </div>
            <Button type="submit" className="w-full rounded-xl">
              <ShieldCheck size={16} className="mr-2" /> Verify Entry
            </Button>
          </form>

          {scanResult && (
            <div className={`rounded-xl p-4 flex items-center gap-3 mb-5 ${scanResult === "valid" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
              {scanResult === "valid"
                ? <CheckCircle2 size={24} className="text-green-500 shrink-0" />
                : <XCircle size={24} className="text-red-500 shrink-0" />
              }
              <div>
                <p className={`font-bold text-sm ${scanResult === "valid" ? "text-green-800" : "text-red-800"}`}>
                  {scanResult === "valid" ? "✓ GRANT ENTRY" : "✗ DENY ENTRY"}
                </p>
                <p className={`text-xs mt-0.5 ${scanResult === "valid" ? "text-green-700" : "text-red-700"}`}>
                  {scanResult === "valid" ? "Ticket verified — authentic and unused" : "Ticket not found or already used"}
                </p>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-2">Try demo codes</div>
          <div className="space-y-1.5">
            {[
              { code: "TICKFAN-T1-998877", label: "Valid", color: "text-green-600 bg-green-50" },
              { code: "TICKFAN-T3-112233", label: "Used", color: "text-red-600 bg-red-50" },
            ].map(d => (
              <button
                key={d.code}
                onClick={() => { setScanCode(d.code); setScanResult(null); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono border border-current/20 ${d.color} hover:opacity-80 transition-opacity`}
              >
                {d.code} — {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Check-ins */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" /> Live Check-in Feed
            <span className="ml-auto flex items-center gap-1.5 text-xs text-green-700 font-semibold bg-green-50 border border-green-200 px-2 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live
            </span>
          </h2>
          <div className="space-y-3">
            {checkIns.map((c, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${
                c.status === "Admitted" ? "bg-green-50/50 border-green-100"
                : c.status === "Pending" ? "bg-yellow-50/50 border-yellow-100"
                : "bg-red-50/50 border-red-100"
              }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  c.status === "Admitted" ? "bg-green-100 text-green-600"
                  : c.status === "Pending" ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
                }`}>
                  {c.status === "Admitted" ? <CheckCircle2 size={15} />
                  : c.status === "Pending" ? <Clock size={15} />
                  : <XCircle size={15} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{c.id}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{c.name !== "—" ? `${c.name} · ` : ""}{c.seat !== "—" ? c.seat : "—"}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">{c.time}</p>
                  <span className={`text-[10px] font-bold ${
                    c.status === "Admitted" ? "text-green-600"
                    : c.status === "Pending" ? "text-yellow-600"
                    : "text-red-600"
                  }`}>{c.status.split(" — ")[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Anti-Scalping — Suspicious Resale Listings */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-8">
        <div className="flex items-center gap-2 mb-5">
          <AlertTriangle size={18} className="text-red-500" />
          <h2 className="text-lg font-bold text-red-700">Anti-Scalping Alerts</h2>
          <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">{suspiciousResales.length} flagged</span>
          <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
            <Lock size={11} /> Listings blocked from purchase
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                {["Listing ID", "Event", "Seller", "Face Value", "Listed Price", "Markup", "Trust Score", "Reason", "Action"].map(h => (
                  <th key={h} className="py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {suspiciousResales.map((r, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-red-50/30 transition-colors">
                  <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                  <td className="py-3 px-3 font-semibold text-foreground whitespace-nowrap">{r.event}</td>
                  <td className="py-3 px-3 font-mono text-xs">{r.seller}</td>
                  <td className="py-3 px-3">${r.originalPrice}</td>
                  <td className="py-3 px-3 font-bold text-red-600">${r.askingPrice}</td>
                  <td className="py-3 px-3">
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">{r.markup}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-red-600 font-bold text-xs">{r.trust}%</span>
                  </td>
                  <td className="py-3 px-3 text-xs text-muted-foreground max-w-[180px]">{r.reason}</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1">
                      <Button size="sm" variant="destructive" className="h-7 text-xs rounded-lg px-2">Remove</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs rounded-lg px-2">Ban Seller</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Events Table */}
      <h2 className="text-xl font-bold mb-4">My Events</h2>
      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-border text-muted-foreground text-sm">
            <tr>
              <th className="p-4 font-medium">Event Name</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Sales</th>
              <th className="p-4 font-medium">Resale Alerts</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { name: "Champions League Quarter Final", date: "Apr 15, 2025", sales: "94% Sold", alerts: 0, status: "On Sale", statusColor: "bg-green-100 text-green-700" },
              { name: "Premier League North London Derby", date: "May 12, 2025", sales: "78% Sold", alerts: 1, status: "On Sale", statusColor: "bg-green-100 text-green-700" },
              { name: "NBA Finals Game 1", date: "Jun 5, 2025", sales: "100% Sold", alerts: 1, status: "Sold Out", statusColor: "bg-red-100 text-red-700" },
              { name: "Wimbledon Men's Final", date: "Jul 14, 2025", sales: "52% Sold", alerts: 0, status: "On Sale", statusColor: "bg-green-100 text-green-700" },
              { name: "Rugby World Cup Final", date: "Oct 25, 2025", sales: "31% Sold", alerts: 0, status: "Pre-Sale", statusColor: "bg-blue-100 text-blue-700" },
            ].map((event, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-4 font-medium">{event.name}</td>
                <td className="p-4 text-muted-foreground text-sm">{event.date}</td>
                <td className="p-4 text-sm">{event.sales}</td>
                <td className="p-4">
                  {event.alerts > 0
                    ? <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 w-fit"><AlertTriangle size={10} /> {event.alerts} alert{event.alerts > 1 ? "s" : ""}</span>
                    : <span className="text-xs text-green-600 font-medium flex items-center gap-1"><ShieldCheck size={11} /> Clean</span>
                  }
                </td>
                <td className="p-4"><span className={`${event.statusColor} px-2 py-1 rounded text-xs font-semibold`}>{event.status}</span></td>
                <td className="p-4 text-right"><Button variant="ghost" size="sm">Manage</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
