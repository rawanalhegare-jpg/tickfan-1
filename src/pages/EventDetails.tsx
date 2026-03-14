import { useParams, Link, useLocation } from "wouter";
import { format } from "date-fns";
import { Calendar, MapPin, Ticket, ShieldCheck, Info, Trophy, QrCode, Lock, AlertTriangle, Users, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/PublicLayout";
import { useMatch } from "@/hooks/use-api";
import { Skeleton } from "@/components/ui/skeleton";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80";

export function EventDetails() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { data: match, isLoading } = useMatch(params.id || "");

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="max-w-5xl mx-auto px-4 py-12">
          <Skeleton className="h-64 md:h-96 w-full rounded-3xl mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-40 w-full mt-8" />
            </div>
            <div><Skeleton className="h-80 w-full rounded-2xl" /></div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!match) {
    return (
      <PublicLayout>
        <div className="max-w-5xl mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Event Not Found</h2>
          <Link href="/matches"><Button>Back to Matches</Button></Link>
        </div>
      </PublicLayout>
    );
  }

  const imgSrc = match.imageUrl ?? FALLBACK_IMAGE;
  const m = match as typeof match & {
    team1Logo?: string;
    team2Logo?: string;
    leagueName?: string;
    leagueLogo?: string;
    round?: string;
  };

  return (
    <PublicLayout>
      {/* Hero Banner */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={m.title}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        {/* League badge top-left */}
        {m.leagueLogo && (
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-xl px-3 py-2">
            <img src={m.leagueLogo} alt={m.leagueName ?? ""} className="w-8 h-8 object-contain" />
            {m.leagueName && <span className="text-white text-sm font-semibold">{m.leagueName}</span>}
          </div>
        )}

        {/* Available ticket badge top-right */}
        <div className="absolute top-6 right-6">
          {m.availableTickets < 50 && m.availableTickets > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              Only {m.availableTickets} tickets left
            </span>
          )}
          {m.availableTickets === 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">Sold Out</span>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
            <div className="inline-block px-3 py-1 bg-primary text-white font-semibold rounded-full text-sm mb-4">{m.sport}</div>
            {m.team1Logo && m.team2Logo ? (
              <div className="flex items-center gap-4 mb-1">
                <div className="flex items-center gap-3">
                  <img src={m.team1Logo} alt={m.team1} className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-lg" />
                  <span className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">{m.team1}</span>
                </div>
                <span className="text-white/50 text-2xl md:text-4xl font-light px-2">vs</span>
                <div className="flex items-center gap-3">
                  <span className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">{m.team2}</span>
                  <img src={m.team2Logo} alt={m.team2} className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-lg" />
                </div>
              </div>
            ) : (
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2 leading-tight">
                {m.team1} vs {m.team2}
              </h1>
            )}
            {m.round && <p className="text-white/70 text-base mt-2">{m.round}</p>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Info */}
          <div className="lg:col-span-2 space-y-10">

            {/* Date/Venue/Competition strip */}
            <div className="flex flex-wrap gap-6 bg-white p-6 rounded-2xl border border-border/50 shadow-sm">
              <div className="flex items-center text-foreground">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Date & Time</p>
                  <p className="font-semibold">{format(new Date(m.date), "EEEE, MMMM do, yyyy")}</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(m.date), "h:mm a")}</p>
                </div>
              </div>
              <div className="w-px bg-border hidden md:block" />
              <div className="flex items-center text-foreground">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mr-4">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Location</p>
                  <p className="font-semibold">{m.venue}</p>
                  <p className="text-sm text-muted-foreground">{m.city}</p>
                </div>
              </div>
              {m.leagueName && (
                <>
                  <div className="w-px bg-border hidden md:block" />
                  <div className="flex items-center text-foreground">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mr-4">
                      <Trophy size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Competition</p>
                      <p className="font-semibold">{m.leagueName}</p>
                      {m.round && <p className="text-sm text-muted-foreground">{m.round}</p>}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* About */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-4">About this Event</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience the intensity of live {m.sport.toLowerCase()} as <strong className="text-foreground">{m.team1}</strong> faces off against <strong className="text-foreground">{m.team2}</strong> in this highly anticipated {m.leagueName ? `${m.leagueName} fixture` : m.title}.
                {m.leagueName === "UEFA Champions League"
                  ? " The UEFA Champions League is Europe's premier club football competition. This match represents the very best of European football — do not miss it."
                  : m.leagueName === "Premier League"
                  ? " The Premier League is England's top flight — one of the most watched football leagues in the world."
                  : " Secure your official tickets now to guarantee your spot in the stadium."}
                {" "}All tickets are 100% verified and backed by TickFan's buyer guarantee.
              </p>
            </div>

            {/* Anti-Scalping + QR Protection Panel */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 border border-primary/15 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <ShieldCheck size={20} className="text-primary" />
                <h3 className="text-lg font-bold text-foreground">Fan Protection Guarantee</h3>
                <span className="ml-auto text-xs bg-primary/10 text-primary font-bold px-2.5 py-1 rounded-full">TickFan Shield</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: AlertTriangle, label: "Anti-Scalping", desc: "Max 4 tickets per fan per event", color: "text-amber-600 bg-amber-50 border-amber-200" },
                  { icon: Lock, label: "Price Cap", desc: "Resale capped at 130% face value", color: "text-green-600 bg-green-50 border-green-200" },
                  { icon: QrCode, label: "Dynamic QR", desc: "Rotates every 30s — screenshot-proof", color: "text-blue-600 bg-blue-50 border-blue-200" },
                  { icon: ShieldCheck, label: "Escrow", desc: "Payment held until event day", color: "text-purple-600 bg-purple-50 border-purple-200" },
                ].map((item, i) => (
                  <div key={i} className={`rounded-xl border p-3 ${item.color}`}>
                    <item.icon size={16} className="mb-1.5" />
                    <p className="text-xs font-bold">{item.label}</p>
                    <p className="text-[10px] leading-tight opacity-80 mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-primary/10 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  All tickets are cryptographically signed and linked to your identity. Transfer requires full ID verification.
                </p>
                <Link href="/verify">
                  <span className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 shrink-0 ml-4">
                    Verify a ticket <ArrowRight size={11} />
                  </span>
                </Link>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-5">Fan Reviews</h3>
              <div className="space-y-4">
                {[
                  { name: "James T.", date: "March 2025", rating: 5, text: "Bought two tickets through TickFan and it was totally seamless. The dynamic QR at the gate was impressive — no queues, no hassle." },
                  { name: "Sofia M.", date: "February 2025", rating: 5, text: "Love that TickFan blocks scalpers. Got the tickets at face value and the app was so easy to use. Will use again." },
                  { name: "Carlos R.", date: "January 2025", rating: 4, text: "Great platform. Secure, fast, and the price cap means you never feel ripped off. Excellent experience overall." },
                ].map((r, i) => (
                  <div key={i} className="bg-white rounded-xl border border-border p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                          {r.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{r.name}</p>
                          <p className="text-xs text-muted-foreground">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Star key={j} size={13} className="text-yellow-400" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Venue Map */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-5">Venue</h3>
              <div className="w-full h-56 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl border border-border flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MapPin size={40} className="opacity-25 mx-auto mb-2" />
                  <p className="font-semibold opacity-60">{m.venue}</p>
                  <p className="text-sm opacity-40">{m.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Purchase Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-border shadow-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                <Ticket className="text-primary" size={20} /> Select Tickets
              </h3>
              <div className="flex items-center gap-2 mb-6">
                <Users size={13} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {m.availableTickets > 0 ? `${m.availableTickets} tickets remaining` : "Sold out"}
                </span>
                {m.availableTickets < 50 && m.availableTickets > 0 && (
                  <span className="text-xs text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-full">Low stock</span>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <label className="flex items-center justify-between p-4 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="ticket_tier" className="w-4 h-4 text-primary focus:ring-primary accent-primary" defaultChecked />
                    <div>
                      <p className="font-semibold text-sm">General Admission</p>
                      <p className="text-xs text-muted-foreground">Standard seating</p>
                    </div>
                  </div>
                  <div className="font-bold text-lg">${m.price}</div>
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary cursor-pointer hover:bg-primary/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="ticket_tier" className="w-4 h-4 text-primary focus:ring-primary accent-primary" />
                    <div>
                      <p className="font-semibold text-sm text-primary">Premium Block</p>
                      <p className="text-xs text-muted-foreground">Lower tier, great view</p>
                    </div>
                  </div>
                  <div className="font-bold text-lg">${Math.round(m.price * 1.5)}</div>
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl border border-border/50 opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="ticket_tier" className="w-4 h-4" disabled />
                    <div>
                      <p className="font-semibold text-sm">VIP Hospitality</p>
                      <p className="text-xs text-muted-foreground">Includes food & drinks</p>
                    </div>
                  </div>
                  <div className="font-bold text-muted-foreground">Sold Out</div>
                </label>
              </div>

              {/* Guarantee */}
              <div className="bg-green-50 border border-green-100 p-4 rounded-xl mb-5 flex items-start gap-3">
                <ShieldCheck className="text-green-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-xs font-bold text-green-800 mb-0.5">TickFan Buyer Guarantee</p>
                  <p className="text-xs text-green-700 leading-relaxed">
                    100% official · Full refund if cancelled · Escrow protected payment
                  </p>
                </div>
              </div>

              {/* Anti-scalping notice */}
              <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl mb-5 flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                <p className="text-xs text-amber-700 font-medium">Max 4 tickets per person · Anti-scalping active</p>
              </div>

              <Button
                size="lg"
                className="w-full h-14 text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all font-semibold"
                disabled={m.availableTickets === 0}
                onClick={() => setLocation(`/checkout?match=${m.id}`)}
              >
                {m.availableTickets === 0 ? "Sold Out" : "Proceed to Checkout →"}
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                <Info size={12} /> You won't be charged until the next step
              </p>

              {/* Trust icons */}
              <div className="grid grid-cols-2 gap-2 mt-5 pt-5 border-t border-border/40">
                {[
                  { icon: ShieldCheck, label: "Verified Ticket", color: "text-blue-600" },
                  { icon: Lock, label: "Escrow Payment", color: "text-green-600" },
                  { icon: QrCode, label: "Dynamic QR", color: "text-purple-600" },
                  { icon: AlertTriangle, label: "Anti-Scalping", color: "text-amber-600" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <item.icon size={13} className={item.color} />
                    {item.label}
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
