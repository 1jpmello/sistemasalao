import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Agenda from "@/pages/Calendar";
import Team from "@/pages/Team";
import Services from "@/pages/Services";
import Queue from "@/pages/Queue";
import Marketing from "@/pages/Marketing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/agenda" component={Agenda} />
      <Route path="/team" component={Team} />
      <Route path="/services" component={Services} />
      <Route path="/queue" component={Queue} />
      <Route path="/marketing" component={Marketing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
