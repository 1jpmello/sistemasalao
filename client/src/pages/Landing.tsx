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
  Menu
} from "lucide-react";
import salonLogo from "@assets/ef8f913501c4d7f06c503a056efcd95e_1765133100746.jpg";
import heroImage from "@assets/generated_images/modern_beauty_salon_reception_with_tablet.png";
import stylist1 from "@assets/generated_images/portrait_of_a_female_hair_stylist.png";
import stylist2 from "@assets/generated_images/portrait_of_a_male_hair_stylist.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden shadow-lg shadow-primary/20 border-2 border-primary/10">
               <img src={salonLogo} alt="Logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight">
              GestãoBelleza
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#funcionalidades" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Funcionalidades</a>
            <a href="#depoimentos" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Depoimentos</a>
            <Link href="/dashboard">
              <Button className="rounded-full px-6 bg-foreground text-background hover:bg-foreground/90">
                Acessar Sistema
              </Button>
            </Link>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700 fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                A revolução que seu salão esperava
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-[1.1] text-foreground">
                Domine a gestão do seu salão e <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">multiplique seus lucros</span>.
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Diga adeus às planilhas e agendas de papel. Tenha controle total, fidelize clientes e veja seu negócio crescer com a plataforma feita para quem ama beleza e organização.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/dashboard">
                  <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-xl shadow-primary/25 bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300">
                    Começar Teste Grátis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg border-2 hover:bg-muted/50">
                  Ver Funcionalidades
                </Button>
              </div>

              <div className="pt-8 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <p>Usado por +500 salões no Brasil</p>
                </div>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-1000 fade-in delay-200">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50 ring-1 ring-black/5 aspect-[4/3] rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={heroImage} 
                  alt="Dashboard Preview" 
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Cards */}
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-white/50 animate-bounce duration-[3000ms]">
                   <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                       <TrendingUp className="h-6 w-6" />
                     </div>
                     <div>
                       <p className="text-xs text-muted-foreground font-medium">Faturamento Hoje</p>
                       <p className="text-lg font-bold text-foreground">R$ 2.450,00</p>
                     </div>
                   </div>
                </div>

                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-white/50">
                   <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                       <Calendar className="h-6 w-6" />
                     </div>
                     <div>
                       <p className="text-xs text-muted-foreground font-medium">Próximo Agendamento</p>
                       <p className="text-sm font-bold text-foreground">Ana Julia - Corte (15:00)</p>
                     </div>
                   </div>
                </div>
              </div>
              
              {/* Decorative Blur */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-600 opacity-20 blur-3xl -z-10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
             <div className="space-y-2">
               <h3 className="text-5xl font-serif font-bold text-primary">+30%</h3>
               <p className="text-lg font-medium text-foreground">Faturamento no 1º mês</p>
               <p className="text-sm text-muted-foreground">Média dos nossos clientes</p>
             </div>
             <div className="space-y-2">
               <h3 className="text-5xl font-serif font-bold text-purple-600">-40%</h3>
               <p className="text-lg font-medium text-foreground">Redução de Faltas</p>
               <p className="text-sm text-muted-foreground">Com lembretes automáticos</p>
             </div>
             <div className="space-y-2">
               <h3 className="text-5xl font-serif font-bold text-emerald-600">100%</h3>
               <p className="text-lg font-medium text-foreground">Controle Financeiro</p>
               <p className="text-sm text-muted-foreground">Sem planilhas complicadas</p>
             </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="funcionalidades" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-serif font-bold mb-6">Como o GestãoBelleza revoluciona seu salão</h2>
            <p className="text-xl text-muted-foreground">
              Simplificamos tudo para que você tenha mais tempo para brilhar. Tecnologia de ponta, fácil de usar.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />
            
            {[
              { 
                icon: Calendar, 
                title: "1. Agendamento", 
                desc: "Cliente agenda online ou você cadastra em segundos." 
              },
              { 
                icon: MessageSquare, 
                title: "2. Confirmação", 
                desc: "Robô envia lembrete automático via WhatsApp." 
              },
              { 
                icon: Sparkles, 
                title: "3. Atendimento", 
                desc: "Profissional recebe ficha completa e histórico." 
              },
              { 
                icon: TrendingUp, 
                title: "4. Fidelização", 
                desc: "Sistema convida cliente para voltar em 30 dias." 
              }
            ].map((step, i) => (
              <div key={i} className="relative bg-background pt-4 text-center group">
                 <div className="h-16 w-16 mx-auto bg-white border-2 border-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                   <step.icon className="h-8 w-8" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                 <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-24 bg-sidebar">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">Quem usa, ama ❤️</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              image={stylist1}
              name="Carla Mendes"
              salon="Studio Glow"
              text="Eu perdia horas no WhatsApp confirmando clientes. O GestãoBelleza mudou minha vida, agora é tudo automático!"
            />
            <TestimonialCard 
              image={stylist2}
              name="Roberto Silva"
              salon="Barber King"
              text="O controle financeiro é impecável. Sei exatamente quanto cada barbeiro produziu no dia. Profissionalizou meu negócio."
            />
            <TestimonialCard 
              image="https://i.pravatar.cc/150?img=32"
              name="Juliana Costa"
              salon="Esmalteria Chic"
              text="A fila de espera virtual organizou meu salão. As clientes amam ver o status pelo celular."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
            Pronto para o próximo nível?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto">
            Experimente a plataforma que está digitalizando os melhores salões do país. Sem cartão de crédito.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="h-16 px-10 rounded-full text-xl bg-white text-primary hover:bg-white/90 shadow-2xl hover:scale-105 transition-all">
              Começar Demonstração Grátis
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
          <p className="mt-6 text-sm opacity-60">
            <ShieldCheck className="inline h-4 w-4 mr-1" />
            Dados seguros e criptografados
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-full overflow-hidden border border-primary/20">
              <img src={salonLogo} alt="Logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-xl font-serif font-bold">GestãoBelleza</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Desenvolvido por</p>
            <span className="text-sm font-bold text-gray-700">Andromeda Solutions</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 GestãoBelleza. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground">Instagram</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">LinkedIn</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TestimonialCard({ image, name, salon, text }: any) {
  return (
    <div className="bg-background p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-14 w-14 border-2 border-primary/20">
          <AvatarImage src={image} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-lg">{name}</p>
          <p className="text-sm text-primary font-medium">{salon}</p>
        </div>
      </div>
      <div className="flex gap-1 text-amber-500 mb-4">
        {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
      </div>
      <p className="text-muted-foreground leading-relaxed italic">"{text}"</p>
    </div>
  );
}
