import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { matches, myTickets, resaleListings, organizerStats, adminStats } from "@/data/mock";
import { useFootballMatches, useFootballMatch } from "@/hooks/use-football";

/** All matches — prefers live football data, falls back to mock */
export function useMatches() {
  const football = useFootballMatches();
  const mock = useQuery({
    queryKey: ["matches-mock"],
    queryFn: () => matches,
    staleTime: Infinity,
  });

  if (football.isSuccess && football.data && football.data.length > 0) {
    return { ...football, data: football.data };
  }
  return mock;
}

/** Single match by id — if numeric id use live API, otherwise mock */
export function useMatch(id: string) {
  const isMockId = ["m1", "m2", "m3", "m4", "m5", "m6"].includes(id) || isNaN(Number(id));

  const liveQuery = useFootballMatch(isMockId ? undefined : id);
  const mockQuery = useQuery({
    queryKey: ["match-mock", id],
    queryFn: () => matches.find((m) => m.id === id) ?? null,
    enabled: isMockId,
    staleTime: Infinity,
  });

  if (!isMockId) {
    return {
      data: liveQuery.data ?? null,
      isLoading: liveQuery.isLoading,
      isError: liveQuery.isError,
    };
  }
  return {
    data: mockQuery.data ?? null,
    isLoading: mockQuery.isLoading,
    isError: mockQuery.isError,
  };
}

export function useMyTickets() {
  return useQuery({
    queryKey: ["myTickets"],
    queryFn: async () => myTickets,
  });
}

export function useResaleListings() {
  return useQuery({
    queryKey: ["resaleListings"],
    queryFn: async () => resaleListings,
  });
}

export function useOrganizerStats() {
  return useQuery({
    queryKey: ["organizerStats"],
    queryFn: async () => organizerStats,
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => adminStats,
  });
}

export function useBuyTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ matchId }: { matchId: string }) => {
      return { success: true, matchId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTickets"] });
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });
}

export function useVerifyTicket() {
  return useMutation({
    mutationFn: async (qrCode: string) => {
      if (qrCode.includes("TICKFAN-t1")) return { valid: true, status: "Verified" };
      if (qrCode.includes("TICKFAN-t3")) return { valid: false, status: "Already Used" };
      return { valid: false, status: "Invalid" };
    },
  });
}
