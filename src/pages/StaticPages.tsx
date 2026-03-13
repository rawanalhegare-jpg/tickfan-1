import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { ChevronDown, ChevronUp, Mail, Phone, MapPin, Shield, Award, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function About() {
  const teamMembers = [
    { name: "Alex Rivera", role: "CEO & Co-founder", bg: "bg-blue-100", initials: "AR" },
    { name: "Sarah Chen", role: "CTO & Co-founder", bg: "bg-purple-100", initials: "SC" },
    { name: "Marcus Johnson", role: "Head of Product", bg: "bg-green-100", initials: "MJ" },
    { name: "Priya Patel", role: "Head of Operations", bg: "bg-orange-100", initials: "PP" },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary to-blue-700 text-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/20">
            Our Story
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mt-6 mb-6 leading-tight">
            Built for fans.<br />By fans.
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            We got tired of scalpers, fake tickets, and hidden fees. So we built the platform we always wished existed.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-foreground mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            TickFan exists to make live sports accessible and fair for everyone. We connect clubs and organizers directly with passionate fans, eliminate scalping with technology, and create a trusted community marketplace where everyone plays by the same rules.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 border-y border-border py-14">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "250+", label: "Live Events", sub: "Worldwide" },
            { value: "18K+", label: "Tickets Sold", sub: "This season" },
            { value: "120+", label: "Verified Sellers", sub: "Trust-rated" },
            { value: "2024", label: "Founded", sub: "San Francisco, CA" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-extrabold text-primary mb-1">{stat.value}</div>
              <div className="font-semibold text-foreground text-sm">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center text-foreground mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Fan Protection", desc: "Every ticket purchase is guaranteed. If it's not right, you get a full refund, no questions asked.", color: "bg-blue-50 text-blue-600" },
              { icon: Award, title: "Authenticity First", desc: "Zero tolerance for fake tickets. Every listing is verified against organizer records before it goes live.", color: "bg-green-50 text-green-600" },
              { icon: Heart, title: "Community Driven", desc: "We're building a community of trusted fans who help each other get to the games they love.", color: "bg-pink-50 text-pink-600" },
              { icon: Globe, title: "Fair Access", desc: "Sports should be for everyone, not just those who can afford scalper prices. We cap resale at 130%.", color: "bg-orange-50 text-orange-600" },
            ].map((v, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-border shadow-sm text-center hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 ${v.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <v.icon size={26} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center text-foreground mb-4">Meet the Team</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">A passionate group of sports fans, engineers, and product builders committed to changing how tickets work.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className="text-center">
                <div className={`w-20 h-20 ${member.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-extrabold text-foreground`}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-foreground text-sm">{member.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      category: "Buying Tickets",
      items: [
        { q: "Are all tickets on TickFan official?", a: "Yes. Every ticket sold on TickFan is verified against the organizer's database before being listed. We work directly with clubs, venues, and event promoters to guarantee authenticity." },
        { q: "What happens if the event is cancelled?", a: "If an event is cancelled or postponed, you receive a full refund within 3–5 business days. No questions asked, no fees deducted." },
        { q: "How do I receive my ticket after purchase?", a: "After purchase, your digital ticket appears instantly in your TickFan wallet. It includes a dynamic QR code you scan at the gate. No printing needed — everything is on your phone." },
      ]
    },
    {
      category: "Resale & Marketplace",
      items: [
        { q: "How does safe fan-to-fan resale work?", a: "When you list a ticket for resale, we verify it against our records. The buyer pays us directly — we hold the funds in escrow. Once the event completes successfully, we pay you. The buyer gets a brand new QR code; your old one is invalidated." },
        { q: "Is there a price cap on resale tickets?", a: "Yes. We cap resale prices at 130% of the original face value. This protects fans from price gouging while still allowing sellers to recover costs if plans change." },
        { q: "What fees are charged for resale?", a: "Sellers pay a flat 5% platform fee. Buyers see the total price upfront with no surprise fees at checkout. What you see is what you pay." },
      ]
    },
    {
      category: "Verification & Security",
      items: [
        { q: "How do I verify a ticket I received?", a: "Visit the Verify Ticket page and enter the ticket ID or scan the QR code. You'll instantly see whether the ticket is valid, used, or flagged as suspicious." },
        { q: "What are dynamic QR codes?", a: "Our QR codes refresh every 30 seconds. This makes it impossible to sell screenshots or photocopies of tickets, eliminating the most common form of ticket fraud at the gate." },
        { q: "What if I receive a suspicious ticket?", a: "Report it immediately via the Verify Ticket page. Our fraud team investigates within 2 hours and issues a full refund if fraud is confirmed." },
      ]
    }
  ];

  let idx = 0;
  return (
    <PublicLayout>
      {/* Header */}
      <div className="bg-slate-50 py-16 text-center border-b border-border">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Help Center & FAQ</h1>
          <p className="text-lg text-muted-foreground">Everything you need to know about buying, selling, and verifying tickets on TickFan.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        {faqData.map((section) => {
          return (
            <div key={section.category}>
              <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border">{section.category}</h2>
              <div className="space-y-3">
                {section.items.map((item) => {
                  const currentIdx = idx++;
                  return (
                    <div key={currentIdx} className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
                      <button
                        className="w-full flex justify-between items-center p-5 text-left hover:bg-slate-50 transition-colors"
                        onClick={() => setOpenIndex(openIndex === currentIdx ? null : currentIdx)}
                      >
                        <span className="font-semibold text-foreground pr-4">{item.q}</span>
                        {openIndex === currentIdx
                          ? <ChevronUp size={18} className="text-primary shrink-0" />
                          : <ChevronDown size={18} className="text-muted-foreground shrink-0" />
                        }
                      </button>
                      {openIndex === currentIdx && (
                        <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border/40 pt-4">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </PublicLayout>
  );
}

export function Contact() {
  return (
    <PublicLayout>
      {/* Header */}
      <div className="bg-slate-50 py-16 text-center border-b border-border">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">Our support team is available 24/7. We typically respond within 2 hours.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-foreground">Contact Details</h2>
            {[
              { icon: Mail, label: "Email Support", value: "support@tickfan.com", sub: "Replies within 2 hours" },
              { icon: Phone, label: "Phone", value: "+1 (800) TICKFAN", sub: "Mon–Sun 8am–10pm EST" },
              { icon: MapPin, label: "Headquarters", value: "123 Sports Avenue", sub: "San Francisco, CA 94102" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-border shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <item.icon size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                  <div className="font-semibold text-foreground text-sm">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.sub}</div>
                </div>
              </div>
            ))}

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
              <h3 className="font-bold text-primary text-sm mb-2">Organizer Partnership?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If you're an event organizer looking to partner with TickFan, email us at <strong>partners@tickfan.com</strong>. We reply within 24 hours.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm p-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Send a Message</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wide">First Name</label>
                <input className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-slate-50" placeholder="John" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wide">Last Name</label>
                <input className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-slate-50" placeholder="Doe" />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wide">Email Address</label>
              <input type="email" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-slate-50" placeholder="john@email.com" />
            </div>
            <div className="mb-4">
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wide">Subject</label>
              <select className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-slate-50 text-muted-foreground">
                <option>Select a topic</option>
                <option>Ticket purchase issue</option>
                <option>Resale problem</option>
                <option>Verification question</option>
                <option>Organizer partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wide">Message</label>
              <textarea className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary h-36 resize-none bg-slate-50" placeholder="Describe your issue or question in detail..." />
            </div>
            <Button className="w-full h-12 rounded-xl font-semibold text-base">Send Message →</Button>
            <p className="text-xs text-center text-muted-foreground mt-4">We typically reply within 2 hours during business hours.</p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
