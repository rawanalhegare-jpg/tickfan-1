// Centralized mock data for the entire frontend-only app

export type Match = {
  id: string;
  title: string;
  team1: string;
  team2: string;
  date: string;
  venue: string;
  city: string;
  price: number;
  sport: string;
  imageUrl: string;
  availableTickets: number;
  trending?: boolean;
  trendingRank?: number;
  recommendedFor?: string[];
};

export const matches: Match[] = [
  {
    id: "m1",
    title: "Champions League Quarter Final",
    team1: "Real Madrid",
    team2: "Manchester City",
    date: "2025-04-15T20:00:00Z",
    venue: "Santiago Bernabéu",
    city: "Madrid",
    price: 150,
    sport: "Football",
    imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    availableTickets: 420,
    trending: true,
    trendingRank: 1,
    recommendedFor: ["Football", "Madrid"],
  },
  {
    id: "m2",
    title: "NBA Finals Game 1",
    team1: "Lakers",
    team2: "Celtics",
    date: "2025-06-05T19:30:00Z",
    venue: "Crypto.com Arena",
    city: "Los Angeles",
    price: 250,
    sport: "Basketball",
    imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&q=80",
    availableTickets: 125,
    trending: true,
    trendingRank: 2,
    recommendedFor: ["Basketball", "Los Angeles"],
  },
  {
    id: "m3",
    title: "Premier League Derby",
    team1: "Arsenal",
    team2: "Tottenham",
    date: "2025-05-12T15:00:00Z",
    venue: "Emirates Stadium",
    city: "London",
    price: 95,
    sport: "Football",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    availableTickets: 890,
    trending: true,
    trendingRank: 3,
    recommendedFor: ["Football", "London", "Arsenal"],
  },
  {
    id: "m4",
    title: "Wimbledon Men's Final",
    team1: "Alcaraz",
    team2: "Sinner",
    date: "2025-07-14T14:00:00Z",
    venue: "All England Club",
    city: "London",
    price: 400,
    sport: "Tennis",
    imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80",
    availableTickets: 12,
    trending: true,
    trendingRank: 4,
    recommendedFor: ["Tennis", "London"],
  },
  {
    id: "m5",
    title: "F1 Grand Prix",
    team1: "Verstappen",
    team2: "Hamilton",
    date: "2025-09-01T14:00:00Z",
    venue: "Monza Circuit",
    city: "Monza",
    price: 180,
    sport: "Motorsport",
    imageUrl: "https://images.unsplash.com/photo-1532906806505-1eb47a177259?w=800&q=80",
    availableTickets: 300,
    recommendedFor: ["Motorsport"],
  },
  {
    id: "m6",
    title: "Rugby World Cup Final",
    team1: "South Africa",
    team2: "New Zealand",
    date: "2025-10-25T18:00:00Z",
    venue: "Stade de France",
    city: "Paris",
    price: 120,
    sport: "Rugby",
    imageUrl: "https://images.unsplash.com/photo-1506501139174-099022df5260?w=800&q=80",
    availableTickets: 50,
    recommendedFor: ["Rugby", "Paris"],
  },
];

export type TicketStatus = "Valid" | "Used" | "Resold" | "Pending" | "Suspicious";

export type Ticket = {
  id: string;
  matchId: string;
  matchTitle: string;
  date: string;
  venue: string;
  seat: string;
  status: TicketStatus;
  qrCode: string;
  purchaseLimit?: number;
  purchaseCount?: number;
  securityToken?: string;
  isAntiScalpingProtected?: boolean;
};

export const myTickets: Ticket[] = [
  {
    id: "t1",
    matchId: "m1",
    matchTitle: "Champions League Quarter Final",
    date: "2025-04-15T20:00:00Z",
    venue: "Santiago Bernabéu",
    seat: "Block 120, Row 14, Seat 5",
    status: "Valid",
    qrCode: "TICKFAN-t1-998877",
    purchaseLimit: 4,
    purchaseCount: 1,
    securityToken: "TF-SEC-2025-A9K1",
    isAntiScalpingProtected: true,
  },
  {
    id: "t2",
    matchId: "m3",
    matchTitle: "Premier League Derby",
    date: "2025-05-12T15:00:00Z",
    venue: "Emirates Stadium",
    seat: "Block 5, Row 2, Seat 12",
    status: "Pending",
    qrCode: "TICKFAN-t2-443322",
    purchaseLimit: 4,
    purchaseCount: 2,
    securityToken: "TF-SEC-2025-B7M2",
    isAntiScalpingProtected: true,
  },
  {
    id: "t3",
    matchId: "m2",
    matchTitle: "NBA Finals Game 1",
    date: "2025-06-05T19:30:00Z",
    venue: "Crypto.com Arena",
    seat: "Section 101, Row A, Seat 1",
    status: "Resold",
    qrCode: "TICKFAN-t3-112233",
    isAntiScalpingProtected: true,
  },
  {
    id: "t4",
    matchId: "m4",
    matchTitle: "Wimbledon Men's Final",
    date: "2025-07-14T14:00:00Z",
    venue: "All England Club",
    seat: "Centre Court, Row G, Seat 22",
    status: "Valid",
    qrCode: "TICKFAN-t4-667788",
    purchaseLimit: 2,
    purchaseCount: 1,
    securityToken: "TF-SEC-2025-C3P8",
    isAntiScalpingProtected: true,
  },
  {
    id: "t5",
    matchId: "m5",
    matchTitle: "F1 Italian Grand Prix",
    date: "2025-09-01T14:00:00Z",
    venue: "Monza Circuit",
    seat: "Grandstand A, Row 3, Seat 17",
    status: "Used",
    qrCode: "TICKFAN-t5-990011",
    isAntiScalpingProtected: false,
  },
];

export type ResaleListing = {
  id: string;
  matchId: string;
  matchTitle: string;
  date: string;
  sellerName: string;
  sellerTrustScore: number;
  originalPrice: number;
  askingPrice: number;
  seat: string;
  priceCapStatus: "within_cap" | "near_cap" | "flagged";
  resaleCount: number;
  suspicious?: boolean;
  suspiciousReason?: string;
  escrowProtected: boolean;
};

export const resaleListings: ResaleListing[] = [
  {
    id: "r1",
    matchId: "m1",
    matchTitle: "Champions League Quarter Final",
    date: "2025-04-15T20:00:00Z",
    sellerName: "Alex M.",
    sellerTrustScore: 98,
    originalPrice: 150,
    askingPrice: 145,
    seat: "Block 200, Row 5, Seat 10",
    priceCapStatus: "within_cap",
    resaleCount: 1,
    escrowProtected: true,
  },
  {
    id: "r2",
    matchId: "m1",
    matchTitle: "Champions League Quarter Final",
    date: "2025-04-15T20:00:00Z",
    sellerName: "Sarah K.",
    sellerTrustScore: 100,
    originalPrice: 150,
    askingPrice: 160,
    seat: "Block 110, Row 1, Seat 2",
    priceCapStatus: "within_cap",
    resaleCount: 1,
    escrowProtected: true,
  },
  {
    id: "r3",
    matchId: "m4",
    matchTitle: "Wimbledon Men's Final",
    date: "2025-07-14T14:00:00Z",
    sellerName: "James T.",
    sellerTrustScore: 85,
    originalPrice: 400,
    askingPrice: 380,
    seat: "Centre Court, Row C, Seat 44",
    priceCapStatus: "within_cap",
    resaleCount: 1,
    escrowProtected: true,
  },
  {
    id: "r4",
    matchId: "m3",
    matchTitle: "Premier League Derby",
    date: "2025-05-12T15:00:00Z",
    sellerName: "unknown_proxy_44",
    sellerTrustScore: 12,
    originalPrice: 95,
    askingPrice: 195,
    seat: "Block 8, Row 4, Seat 9",
    priceCapStatus: "flagged",
    resaleCount: 7,
    suspicious: true,
    suspiciousReason: "Price exceeds 130% cap — listing under review",
    escrowProtected: false,
  },
  {
    id: "r5",
    matchId: "m2",
    matchTitle: "NBA Finals Game 1",
    date: "2025-06-05T19:30:00Z",
    sellerName: "bot_acc_8812",
    sellerTrustScore: 3,
    originalPrice: 250,
    askingPrice: 485,
    seat: "Section 202, Row B, Seat 5",
    priceCapStatus: "flagged",
    resaleCount: 12,
    suspicious: true,
    suspiciousReason: "Account flagged: 12 resales in 24h, suspected bot activity",
    escrowProtected: false,
  },
  {
    id: "r6",
    matchId: "m4",
    matchTitle: "Wimbledon Men's Final",
    date: "2025-07-14T14:00:00Z",
    sellerName: "Maria C.",
    sellerTrustScore: 91,
    originalPrice: 400,
    askingPrice: 510,
    seat: "Centre Court, Row A, Seat 12",
    priceCapStatus: "near_cap",
    resaleCount: 2,
    escrowProtected: true,
  },
];

export const organizerStats = {
  totalEvents: 14,
  ticketsSold: 12450,
  revenue: 854000,
  checkIns: 11200,
  recentSales: [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 2000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
  ],
};

export const adminStats = {
  totalUsers: 145000,
  totalEvents: 340,
  activeListings: 1205,
  fraudFlags: 12,
  platformRevenue: 2450000,
};

export const antiScalpingConfig = {
  maxTicketsPerUser: 4,
  maxResalePriceMultiplier: 1.3,
  maxResalesPerTicket: 2,
  suspiciousResaleThreshold: 5,
};

export type VerifyResult = {
  valid: boolean;
  status: "Verified" | "Already Used" | "Suspicious" | "Invalid" | "Resold" | "Pending";
  ticketId?: string;
  matchTitle?: string;
  venue?: string;
  seat?: string;
  date?: string;
  holderName?: string;
  purchaseDate?: string;
  resaleHistory?: number;
  reason?: string;
};

export function verifyTicketCode(code: string): VerifyResult {
  const c = code.trim().toUpperCase();
  if (c.includes("T1") || c.includes("TICKFAN-T1")) {
    return {
      valid: true,
      status: "Verified",
      ticketId: "T1",
      matchTitle: "Champions League Quarter Final",
      venue: "Santiago Bernabéu, Madrid",
      seat: "Block 120, Row 14, Seat 5",
      date: "Apr 15, 2025 · 8:00 PM",
      holderName: "John Doe",
      purchaseDate: "Jan 12, 2025",
      resaleHistory: 0,
    };
  }
  if (c.includes("T2") || c.includes("TICKFAN-T2")) {
    return {
      valid: false,
      status: "Pending",
      ticketId: "T2",
      matchTitle: "Premier League Derby",
      venue: "Emirates Stadium, London",
      seat: "Block 5, Row 2, Seat 12",
      date: "May 12, 2025 · 3:00 PM",
      holderName: "John Doe",
      reason: "Ticket payment is being processed — access not yet activated.",
    };
  }
  if (c.includes("T3") || c.includes("TICKFAN-T3")) {
    return {
      valid: false,
      status: "Already Used",
      ticketId: "T3",
      matchTitle: "NBA Finals Game 1",
      venue: "Crypto.com Arena, Los Angeles",
      reason: "This ticket QR code was already scanned at the gate.",
    };
  }
  if (c.includes("T4") || c.includes("TICKFAN-T4")) {
    return {
      valid: true,
      status: "Verified",
      ticketId: "T4",
      matchTitle: "Wimbledon Men's Final",
      venue: "All England Club, London",
      seat: "Centre Court, Row G, Seat 22",
      date: "Jul 14, 2025 · 2:00 PM",
      holderName: "John Doe",
      purchaseDate: "Feb 28, 2025",
      resaleHistory: 1,
    };
  }
  if (c.includes("SUSPICIOUS") || c.includes("FAKE")) {
    return {
      valid: false,
      status: "Suspicious",
      reason: "This code is flagged for suspicious activity. Do not grant entry.",
    };
  }
  return {
    valid: false,
    status: "Invalid",
    reason: "No matching ticket found in the TickFan database.",
  };
}
