import { useSearch } from "wouter";
import { useState } from "react";
import { CheckCircle2, CreditCard, Shield, ShieldCheck, Lock, AlertTriangle, Users, DollarSign, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PublicLayout } from "@/components/PublicLayout";
import { useMatch, useBuyTicket } from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { antiScalpingConfig } from "@/data/mock";

export function Checkout() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const matchId = params.get("match") || "m1";

  const { data: match, isLoading } = useMatch(matchId);
  const buyMutation = useBuyTicket();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [step, setStep] = useState(1);
  const [qty, setQty] = useState(1);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await buyMutation.mutateAsync({ matchId });
      setStep(3);
      toast({ title: "Payment Successful!", description: "Your tickets have been added to your wallet." });
      setTimeout(() => setLocation("/my-tickets"), 3000);
    } catch {
      toast({ variant: "destructive", title: "Payment Failed", description: "Please check your card details." });
    }
  };

  if (isLoading || !match) return <PublicLayout><div className="py-24 text-center">Loading...</div></PublicLayout>;

  const subtotal = match.price * qty;
  const fee = Math.round(subtotal * 0.08);
  const total = subtotal + fee;

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-display font-bold mb-8">Secure Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Form */}
          <div className="flex-1 order-2 lg:order-1">
            {/* Stepper */}
            <div className="flex items-center mb-8">
              <div className="flex items-center text-primary">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                <span className="font-semibold ml-2 text-sm">Details</span>
              </div>
              <div className={`h-1 w-14 mx-3 rounded-full ${step > 1 ? "bg-primary" : "bg-border"}`} />
              <div className={`flex items-center ${step > 1 ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step > 1 ? "bg-primary text-white" : "bg-slate-100"}`}>2</div>
                <span className="font-semibold ml-2 text-sm">Payment</span>
              </div>
              <div className={`h-1 w-14 mx-3 rounded-full ${step > 2 ? "bg-primary" : "bg-border"}`} />
              <div className={`flex items-center ${step > 2 ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step > 2 ? "bg-primary text-white" : "bg-slate-100"}`}>3</div>
                <span className="font-semibold ml-2 text-sm">Done</span>
              </div>
            </div>

            {/* ANTI-SCALPING PROTECTION PANEL */}
            <div className="bg-gradient-to-r from-blue-50 to-primary/5 border border-primary/20 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={18} className="text-primary" />
                <h3 className="font-bold text-foreground text-sm">Anti-Scalping Protection Active</h3>
                <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">TickFan Shield</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: Users, label: "Ticket Limit", value: `Max ${antiScalpingConfig.maxTicketsPerUser} per person` },
                  { icon: DollarSign, label: "Resale Cap", value: `130% face value max` },
                  { icon: Lock, label: "ID Linked", value: "Ticket tied to your account" },
                  { icon: QrCode, label: "Dynamic QR", value: "Rotates every 30s at gate" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-border/50">
                    <item.icon size={14} className="text-primary mb-1.5" />
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">{item.label}</p>
                    <p className="text-xs font-semibold text-foreground mt-0.5 leading-tight">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {step === 1 && (
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                <h3 className="text-xl font-bold mb-6">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="email">Email Address (ticket delivery)</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                </div>

                {/* Quantity selector */}
                <div className="mb-6">
                  <Label className="mb-2 block">Number of Tickets</Label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-border rounded-xl overflow-hidden">
                      <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-slate-50 transition-colors">−</button>
                      <span className="w-12 text-center font-bold text-lg">{qty}</span>
                      <button onClick={() => setQty(q => Math.min(antiScalpingConfig.maxTicketsPerUser, q + 1))} className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-slate-50 transition-colors">+</button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-slate-50 border border-border rounded-lg px-3 py-2">
                      <AlertTriangle size={12} className="text-amber-500" />
                      Max {antiScalpingConfig.maxTicketsPerUser} tickets per person per event
                    </div>
                  </div>
                  {qty === antiScalpingConfig.maxTicketsPerUser && (
                    <p className="text-xs text-amber-600 font-medium mt-2 flex items-center gap-1">
                      <AlertTriangle size={11} /> You've reached the maximum purchase limit for this event.
                    </p>
                  )}
                </div>

                <Button size="lg" className="w-full h-12 text-base rounded-xl" onClick={() => setStep(2)}>
                  Continue to Payment
                </Button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handlePayment} className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Payment Details</h3>
                  <div className="flex gap-2">
                    <div className="w-10 h-6 bg-slate-200 rounded" />
                    <div className="w-10 h-6 bg-slate-200 rounded" />
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" required placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input id="cardNumber" className="pl-10" required placeholder="0000 0000 0000 0000" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry (MM/YY)</Label>
                      <Input id="expiry" required placeholder="12/25" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" required placeholder="123" />
                    </div>
                  </div>
                </div>

                {/* Escrow notice */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <Lock size={16} className="text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Escrow Payment Protection</p>
                    <p className="text-xs text-green-700 mt-0.5">Your payment is held securely and only released to the seller after the event. Full refund if cancelled.</p>
                  </div>
                </div>

                <Button type="submit" size="lg" disabled={buyMutation.isPending} className="w-full h-14 text-lg rounded-xl shadow-lg">
                  {buyMutation.isPending ? "Processing..." : `Pay $${total}`}
                </Button>
                <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground gap-2">
                  <Shield size={16} className="text-green-500" /> SSL encrypted · PCI compliant
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="bg-white p-12 rounded-2xl border border-border shadow-sm text-center">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-display font-bold mb-2">You're all set!</h2>
                <p className="text-muted-foreground mb-6">Your tickets are now in your TickFan wallet with dynamic QR codes ready for gate entry.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5">
                    <ShieldCheck size={12} /> Anti-scalping enabled
                  </div>
                  <div className="bg-blue-50 border border-blue-200 text-blue-700 text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5">
                    <QrCode size={12} /> Dynamic QR active
                  </div>
                  <div className="bg-primary/10 border border-primary/20 text-primary text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5">
                    <Lock size={12} /> Payment escrowed
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mt-6">Redirecting to your wallet...</p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-[380px] order-1 lg:order-2">
            <div className="bg-slate-50 rounded-2xl border border-border p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                <img src={match.imageUrl ?? undefined} alt="event" className="w-20 h-20 rounded-xl object-cover" />
                <div>
                  <p className="font-bold text-sm">{match.team1} vs {match.team2}</p>
                  <p className="text-xs text-muted-foreground mt-1">{match.venue}</p>
                  <p className="text-xs text-muted-foreground">General Admission × {qty}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tickets × {qty}</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee (8%)</span>
                  <span className="font-medium">${fee}</span>
                </div>
                <div className="flex justify-between text-xs text-green-600 font-medium">
                  <span>No hidden charges</span>
                  <span>$0</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-lg font-bold mb-6">
                <span>Total</span>
                <span>${total}</span>
              </div>

              {/* Security badges */}
              <div className="space-y-2">
                {[
                  { icon: ShieldCheck, label: "100% Authentic Ticket", color: "text-blue-600" },
                  { icon: Lock, label: "Escrow Payment Protection", color: "text-green-600" },
                  { icon: AlertTriangle, label: "Anti-Scalping Active", color: "text-amber-600" },
                  { icon: QrCode, label: "Dynamic QR Verification", color: "text-purple-600" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
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
