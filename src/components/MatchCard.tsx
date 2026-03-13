import { Link } from "wouter";
import { Calendar, MapPin, Users, Trophy, Flame } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export type MatchCardData = {
  id: string;
  title: string;
  team1: string;
  team2: string;
  team1Logo?: string;
  team2Logo?: string;
  date: string;
  venue: string;
  city: string;
  sport: string;
  leagueName?: string;
  leagueLogo?: string;
  round?: string;
  imageUrl: string | null;
  price: number;
  availableTickets: number;
};

const sportColors: Record<string, string> = {
  Football: "bg-blue-500",
  Basketball: "bg-orange-500",
  Tennis: "bg-green-500",
  Motorsport: "bg-red-500",
  Rugby: "bg-purple-500",
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80";

export function MatchCard({ match, trendingRank }: { match: MatchCardData; trendingRank?: number }) {
  const isLow = match.availableTickets > 0 && match.availableTickets < 50;
  const isSoldOut = match.availableTickets === 0;
  const imgSrc = match.imageUrl ?? FALLBACK_IMAGE;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-border/40 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
      <div className="relative h-52 overflow-hidden">
        <img
          src={imgSrc}
          alt={match.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Trending rank badge */}
        {trendingRank !== undefined && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5">
            <div className="w-7 h-7 bg-orange-500 text-white rounded-lg flex items-center justify-center font-extrabold text-sm shadow-lg">
              {trendingRank}
            </div>
            <span className="bg-orange-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <Flame size={9} /> Trending
            </span>
          </div>
        )}

        {/* Badges */}
        <div className={`absolute top-4 right-4 flex flex-col gap-2 items-end ${trendingRank !== undefined ? "mt-0" : ""}`}>
          {isSoldOut && <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Sold Out</span>}
          {isLow && !isSoldOut && <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Only {match.availableTickets} left</span>}
        </div>

        {/* League logo top-left (only if no trending badge) */}
        {match.leagueLogo && trendingRank === undefined && (
          <div className="absolute top-4 left-4">
            <img src={match.leagueLogo} alt={match.leagueName ?? ""} className="w-8 h-8 object-contain drop-shadow-lg" />
          </div>
        )}

        {/* Team logos + vs */}
        <div className="absolute bottom-4 left-4 right-4">
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white mb-2 ${sportColors[match.sport] ?? "bg-primary"}`}>
            {match.sport.toUpperCase()}
          </span>

          {match.team1Logo && match.team2Logo ? (
            <div className="flex items-center gap-2">
              <img src={match.team1Logo} alt={match.team1} className="w-7 h-7 object-contain" />
              <span className="text-lg font-extrabold text-white leading-tight drop-shadow-sm flex-1 truncate">
                {match.team1} <span className="text-white/60 font-normal text-sm">vs</span> {match.team2}
              </span>
              <img src={match.team2Logo} alt={match.team2} className="w-7 h-7 object-contain" />
            </div>
          ) : (
            <h3 className="text-xl font-extrabold text-white leading-tight drop-shadow-sm">
              {match.team1} <span className="text-white/60 font-normal text-sm">vs</span> {match.team2}
            </h3>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* League/round info */}
        {match.leagueName && (
          <div className="flex items-center gap-1.5 mb-3">
            {match.leagueLogo && trendingRank !== undefined && (
              <img src={match.leagueLogo} alt="" className="w-4 h-4 object-contain" />
            )}
            {!match.leagueLogo && <Trophy size={12} className="text-primary shrink-0" />}
            <span className="text-xs font-semibold text-primary truncate">{match.leagueName}</span>
            {match.round && <span className="text-xs text-muted-foreground truncate">· {match.round}</span>}
          </div>
        )}
        {!match.leagueName && (
          <p className="text-sm font-semibold text-muted-foreground mb-3 line-clamp-1">{match.title}</p>
        )}

        <div className="space-y-2 mb-auto">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar size={14} className="mr-2 text-primary shrink-0" />
            <span>{format(new Date(match.date), "EEE, MMM d, yyyy • h:mm a")}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin size={14} className="mr-2 text-primary shrink-0" />
            <span className="truncate">{match.venue}{match.city ? `, ${match.city.split(",")[0]}` : ""}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/40">
          <div>
            <span className="text-xs text-muted-foreground">From</span>
            <div className="text-2xl font-extrabold text-foreground leading-none">${match.price}</div>
            {!isSoldOut && match.availableTickets > 0 && (
              <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <Users size={10} /> {match.availableTickets} available
              </div>
            )}
          </div>
          <Link href={`/events/${match.id}`}>
            <Button
              className="rounded-full px-6 shadow-md hover:shadow-lg hover:scale-105 transition-all font-semibold"
              disabled={isSoldOut}
            >
              {isSoldOut ? "Sold Out" : "Book Now"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
