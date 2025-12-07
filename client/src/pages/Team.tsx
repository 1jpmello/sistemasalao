import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staff } from "@/lib/mockData";
import { Star, Clock, MoreHorizontal, Calendar as CalendarIcon, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { PremiumModal } from "@/components/ui/premium-modal";
import { AiFooterDisclaimer, AiImageTooltip } from "@/components/ui/ai-disclaimer";

export default function Team() {
  const [showAgenda, setShowAgenda] = useState<number | null>(null);
  const [addProModal, setAddProModal] = useState(false);

  return (
    <Layout>
      <div className="space-y-8">
        <PremiumModal 
          open={addProModal} 
          onOpenChange={setAddProModal}
          title="Catálogo Personalizado é exclusivo para clientes"
          body="Personalize serviços, preços, fotos e categorias sem limites."
          checklist={[
            "✍️ Editar serviços",
            "🖼️ Adicionar fotos",
            "🔗 Integração com WhatsApp"
          ]}
          cta="Quero personalizar minha equipe"
        />

         <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold">Profissionais</h2>
            <p className="text-muted-foreground">Organize sua equipe e seus horários com facilidade.</p>
          </div>
          <Button 
            className="bg-primary text-white shadow-lg shadow-primary/20"
            onClick={() => setAddProModal(true)}
          >
            + Adicionar Profissional
          </Button>
        </div>

        <Dialog open={!!showAgenda} onOpenChange={(open) => !open && setShowAgenda(null)}>
           <DialogContent className="max-w-3xl">
             <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Agenda Semanal: {staff.find(s => s.id === showAgenda)?.name}
               </DialogTitle>
             </DialogHeader>
             
             <div className="mt-4">
                <div className="grid grid-cols-6 gap-2 text-center text-sm font-medium text-muted-foreground mb-4">
                   <div>Seg</div>
                   <div>Ter</div>
                   <div>Qua</div>
                   <div>Qui</div>
                   <div>Sex</div>
                   <div>Sáb</div>
                </div>
                <div className="grid grid-cols-6 gap-2 h-[400px] overflow-y-auto">
                   {[...Array(6)].map((_, dayIndex) => (
                      <div key={dayIndex} className="space-y-2">
                         {[9, 11, 14, 16].map((hour) => {
                            // Randomize a bit
                            const isBusy = (dayIndex + hour) % 3 === 0;
                            if (!isBusy) return <div key={hour} className="h-16 rounded-md border border-dashed border-slate-200" />;
                            
                            return (
                               <div key={hour} className="h-16 rounded-md bg-primary/10 border-l-4 border-primary p-1 text-[10px]">
                                  <span className="font-bold block">{hour}:00</span>
                                  <span className="text-muted-foreground">Cliente Demo</span>
                               </div>
                            );
                         })}
                      </div>
                   ))}
                </div>
                <div className="flex justify-end mt-4">
                   <Button variant="outline" onClick={() => setShowAgenda(null)}>Fechar</Button>
                </div>
             </div>
           </DialogContent>
        </Dialog>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {staff.map((person) => (
            <Card key={person.id} className="border-none shadow-sm glass-card overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="h-24 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 opacity-50 group-hover:opacity-100 transition-opacity" />
              <CardContent className="relative pt-0 pb-6 px-6 text-center">
                <div className="relative -top-12 mb-[-30px]">
                   <AiImageTooltip>
                     <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg mx-auto">
                      <AvatarImage src={person.avatar} className="object-cover" />
                      <AvatarFallback>{person.name[0]}</AvatarFallback>
                    </Avatar>
                   </AiImageTooltip>
                  <div className={`absolute bottom-1 right-[calc(50%-40px)] w-4 h-4 rounded-full border-2 border-white ${
                    person.status === 'Disponível' || person.status === 'Livre' ? 'bg-emerald-500' : 
                    person.status === 'Atendendo' ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                </div>

                <div className="mt-12 space-y-1">
                  <h3 className="font-serif font-bold text-xl">{person.name}</h3>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{person.role}</p>
                </div>

                <div className="flex items-center justify-center gap-1 my-4 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold text-foreground">{person.rating}</span>
                  <span className="text-xs text-muted-foreground">(124 avaliações)</span>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {person.services.slice(0, 2).map((s, i) => (
                    <Badge key={i} variant="secondary" className="bg-secondary/50 font-normal">
                      {s}
                    </Badge>
                  ))}
                  {person.services.length > 2 && (
                    <Badge variant="secondary" className="bg-secondary/50 font-normal">+{person.services.length - 2}</Badge>
                  )}
                </div>

                <div className="flex gap-2 justify-center mb-4">
                  <Button variant="outline" className="w-full text-xs h-9" onClick={() => setShowAgenda(person.id)}>Ver Agenda</Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9"><MoreHorizontal className="h-4 w-4" /></Button>
                </div>

                <p className="text-[10px] text-muted-foreground/60 border-t pt-2">
                  Imagens ilustrativas. No sistema real, você poderá usar fotos reais da sua equipe.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <AiFooterDisclaimer />
      </div>
    </Layout>
  );
}
