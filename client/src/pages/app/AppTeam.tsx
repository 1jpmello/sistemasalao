import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staff } from "@/lib/mockData";
import { Star, Clock, MoreHorizontal, Calendar as CalendarIcon, X, Plus, Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export default function AppTeam() {
  const [showAgenda, setShowAgenda] = useState<number | null>(null);

  return (
    <AppLayout>
      <div className="space-y-8">
         <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Profissionais</h2>
            <p className="text-slate-400">Organize sua equipe e seus horários com facilidade.</p>
          </div>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white" data-testid="button-add-professional">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Profissional
          </Button>
        </div>

        <Dialog open={!!showAgenda} onOpenChange={(open) => !open && setShowAgenda(null)}>
           <DialogContent className="max-w-3xl bg-slate-900 border-slate-700 text-white">
             <DialogHeader>
               <DialogTitle className="flex items-center gap-2 text-white">
                  <CalendarIcon className="h-5 w-5 text-cyan-400" />
                  Agenda Semanal: {staff.find(s => s.id === showAgenda)?.name}
               </DialogTitle>
             </DialogHeader>
             
             <div className="mt-4">
                <div className="grid grid-cols-6 gap-2 text-center text-sm font-medium text-slate-400 mb-4">
                   <div>Seg</div>
                   <div>Ter</div>
                   <div>Qua</div>
                   <div>Qui</div>
                   <div>Sex</div>
                   <div>Sáb</div>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {[...Array(6)].map((_, dayIndex) => (
                    <div key={dayIndex} className="space-y-1">
                      {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((time) => (
                        <div 
                          key={time} 
                          className={`text-xs p-2 rounded border text-center ${
                            Math.random() > 0.3 
                              ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400' 
                              : 'bg-slate-800/50 border-slate-700 text-slate-500'
                          }`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
             </div>
           </DialogContent>
        </Dialog>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <Card key={member.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-all overflow-hidden" data-testid={`card-staff-${member.id}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-cyan-500/50">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-cyan-500/20 text-cyan-400 text-xl">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg text-white">{member.name}</h3>
                      <Badge className="bg-slate-700 text-slate-300">{member.role}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-cyan-400 hover:bg-slate-700" data-testid={`button-edit-${member.id}`}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400 hover:bg-slate-700" data-testid={`button-delete-${member.id}`}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-300">{member.rating} estrelas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-cyan-400" />
                    <span className="text-slate-300">{member.specialty}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {member.services.map((service: string) => (
                    <Badge key={service} variant="outline" className="text-xs bg-slate-700/50 border-slate-600 text-slate-300">{service}</Badge>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700"
                  onClick={() => setShowAgenda(member.id)}
                  data-testid={`button-view-agenda-${member.id}`}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Ver Agenda
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
