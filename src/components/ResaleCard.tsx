import { ShieldCheck, User, AlertTriangle, Lock, TrendingUp, BadgeCheck } from "lucide-react";
import { type ResaleListing } from "@/data/mock";
import { Button } from "@/components/ui/button";

export function ResaleCard({ listing }: { listing: ResaleListing }) {
  const savings = listing.originalPrice - listing.askingPrice;
  const markup = Math.round(((listing.askingPrice - listing.originalPrice) / listing.originalPrice) * 100);
  const capPct = Math.round((listing.askingPrice / listing.originalPrice) * 100);
  const isSuspicious = listing.suspicious;
  const isNearCap = listing.priceCapStatus === "near_cap";
  const isFlagged = listing.priceCapStatus === "flagged";

  return (
    <div className={`bg-white rounded-2xl border shadow-sm transition-all duration-200 ${
      isSuspicious
        ? "border-red-300 bg-red-50/30 opacity-80"
        : "border-border/50 hover:shadow-md hover:-translate-y-0.5"
    }`}>

      {/* Suspicious overlay banner */}
      {isSuspicious && (
        <div className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-t-2xl flex items-center gap-2">
          <AlertTriangle size={13} />
          Flagged Listing — Under Review
        </div>
      )}

      <div className="p-5">
        {/* Title + Price */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0 mr-3">
            <h4 className="font-bold text-base leading-tight mb-1 truncate">{listing.matchTitle}</h4>
            <p className="text-xs text-muted-foreground truncate">{listing.seat}</p>
          </div>
          <div className="text-right shrink-0">
            <div className={`text-2xl font-bold ${isFlagged ? "text-red-600" : "text-foreground"}`}>
              ${listing.askingPrice}
            </div>
            {savings > 0 && (
              <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded mt-0.5 inline-block">
                Save ${savings}
              </div>
            )}
            {markup > 0 && (
              <div className={`text-xs font-medium px-2 py-0.5 rounded mt-0.5 inline-block ${
                isFlagged ? "text-red-600 bg-red-50" : isNearCap ? "text-orange-600 bg-orange-50" : "text-muted-foreground bg-slate-100"
              }`}>
                +{markup}% vs face value
              </div>
            )}
          </div>
        </div>

        {/* Price cap indicator */}
        <div className={`rounded-xl p-2.5 mb-4 flex items-center justify-between ${
          isFlagged ? "bg-red-50 border border-red-200" :
          isNearCap ? "bg-orange-50 border border-orange-200" :
          "bg-green-50 border border-green-200"
        }`}>
          <div className="flex items-center gap-2">
            {isFlagged
              ? <AlertTriangle size={13} className="text-red-500 shrink-0" />
              : <ShieldCheck size={13} className="text-green-600 shrink-0" />
            }
            <span className={`text-xs font-semibold ${isFlagged ? "text-red-700" : isNearCap ? "text-orange-700" : "text-green-700"}`}>
              {isFlagged ? "Exceeds 130% price cap" : isNearCap ? "Near price cap (130%)" : "Within price cap (130%)"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${isFlagged ? "bg-red-500" : isNearCap ? "bg-orange-400" : "bg-green-500"}`}
                style={{ width: `${Math.min(capPct, 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">{capPct}%</span>
          </div>
        </div>

        {/* Suspicious reason */}
        {isSuspicious && listing.suspiciousReason && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-xs text-red-700 font-medium flex items-start gap-2">
            <AlertTriangle size={12} className="shrink-0 mt-0.5" />
            {listing.suspiciousReason}
          </div>
        )}

        {/* Seller info */}
        <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isSuspicious ? "bg-red-100 text-red-500" : "bg-primary/10 text-primary"
            }`}>
              <User size={14} />
            </div>
            <div>
              <p className="text-sm font-semibold">{listing.sellerName}</p>
              <div className="flex items-center gap-2">
                <div className={`w-12 h-1 rounded-full ${
                  listing.sellerTrustScore >= 80 ? "bg-green-400" :
                  listing.sellerTrustScore >= 50 ? "bg-yellow-400" : "bg-red-400"
                }`} style={{ width: `${listing.sellerTrustScore * 0.4}px` }} />
                <p className={`text-xs font-medium ${
                  listing.sellerTrustScore >= 80 ? "text-green-600" :
                  listing.sellerTrustScore >= 50 ? "text-yellow-600" : "text-red-600"
                }`}>
                  Trust: {listing.sellerTrustScore}%
                </p>
              </div>
            </div>
          </div>
          {listing.resaleCount >= 3 && (
            <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">
              {listing.resaleCount}× resale
            </span>
          )}
        </div>

        {/* Escrow + action */}
        {listing.escrowProtected ? (
          <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2 mb-3">
            <Lock size={11} />
            <span className="font-medium">Payment held in escrow until event day</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-3">
            <AlertTriangle size={11} />
            <span className="font-medium">Escrow protection not available — listing under review</span>
          </div>
        )}

        <Button
          className={`w-full rounded-xl ${isSuspicious ? "bg-slate-400 hover:bg-slate-400 cursor-not-allowed" : ""}`}
          disabled={isSuspicious}
        >
          {isSuspicious ? "Listing Blocked" : "Buy Securely"}
        </Button>
      </div>
    </div>
  );
}
