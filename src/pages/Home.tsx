import { Link } from "wouter";
import { ArrowRight, ShieldCheck, RefreshCcw, Smartphone, QrCode, Search, CreditCard, BarChart2, Users, Zap, Star, Lock, DollarSign, Flame, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/PublicLayout";
import { MatchCard, type MatchCardData } from "@/components/MatchCard";
import { useMatches } from "@/hooks/use-api";
import { useFootballMatches } from "@/hooks/use-football";
import { motion } from "framer-motion";
import { format } from "date-fns";

export function Home() {
  const { data: matches, isLoading } = useMatches();
  const { data: liveMatches } = useFootballMatches();

  const trending = liveMatches?.filter(m => m.leagueName === "UEFA Champions League").slice(0, 3) as MatchCardData[] | undefined;
  const nearYou = liveMatches?.filter(m => m.city?.toLowerCase().includes("london") || m.city?.toLowerCase().includes("madrid")).slice(0, 4) as MatchCardData[] | undefined;
  const recommended = liveMatches?.slice(3, 6) as MatchCardData[] | undefined;

  return (
    <PublicLayout>
      {/* 1. Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Stadium background image - FULL OPACITY with color overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Stadium" 
            className="w-full h-full object-cover"
          />
          {/* Deep blue overlay for premium sports feel, keeps text readable */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/75 to-slate-800/80" />
          {/* Subtle bottom fade to blend into white page below */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/15 text-white border border-white/20 font-semibold text-sm mb-6">
              The #1 Secure Sports Ticketing Platform
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-extrabold text-white tracking-tight leading-[1.05] mb-6 max-w-5xl mx-auto">
              Buy Real Tickets. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Support Real Sports.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              The official fan-to-fan ticketing platform for the world's biggest sporting events. Guaranteed authentic. Always fair.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/matches">
                <Button size="lg" className="h-14 px-10 text-base font-semibold rounded-2xl bg-white text-primary shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all w-full sm:w-auto hover:bg-blue-50">
                  Browse Matches <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button size="lg" variant="outline" className="h-14 px-10 text-base font-semibold rounded-2xl border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm transition-all w-full sm:w-auto bg-transparent">
                  Sell a Ticket
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8 text-white/60 text-sm">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-400" /> SSL Secure</span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5"><Star size={14} className="text-yellow-400" /> 4.9/5 Rating</span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5"><Zap size={14} className="text-blue-400" /> Instant Delivery</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust Metrics */}
      <section className="bg-white border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "250+", label: "Live Events", sublabel: "Across 10 cities" },
            { value: "18K+", label: "Tickets Sold", sublabel: "This season" },
            { value: "120+", label: "Verified Sellers", sublabel: "Trust-rated" },
            { value: "0", label: "Hidden Fees", sublabel: "Always transparent" },
          ].map((stat, i) => (
            <div key={i} className="group">
              <div className="text-4xl md:text-5xl font-extrabold text-primary mb-1 tabular-nums">{stat.value}</div>
              <div className="text-base font-semibold text-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Event Discovery Search */}
      <section className="bg-white py-12 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Find Your Next Event</h2>
            <p className="text-muted-foreground mt-1">Search from 250+ official sporting events worldwide</p>
          </div>
          <div className="bg-slate-50 border border-border rounded-2xl p-4 flex flex-col md:flex-row gap-3 shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
              <input
                className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Search events, teams, or stadiums..."
              />
            </div>
            <select className="px-4 py-3 bg-white border border-border rounded-xl text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 md:w-40">
              <option>All Cities</option>
              <option>Madrid</option>
              <option>London</option>
              <option>Los Angeles</option>
              <option>Paris</option>
              <option>Monza</option>
            </select>
            <select className="px-4 py-3 bg-white border border-border rounded-xl text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 md:w-40">
              <option>All Sports</option>
              <option>Football</option>
              <option>Basketball</option>
              <option>Tennis</option>
              <option>Rugby</option>
              <option>Motorsport</option>
            </select>
            <Link href="/matches">
              <button className="bg-primary text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors w-full md:w-auto whitespace-nowrap">
                Search Events
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-4 justify-center">
            <span className="text-xs text-muted-foreground">Popular:</span>
            {["Champions League", "NBA Finals", "Premier League Derby", "Wimbledon", "F1 Grand Prix"].map(tag => (
              <Link key={tag} href="/matches">
                <span className="text-xs bg-slate-100 hover:bg-primary/10 hover:text-primary text-muted-foreground px-3 py-1 rounded-full cursor-pointer transition-colors border border-border/50">{tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Matches */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Featured Matches</h2>
              <p className="text-muted-foreground max-w-2xl text-lg">Grab your tickets for the most anticipated games of the season before they sell out.</p>
            </div>
            <Link href="/matches">
              <Button variant="ghost" className="hidden md:flex items-center text-primary font-semibold hover:bg-primary/5">
                View All <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-3xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {matches?.slice(0, 6).map((match, i) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <MatchCard match={match as MatchCardData} />
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/matches">
              <Button variant="outline" className="w-full">View All Matches</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4b. Trending This Week */}
      {trending && trending.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-white to-slate-50 border-t border-border/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Flame size={20} className="text-orange-500" />
                </div>
                <div>
                  <span className="text-orange-500 font-semibold text-xs uppercase tracking-widest">Hot Right Now</span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Trending This Week</h2>
                </div>
              </div>
              <Link href="/matches">
                <Button variant="ghost" className="hidden md:flex items-center text-primary font-semibold hover:bg-primary/5">
                  See All <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trending.map((m, i) => (
                <Link key={m.id} href={`/events/${m.id}`}>
                  <div className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer p-5 relative overflow-hidden group">
                    {/* Rank badge */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center font-extrabold text-sm z-10">
                      {i + 1}
                    </div>
                    <div className="flex items-center gap-3 mb-4 pl-10">
                      {m.leagueLogo && <img src={m.leagueLogo} alt="" className="w-5 h-5 object-contain" />}
                      <span className="text-xs font-semibold text-primary">{m.leagueName}</span>
                      <span className="ml-auto text-[10px] bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Flame size={9} /> Trending
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      {m.team1Logo && <img src={m.team1Logo} alt={m.team1} className="w-12 h-12 object-contain" />}
                      <span className="font-bold text-muted-foreground text-sm">vs</span>
                      {m.team2Logo && <img src={m.team2Logo} alt={m.team2} className="w-12 h-12 object-contain" />}
                    </div>
                    <h3 className="font-bold text-center text-sm mb-1">{m.team1} vs {m.team2}</h3>
                    <p className="text-xs text-center text-muted-foreground mb-4">{m.venue?.split(",")[0]} · {format(new Date(m.date), "MMM d")}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-foreground">From ${m.price}</span>
                      <span className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">Buy Tickets →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4c. Near You */}
      {nearYou && nearYou.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-border/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                  <MapPin size={20} className="text-pink-500" />
                </div>
                <div>
                  <span className="text-pink-500 font-semibold text-xs uppercase tracking-widest">Your Area</span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Events Near You</h2>
                </div>
              </div>
              <Link href="/matches">
                <Button variant="ghost" className="hidden md:flex items-center text-primary font-semibold hover:bg-primary/5">
                  Expand Area <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {nearYou.map(m => (
                <Link key={m.id} href={`/events/${m.id}`}>
                  <div className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer overflow-hidden group">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-400 px-4 py-2 flex items-center gap-1.5">
                      <MapPin size={12} className="text-white/80" />
                      <span className="text-white text-xs font-semibold truncate">{m.city}</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 mb-3">
                        {m.leagueLogo && <img src={m.leagueLogo} alt="" className="w-4 h-4 object-contain" />}
                        <span className="text-[10px] font-bold text-primary truncate">{m.leagueName}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        {m.team1Logo && <img src={m.team1Logo} alt={m.team1} className="w-10 h-10 object-contain" />}
                        <span className="text-xs text-muted-foreground font-medium">vs</span>
                        {m.team2Logo && <img src={m.team2Logo} alt={m.team2} className="w-10 h-10 object-contain" />}
                      </div>
                      <h4 className="font-bold text-xs mb-1 leading-tight">{m.team1} vs {m.team2}</h4>
                      <p className="text-[10px] text-muted-foreground mb-3">{format(new Date(m.date), "MMM d, yyyy")}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-foreground">From ${m.price}</span>
                        <span className="text-[10px] bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full font-semibold">Near You</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4d. Recommended for You */}
      {recommended && recommended.length > 0 && (
        <section className="py-16 bg-white border-t border-border/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Sparkles size={20} className="text-primary" />
                </div>
                <div>
                  <span className="text-primary font-semibold text-xs uppercase tracking-widest">Personalized</span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Recommended for You</h2>
                </div>
              </div>
              <Link href="/matches">
                <Button variant="ghost" className="hidden md:flex items-center text-primary font-semibold hover:bg-primary/5">
                  View All <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommended.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <MatchCard match={m} />
                </motion.div>
              ))}
            </div>

            {/* Personalization CTA */}
            <div className="mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles size={20} className="text-primary shrink-0" />
                <div>
                  <p className="font-bold text-foreground text-sm">Get smarter recommendations</p>
                  <p className="text-xs text-muted-foreground">Sign in to personalize your feed based on your favourite teams and sports</p>
                </div>
              </div>
              <Link href="/login">
                <Button size="sm" className="rounded-xl shrink-0">Sign In to Personalize</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 4. Why TickFan? */}
      <section className="py-24 bg-white border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Why TickFan?</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-2 mb-4">The smarter way to go to a match</h2>
            <p className="text-lg text-muted-foreground">We cut out the scalpers, middlemen, and hidden fees. Just you, your seat, and the game.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "100% Verified Tickets", desc: "Every ticket is verified with the organizer before sale. No counterfeits, guaranteed.", color: "text-blue-600 bg-blue-50" },
              { icon: RefreshCcw, title: "Safe Fan-to-Fan Resale", desc: "Buy resale with confidence. Funds are held in escrow until event day.", color: "text-green-600 bg-green-50" },
              { icon: Smartphone, title: "Digital Ticket Wallet", desc: "All your tickets live in one place. Access them offline, share with friends.", color: "text-purple-600 bg-purple-50" },
              { icon: QrCode, title: "Dynamic QR Codes", desc: "Our QR codes rotate every 30 seconds, making screenshots impossible to share.", color: "text-orange-600 bg-orange-50" },
              { icon: Zap, title: "Instant Delivery", desc: "Tickets land in your wallet seconds after payment. No waiting, no emails.", color: "text-yellow-600 bg-yellow-50" },
              { icon: BarChart2, title: "Fair Price Caps", desc: "We cap resale prices at 130% of face value, protecting fans from price gouging.", color: "text-red-600 bg-red-50" },
            ].map((feat, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-border/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className={`w-14 h-14 ${feat.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feat.icon size={26} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-2 mb-4">How TickFan Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">From discovery to entry in minutes. No queues, no hassle, no scalpers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* connector line between steps on desktop */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-border z-0" />
            {[
              { step: "01", icon: Search, title: "Discover Events", desc: "Browse hundreds of official sporting events near you or worldwide." },
              { step: "02", icon: CreditCard, title: "Secure Checkout", desc: "Pay safely with card or digital wallet. Your funds are protected until entry." },
              { step: "03", icon: Smartphone, title: "Get Digital Ticket", desc: "Receive your verified e-ticket instantly in your TickFan wallet." },
              { step: "04", icon: QrCode, title: "Attend or Resell", desc: "Scan at the gate or safely resell to another fan at a fair price." },
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                  <step.icon size={28} />
                </div>
                <div className="text-xs font-bold text-muted-foreground mb-2 tracking-widest uppercase">Step {step.step}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. For Organizers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">For Event Organizers</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-3 mb-6 leading-tight">
                Sell more tickets.<br/>Protect your event.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                TickFan gives organizers a complete platform to create events, manage inventory, validate entry, and eliminate scalping — all in one dashboard.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/organizer">
                  <Button size="lg" className="rounded-xl">Organizer Dashboard</Button>
                </Link>
                <Link href="/organizer/create-event">
                  <Button size="lg" variant="outline" className="rounded-xl">Create an Event</Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: BarChart2, title: "Real-time Analytics", desc: "Track sales, revenue, and attendance live." },
                { icon: ShieldCheck, title: "Fraud Prevention", desc: "Dynamic QR codes stop ticket scalpers." },
                { icon: Users, title: "Attendee Management", desc: "Check-in, seat maps, and capacity control." },
                { icon: Zap, title: "Instant Payouts", desc: "Revenue hits your account within 24 hours." },
              ].map((feat, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3">
                    <feat.icon size={20} />
                  </div>
                  <h4 className="font-bold text-foreground text-sm mb-1">{feat.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Marketplace Preview */}
      <section className="py-24 bg-slate-50 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">Safe Resale</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-2 mb-3">Fan-to-Fan Marketplace</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">Buy resale tickets safely. Funds held in escrow until event day. Prices capped at 130% face value.</p>
            </div>
            <Link href="/marketplace">
              <button className="hidden md:flex items-center gap-2 text-primary font-semibold text-sm hover:underline whitespace-nowrap">
                View All Listings <ArrowRight size={16} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { event: "Champions League QF", teams: "Real Madrid vs Man City", date: "Apr 15, 2025", seat: "Block 200, Row 5", original: 150, asking: 145, seller: "Alex M.", trust: 98, sport: "Football" },
              { event: "Premier League Derby", teams: "Arsenal vs Tottenham", date: "May 12, 2025", seat: "Block 5, Row 2", original: 95, asking: 110, seller: "Sarah K.", trust: 100, sport: "Football" },
              { event: "NBA Finals Game 1", teams: "Lakers vs Celtics", date: "Jun 5, 2025", seat: "Section 101, Row A", original: 250, asking: 240, seller: "James T.", trust: 91, sport: "Basketball" },
            ].map((listing, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-blue-600 px-5 py-3 flex justify-between items-center">
                  <span className="text-white font-semibold text-sm">{listing.sport}</span>
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium">Verified Listing</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground text-base mb-1">{listing.teams}</h3>
                  <p className="text-xs text-muted-foreground mb-1">{listing.event}</p>
                  <p className="text-xs text-muted-foreground mb-4">📅 {listing.date} · 🪑 {listing.seat}</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs text-muted-foreground line-through">Face value: ${listing.original}</div>
                      <div className="text-2xl font-extrabold text-foreground">${listing.asking}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-xs text-muted-foreground">{listing.seller} · ⭐ {listing.trust}/100</span>
                      </div>
                    </div>
                    <Link href="/marketplace">
                      <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors">Buy Now</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {["🔒 Escrow-protected payments", "✅ Ticket verified before transfer", "↩️ Full refund if event cancelled", "📈 Price cap at 130% face value"].map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Smart Protection Features Showcase */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="bg-primary/20 text-primary-foreground/80 border border-primary/30 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              TickFan Shield
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4 text-white">
              The most secure ticketing platform in sport
            </h2>
            <p className="text-white/60 text-lg">
              Six layers of fan protection — from purchase to entry. We take on the scalpers so you don't have to.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Lock,
                title: "Anti-Scalping Engine",
                badge: "Active",
                badgeColor: "bg-red-500",
                desc: "Purchase limits of 4 tickets per user per event. Automated bots and bulk buyers are instantly blocked by our AI detection system.",
              },
              {
                icon: QrCode,
                title: "Dynamic QR Codes",
                badge: "Live",
                badgeColor: "bg-green-500",
                desc: "Ticket QR codes rotate every 30 seconds and are cryptographically signed. Screenshots are worthless. Only the real ticket works at entry.",
              },
              {
                icon: DollarSign,
                title: "Resale Price Cap",
                badge: "130% Max",
                badgeColor: "bg-blue-500",
                desc: "Resale listings above 130% of face value are automatically blocked. Fair pricing is enforced — not just encouraged.",
              },
              {
                icon: ShieldCheck,
                title: "Escrow Payment",
                badge: "Guaranteed",
                badgeColor: "bg-purple-500",
                desc: "Payment is held securely in escrow until event day. If the event is cancelled or the ticket is invalid, you get a full refund automatically.",
              },
              {
                icon: Sparkles,
                title: "Identity Binding",
                badge: "Verified",
                badgeColor: "bg-cyan-500",
                desc: "Every ticket is cryptographically linked to the buyer's identity. Transfers require full ID verification, eliminating stolen tickets.",
              },
              {
                icon: TrendingUp,
                title: "Fraud Intelligence",
                badge: "AI-Powered",
                badgeColor: "bg-orange-500",
                desc: "Our platform monitors listing patterns, pricing anomalies, and account behaviour in real-time. Suspicious listings are flagged to organizers and admins.",
              },
            ].map((feat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/20 border border-primary/30 rounded-xl flex items-center justify-center text-primary">
                    <feat.icon size={22} />
                  </div>
                  <span className={`text-xs font-bold text-white px-2.5 py-1 rounded-full ${feat.badgeColor}`}>{feat.badge}</span>
                </div>
                <h3 className="font-bold text-white text-base mb-2">{feat.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/verify">
              <Button size="lg" className="h-12 px-8 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-semibold transition-all hover:shadow-xl">
                Verify a Ticket Now →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0" />
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-secondary opacity-20 rounded-full blur-3xl z-0" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to join the crowd?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Create your account today to buy official tickets or safely sell to other passionate fans.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-all w-full sm:w-auto shadow-xl">
                Create Free Account
              </Button>
            </Link>
            <Link href="/organizer">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/30 text-white hover:bg-white/10 w-full sm:w-auto bg-transparent">
                I'm an Organizer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
