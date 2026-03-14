import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, AlertTriangle, Plus, CheckCircle2 } from "lucide-react";

export function CreateEvent() {
  const [published, setPublished] = useState(false);
  const [priceCap, setPriceCap] = useState(true);
  const [purchaseLimit, setPurchaseLimit] = useState(true);
  const [requireId, setRequireId] = useState(false);

  if (published) {
    return (
      <DashboardLayout role="organizer">
        <div className="max-w-xl mx-auto text-center py-24">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-3">Event Published!</h2>
          <p className="text-muted-foreground mb-8">
            Your event is now live on TickFan. Fans can start purchasing tickets immediately. Anti-scalping protection is active.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => setPublished(false)} variant="outline" className="rounded-xl">Create Another</Button>
            <Button className="rounded-xl">View Event</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="organizer">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold">Create New Event</h1>
          <p className="text-muted-foreground mt-1">Fill in the details below. Anti-scalping protection is applied automatically.</p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => { e.preventDefault(); setPublished(true); }}
        >
          {/* Basic Info */}
          <div className="bg-white p-8 rounded-2xl border border-border shadow-sm space-y-6">
            <h3 className="text-lg font-bold pb-3 border-b border-border">Basic Information</h3>
            <div className="space-y-2">
              <Label>Event Title</Label>
              <Input placeholder="e.g. Champions League Quarter-Final" className="h-12 rounded-xl" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sport Category</Label>
                <select className="w-full h-12 rounded-xl border border-input px-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Football</option>
                  <option>Basketball</option>
                  <option>Tennis</option>
                  <option>Rugby</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Date & Time</Label>
                <Input type="datetime-local" className="h-12 rounded-xl" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Event Description</Label>
              <Textarea placeholder="Describe the event, what fans can expect, special experiences..." className="min-h-[100px] rounded-xl resize-none" />
            </div>
          </div>

          {/* Location */}
          <div className="bg-white p-8 rounded-2xl border border-border shadow-sm space-y-6">
            <h3 className="text-lg font-bold pb-3 border-b border-border">Venue & Location</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Venue Name</Label>
                <Input placeholder="Wembley Stadium" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Input placeholder="London" className="h-12 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Full Address</Label>
              <Input placeholder="Wembley, London HA9 0WS, United Kingdom" className="h-12 rounded-xl" />
            </div>
          </div>

          {/* Ticketing */}
          <div className="bg-white p-8 rounded-2xl border border-border shadow-sm space-y-6">
            <h3 className="text-lg font-bold pb-3 border-b border-border">Ticket Tiers</h3>
            {[
              { name: "General Admission", placeholder: "Standard seating", price: "50", cap: "1000" },
              { name: "Premium Block", placeholder: "Lower tier, great view", price: "125", cap: "500" },
            ].map((tier, i) => (
              <div key={i} className="bg-slate-50 p-5 rounded-xl border border-border/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">Tier {i + 1}</span>
                  {i > 0 && (
                    <button type="button" className="text-xs text-red-500 hover:underline">Remove</button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5 col-span-1">
                    <Label className="text-xs">Tier Name</Label>
                    <Input defaultValue={tier.name} className="h-10 rounded-xl text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Face Price ($)</Label>
                    <Input type="number" defaultValue={tier.price} className="h-10 rounded-xl text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Capacity</Label>
                    <Input type="number" defaultValue={tier.cap} className="h-10 rounded-xl text-sm" />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
              <Plus size={16} /> Add Ticket Tier
            </button>
          </div>

          {/* Anti-Scalping Settings */}
          <div className="bg-white p-8 rounded-2xl border border-primary/20 shadow-sm space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck size={18} className="text-primary" />
              <h3 className="text-lg font-bold">Anti-Scalping Settings</h3>
              <span className="ml-auto text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">Recommended</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Configure how TickFan protects your fans from scalpers and fraud on this event.</p>

            {[
              {
                key: "priceCap",
                label: "Resale Price Cap (130% of face value)",
                desc: "Automatically block any resale listing above 130% of the original ticket price.",
                value: priceCap,
                setter: setPriceCap,
              },
              {
                key: "purchaseLimit",
                label: "Purchase Limit (max 4 per fan)",
                desc: "Limit each verified account to a maximum of 4 tickets per event to prevent bulk buying.",
                value: purchaseLimit,
                setter: setPurchaseLimit,
              },
              {
                key: "requireId",
                label: "Require ID at Entry",
                desc: "Fans must show government-issued ID matching their account name when entering the venue.",
                value: requireId,
                setter: setRequireId,
              },
            ].map((setting) => (
              <div key={setting.key} className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{setting.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{setting.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setting.setter(!setting.value)}
                  className={`relative shrink-0 w-12 h-6 rounded-full transition-colors duration-200 ${setting.value ? "bg-primary" : "bg-slate-200"}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${setting.value ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>
            ))}

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3 mt-4">
              <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700">
                TickFan's anti-scalping engine runs continuously after publishing. Suspicious listings are automatically flagged and sent to your Organizer Dashboard for review.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all font-semibold"
          >
            Publish Event on TickFan
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
