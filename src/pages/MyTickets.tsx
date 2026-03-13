import { DashboardLayout } from "@/components/DashboardLayout";
import { TicketCard } from "@/components/TicketCard";
import { useMyTickets } from "@/hooks/use-api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ShieldCheck, Lock, AlertTriangle } from "lucide-react";

export function MyTickets() {
  const { data: tickets, isLoading } = useMyTickets();

  const valid = tickets?.filter(t => t.status === "Valid") || [];
  const pending = tickets?.filter(t => t.status === "Pending") || [];
  const past = tickets?.filter(t => t.status === "Used" || t.status === "Resold") || [];
  const suspicious = tickets?.filter(t => t.status === "Suspicious") || [];

  return (
    <DashboardLayout role="fan">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-3xl font-display font-bold">My Tickets</h1>
            <p className="text-muted-foreground mt-1">Your digital wallet — transfer, resell, or verify at the gate.</p>
          </div>
          <div className="hidden md:flex flex-col gap-1 items-end">
            <div className="flex items-center gap-2 text-xs bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-full font-semibold">
              <ShieldCheck size={12} /> Anti-scalping active
            </div>
            <div className="flex items-center gap-2 text-xs bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-full font-semibold">
              <Lock size={12} /> Dynamic QR enabled
            </div>
          </div>
        </div>

        {/* Anti-scalping info strip */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-3 mb-8 flex flex-wrap items-center gap-4 text-sm">
          <ShieldCheck size={16} className="text-primary shrink-0" />
          <div className="flex-1">
            <span className="font-semibold text-foreground">TickFan Anti-Scalping Protection</span>
            <span className="text-muted-foreground ml-2">Max 4 tickets/event · Resale capped at 130% face value · Resale limit: 2× per ticket</span>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-8 bg-white border border-border h-12 rounded-xl p-1 w-full md:w-auto">
            <TabsTrigger value="upcoming" className="rounded-lg px-5 h-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-sm">
              Upcoming <span className="ml-1.5 bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">{valid.length}</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="rounded-lg px-5 h-full data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700 text-sm">
              Pending <span className="ml-1.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{pending.length}</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="rounded-lg px-5 h-full data-[state=active]:bg-slate-100 data-[state=active]:text-slate-700 text-sm">
              Past
            </TabsTrigger>
            {suspicious.length > 0 && (
              <TabsTrigger value="flagged" className="rounded-lg px-5 h-full data-[state=active]:bg-red-50 data-[state=active]:text-red-700 text-sm">
                <AlertTriangle size={13} className="mr-1" />
                Flagged <span className="ml-1.5 bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{suspicious.length}</span>
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {isLoading ? (
              [1, 2].map(i => <Skeleton key={i} className="h-52 w-full rounded-2xl" />)
            ) : valid.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
                <p className="text-muted-foreground">No upcoming tickets. Browse matches to book yours.</p>
              </div>
            ) : (
              valid.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            {pending.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
                <p className="text-muted-foreground">No pending tickets.</p>
              </div>
            ) : (
              pending.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {past.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
                <p className="text-muted-foreground">No past tickets yet.</p>
              </div>
            ) : (
              past.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)
            )}
          </TabsContent>

          {suspicious.length > 0 && (
            <TabsContent value="flagged" className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 mb-2">
                <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-800">Suspicious activity detected</p>
                  <p className="text-xs text-red-600 mt-0.5">These tickets have been flagged by our anti-fraud system. Our team is reviewing them and will contact you within 24 hours.</p>
                </div>
              </div>
              {suspicious.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
