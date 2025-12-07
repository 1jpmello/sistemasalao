import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Star, 
  Clock, 
  Phone, 
  Instagram, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import stylist1 from "@assets/generated_images/portrait_of_a_female_hair_stylist.png";

export default function MiniSite() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans max-w-md mx-auto shadow-2xl overflow-hidden border-x border-slate-200">
      {/* Header Image Area */}
      <div className="relative h-48 bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop" 
          alt="Salon Cover" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1">
           <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
           Aberto Agora
        </div>
      </div>

      {/* Salon Info Card - Floating */}
      <div className="relative px-6 -mt-12 mb-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
             <div className="h-20 w-20 rounded-2xl bg-black border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                <Sparkles className="h-10 w-10 text-primary" />
             </div>
          </div>
          
          <div className="mt-8 space-y-1">
            <h1 className="font-serif font-bold text-2xl text-gray-900">Salão Deluxe</h1>
            <p className="text-sm text-gray-500">Beleza & Bem-estar</p>
          </div>

          <div className="flex items-center justify-center gap-1 mt-3 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <span className="text-xs text-gray-400 font-medium ml-1">(450 avaliações)</span>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Button size="sm" className="rounded-full bg-green-500 hover:bg-green-600 text-white gap-2 flex-1">
              <Phone className="h-4 w-4" />
              WhatsApp
            </Button>
             <Button size="sm" variant="outline" className="rounded-full gap-2 flex-1">
              <Instagram className="h-4 w-4" />
              Insta
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="px-6 mb-8 space-y-3">
        <div className="flex items-start gap-3 text-sm text-gray-600 bg-white p-3 rounded-xl border border-gray-100">
          <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p>Rua das Flores, 123 - Jardins, São Paulo</p>
        </div>
        <div className="flex items-start gap-3 text-sm text-gray-600 bg-white p-3 rounded-xl border border-gray-100">
          <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p>Seg a Sáb: 09h às 19h</p>
        </div>
      </div>

      {/* Services */}
      <div className="px-6 mb-20">
        <h2 className="font-bold text-lg mb-4">Nossos Serviços</h2>
        <div className="space-y-4">
          {[
            { name: "Corte & Escova", price: "R$ 120", time: "60 min", img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=150&q=80" },
            { name: "Manicure Gel", price: "R$ 85", time: "90 min", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=150&q=80" },
            { name: "Hidratação", price: "R$ 150", time: "45 min", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=150&q=80" },
          ].map((s, i) => (
            <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 active:scale-95 transition-transform cursor-pointer">
              <div className="h-16 w-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                <img src={s.img} alt={s.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{s.name}</h3>
                <p className="text-xs text-gray-500">{s.time}</p>
                <p className="font-bold text-primary mt-1">{s.price}</p>
              </div>
              <Button size="icon" className="h-8 w-8 rounded-full bg-gray-900 text-white">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t p-4 pb-8 z-20">
        <Button className="w-full h-12 rounded-full text-lg shadow-xl shadow-primary/20 animate-pulse">
          Agendar Horário
        </Button>
        <p className="text-[10px] text-center text-gray-400 mt-2">
          Powered by Andromeda Solutions
        </p>
      </div>
    </div>
  );
}
