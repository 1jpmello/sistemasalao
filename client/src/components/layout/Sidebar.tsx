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
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import andromedaLogo from "@assets/andromeda_png_1765131801860.jpg";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Calendar, label: "Agenda", href: "/agenda" },
  { icon: GitPullRequest, label: "Fluxo", href: "/queue" },
  { icon: Users, label: "Profissionais", href: "/team" },
  { icon: Scissors, label: "Serviços", href: "/services" },
  { icon: DollarSign, label: "Financeiro", href: "/finance" },
  { icon: Users, label: "Clientes", href: "/clients" },
  { icon: Megaphone, label: "Marketing", href: "/marketing" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 border-r bg-sidebar h-screen flex flex-col fixed left-0 top-0 z-30 hidden md:flex shadow-xl shadow-primary/5">
      <div className="p-6 flex items-center gap-2 border-b border-sidebar-border/50">
        <Link href="/">
           <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground cursor-pointer">
            <Sparkles className="h-5 w-5" />
           </div>
        </Link>
        <Link href="/">
          <h1 className="text-2xl font-serif font-bold text-sidebar-foreground tracking-tight cursor-pointer">
            Belleza<span className="text-primary">Pro</span>
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
               <a className={cn(
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
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-400" />
            <div>
              <p className="text-sm font-medium">Salão Deluxe</p>
              <p className="text-xs text-muted-foreground">Plano Premium</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Desenvolvido por</p>
          <img src={andromedaLogo} alt="Andromeda Solutions" className="h-6 w-auto mix-blend-multiply dark:mix-blend-normal" />
        </div>
      </div>
    </aside>
  );
}
