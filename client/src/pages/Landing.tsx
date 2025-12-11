import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  Star, 
  Clock, 
  ShieldCheck,
  Sparkles,
  Menu,
  Zap,
  BarChart3,
  Smartphone,
  XCircle,
  Play,
  Lock,
  HelpCircle,
  Users,
  Coins,
  Phone,
  ChevronDown,
  HeartHandshake,
  Shield,
  Award,
  Timer,
  Gift,
  MessageCircle
} from "lucide-react";
import andromedaLogo from "@/assets/andromeda_logo_new.png";
import heroImage from "@assets/generated_images/premium_multi-device_mockup_of_salon_software_on_desktop_and_mobile_with_dark_tech_aesthetic.png";
import desktopScreen from "@assets/capture_251209_000149_1765250244701.png";
import mobileScreen from "@assets/capture_251209_001529_1765250246195.png";
import demoCapture from "@assets/capture_251209_000149_1765249335459.png";
import stylist1 from "@assets/generated_images/portrait_of_a_female_hair_stylist.png";
import stylist2 from "@assets/generated_images/portrait_of_a_male_hair_stylist.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { analytics } from "@/lib/analytics";

export default function Landing() {
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);

  useEffect(() => {
    const tooltipTimer = setTimeout(() => setShowWhatsAppTooltip(true), 5000);
    return () => clearTimeout(tooltipTimer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      analytics.navigateSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] font-sans selection:bg-cyan-500/30 text-slate-100">
      {/* Navigation - Premium Header */}
      <nav className="fixed w-full z-50 bg-[#0B0F19]/90 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-24 flex items-center justify-between">
          {/* Logo Left */}
          <div className="flex items-center gap-2 sm:gap-4 group cursor-pointer">
            <div className="relative h-9 w-9 sm:h-12 sm:w-12 rounded-xl overflow-hidden border border-white/10 p-1 bg-gradient-to-br from-slate-800 to-slate-950 group-hover:border-cyan-500/50 transition-all duration-500 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
               <img src={andromedaLogo} alt="Andromeda Solutions" className="h-full w-full object-contain relative z-10" />
               <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-bold tracking-tight text-white leading-none header-glow-text group-hover:text-cyan-50 transition-colors">
                ANDROMEDA
              </span>
              <span className="text-[8px] sm:text-[10px] font-medium text-cyan-400 tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                Solutions
              </span>
            </div>
          </div>

          {/* Menu Center */}
          <div className="hidden lg:flex items-center gap-1">
             {[
               { name: "Benefícios", icon: TrendingUp, id: "comparativo" },
               { name: "Recursos", icon: Zap, id: "recursos" },
               { name: "Antes e depois", icon: Sparkles, id: "transformacao" },
               { name: "Oferta", icon: Coins, id: "oferta" }
             ].map((item) => (
               <button 
                 key={item.name} 
                 onClick={() => scrollToSection(item.id)}
                 className="px-5 py-2.5 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center gap-2 group relative overflow-hidden"
               >
                 <item.icon className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors stroke-[1.5]" />
                 <span className="relative z-10">{item.name}</span>
                 <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
               </button>
             ))}
          </div>

          {/* CTA Right */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button 
                variant="ghost"
                className="h-12 px-6 rounded-full text-slate-300 hover:text-white hover:bg-white/10 font-medium transition-all duration-300"
                data-testid="button-login-header"
              >
                <Lock className="w-4 h-4 mr-2" />
                Acessar Painel
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button 
                onClick={() => analytics.clickCTA('header', 'Experimentar Agora')}
                className="h-12 px-8 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white font-semibold tracking-wide hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)] hover:scale-105 transition-all duration-300 border border-white/10 relative overflow-hidden group"
              >
                  <span className="relative z-10 flex items-center gap-2">
                    Experimentar Agora
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/dashboard">
              <Button 
                size="sm"
                className="h-9 px-4 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-semibold"
              >
                Testar
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-40 sm:pb-20 lg:pt-52 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700 fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/30 text-cyan-300 text-sm font-medium border border-cyan-500/20 backdrop-blur-sm">
                <Star className="h-3 w-3 fill-cyan-300" />
                Mais de 100 salões testaram nossa demo
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-sans font-bold leading-[1.1] text-white tracking-tight">
                Seu salão <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">lotado, organizado</span> e sem faltas — todos os dias.
              </h1>
              
              <p className="text-base sm:text-xl text-slate-400 leading-relaxed max-w-xl">
                Automatize agendamentos, confirme clientes pelo WhatsApp, reduza faltas e aumente faturamento usando uma plataforma inteligente feita para salões de beleza.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    onClick={() => analytics.clickCTA('hero', 'Testar demonstração agora')}
                    className="h-14 sm:h-16 px-6 sm:px-10 rounded-full text-base sm:text-lg shadow-2xl shadow-cyan-500/20 bg-white text-slate-950 hover:bg-cyan-50 hover:scale-105 transition-all duration-300 font-bold w-full sm:w-auto"
                  >
                    Testar demonstração agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="pt-6 flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Resultados em menos de 7 dias</span>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Shield className="h-4 w-4 text-cyan-500" />
                  <span>100% Seguro</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <HeartHandshake className="h-4 w-4 text-cyan-500" />
                  <span>Suporte Humanizado</span>
                </div>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-1000 fade-in delay-200">
              <div className="relative rounded-3xl overflow-visible aspect-[4/3] group">
                
                {/* Desktop Monitor Frame */}
                <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl shadow-cyan-900/40 border border-white/10 bg-slate-900 ring-1 ring-white/5 w-[90%] transform transition-transform duration-700 hover:scale-[1.01]">
                   {/* Top Bar (Browser/App bar) */}
                   <div className="h-6 bg-[#0B0F19] border-b border-white/5 flex items-center px-3 gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                   </div>
                   <img 
                     src={desktopScreen} 
                     alt="Dashboard Desktop" 
                     className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                   />
                </div>

                {/* Mobile Phone Frame */}
                <div className="absolute -bottom-4 -right-2 w-[30%] z-20 rounded-[2rem] border-[6px] border-[#1a1a1a] bg-slate-950 shadow-2xl shadow-black/60 overflow-hidden transform translate-y-8 translate-x-4 hover:-translate-y-2 transition-transform duration-500">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-[#1a1a1a] rounded-b-xl z-30" />
                  <img 
                    src={mobileScreen} 
                    alt="Dashboard Mobile" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                {/* Floating Cards - Repositioned */}
                <div className="absolute top-12 -right-4 z-30 bg-[#0B0F19]/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-cyan-500/30 animate-bounce duration-[3000ms]">
                   <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-green-900/50">
                       <TrendingUp className="h-6 w-6" />
                     </div>
                     <div>
                       <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Faturamento</p>
                       <p className="text-xl font-bold text-white">+ 35%</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-slate-500 uppercase tracking-wider">Descubra mais</span>
          <button 
            onClick={() => scrollToSection('comparativo')}
            className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* 2. Comparativo "Por que seu salão precisa disso agora" - MOVED HERE */}
      <section id="comparativo" className="py-20 bg-[#0D121F] border-y border-white/5">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Por que seu salão precisa disso agora?</h2>
            <p className="text-slate-400">A diferença entre sobreviver e crescer.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-0 max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/10">
            {/* Sem o sistema */}
            <div className="bg-slate-900/50 p-10 border-b md:border-b-0 md:border-r border-white/10">
              <h3 className="text-xl font-bold text-slate-400 mb-6 text-center">Sem o sistema</h3>
              <ul className="space-y-4">
                {[
                  "Faltas semanais",
                  "Profissionais ociosos",
                  "Clientes esquecendo horários",
                  "Sem controle real do caixa"
                ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-slate-500">
                    <XCircle className="h-5 w-5 text-slate-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Com o sistema */}
            <div className="bg-cyan-950/10 p-10 relative">
               <div className="absolute inset-0 bg-cyan-500/5" />
               <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Com Andromeda</h3>
                <ul className="space-y-4">
                  {[
                    "Rotina fluindo",
                    "Agenda cheia",
                    "Clientes mais fiéis",
                    "Mais faturamento"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Antes vs Depois Section */}
      <section id="transformacao" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">A transformação que seu salão precisa</h2>
            <p className="text-slate-400 text-lg">Veja a diferença real na sua rotina</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Antes */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Antes da Andromeda</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Bagunça na agenda",
                  "Clientes esquecendo horário",
                  "Mensagens manuais",
                  "Falta de controle de caixa",
                  "Profissionais perdendo horário"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-400">
                    <XCircle className="h-5 w-5 text-red-400/50 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Depois */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500/5 animate-pulse duration-[3000ms]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Com Andromeda</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Agenda organizada automaticamente",
                    "Confirmações automáticas via WhatsApp",
                    "Fila de espera inteligente",
                    "Lembretes de retorno",
                    "Gestão completa, simples e rápida"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white font-medium">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Demonstração Visual Rápida - NEW LAYOUT */}
      <section id="demo" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Veja acontecendo na prática</h2>
            <p className="text-slate-400">10 segundos para entender como sua vida vai mudar.</p>
          </div>

          <div className="max-w-5xl mx-auto relative group">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] -z-10 opacity-50" />
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 aspect-video bg-[#05080F]">
              <img 
                src={demoCapture} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" 
                alt="Andromeda Dashboard Demo"
              />
              
              {/* Overlay Button */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <Link href="/dashboard">
                   <Button size="lg" variant="outline" className="h-16 px-10 rounded-full text-lg border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300">
                     <Play className="mr-3 h-5 w-5 fill-current" />
                     Testar Demo
                   </Button>
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Benefícios do Sistema */}
      <section id="recursos" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Tudo que você precisa em um só lugar</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all hover:bg-white/10 group">
              <div className="h-12 w-12 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Automação via WhatsApp</h3>
              <p className="text-slate-400 text-sm">Confirmações e lembretes sem você tocar no celular.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all hover:bg-white/10 group">
              <div className="h-12 w-12 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Agenda Inteligente</h3>
              <p className="text-slate-400 text-sm">Organização visual e simples para toda a equipe.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all hover:bg-white/10 group">
              <div className="h-12 w-12 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Confirmação Automática</h3>
              <p className="text-slate-400 text-sm">O sistema garante que seu cliente venha.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all hover:bg-white/10 group">
              <div className="h-12 w-12 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Lista de Espera</h3>
              <p className="text-slate-400 text-sm">Preencha horários vagos automaticamente.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all hover:bg-white/10 group">
              <div className="h-12 w-12 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Ficha de Clientes</h3>
              <p className="text-slate-400 text-sm">Histórico completo e preferências de cada um.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all hover:bg-white/10 group">
              <div className="h-12 w-12 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Relatórios e Faturamento</h3>
              <p className="text-slate-400 text-sm">Controle total do caixa e comissões.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-12 px-4 sm:px-0">
             <Link href="/dashboard">
              <Button size="lg" className="rounded-full px-6 sm:px-8 bg-cyan-600 hover:bg-cyan-500 text-white font-bold w-full sm:w-auto">
                Ver demonstração funcionando
              </Button>
            </Link>
             <Link href="/dashboard">
              <Button size="lg" variant="outline" className="rounded-full px-6 sm:px-8 border-white/10 text-white hover:bg-white/5 w-full sm:w-auto">
                Testar agora
              </Button>
            </Link>
          </div>

          {/* Micro-CTA para Oferta */}
          <div className="mt-16 text-center">
            <button 
              onClick={() => scrollToSection('oferta')}
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <Gift className="h-4 w-4" />
              <span className="text-sm font-medium">Ver oferta especial por tempo limitado</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Prova Social Forte */}
      <section id="depoimentos" className="py-20 bg-[#0D121F] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
             <TestimonialCard 
              image={stylist1}
              name="Mariana Souza"
              salon="Estúdio Beleza Aurora (Demo)"
              text="Meu salão reduziu faltas e dobrou a organização em apenas 2 semanas."
            />
            <TestimonialCard 
              image={stylist2}
              name="Carlos Ferreira"
              salon="Barber Shop Elite (Demo)"
              text="A fila de espera automática me salvou. Nunca mais perdi cliente por horário vago."
            />
            <TestimonialCard 
              image="https://i.pravatar.cc/150?img=32"
              name="Ana Clara"
              salon="Spa & Beauty (Demo)"
              text="Simplesmente funciona. O financeiro bate certinho e os clientes adoram o WhatsApp."
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-8">
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">-35%</h3>
              <p className="text-slate-400 mt-2">de faltas no primeiro mês</p>
            </div>
             <div className="w-px h-16 bg-white/10 hidden md:block" />
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">2x</h3>
              <p className="text-slate-400 mt-2">mais organização</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Diferenciais da Marca */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
           <div className="inline-block p-1 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl mb-8">
             <div className="h-16 w-16 mx-auto rounded-xl bg-slate-950 p-3">
               <img src={andromedaLogo} alt="Andromeda" className="w-full h-full object-contain" />
             </div>
           </div>
           
           <h3 className="text-lg font-medium text-cyan-400 uppercase tracking-widest mb-4">Andromeda Solutions</h3>
           <h2 className="text-3xl font-bold text-white mb-6">Tecnologia desenvolvida para o futuro</h2>
           <p className="text-slate-400 max-w-2xl mx-auto">
             Plataforma moderna, rápida, segura e feita para escalar o seu negócio. Não somos apenas um software, somos o parceiro tecnológico do seu salão.
           </p>
        </div>
      </section>

      {/* NOVA SEÇÃO: Fale Conosco - Criar Confiança */}
      <section id="contato" className="py-20 bg-[#0B0F19]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-sm font-medium border border-green-500/20 mb-6">
              <HeartHandshake className="h-4 w-4" />
              Atendimento Humanizado
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Quer conversar antes de testar?
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Fale diretamente com nossa equipe pelo WhatsApp. Tiramos todas as suas dúvidas sem compromisso.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-green-500/30 transition-all">
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Resposta Rápida</h3>
                <p className="text-slate-400 text-sm">Respondemos em até 5 minutos durante horário comercial</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-green-500/30 transition-all">
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <HeartHandshake className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Sem Robôs</h3>
                <p className="text-slate-400 text-sm">Você fala com pessoas reais que entendem seu negócio</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-green-500/30 transition-all">
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Sem Pressão</h3>
                <p className="text-slate-400 text-sm">Tire suas dúvidas sem nenhum compromisso de compra</p>
              </div>
            </div>

            <a 
              href="https://wa.me/5511999999999?text=Oi!%20Vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20o%20sistema." 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => analytics.clickWhatsApp()}
            >
              <Button size="lg" className="h-14 px-10 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg shadow-green-900/30 hover:scale-105 transition-all">
                <Phone className="h-5 w-5 mr-2" />
                Conversar no WhatsApp
              </Button>
            </a>
            
            <p className="text-slate-500 text-sm mt-4">
              Ou continue rolando para ver nossa oferta especial 👇
            </p>
          </div>
        </div>
      </section>

      {/* 8. Oferta Imediata & 9. Garantia */}
      <section id="oferta" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] to-cyan-950/20 z-0" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-12 shadow-2xl shadow-cyan-900/20">
            
            {/* Urgência Visual - Sem Timer Fake */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white text-sm font-bold border border-cyan-500/30">
                <Gift className="h-4 w-4 text-cyan-400" />
                OFERTA ESPECIAL DE LANÇAMENTO
              </div>
            </div>

            {/* Benefícios da Oferta */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-300 text-sm border border-emerald-500/20">
                <CheckCircle2 className="h-4 w-4" />
                Acesso completo
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-300 text-sm border border-blue-500/20">
                <HeartHandshake className="h-4 w-4" />
                Suporte incluso
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-300 text-sm border border-purple-500/20">
                <Zap className="h-4 w-4" />
                Início imediato
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Comece agora sem pagar nada
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Demo gratuita disponível. Sem cartão de crédito. Sem compromisso.
            </p>
            
            <div className="mb-8 p-4 rounded-xl bg-cyan-900/20 border border-cyan-500/20 max-w-xl mx-auto">
               <div className="flex items-center gap-3 justify-center mb-2">
                 <Zap className="h-5 w-5 text-yellow-400" />
                 <span className="text-white font-bold">Acesso Imediato + Suporte 24/7</span>
               </div>
               <p className="text-sm text-slate-400">
                 Faça o pagamento hoje e ganhe acesso automático com todo suporte para a implementação no seu negócio.
               </p>
            </div>

            <Link href="/dashboard">
              <Button 
                size="lg" 
                onClick={() => analytics.clickCTA('oferta', 'Quero testar gratuitamente')}
                className="w-full md:w-auto h-16 px-12 rounded-full text-xl bg-white text-slate-950 hover:bg-cyan-50 shadow-lg hover:scale-105 transition-all font-bold mb-6 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  Quero testar gratuitamente
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </Link>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Lock className="h-4 w-4 text-green-400" />
                <span>Teste seguro</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Dados protegidos</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Award className="h-4 w-4 text-green-400" />
                <span>Cancele quando quiser</span>
              </div>
            </div>

            <p className="text-slate-500 text-sm">
              Prefere tirar dúvidas primeiro? <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">Fale conosco no WhatsApp</a>
            </p>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="py-24 bg-[#0D121F] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Perguntas Frequentes</h2>
            <p className="text-slate-400">Tire suas dúvidas e comece hoje mesmo.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "Isso serve para qualquer salão?", a: "Sim! Atendemos desde estúdios individuais até grandes redes de franquias. O sistema é modular e se adapta ao seu tamanho." },
              { q: "Preciso instalar algo?", a: "Não. A Andromeda é 100% online. Você acessa pelo navegador do celular, tablet ou computador." },
              { q: "Funciona no WhatsApp normal?", a: "Sim, integramos diretamente com seu WhatsApp para enviar confirmações e lembretes." },
              { q: "Demora para configurar?", a: "Em menos de 10 minutos você já pode começar a agendar. Nossa equipe também ajuda na importação de dados." },
              { q: "Eu posso testar grátis?", a: "Sim! Oferecemos um período de teste gratuito completo para você ver o impacto no seu negócio sem risco algum." }
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-white/5 bg-white/5 rounded-xl px-4 data-[state=open]:border-cyan-500/30 transition-all">
                <AccordionTrigger className="text-white hover:text-cyan-400 text-left py-4 hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* WhatsApp Floating CTA with Tooltip */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Tooltip */}
        <div 
          className={`absolute bottom-full right-0 mb-3 transition-all duration-500 ${showWhatsAppTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
        >
          <div className="bg-white rounded-2xl shadow-xl p-4 max-w-[220px] relative">
            <button 
              onClick={() => setShowWhatsAppTooltip(false)}
              className="absolute -top-2 -right-2 h-6 w-6 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-300 text-xs"
            >
              ✕
            </button>
            <p className="text-slate-800 text-sm font-medium mb-1">👋 Oi! Posso ajudar?</p>
            <p className="text-slate-500 text-xs">Tire suas dúvidas sem compromisso</p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 shadow-lg" />
          </div>
        </div>

        <a 
          href="https://wa.me/5511999999999?text=Oi!%20Vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20o%20sistema." 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => analytics.clickWhatsApp()}
          className="block"
        >
          <Button className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg shadow-green-900/30 flex items-center justify-center hover:scale-110 transition-transform">
            <Phone className="h-6 w-6 text-white fill-current" />
          </Button>
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full" />
        </a>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-[#05080F] border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
             <div className="h-10 w-10 rounded-lg overflow-hidden border border-white/10 p-1 bg-slate-900">
              <img src={andromedaLogo} alt="Logo" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white leading-none">ANDROMEDA</span>
              <span className="text-[10px] text-cyan-400 tracking-[0.2em] uppercase">Solutions</span>
            </div>
          </div>
          
          <div className="text-center md:text-right">
             <p className="text-slate-500 text-sm mb-2">
               Tecnologia desenvolvida para o futuro da beleza.
             </p>
             <p className="text-slate-600 text-xs">
               © 2024 Andromeda Solutions. Todos os direitos reservados.
             </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Instagram</a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">LinkedIn</a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TestimonialCard({ image, name, salon, text }: any) {
  return (
    <div className="bg-white/5 p-4 sm:p-8 rounded-2xl shadow-none border border-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Avatar className="h-10 w-10 sm:h-14 sm:w-14 border-2 border-cyan-500/20 group-hover:border-cyan-500 transition-colors flex-shrink-0">
          <AvatarImage src={image} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-bold text-base sm:text-lg text-white truncate">{name}</p>
          <p className="text-xs sm:text-sm text-cyan-400 font-medium truncate">{salon}</p>
        </div>
      </div>
      <div className="flex gap-1 text-cyan-500 mb-3 sm:mb-4 opacity-80">
        {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />)}
      </div>
      <p className="text-slate-300 leading-relaxed italic text-sm sm:text-base">"{text}"</p>
    </div>
  );
}
