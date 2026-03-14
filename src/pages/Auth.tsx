import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Ticket, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Auth({ isSignUp = false }: { isSignUp?: boolean }) {
  const [, setLocation] = useLocation();
  const [role, setRole] = useState<"fan" | "organizer">("fan");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "organizer") setLocation("/organizer");
    else setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Sports" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 text-white max-w-md p-12 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
            <Ticket size={32} />
          </div>
          <h2 className="text-4xl font-display font-bold mb-4">Fair Play Ticketing.</h2>
          <p className="text-lg text-white/80">Join millions of fans accessing real tickets at transparent prices.</p>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-border/50">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="bg-primary text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
              <Ticket size={20} strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-xl text-foreground">TickFan</span>
          </Link>

          <h1 className="text-3xl font-display font-bold mb-2">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isSignUp ? "Start buying and selling tickets securely." : "Log in to access your digital wallet."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="flex gap-4 mb-4">
                  <button type="button" onClick={() => setRole("fan")} className={`flex-1 py-3 rounded-xl border font-medium transition-colors ${role === "fan" ? "bg-primary/10 border-primary text-primary" : "border-border text-muted-foreground"}`}>Fan</button>
                  <button type="button" onClick={() => setRole("organizer")} className={`flex-1 py-3 rounded-xl border font-medium transition-colors ${role === "organizer" ? "bg-primary/10 border-primary text-primary" : "border-border text-muted-foreground"}`}>Organizer</button>
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
                  <Input className="pl-10 h-12 rounded-xl bg-slate-50" placeholder="Full Name" required />
                </div>
              </>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
              <Input type="email" className="pl-10 h-12 rounded-xl bg-slate-50" placeholder="Email Address" required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
              <Input type="password" className="pl-10 h-12 rounded-xl bg-slate-50" placeholder="Password" required />
            </div>
            
            <Button className="w-full h-14 text-lg rounded-xl mt-4 shadow-md">{isSignUp ? "Sign Up" : "Log In"}</Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            {isSignUp ? (
              <>Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link></>
            ) : (
              <>Don't have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Sign up</Link></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
