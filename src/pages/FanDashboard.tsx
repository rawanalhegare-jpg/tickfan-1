import { DashboardLayout } from "@/components/DashboardLayout";
import { useMyTickets } from "@/hooks/use-api";
import { useFootballMatches } from "@/hooks/use-football";
import { Ticket, Calendar, ShieldCheck, Tag, Heart, TrendingUp, MapPin, Clock, ArrowRight, Star, Flame, Sparkles, Lock, QrCode, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { format } from "date-fns";
import { type MatchCardData } from "@/components/MatchCard";

const savedEvents = [
  { id: "m4", title: "Wimbledon Men's Final", teams: "Alcaraz vs Sinner", date: "Jul 14, 2025", venue: "All England Club, London", price: 400, sport: "Tennis" },
  { id: "m5", title: "F1 Italian Grand Prix", teams: "Verstappen vs Hamilton", date: "Sep 1, 2025", venue: "Monza Circuit, Monza", price: 180, sport: "Motorsport" },
];

export function FanDashboard() {
  const { data: tickets } = useMyTickets();
  const { data: liveMatches } = useFootballMatches();

  const validTickets = tickets?.filter(t => t.status === "Valid") || [];
  const resoldTickets = tickets?.filter(t => t.status === "Resold") || [];

  // Smart discovery: recommended, near you, trending
  const recommended = liveMatches?.slice(0, 3) as MatchCardData[] | undefined;
  const nearYou = liveMatches?.filter(m => m.city.toLowerCase().includes("london") || m.city.toLowerCase().includes("madrid")).slice(0, 2) as MatchCardData[] | undefined;
  const trending = liveMatches?.filter(m => m.leagueName === "UEFA Champions League").slice(0, 3) as MatchCardData[] | undefined;

  return (
    <DashboardLayout role="fan">
      <div className="max-w-6xl mx-auto">

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 mb-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-white/70 text-sm mb-1">Welcome back</p>
            <h1 className="text-2xl font-bold">John Doe 👋</h1>
            <p className="text-white/70 text-sm mt-1">Fan since Jan 2024 · Trust Score: 100%</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2">
              <Star size={16} className="text-yellow-300" fill="currentColor" />
              <span className="text-sm font-semibold">Verified Fan</span>
            </div>
            <Link href="/matches">
              <Button size="sm" className="bg-white text-primary hover:bg-blue-50 text-xs rounded-xl">Browse Events →</Button>
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "My Tickets", value: tickets?.length || 0, icon: Ticket, color: "text-primary bg-primary/10", sub: "Active & past" },
            { label: "Upcoming Events", value: validTickets.length, icon: Calendar, color: "text-blue-600 bg-blue-50", sub: "This season" },
            { label: "Saved Events", value: savedEvents.length, icon: Heart, color: "text-pink-600 bg-pink-50", sub: "On watchlist" },
            { label: "Resale Income", value: `$${resoldTickets.length * 145}`, icon: TrendingUp, color: "text-green-600 bg-green-50", sub: "Earned from resale" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition-shadow p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon size={20} />
              </div>
              <div className="text-2xl font-extrabold text-foreground">{stat.value}</div>
              <div className="text-sm font-semibold text-foreground mt-0.5">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">

            {/* My Tickets */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-foreground">My Tickets</h2>
                <Link href="/my-tickets">
                  <Button variant="ghost" size="sm" className="text-primary text-sm">View All <ArrowRight size={14} className="ml-1" /></Button>
                </Link>
              </div>
              {validTickets.length > 0 ? (
                <div className="space-y-3">
                  {validTickets.map(ticket => (
                    <div key={ticket.id} className="bg-white rounded-2xl border border-border shadow-sm p-5 flex gap-4 hover:shadow-md transition-shadow">
                      <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shrink-0">
                        <Ticket size={24} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-foreground text-sm leading-tight">{ticket.matchTitle}</h3>
                          <div className="flex gap-1 shrink-0">
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Verified</span>
                            {ticket.isAntiScalpingProtected && (
                              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                <Lock size={8} />
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin size={11} /> {ticket.venue}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <Clock size={11} /> {format(new Date(ticket.date), "MMM d, yyyy · h:mm a")}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 font-mono">{ticket.seat}</p>
                      </div>
                      <Link href="/my-tickets">
                        <Button size="sm" className="rounded-xl shrink-0 self-center">
                          <QrCode size={14} className="mr-1" /> View QR
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-dashed border-border p-10 text-center">
                  <Ticket size={40} className="text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm mb-4">No upcoming tickets yet</p>
                  <Link href="/matches"><Button size="sm">Browse Events</Button></Link>
                </div>
              )}
            </div>

            {/* Recommended for You */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Recommended for You</h2>
                </div>
                <Link href="/matches">
                  <Button variant="ghost" size="sm" className="text-primary text-sm">View All <ArrowRight size={14} className="ml-1" /></Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Based on your favourite teams and past purchases</p>
              {recommended && recommended.length > 0 ? (
                <div className="space-y-3">
                  {recommended.slice(0, 3).map((m, i) => (
                    <div key={m.id} className="bg-white rounded-2xl border border-border shadow-sm p-4 flex gap-4 hover:shadow-md transition-shadow">
                      {m.team1Logo && m.team2Logo ? (
                        <div className="flex items-center gap-1 w-14 shrink-0">
                          <img src={m.team1Logo} alt={m.team1} className="w-6 h-6 object-contain" />
                          <img src={m.team2Logo} alt={m.team2} className="w-6 h-6 object-contain" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                          <Ticket size={22} className="text-primary" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          {m.leagueLogo && <img src={m.leagueLogo} alt="" className="w-4 h-4 object-contain" />}
                          <span className="text-xs font-semibold text-primary truncate">{m.leagueName}</span>
                          {i === 0 && <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded-full">Top Pick</span>}
                        </div>
                        <h3 className="font-bold text-sm truncate">{m.team1} vs {m.team2}</h3>
                        <p className="text-xs text-muted-foreground">{format(new Date(m.date), "MMM d, yyyy")} · {m.venue?.split(",")[0]}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-foreground text-sm">From ${m.price}</div>
                        <Link href={`/events/${m.id}`}>
                          <Button size="sm" variant="outline" className="rounded-lg mt-1 h-7 text-xs px-3">Book →</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {savedEvents.map((e, i) => (
                    <div key={i} className="bg-white rounded-xl border border-border shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <Ticket size={18} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{e.teams}</h4>
                        <p className="text-xs text-muted-foreground">{e.date} · {e.venue}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">${e.price}</div>
                        <Link href={`/events/${e.id}`}>
                          <Button size="sm" variant="outline" className="rounded-lg mt-1 h-7 text-xs px-3">Book →</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Near You */}
            {nearYou && nearYou.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={18} className="text-pink-500" />
                  <h2 className="text-xl font-bold text-foreground">Near You</h2>
                  <span className="text-xs bg-pink-50 text-pink-700 border border-pink-200 px-2 py-0.5 rounded-full font-semibold">London / Madrid</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {nearYou.map(m => (
                    <Link key={m.id} href={`/events/${m.id}`}>
                      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          {m.leagueLogo && <img src={m.leagueLogo} alt="" className="w-5 h-5 object-contain" />}
                          <span className="text-xs font-semibold text-primary truncate">{m.leagueName}</span>
                        </div>
                        <h4 className="font-bold text-sm mb-1 truncate">{m.team1} vs {m.team2}</h4>
                        <p className="text-xs text-muted-foreground">{m.venue?.split(",")[0]}</p>
                        <p className="text-xs text-muted-foreground">{format(new Date(m.date), "MMM d, yyyy")}</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="font-bold text-sm">From ${m.price}</span>
                          <span className="text-xs bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full font-semibold">Near You</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Resale Activity */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-foreground">Resale Activity</h2>
                <Link href="/marketplace">
                  <Button variant="ghost" size="sm" className="text-primary text-sm">List a Ticket <ArrowRight size={14} className="ml-1" /></Button>
                </Link>
              </div>
              {resoldTickets.length > 0 ? (
                <div className="space-y-3">
                  {resoldTickets.map(ticket => (
                    <div key={ticket.id} className="bg-white rounded-2xl border border-border shadow-sm p-5 flex gap-4">
                      <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                        <Tag size={22} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-foreground text-sm">{ticket.matchTitle}</h3>
                          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">Resold</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Sold for $145 · Transfer complete · New QR issued to buyer</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 bg-green-100 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full w-full" />
                          </div>
                          <span className="text-xs text-green-600 whitespace-nowrap font-medium">Paid out</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-2xl border border-border/40 p-6 text-center">
                  <p className="text-muted-foreground text-sm">No active resale listings.</p>
                  <Link href="/marketplace"><Button size="sm" variant="outline" className="mt-3">List a Ticket</Button></Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Trust Score */}
            <div className="bg-primary rounded-2xl p-5 text-white">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-white/70 text-xs">Trust Score</p>
                  <div className="text-4xl font-extrabold">100%</div>
                </div>
                <ShieldCheck size={28} className="text-white/80" />
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div className="bg-white h-2 rounded-full w-full" />
              </div>
              <p className="text-white/70 text-xs">Excellent buyer & seller status</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {["Anti-Scalping Active", "QR Verified", "ID Confirmed"].map(b => (
                  <span key={b} className="text-[10px] bg-white/15 text-white px-2 py-0.5 rounded-full">{b}</span>
                ))}
              </div>
            </div>

            {/* Trending This Week */}
            {trending && trending.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Flame size={17} className="text-orange-500" />
                  <h2 className="text-base font-bold text-foreground">Trending This Week</h2>
                </div>
                <div className="space-y-2">
                  {trending.slice(0, 3).map((m, i) => (
                    <Link key={m.id} href={`/events/${m.id}`}>
                      <div className="bg-white rounded-xl border border-border shadow-sm p-3 hover:shadow-md transition-shadow cursor-pointer flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-center font-bold text-orange-600 text-sm shrink-0">
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{m.team1} vs {m.team2}</p>
                          <p className="text-xs text-muted-foreground truncate">{m.leagueName}</p>
                        </div>
                        <span className="text-xs font-bold text-orange-600 shrink-0">${m.price}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Events */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-bold text-foreground">Saved Events</h2>
                <Heart size={16} className="text-pink-400" fill="currentColor" />
              </div>
              <div className="space-y-3">
                {savedEvents.map((event, i) => (
                  <div key={i} className="bg-white rounded-xl border border-border shadow-sm p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{event.sport}</span>
                      <span className="text-xs text-muted-foreground">{event.date}</span>
                    </div>
                    <h4 className="font-bold text-sm text-foreground mb-0.5">{event.teams}</h4>
                    <p className="text-xs text-muted-foreground mb-3">📍 {event.venue}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-foreground text-sm">From ${event.price}</span>
                      <Link href={`/events/${event.id}`}>
                        <Button size="sm" variant="outline" className="rounded-lg text-xs h-7 px-3">Buy →</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Summary */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <h3 className="font-bold text-foreground mb-4 text-sm">Account Summary</h3>
              <div className="space-y-3">
                {[
                  { label: "Events Attended", value: "12" },
                  { label: "Trust Score", value: "100%" },
                  { label: "Member Since", value: "Jan 2024" },
                  { label: "Preferred Sport", value: "Football" },
                  { label: "Total Spent", value: "$2,340" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-border/30 pb-2 last:border-0 last:pb-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
