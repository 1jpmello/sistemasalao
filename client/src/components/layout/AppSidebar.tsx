import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Scissors,
  GitPullRequest,
  Megaphone,
  Settings,
  LogOut,
  DollarSign,
  Smartphone,
  HeadphonesIcon
} from "lucide-react";
import andromedaLogo from "@/assets/andromeda_logo.png";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/app", id: "nav-dashboard" },
  { icon: Calendar, label: "Agenda", href: "/app/agenda", id: "nav-agenda" },
  { icon: GitPullRequest, label: "Fluxo", href: "/app/fila", id: "nav-queue" },
  { icon: Users, label: "Profissionais", href: "/app/equipe", id: "nav-team" },
  { icon: Scissors, label: "Serviços", href: "/app/servicos", id: "nav-services" },
  { icon: DollarSign, label: "Financeiro", href: "/app/financeiro", id: "nav-finance" },
  { icon: Users, label: "Clientes", href: "/app/clientes", id: "nav-clients" },
  { icon: Megaphone, label: "Marketing", href: "/app/marketing", id: "nav-marketing" },
];

export function AppSidebar({ className }: { className?: string }) {
  const [location] = useLocation();

  return (
    <aside className={cn("w-64 border-r bg-sidebar h-screen flex flex-col bg-[#0B0F19]", className)}>
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border/50 bg-[#0B0F19]">
        <Link href="/app">
           <div className="h-10 w-10 rounded-lg overflow-hidden border border-white/10 p-1 bg-gradient-to-br from-slate-800 to-slate-950 cursor-pointer hover:scale-105 transition-transform">
            <img src={andromedaLogo} alt="Logo" className="h-full w-full object-contain" />
           </div>
        </Link>
        <Link href="/app">
          <div className="flex flex-col cursor-pointer">
             <span className="text-lg font-bold text-white leading-none tracking-tight">ANDROMEDA</span>
             <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.2em]">Solutions</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar">
        <div className="mb-4 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          Gestão
        </div>
        {menuItems.map((item) => {
          const isActive = location === item.href || (item.href === "/app" && location === "/app");
          return (
            <Link key={item.href} href={item.href}>
               <a 
                 id={item.id}
                 data-testid={item.id}
                 className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer",
                  isActive
                    ? "bg-cyan-500/10 text-white shadow-md shadow-slate-900/10"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}>
                <item.icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-cyan-400"
                  )}
                />
                {item.label}
              </a>
            </Link>
          );
        })}

        <div className="mt-8 mb-4 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          Sistema
        </div>
        
        <Link href="/app/mini-site">
           <a 
             data-testid="nav-minisite"
             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
           >
            <Smartphone className="h-4 w-4 text-slate-500" />
            Mini Site
          </a>
        </Link>

        <Link href="/app/configuracoes">
           <a 
             data-testid="nav-settings"
             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
           >
            <Settings className="h-4 w-4 text-slate-500" />
            Configurações
          </a>
        </Link>

        <Link href="/app/suporte">
           <a 
             data-testid="nav-support"
             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
           >
            <HeadphonesIcon className="h-4 w-4 text-slate-500" />
            Suporte
          </a>
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4 bg-[#0B0F19]">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-full overflow-hidden bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Users className="h-4 w-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Seu Salão</p>
              <p className="text-xs text-cyan-400">Plano Profissional</p>
            </div>
          </div>
        </div>
        
        <button 
          data-testid="button-logout"
          className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
