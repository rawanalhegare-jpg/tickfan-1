import { useState } from "react";
import { QrCode, Search, CheckCircle2, XCircle, Clock, AlertTriangle, Shield, RefreshCcw, User, MapPin, Calendar, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PublicLayout } from "@/components/PublicLayout";
import { verifyTicketCode, type VerifyResult } from "@/data/mock";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

const DEMO_CODES = [
  { code: "TICKFAN-T1-998877", label: "Valid ticket", color: "text-green-600 bg-green-50 border-green-200" },
  { code: "TICKFAN-T2-443322", label: "Pending", color: "text-yellow-600 bg-yellow-50 border-yellow-200" },
  { code: "TICKFAN-T3-112233", label: "Already used", color: "text-red-600 bg-red-50 border-red-200" },
  { code: "TICKFAN-T4-667788", label: "Valid ticket", color: "text-green-600 bg-green-50 border-green-200" },
];

const STATUS_UI: Record<string, { icon: React.ElementType; bg: string; border: string; iconColor: string; textColor: string }> = {
  Verified: { icon: CheckCircle2, bg: "bg-green-50", border: "border-green-200", iconColor: "text-green-500", textColor: "text-green-900" },
  "Already Used": { icon: XCircle, bg: "bg-red-50", border: "border-red-200", iconColor: "text-red-500", textColor: "text-red-900" },
  Suspicious: { icon: AlertTriangle, bg: "bg-orange-50", border: "border-orange-200", iconColor: "text-orange-500", textColor: "text-orange-900" },
  Invalid: { icon: XCircle, bg: "bg-red-50", border: "border-red-200", iconColor: "text-red-500", textColor: "text-red-900" },
  Resold: { icon: RefreshCcw, bg: "bg-blue-50", border: "border-blue-200", iconColor: "text-blue-500", textColor: "text-blue-900" },
  Pending: { icon: Clock, bg: "bg-yellow-50", border: "border-yellow-200", iconColor: "text-yellow-500", textColor: "text-yellow-900" },
};

export function VerifyTicket() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"manual" | "scanner">("manual");

  const handleVerify = async (e?: React.FormEvent, overrideCode?: string) => {
    e?.preventDefault();
    const c = overrideCode ?? code;
    if (!c.trim()) return;
    setLoading(true);
    setResult(null);
    await new Promise(r => setTimeout(r, 900));
    setResult(verifyTicketCode(c));
    setLoading(false);
  };

  const ui = result ? STATUS_UI[result.status] ?? STATUS_UI.Invalid : null;

  return (
    <PublicLayout>
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 border-b border-border py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <QrCode size={32} />
          </div>
          <h1 className="text-4xl font-display font-bold mb-3">Smart Ticket Verification</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Instant, cryptographic verification of every TickFan ticket. Eliminates fakes, prevents duplicate scans, and protects real fans at the gate.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: Scanner */}
          <div className="lg:col-span-3">
            {/* Mode toggle */}
            <div className="flex bg-slate-100 rounded-xl p-1 mb-6 w-fit">
              <button
                onClick={() => setMode("manual")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${mode === "manual" ? "bg-white shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Manual Entry
              </button>
              <button
                onClick={() => setMode("scanner")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${mode === "scanner" ? "bg-white shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                QR Scanner
              </button>
            </div>

            {mode === "manual" ? (
              <form onSubmit={handleVerify} className="mb-8">
                <label className="block text-sm font-semibold text-foreground mb-2">Enter Ticket ID or QR Code</label>
                <div className="relative mb-3">
                  <Search className="absolute left-4 top-4 text-muted-foreground" size={18} />
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. TICKFAN-T1-998877"
                    className="pl-12 h-14 rounded-xl text-base bg-white border-border"
                  />
                </div>
                <Button type="submit" size="lg" disabled={loading} className="w-full h-12 rounded-xl text-base">
                  {loading ? (
                    <span className="flex items-center gap-2"><RefreshCcw size={16} className="animate-spin" /> Checking database...</span>
                  ) : (
                    <span className="flex items-center gap-2"><Shield size={16} /> Verify Authenticity</span>
                  )}
                </Button>
              </form>
            ) : (
              <div className="bg-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 mb-8 h-64 border border-slate-700">
                <QrCode size={40} className="text-slate-400 mb-4" />
                <p className="text-slate-300 text-sm font-medium">QR Camera Scanner</p>
                <p className="text-slate-500 text-xs mt-1">Point camera at any TickFan QR code</p>
                <button
                  className="mt-4 bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90"
                  onClick={() => {
                    setCode("TICKFAN-T1-998877");
                    setMode("manual");
                    handleVerify(undefined, "TICKFAN-T1-998877");
                  }}
                >
                  Simulate Scan
                </button>
              </div>
            )}

            {/* Demo codes */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Try demo codes</p>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_CODES.map((d) => (
                  <button
                    key={d.code}
                    onClick={() => { setCode(d.code); handleVerify(undefined, d.code); }}
                    className={`text-left p-3 rounded-xl border text-xs font-medium transition-colors hover:opacity-80 ${d.color}`}
                  >
                    <div className="font-mono text-[10px] mb-0.5 truncate">{d.code}</div>
                    <div>{d.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            {result && ui && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl border p-6 ${ui.bg} ${ui.border}`}
              >
                {/* Status header */}
                <div className="flex items-center gap-3 mb-5">
                  <ui.icon size={36} className={ui.iconColor} />
                  <div>
                    <h3 className={`text-xl font-bold ${ui.textColor}`}>{result.status}</h3>
                    {result.reason && <p className="text-sm text-muted-foreground mt-0.5">{result.reason}</p>}
                  </div>
                  <span className={`ml-auto text-xs font-bold px-3 py-1 rounded-full border ${ui.bg} ${ui.border} ${ui.textColor}`}>
                    {result.valid ? "✓ GRANT ENTRY" : "✗ DENY ENTRY"}
                  </span>
                </div>

                {/* Ticket details */}
                {result.matchTitle && (
                  <div className="bg-white/80 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Ticket size={14} className="text-primary shrink-0" />
                      <span className="font-semibold">{result.matchTitle}</span>
                    </div>
                    {result.venue && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={14} className="shrink-0" />
                        <span>{result.venue}</span>
                      </div>
                    )}
                    {result.date && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} className="shrink-0" />
                        <span>{result.date}</span>
                      </div>
                    )}
                    {result.seat && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Seat:</span>
                        <span className="font-semibold text-primary">{result.seat}</span>
                      </div>
                    )}
                    {result.holderName && (
                      <div className="flex items-center gap-2 text-sm">
                        <User size={14} className="text-muted-foreground shrink-0" />
                        <span className="text-muted-foreground">Registered holder:</span>
                        <span className="font-semibold">{result.holderName}</span>
                      </div>
                    )}
                    {typeof result.resaleHistory === "number" && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <RefreshCcw size={12} className="shrink-0" />
                        <span>Resale history: {result.resaleHistory === 0 ? "Original sale — never resold" : `Resold ${result.resaleHistory} time(s)`}</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Right: How It Works + Gate concept */}
          <div className="lg:col-span-2 space-y-6">

            {/* Gate validation concept */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                <Shield size={16} className="text-primary" /> Gate Validation
              </h3>
              <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-4 mb-4">
                <div className="bg-white p-2 rounded-lg shrink-0">
                  <QRCodeSVG value="TICKFAN-DEMO-GATE" size={52} />
                </div>
                <div className="text-white">
                  <p className="text-xs font-bold mb-1">Live QR — Rotates Every 30s</p>
                  <p className="text-[10px] text-slate-400">Screenshot-resistant · Cryptographically signed</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-green-400 font-semibold">Active</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Cryptographic signature", ok: true },
                  { label: "Not already scanned", ok: true },
                  { label: "Event date matches", ok: true },
                  { label: "Resale price within cap", ok: true },
                ].map((check, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 size={13} className={check.ok ? "text-green-500" : "text-red-500"} />
                    <span className={check.ok ? "text-foreground" : "text-red-600 font-medium"}>{check.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="bg-slate-50 border border-border rounded-2xl p-6">
              <h3 className="font-bold text-base mb-4">How Verification Works</h3>
              <div className="space-y-4">
                {[
                  { step: "01", title: "Scan QR Code", desc: "Fan presents their TickFan digital ticket at the gate" },
                  { step: "02", title: "Instant Auth", desc: "Code verified against live cryptographic database in <200ms" },
                  { step: "03", title: "Status Check", desc: "System confirms: unused, valid date, correct event, not flagged" },
                  { step: "04", title: "Entry Granted", desc: "Green light — code is voided to prevent re-entry" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">{item.step}</div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-primary text-white rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4">Platform Security Stats</p>
              <div className="space-y-3">
                {[
                  { label: "Fake tickets caught", value: "14,220+" },
                  { label: "Duplicate scans blocked", value: "8,100+" },
                  { label: "Verification accuracy", value: "99.97%" },
                  { label: "Avg verification time", value: "< 200ms" },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-white/70">{s.label}</span>
                    <span className="font-bold">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
