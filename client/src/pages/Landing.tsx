import { Link } from "wouter";
import { Button } from "@/components/ui/button";
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
  Smartphone
} from "lucide-react";
import andromedaLogo from "@/assets/andromeda_logo.png";
import heroImage from "@assets/generated_images/modern_beauty_salon_reception_with_tablet.png";
import stylist1 from "@assets/generated_images/portrait_of_a_female_hair_stylist.png";
import stylist2 from "@assets/generated_images/portrait_of_a_male_hair_stylist.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0B0F19] font-sans selection:bg-cyan-500/30 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl overflow-hidden shadow-lg shadow-cyan-500/20 border border-white/10 p-1 bg-gradient-to-br from-slate-800 to-slate-950">
               <img src={andromedaLogo} alt="Andromeda Solutions" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white leading-none">
                ANDROMEDA
              </span>
              <span className="text-xs font-medium text-cyan-400 tracking-[0.2em] uppercase">
                Solutions
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#funcionalidades" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Soluções</a>
            <a href="#depoimentos" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Cases de Sucesso</a>
            <Link href="/dashboard">
              <Button className="rounded-full px-8 bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 border-none shadow-lg shadow-cyan-900/20 transition-all hover:scale-105">
                Acessar Plataforma
              </Button>
            </Link>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700 fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/30 text-cyan-300 text-sm font-medium border border-cyan-500/20 backdrop-blur-sm">
                <Zap className="h-3 w-3 fill-cyan-300" />
                Tecnologia de ponta para salões de beleza
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-sans font-bold leading-[1.1] text-white tracking-tight">
                O futuro da gestão <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                  está na sua mão.
                </span>
              </h1>
              
              <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                A <strong>Andromeda Solutions</strong> traz a inteligência que faltava para o seu negócio de beleza. Automatize, fidelize e lucre mais com nossa plataforma premium.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/dashboard">
                  <Button size="lg" className="h-16 px-10 rounded-full text-lg shadow-2xl shadow-cyan-500/20 bg-white text-slate-950 hover:bg-cyan-50 hover:scale-105 transition-all duration-300 font-bold">
                    Começar Agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-16 px-8 rounded-full text-lg border-white/10 text-white hover:bg-white/5 hover:border-white/20 backdrop-blur-sm">
                  Conhecer a Tecnologia
                </Button>
              </div>

              <div className="pt-8 flex items-center gap-6 text-sm text-slate-400 border-t border-white/5 mt-8">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-cyan-400" />
                  <span>Dados Criptografados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  <span>IA Integrada</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-blue-400" />
                  <span>App Mobile</span>
                </div>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-1000 fade-in delay-200">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cyan-900/20 border border-white/10 bg-slate-900/50 backdrop-blur-xl aspect-[4/3] group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <img 
                  src={heroImage} 
                  alt="Dashboard Preview" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 scale-105 group-hover:scale-100"
                />
                
                {/* Tech Overlay Lines */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />

                {/* Floating Cards - Tech Style */}
                <div className="absolute top-8 right-8 bg-[#0B0F19]/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-cyan-500/30 animate-bounce duration-[3000ms]">
                   <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-green-900/50">
                       <TrendingUp className="h-6 w-6" />
                     </div>
                     <div>
                       <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Faturamento Hoje</p>
                       <p className="text-xl font-bold text-white">R$ 2.450,00</p>
                     </div>
                   </div>
                </div>

                <div className="absolute bottom-8 left-8 bg-[#0B0F19]/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-purple-500/30">
                   <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-900/50">
                       <Calendar className="h-6 w-6" />
                     </div>
                     <div>
                       <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Próximo Cliente</p>
                       <p className="text-sm font-bold text-white">Ana Julia - Corte (15:00)</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Tech Style */}
      <section className="py-20 border-y border-white/5 bg-[#0D121F]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
             <div className="space-y-2 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors duration-300">
               <h3 className="text-5xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">+30%</h3>
               <p className="text-lg font-medium text-white">Faturamento</p>
               <p className="text-sm text-slate-400">Crescimento médio no 1º mês</p>
             </div>
             <div className="space-y-2 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors duration-300">
               <h3 className="text-5xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">-40%</h3>
               <p className="text-lg font-medium text-white">Faltas</p>
               <p className="text-sm text-slate-400">Com IA de confirmação</p>
             </div>
             <div className="space-y-2 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors duration-300">
               <h3 className="text-5xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">100%</h3>
               <p className="text-lg font-medium text-white">Controle</p>
               <p className="text-sm text-slate-400">Financeiro automatizado</p>
             </div>
          </div>
        </div>
      </section>

      {/* How it Works - Dark Mode */}
      <section id="funcionalidades" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px] -z-10" />
        
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-cyan-400 font-bold tracking-wider text-sm uppercase mb-4 block">Ecossistema Andromeda</span>
            <h2 className="text-4xl lg:text-5xl font-sans font-bold mb-6 text-white">Tecnologia que transforma</h2>
            <p className="text-xl text-slate-400">
              Simplificamos a complexidade da gestão com soluções elegantes e poderosas.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -z-10" />
            
            {[
              { 
                icon: Calendar, 
                title: "Smart Booking", 
                desc: "Agendamento inteligente que maximiza sua ocupação." 
              },
              { 
                icon: MessageSquare, 
                title: "Auto Confirm", 
                desc: "IA que conversa e confirma com seus clientes." 
              },
              { 
                icon: BarChart3, 
                title: "Business Intel", 
                desc: "Dashboards dignos de grandes empresas." 
              },
              { 
                icon: Smartphone, 
                title: "Mobile First", 
                desc: "Gestão completa na palma da sua mão." 
              }
            ].map((step, i) => (
              <div key={i} className="relative pt-4 text-center group">
                 <div className="h-20 w-20 mx-auto bg-[#0B0F19] border border-cyan-500/30 rounded-2xl flex items-center justify-center text-cyan-400 shadow-[0_0_30px_-10px_rgba(34,211,238,0.3)] mb-6 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300">
                   <step.icon className="h-8 w-8" />
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                 <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Tech Card Style */}
      <section id="depoimentos" className="py-24 bg-[#0D121F] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-sans font-bold mb-6 text-white">Parceiros Andromeda</h2>
            <p className="text-slate-400">Quem usa nossa tecnologia para liderar o mercado.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              image={stylist1}
              name="Carla Mendes"
              salon="Studio Glow"
              text="A Andromeda trouxe uma visão de tecnologia que eu nunca vi no mercado de beleza. É outro nível."
            />
            <TestimonialCard 
              image={stylist2}
              name="Roberto Silva"
              salon="Barber King"
              text="O financeiro bate centavo por centavo. A automação de mensagens é surreal de boa."
            />
            <TestimonialCard 
              image="https://i.pravatar.cc/150?img=32"
              name="Juliana Costa"
              salon="Esmalteria Chic"
              text="Minha equipe se adaptou super rápido. Interface limpa, moderna e muito rápida."
            />
          </div>
        </div>
      </section>

      {/* Final CTA - Andromeda Branding */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-[#0B0F19] z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-6 p-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600">
             <div className="bg-[#0B0F19] rounded-full px-6 py-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold tracking-wider text-sm uppercase">
                  Oferta de Lançamento
                </span>
             </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-sans font-bold mb-8 text-white tracking-tight">
            Eleve o padrão do seu negócio.
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Junte-se à elite dos salões que usam Andromeda Solutions. Teste grátis e sinta a diferença.
          </p>
          
          <Link href="/dashboard">
            <Button size="lg" className="h-20 px-12 rounded-full text-xl bg-white text-slate-950 hover:bg-cyan-50 shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)] hover:scale-105 transition-all font-bold">
              Iniciar Demonstração
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
          
          <div className="mt-12 flex items-center justify-center gap-8 opacity-60">
             <div className="flex items-center gap-2">
               <ShieldCheck className="h-5 w-5 text-cyan-400" />
               <span className="text-sm text-slate-400">Segurança Enterprise</span>
             </div>
             <div className="flex items-center gap-2">
               <Zap className="h-5 w-5 text-yellow-400" />
               <span className="text-sm text-slate-400">Setup Instantâneo</span>
             </div>
          </div>
        </div>
      </section>

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
    <div className="bg-white/5 p-8 rounded-2xl shadow-none border border-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-14 w-14 border-2 border-cyan-500/20 group-hover:border-cyan-500 transition-colors">
          <AvatarImage src={image} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-lg text-white">{name}</p>
          <p className="text-sm text-cyan-400 font-medium">{salon}</p>
        </div>
      </div>
      <div className="flex gap-1 text-cyan-500 mb-4 opacity-80">
        {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
      </div>
      <p className="text-slate-300 leading-relaxed italic">"{text}"</p>
    </div>
  );
}
