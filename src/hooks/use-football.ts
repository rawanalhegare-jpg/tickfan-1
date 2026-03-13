import { useQuery } from "@tanstack/react-query";

export type FootballMatch = {
  id: string;
  title: string;
  team1: string;
  team2: string;
  team1Logo: string;
  team2Logo: string;
  date: string;
  venue: string;
  city: string;
  sport: "Football";
  leagueName: string;
  leagueLogo: string;
  leagueCountry: string;
  leagueFlag: string | null;
  round: string;
  status: string;
  statusLong: string;
  goals: { home: number | null; away: number | null };
  imageUrl: string;
  price: number;
  availableTickets: number;
};

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

/** All upcoming high-profile fixtures */
export function useFootballMatches() {
  return useQuery<FootballMatch[]>({
    queryKey: ["football", "upcoming"],
    queryFn: () => fetchJson<FootballMatch[]>("/api/football/upcoming"),
    staleTime: 30 * 60 * 1000,     // 30 min
    gcTime:    60 * 60 * 1000,     // 1 hr
    retry: 1,
  });
}

/** Single fixture by id */
export function useFootballMatch(id: string | undefined) {
  return useQuery<FootballMatch>({
    queryKey: ["football", "fixture", id],
    queryFn: () => fetchJson<FootballMatch>(`/api/football/fixture/${id}`),
    enabled: !!id && !["m1","m2","m3","m4","m5","m6"].includes(id ?? ""),
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });
}

/** Search fixtures */
export function useFootballSearch(q: string) {
  return useQuery<FootballMatch[]>({
    queryKey: ["football", "search", q],
    queryFn: () =>
      fetchJson<FootballMatch[]>(`/api/football/search?q=${encodeURIComponent(q)}`),
    enabled: q.length >= 2,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}
