import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Scissors,
  GitPullRequest,
  MessageSquare,
  Megaphone,
  Settings,
  Sparkles,
  LogOut,
  Home,
  DollarSign,
  Smartphone,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import salonLogo from "@assets/ef8f913501c4d7f06c503a056efcd95e_1765133100746.jpg";
import { useTour } from "@/context/TourContext";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", id: "nav-dashboard" },
  { icon: Calendar, label: "Agenda", href: "/agenda", id: "nav-agenda" },
  { icon: GitPullRequest, label: "Fluxo", href: "/queue", id: "nav-queue" },
  { icon: Users, label: "Profissionais", href: "/team", id: "nav-team" },
  { icon: Scissors, label: "Serviços", href: "/services", id: "nav-services" },
  { icon: DollarSign, label: "Financeiro", href: "/finance", id: "nav-finance" },
  { icon: Users, label: "Clientes", href: "/clients", id: "nav-clients" },
  { icon: Megaphone, label: "Marketing", href: "/marketing", id: "nav-marketing" },
];

export function Sidebar() {
  const [location] = useLocation();
  const { openWelcome } = useTour();

  return (
    <aside className="w-64 border-r bg-sidebar h-screen flex flex-col fixed left-0 top-0 z-30 hidden md:flex shadow-xl shadow-primary/5">
      <div className="p-6 flex items-center gap-2 border-b border-sidebar-border/50">
        <Link href="/">
           <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20 cursor-pointer">
            <img src={salonLogo} alt="Logo" className="h-full w-full object-cover" />
           </div>
        </Link>
        <Link href="/">
          <h1 className="text-2xl font-serif font-bold text-sidebar-foreground tracking-tight cursor-pointer">
            GestãoBelleza
          </h1>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar">
        <div className="mb-4 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Principal
        </div>
        {menuItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
               <a 
                 id={item.id}
                 className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer",
                  isActive
                    ? "bg-sidebar-primary/10 text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}>
                <item.icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"
                  )}
                />
                {item.label}
              </a>
            </Link>
          );
        })}

        <div className="mt-8 mb-4 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Sistema
        </div>
        
        <Link href="/mini-site">
           <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all cursor-pointer">
            <Smartphone className="h-4 w-4 text-muted-foreground" />
            Mini Site (Demo)
          </a>
        </Link>
        
        <button 
          onClick={openWelcome}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all cursor-pointer w-full text-left"
        >
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          Ver Guia de Boas-vindas
        </button>
        
        <Link href="/settings">
           <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all cursor-pointer">
            <Settings className="h-4 w-4 text-muted-foreground" />
            Configurações
          </a>
        </Link>
        <Link href="/">
           <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all cursor-pointer">
            <Home className="h-4 w-4 text-muted-foreground" />
            Voltar ao Site
          </a>
        </Link>
      </nav>

      <div className="p-4 border-t border-sidebar-border/50 space-y-4">
        <div className="bg-sidebar-accent/50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-full overflow-hidden border border-primary/20">
              <img src={salonLogo} alt="Logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium">Seu Salão</p>
              <p className="text-xs text-muted-foreground">Plano teste</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-1 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Desenvolvido por</p>
          <div className="flex items-center gap-2">
             <span className="text-xs font-bold text-gray-700">Andromeda Solutions</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
