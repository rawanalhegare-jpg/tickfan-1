import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { format } from "date-fns";
import { type Ticket } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Clock, AlertTriangle, CheckCircle2, RefreshCcw, Lock } from "lucide-react";

const STATUS_CONFIG = {
  Valid: {
    label: "Verified",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle2,
    iconColor: "text-green-600",
    qrDim: false,
  },
  Pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
    iconColor: "text-yellow-600",
    qrDim: true,
  },
  Used: {
    label: "Used",
    color: "bg-slate-100 text-slate-600 border-slate-200",
    icon: CheckCircle2,
    iconColor: "text-slate-400",
    qrDim: true,
  },
  Resold: {
    label: "Resold",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: RefreshCcw,
    iconColor: "text-blue-500",
    qrDim: true,
  },
  Suspicious: {
    label: "Suspicious",
    color: "bg-red-100 text-red-700 border-red-200",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    qrDim: true,
  },
};

export function TicketCard({ ticket }: { ticket: Ticket }) {
  const cfg = STATUS_CONFIG[ticket.status] ?? STATUS_CONFIG.Valid;
  const isActive = ticket.status === "Valid";
  const isInactive = ticket.status === "Used" || ticket.status === "Resold";
  const StatusIcon = cfg.icon;

  // Dynamic QR countdown (30s rotation concept)
  const [countdown, setCountdown] = useState(30);
  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => setCountdown(c => (c <= 1 ? 30 : c - 1)), 1000);
    return () => clearInterval(id);
  }, [isActive]);

  return (
    <div className={`flex flex-col md:flex-row rounded-2xl border shadow-md bg-white hover:shadow-xl transition-all duration-300 ${
      isInactive ? "opacity-60 grayscale" : "border-border/50"
    } ${ticket.status === "Suspicious" ? "border-red-300 bg-red-50/20" : ""}`}>

      {/* Left: Ticket Details */}
      <div className="p-6 md:p-8 flex-1 border-b md:border-b-0 md:border-r border-dashed border-border relative">

        {/* Header row */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.color}`}>
              <StatusIcon size={11} />
              {cfg.label}
            </span>
            {ticket.isAntiScalpingProtected && isActive && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <Lock size={9} /> Anti-Scalping
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-muted-foreground">#{ticket.id.toUpperCase()}</span>
        </div>

        <h3 className="text-xl font-display font-bold mb-1">{ticket.matchTitle}</h3>
        <p className="text-muted-foreground text-sm mb-5">{ticket.venue}</p>

        <div className="grid grid-cols-3 gap-4 mb-5">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Date</p>
            <p className="font-semibold text-sm">{format(new Date(ticket.date), "MMM d, yyyy")}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Time</p>
            <p className="font-semibold text-sm">{format(new Date(ticket.date), "h:mm a")}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Seat</p>
            <p className="font-semibold text-sm text-primary">{ticket.seat.split(",")[0]}</p>
          </div>
        </div>

        {/* Anti-scalping purchase limit */}
        {isActive && ticket.purchaseLimit && (
          <div className="bg-slate-50 border border-border/50 rounded-xl p-3 mb-4 flex items-center gap-3">
            <ShieldCheck size={16} className="text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">Purchase Limit Active</p>
              <p className="text-xs text-muted-foreground">
                {ticket.purchaseCount} of {ticket.purchaseLimit} tickets used for this event
              </p>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: ticket.purchaseLimit }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${i < (ticket.purchaseCount ?? 0) ? "bg-primary" : "bg-slate-200"}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Suspicious alert */}
        {ticket.status === "Suspicious" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-center gap-3">
            <AlertTriangle size={16} className="text-red-500 shrink-0" />
            <p className="text-xs font-semibold text-red-700">This ticket has been flagged for suspicious resale activity. Our team is reviewing it.</p>
          </div>
        )}

        {/* Pending info */}
        {ticket.status === "Pending" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 flex items-center gap-3">
            <Clock size={16} className="text-yellow-600 shrink-0" />
            <p className="text-xs font-semibold text-yellow-700">Payment processing — QR code will activate within a few minutes.</p>
          </div>
        )}

        {/* Action buttons */}
        {isActive && (
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl flex-1 text-sm h-9">Transfer</Button>
            <Button variant="secondary" className="rounded-xl flex-1 bg-secondary/10 text-secondary hover:bg-secondary/20 text-sm h-9">Resell</Button>
          </div>
        )}
        {ticket.status === "Resold" && (
          <p className="text-xs text-muted-foreground text-center mt-2">This ticket was sold via TickFan's secure resale. The buyer received a new QR code.</p>
        )}
      </div>

      {/* Right: QR Side */}
      <div className="p-6 md:p-8 flex flex-col items-center justify-center bg-slate-50 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none min-w-[200px]">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Scan at Gate</p>

        <div className={`bg-white p-3 rounded-xl shadow-sm border border-border mb-3 relative ${!isActive ? "opacity-40" : ""}`}>
          <QRCodeSVG
            value={ticket.qrCode}
            size={120}
            fgColor={isActive ? "#0f172a" : "#94a3b8"}
          />
          {!isActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-xl">
              <Lock size={28} className="text-slate-400" />
            </div>
          )}
        </div>

        {isActive && (
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-green-700 font-semibold">Live • Rotates in {countdown}s</span>
          </div>
        )}

        {ticket.securityToken && isActive && (
          <p className="text-[9px] text-muted-foreground font-mono text-center">{ticket.securityToken}</p>
        )}

        {!isActive && (
          <p className="text-[10px] text-muted-foreground text-center max-w-[130px] mt-1">
            {ticket.status === "Resold" ? "New QR issued to buyer" : ticket.status === "Used" ? "Entry completed" : "Awaiting activation"}
          </p>
        )}
      </div>
    </div>
  );
}
