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
  HeadphonesIcon,
  Home
} from "lucide-react";
import andromedaLogo from "@/assets/andromeda_logo.png";
import { useAuth } from "@/context/AuthContext";

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
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  return (
    <aside className={cn("w-64 border-r border-slate-200 h-screen flex flex-col bg-gradient-to-b from-white to-slate-50", className)}>
      <div className="p-6 flex items-center gap-3 border-b border-slate-100 bg-white">
        <Link href="/app">
           <div className="h-10 w-10 rounded-lg overflow-hidden border border-slate-200 p-1 bg-gradient-to-br from-slate-100 to-white cursor-pointer hover:scale-105 transition-transform shadow-sm">
            <img src={andromedaLogo} alt="Logo" className="h-full w-full object-contain" />
           </div>
        </Link>
        <Link href="/app">
          <div className="flex flex-col cursor-pointer">
             <span className="text-lg font-bold text-slate-900 leading-none tracking-tight">ANDROMEDA</span>
             <span className="text-[10px] text-cyan-600 font-bold uppercase tracking-[0.2em]">Solutions</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar bg-gradient-to-b from-white to-slate-50/50">
        <div className="mb-4 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          Gestão
        </div>
        {menuItems.map((item) => {
          const isActive = location === item.href || (item.href === "/app" && location === "/app");
          return (
            <Link 
              key={item.href} 
              href={item.href}
              id={item.id}
              data-testid={item.id}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer",
                isActive
                  ? "bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 shadow-sm border border-cyan-100"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  isActive ? "text-cyan-600" : "text-slate-400 group-hover:text-slate-600"
                )}
              />
              {item.label}
            </Link>
          );
        })}

        <div className="mt-8 mb-4 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          Sistema
        </div>
        
        <Link 
          href="/app/mini-site"
          data-testid="nav-minisite"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer"
        >
          <Smartphone className="h-4 w-4 text-slate-400" />
          Mini Site
        </Link>

        <Link 
          href="/app/configuracoes"
          data-testid="nav-settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer"
        >
          <Settings className="h-4 w-4 text-slate-400" />
          Configurações
        </Link>

        <Link 
          href="/app/suporte"
          data-testid="nav-support"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer"
        >
          <HeadphonesIcon className="h-4 w-4 text-slate-400" />
          Suporte
        </Link>

        <Link 
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer"
        >
          <Home className="h-4 w-4 text-slate-400" />
          Voltar ao Site
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-4 bg-slate-50">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-full overflow-hidden bg-cyan-50 flex items-center justify-center border border-cyan-100">
              <Users className="h-4 w-4 text-cyan-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{user?.salonName || "Seu Salão"}</p>
              <p className="text-xs text-cyan-600 font-medium">Plano Profissional</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          data-testid="button-sidebar-logout"
          className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
