import { useState } from "react";
import { Search, Filter, SlidersHorizontal, Wifi, WifiOff, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PublicLayout } from "@/components/PublicLayout";
import { MatchCard, type MatchCardData } from "@/components/MatchCard";
import { useMatches } from "@/hooks/use-api";
import { useFootballMatches } from "@/hooks/use-football";
import { matches as mockMatches } from "@/data/mock";
import { motion } from "framer-motion";

export function Matches() {
  const { data: footballData, isLoading: fbLoading, isError: fbError } = useFootballMatches();
  const { data: mockData } = useMatches();

  const [searchTerm, setSearchTerm] = useState("");
  const [leagueFilter, setLeagueFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Use live football data if available, fall back to mock
  const useLive = !fbError && (fbLoading || (footballData && footballData.length > 0));
  const isLoading = fbLoading;

  // Normalize all data to MatchCardData shape
  const allMatches: MatchCardData[] = useLive && footballData
    ? footballData
    : mockData?.map(m => ({ ...m, team1Logo: undefined, team2Logo: undefined })) ?? [];

  // Build league options from live data
  const leagueOptions = useLive && footballData
    ? [...new Set(footballData.map(m => m.leagueName))].sort()
    : [];

  // Filter
  const filtered = allMatches.filter(m => {
    const q = searchTerm.toLowerCase();
    const matchSearch = !q
      || m.team1.toLowerCase().includes(q)
      || m.team2.toLowerCase().includes(q)
      || m.venue.toLowerCase().includes(q)
      || m.city.toLowerCase().includes(q)
      || (m.leagueName ?? "").toLowerCase().includes(q);
    const matchLeague = leagueFilter === "all"
      || (m.leagueName ?? m.sport) === leagueFilter
      || m.sport.toLowerCase() === leagueFilter.toLowerCase();
    return matchSearch && matchLeague;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <PublicLayout>
      <div className="bg-slate-50 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">Find Your Match</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">Browse official tickets for the biggest upcoming football events worldwide.</p>
            </div>
            {/* Live indicator */}
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border mt-2 ${useLive && !fbError ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-100 border-border text-muted-foreground'}`}>
              {useLive && !fbError
                ? <><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live Data</>
                : <><WifiOff size={12} /> Demo Data</>
              }
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 bg-white p-4 rounded-2xl shadow-sm border border-border">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <Input
                className="pl-10 h-12 rounded-xl text-base border-border/50 bg-slate-50 focus-visible:ring-primary/20"
                placeholder="Search teams, venues, or cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-56">
              <Select value={leagueFilter} onValueChange={setLeagueFilter}>
                <SelectTrigger className="h-12 rounded-xl border-border/50 bg-slate-50">
                  <SelectValue placeholder="All Competitions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Competitions</SelectItem>
                  {leagueOptions.length > 0
                    ? leagueOptions.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)
                    : (
                      <>
                        <SelectItem value="Football">Football</SelectItem>
                        <SelectItem value="Basketball">Basketball</SelectItem>
                        <SelectItem value="Tennis">Tennis</SelectItem>
                      </>
                    )
                  }
                </SelectContent>
              </Select>
            </div>
            <Button className="h-12 px-8 rounded-xl shrink-0">
              <Filter size={18} className="mr-2" /> Filter
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-foreground">
            {isLoading ? "Loading live fixtures..." : `${sorted.length} Events Found`}
          </h2>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-9 rounded-lg border-border/50 bg-white text-sm w-40">
                <SlidersHorizontal size={14} className="mr-2" />
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort: Date</SelectItem>
                <SelectItem value="price-asc">Price: Low → High</SelectItem>
                <SelectItem value="price-desc">Price: High → Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Error banner (but still showing mock fallback) */}
        {fbError && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-center gap-3">
            <WifiOff size={18} className="text-amber-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Using demo data</p>
              <p className="text-xs text-amber-600">Live football data is temporarily unavailable. Showing demo fixtures.</p>
            </div>
            <Button size="sm" variant="outline" className="ml-auto shrink-0 border-amber-200 text-amber-700 hover:bg-amber-100" onClick={() => window.location.reload()}>
              <RefreshCcw size={14} className="mr-1" /> Retry
            </Button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
            <h3 className="text-xl font-bold text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filters.</p>
            <Button variant="outline" onClick={() => { setSearchTerm(""); setLeagueFilter("all"); }}>Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sorted.map((match, i) => {
              // Assign trending rank to top UCL matches
              const uclTrendingIndex = sorted
                .filter(m => m.leagueName === "UEFA Champions League")
                .findIndex(m => m.id === match.id);
              const trendingRank = uclTrendingIndex >= 0 && uclTrendingIndex < 3 ? uclTrendingIndex + 1 : undefined;
              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.5) }}
                >
                  <MatchCard match={match} trendingRank={trendingRank} />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
