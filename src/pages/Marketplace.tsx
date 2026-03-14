import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { ResaleCard } from "@/components/ResaleCard";
import { useResaleListings } from "@/hooks/use-api";
import { Search, ShieldCheck, Lock, RefreshCcw, DollarSign, Filter, AlertTriangle, Eye, EyeOff } from "lucide-react";

export function Marketplace() {
  const { data: listings, isLoading } = useResaleListings();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("safe");
  const [showSuspicious, setShowSuspicious] = useState(false);

  const filtered = listings?.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !q || l.matchTitle.toLowerCase().includes(q) || l.sellerName.toLowerCase().includes(q);
    if (statusFilter === "safe") return matchSearch && !l.suspicious;
    if (statusFilter === "flagged") return matchSearch && l.suspicious;
    return matchSearch;
  });

  const suspiciousCount = listings?.filter(l => l.suspicious).length ?? 0;
  const safeCount = listings?.filter(l => !l.suspicious).length ?? 0;

  return (
    <PublicLayout>
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/60 border-b border-border py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              Anti-Scalping Fan-to-Fan Resale
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mt-4 mb-4">Safe Ticket Marketplace</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every listing is verified and price-capped. Our AI monitors for suspicious activity and blocks scalpers in real time.
            </p>
          </div>

          {/* Search + Filter */}
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-3 bg-white border border-border rounded-2xl p-3 shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
              <input
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Search events, teams, or sellers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-3 bg-slate-50 border border-border rounded-xl text-sm text-muted-foreground focus:outline-none md:w-44"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Listings</option>
              <option value="safe">Safe Listings Only</option>
              <option value="flagged">Flagged Listings</option>
            </select>
            <button className="bg-primary text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors whitespace-nowrap flex items-center justify-center gap-2">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>
      </div>

      {/* Trust + Anti-Scalping Strip */}
      <div className="bg-white border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: ShieldCheck, title: "Ticket Verified", desc: "Checked against organizer records before listing", color: "text-blue-600 bg-blue-50" },
              { icon: Lock, title: "Escrow Protected", desc: "Funds held until event day — full refund if cancelled", color: "text-green-600 bg-green-50" },
              { icon: RefreshCcw, title: "New QR Issued", desc: "Buyer gets a fresh code; seller's old one is voided instantly", color: "text-purple-600 bg-purple-50" },
              { icon: DollarSign, title: "Price Capped at 130%", desc: "Listings above face value are auto-blocked", color: "text-orange-600 bg-orange-50" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center`}>
                  <item.icon size={18} />
                </div>
                <div className="font-semibold text-sm text-foreground">{item.title}</div>
                <div className="text-xs text-muted-foreground leading-tight max-w-[150px]">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Suspicious alert banner */}
        {suspiciousCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8 flex items-start gap-4">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-red-800 text-sm">{suspiciousCount} listing{suspiciousCount > 1 ? "s" : ""} flagged for scalping activity</p>
              <p className="text-xs text-red-600 mt-1">
                Our AI has detected price violations or suspicious account behavior. These listings are blocked from purchase and are under admin review.
              </p>
            </div>
            <button
              onClick={() => setShowSuspicious(s => !s)}
              className="flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-100 hover:bg-red-200 px-3 py-2 rounded-lg shrink-0 transition-colors"
            >
              {showSuspicious ? <EyeOff size={13} /> : <Eye size={13} />}
              {showSuspicious ? "Hide Flagged" : "View Flagged"}
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-foreground">
              {statusFilter === "flagged" ? "Flagged Listings" : "Safe Listings"}
            </h2>
            <span className="text-sm text-muted-foreground bg-slate-100 px-3 py-1 rounded-full">
              {filtered?.length || 0} found
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter("safe")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${statusFilter === "safe" ? "bg-green-600 text-white border-green-600" : "border-border text-muted-foreground hover:bg-slate-50"}`}
            >
              ✓ Safe ({safeCount})
            </button>
            <button
              onClick={() => setStatusFilter("flagged")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${statusFilter === "flagged" ? "bg-red-600 text-white border-red-600" : "border-border text-muted-foreground hover:bg-slate-50"}`}
            >
              ⚠ Flagged ({suspiciousCount})
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-2xl" />)}
          </div>
        ) : filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(listing => <ResaleCard key={listing.id} listing={listing} />)}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground mb-4">No listings match your search.</p>
            <button className="text-primary font-semibold text-sm underline" onClick={() => { setSearch(""); setStatusFilter("safe"); }}>Clear filters</button>
          </div>
        )}

        {/* Sell CTA */}
        <div className="mt-14 bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Have tickets to sell?</h3>
              <p className="text-white/80 max-w-md">List safely — we handle verification, QR transfer, and escrow payment. Prices are automatically capped so you stay compliant.</p>
            </div>
            <div className="shrink-0">
              <button className="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                List My Ticket →
              </button>
              <p className="text-white/60 text-xs text-center mt-2">Max price: 130% of face value</p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
