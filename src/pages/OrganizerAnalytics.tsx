import { DashboardLayout } from "@/components/DashboardLayout";
import { useOrganizerStats } from "@/hooks/use-api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Ticket, Users, DollarSign, ShieldCheck, AlertTriangle } from "lucide-react";

const ticketBreakdown = [
  { name: "General Admission", value: 58, color: "#2563eb" },
  { name: "Premium Block", value: 27, color: "#7c3aed" },
  { name: "VIP Hospitality", value: 15, color: "#059669" },
];

const checkinTrend = [
  { name: "12pm", checkins: 120 },
  { name: "1pm", checkins: 480 },
  { name: "2pm", checkins: 1200 },
  { name: "3pm", checkins: 3100 },
  { name: "4pm", checkins: 5400 },
  { name: "5pm", checkins: 8900 },
  { name: "6pm", checkins: 11200 },
];

const topEvents = [
  { name: "Champions League QF", revenue: 450000, sold: 45000, capacity: 48000 },
  { name: "Premier League Derby", revenue: 120000, sold: 18200, capacity: 20000 },
  { name: "NBA Finals Game 1", revenue: 380000, sold: 9800, capacity: 10000 },
  { name: "Wimbledon Men's Final", revenue: 95000, sold: 12400, capacity: 15000 },
];

export function OrganizerAnalytics() {
  const { data: stats } = useOrganizerStats();

  return (
    <DashboardLayout role="organizer">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Sales Analytics</h1>
          <p className="text-muted-foreground mt-1">Revenue, check-ins, and resale performance across all your events.</p>
        </div>
        <select className="border border-border rounded-xl px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option>Last 6 Months</option>
          <option>Last 3 Months</option>
          <option>This Year</option>
        </select>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Revenue", value: `$${((stats?.revenue || 854000) / 1000).toFixed(0)}K`, icon: DollarSign, color: "bg-green-50 text-green-600", sub: "+14% vs last period" },
          { label: "Tickets Sold", value: (stats?.ticketsSold || 12450).toLocaleString(), icon: Ticket, color: "bg-primary/10 text-primary", sub: "Across all events" },
          { label: "Total Check-ins", value: (stats?.checkIns || 11200).toLocaleString(), icon: Users, color: "bg-blue-50 text-blue-600", sub: "90% scan rate" },
          { label: "Anti-Scalping Flags", value: "3", icon: AlertTriangle, color: "bg-red-50 text-red-600", sub: "All listings blocked" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={18} />
            </div>
            <div className="text-2xl font-extrabold text-foreground">{stat.value}</div>
            <div className="text-sm font-semibold text-foreground mt-0.5">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-green-600" />
            <h3 className="text-lg font-bold">Revenue Overview (Last 6 Months)</h3>
          </div>
          <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-semibold">+14% growth</span>
        </div>
        <div className="h-72 w-full">
          {stats?.recentSales ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.recentSales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  cursor={{ fill: "#F1F5F9" }}
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", fontSize: 13 }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: "Jan", sales: 92000 }, { name: "Feb", sales: 118000 }, { name: "Mar", sales: 85000 },
                { name: "Apr", sales: 178000 }, { name: "May", sales: 220000 }, { name: "Jun", sales: 161000 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  cursor={{ fill: "#F1F5F9" }}
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", fontSize: 13 }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Ticket Tier Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-lg font-bold mb-5">Ticket Tier Breakdown</h3>
          <div className="flex items-center gap-6">
            <div className="h-44 w-44 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ticketBreakdown} cx="50%" cy="50%" innerRadius={44} outerRadius={72} paddingAngle={3} dataKey="value">
                    {ticketBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {ticketBreakdown.map((tier, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }} />
                      <span className="font-medium text-foreground">{tier.name}</span>
                    </div>
                    <span className="font-bold">{tier.value}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${tier.value}%`, backgroundColor: tier.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Check-in Trend */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-lg font-bold mb-5">Check-in Rate (Event Day)</h3>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={checkinTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(1)}K`} />
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", fontSize: 12 }}
                  formatter={(v: number) => [v.toLocaleString(), "Check-ins"]}
                />
                <Line type="monotone" dataKey="checkins" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Events */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-8">
        <h3 className="text-lg font-bold mb-5">Top Performing Events</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60">
                {["Event", "Revenue", "Tickets Sold", "Capacity", "Fill Rate", "Status"].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topEvents.map((event, i) => {
                const fillRate = Math.round((event.sold / event.capacity) * 100);
                return (
                  <tr key={i} className="border-b border-border/30 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-3 font-semibold">{event.name}</td>
                    <td className="py-4 px-3 text-green-600 font-bold">${event.revenue.toLocaleString()}</td>
                    <td className="py-4 px-3">{event.sold.toLocaleString()}</td>
                    <td className="py-4 px-3 text-muted-foreground">{event.capacity.toLocaleString()}</td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${fillRate}%` }} />
                        </div>
                        <span className="font-semibold text-xs">{fillRate}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${fillRate >= 100 ? "bg-red-100 text-red-700" : fillRate >= 80 ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                        {fillRate >= 100 ? "Sold Out" : fillRate >= 80 ? "Almost Full" : "On Sale"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Anti-Scalping Summary */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <ShieldCheck size={18} className="text-primary" />
          <h3 className="text-lg font-bold">Anti-Scalping Performance</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Listings Scanned", value: "85", sub: "All resale listings checked" },
            { label: "Flagged & Blocked", value: "3", sub: "Above 130% price cap", alert: true },
            { label: "Protected Buyers", value: "147", sub: "From above-cap resale" },
            { label: "Avg Resale Markup", value: "+18%", sub: "Within acceptable range" },
          ].map((s, i) => (
            <div key={i} className={`p-4 rounded-xl border ${s.alert ? "bg-red-50/40 border-red-100" : "bg-slate-50 border-border/40"}`}>
              <div className={`text-2xl font-extrabold mb-1 ${s.alert ? "text-red-600" : "text-primary"}`}>{s.value}</div>
              <div className="text-sm font-semibold text-foreground">{s.label}</div>
              <div className="text-xs text-muted-foreground">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
