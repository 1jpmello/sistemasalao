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
  HelpCircle,
  HeadphonesIcon,
  Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import andromedaLogo from "@/assets/andromeda_logo.png";
import { useTour } from "@/context/TourContext";
import { useState } from "react";
import { PremiumModal } from "@/components/ui/premium-modal";

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
  const [supportModal, setSupportModal] = useState(false);

  return (
    <aside className="w-64 border-r bg-sidebar h-screen flex flex-col fixed left-0 top-0 z-30 hidden md:flex shadow-xl shadow-slate-200/50">
      <PremiumModal
        open={supportModal}
        onOpenChange={setSupportModal}
        title="Suporte Premium disponível para clientes"
        body="Tenha atendimento rápido, ajustes e personalizações."
        checklist={[
          "🚀 Atendimento prioritário",
          "🎨 Personalizações no sistema",
          "📞 Contato direto via WhatsApp"
        ]}
        cta="Quero suporte premium"
      />

      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border/50 bg-[#0B0F19]">
        <Link href="/">
           <div className="h-10 w-10 rounded-lg overflow-hidden border border-white/10 p-1 bg-gradient-to-br from-slate-800 to-slate-950 cursor-pointer hover:scale-105 transition-transform">
            <img src={andromedaLogo} alt="Logo" className="h-full w-full object-contain" />
           </div>
        </Link>
        <Link href="/">
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
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
               <a 
                 id={item.id}
                 className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer",
                  isActive
                    ? "bg-[#0B0F19] text-white shadow-md shadow-slate-900/10"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}>
                <item.icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-600"
                  )}
                />
                {item.label}
              </a>
            </Link>
          );
        })}

        <div className="mt-8 mb-4 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          Suporte & Ajuda
        </div>
        
        <button 
          onClick={openWelcome}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer w-full text-left"
        >
          <HelpCircle className="h-4 w-4 text-slate-400" />
          Guia de Uso
        </button>

        <button 
          onClick={() => setSupportModal(true)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer w-full text-left"
        >
          <Crown className="h-4 w-4 text-amber-500" />
          Suporte VIP
        </button>
        
        <Link href="/settings">
           <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer">
            <Settings className="h-4 w-4 text-slate-400" />
            Configurações
          </a>
        </Link>
        <Link href="/">
           <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer">
            <Home className="h-4 w-4 text-slate-400" />
            Voltar ao Site
          </a>
        </Link>
      </nav>

      <div className="p-4 border-t border-sidebar-border/50 space-y-4 bg-slate-50">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200">
              <Users className="h-4 w-4 text-slate-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Seu Salão</p>
              <p className="text-xs text-muted-foreground">Versão Demo</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Fale Conosco</p>
          <div className="flex items-center gap-2">
             <span className="text-xs font-bold text-slate-700 bg-slate-200 px-2 py-1 rounded">11 95854-8349</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
