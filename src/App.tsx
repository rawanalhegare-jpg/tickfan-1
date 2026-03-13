import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import all pages
import { Home } from "./pages/Home";
import { Matches } from "./pages/Matches";
import { EventDetails } from "./pages/EventDetails";
import { Checkout } from "./pages/Checkout";
import { MyTickets } from "./pages/MyTickets";
import { Marketplace } from "./pages/Marketplace";
import { VerifyTicket } from "./pages/VerifyTicket";
import { FanDashboard } from "./pages/FanDashboard";
import { OrganizerDashboard } from "./pages/OrganizerDashboard";
import { CreateEvent } from "./pages/CreateEvent";
import { OrganizerAnalytics } from "./pages/OrganizerAnalytics";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Auth } from "./pages/Auth";
import { About, FAQ, Contact } from "./pages/StaticPages";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/matches" component={Matches} />
      <Route path="/events/:id" component={EventDetails} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/my-tickets" component={MyTickets} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/verify" component={VerifyTicket} />
      <Route path="/verify-ticket" component={VerifyTicket} />
      <Route path="/dashboard" component={FanDashboard} />
      <Route path="/organizer" component={OrganizerDashboard} />
      <Route path="/organizer/create-event" component={CreateEvent} />
      <Route path="/organizer/analytics" component={OrganizerAnalytics} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/login"><Auth isSignUp={false} /></Route>
      <Route path="/signup"><Auth isSignUp={true} /></Route>
      <Route path="/about" component={About} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
