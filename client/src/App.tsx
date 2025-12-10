import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TourProvider } from "@/context/TourContext";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Agenda from "@/pages/Calendar";
import Team from "@/pages/Team";
import Services from "@/pages/Services";
import Queue from "@/pages/Queue";
import Marketing from "@/pages/Marketing";
import Landing from "@/pages/Landing";
import Finance from "@/pages/Finance";
import Clients from "@/pages/Clients";
import MiniSite from "@/pages/MiniSite";

import AppDashboard from "@/pages/app/AppDashboard";
import AppAgenda from "@/pages/app/AppAgenda";
import AppTeam from "@/pages/app/AppTeam";
import AppServices from "@/pages/app/AppServices";
import AppQueue from "@/pages/app/AppQueue";
import AppMarketing from "@/pages/app/AppMarketing";
import AppFinance from "@/pages/app/AppFinance";
import AppClients from "@/pages/app/AppClients";
import AppMiniSite from "@/pages/app/AppMiniSite";

function Router() {
  return (
    <Switch>
      {/* Landing page e demo de vendas */}
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/agenda" component={Agenda} />
      <Route path="/team" component={Team} />
      <Route path="/services" component={Services} />
      <Route path="/queue" component={Queue} />
      <Route path="/marketing" component={Marketing} />
      <Route path="/finance" component={Finance} />
      <Route path="/clients" component={Clients} />
      <Route path="/mini-site" component={MiniSite} />

      {/* Sistema real do cliente */}
      <Route path="/app" component={AppDashboard} />
      <Route path="/app/agenda" component={AppAgenda} />
      <Route path="/app/equipe" component={AppTeam} />
      <Route path="/app/servicos" component={AppServices} />
      <Route path="/app/fila" component={AppQueue} />
      <Route path="/app/marketing" component={AppMarketing} />
      <Route path="/app/financeiro" component={AppFinance} />
      <Route path="/app/clientes" component={AppClients} />
      <Route path="/app/mini-site" component={AppMiniSite} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TourProvider>
          <Toaster />
          <Router />
        </TourProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
