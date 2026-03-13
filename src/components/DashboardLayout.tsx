import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Ticket, PlusCircle, BarChart3, Settings, ShieldAlert, LogOut, ShieldCheck, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardLayout({ children, role = "fan" }: { children: ReactNode, role?: "fan" | "organizer" | "admin" }) {
  const [location] = useLocation();

  const fanLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Tickets", path: "/my-tickets", icon: Ticket },
    { name: "Saved Events", path: "/matches", icon: Star },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const organizerLinks = [
    { name: "Dashboard", path: "/organizer", icon: LayoutDashboard },
    { name: "Create Event", path: "/organizer/create-event", icon: PlusCircle },
    { name: "Sales Analytics", path: "/organizer/analytics", icon: BarChart3 },
    { name: "Attendees", path: "/organizer", icon: Users },
    { name: "Anti-Scalping", path: "/organizer", icon: ShieldCheck },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const adminLinks = [
    { name: "Admin Home", path: "/admin", icon: LayoutDashboard },
    { name: "Fraud Alerts", path: "/admin", icon: ShieldAlert },
    { name: "Verify Queue", path: "/verify", icon: ShieldCheck },
    { name: "Users", path: "/admin", icon: Users },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const links = role === "admin" ? adminLinks : role === "organizer" ? organizerLinks : fanLinks;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-white p-1.5 rounded-lg">
              <Ticket size={20} strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">
              TickFan <span className="text-xs font-normal text-muted-foreground ml-1">{role}</span>
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => {
            const active = location === link.path;
            return (
              <Link key={link.name} href={link.path}>
                <span className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                }`}>
                  <link.icon size={18} />
                  {link.name}
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10">
            <LogOut size={18} className="mr-3" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Topbar for mobile */}
        <header className="bg-white border-b border-border h-16 flex items-center justify-between px-4 md:px-8">
          <div className="md:hidden font-display font-bold text-xl text-foreground">TickFan</div>
          <div className="ml-auto flex items-center gap-4">
            <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-sm">
              JD
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
