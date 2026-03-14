import { Link } from "wouter";
import { Ticket, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="bg-primary text-white p-1.5 rounded-lg">
                <Ticket size={20} strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">TickFan</span>
            </Link>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Fair sports ticketing for real fans. Official tickets, safe resale, zero fraud.
            </p>
            <div className="flex space-x-4 text-slate-500">
              <a href="#" className="hover:text-white transition-colors"><Twitter size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Youtube size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white text-sm mb-5 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/matches" className="hover:text-white transition-colors">Browse Matches</Link></li>
              <li><Link href="/marketplace" className="hover:text-white transition-colors">Resale Marketplace</Link></li>
              <li><Link href="/verify" className="hover:text-white transition-colors">Verify a Ticket</Link></li>
              <li><Link href="/my-tickets" className="hover:text-white transition-colors">My Tickets</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-5 uppercase tracking-wider">Organizers</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/organizer" className="hover:text-white transition-colors">Organizer Dashboard</Link></li>
              <li><Link href="/organizer/create-event" className="hover:text-white transition-colors">Create an Event</Link></li>
              <li><Link href="/organizer/analytics" className="hover:text-white transition-colors">Sales Analytics</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Partner With Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-5 uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/faq" className="hover:text-white transition-colors">Help Center & FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About TickFan</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} TickFan Inc. All rights reserved. Built for real fans.
          </p>
          <div className="flex items-center gap-6 text-slate-500 text-xs">
            <span className="flex items-center gap-1.5">🔒 SSL Encrypted</span>
            <span className="flex items-center gap-1.5">✅ PCI Compliant</span>
            <span className="flex items-center gap-1.5">🏆 Award-Winning Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
