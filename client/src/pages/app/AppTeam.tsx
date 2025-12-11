import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Calendar as CalendarIcon, Plus, Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { fetchStaff, createStaff, deleteStaff } from "@/lib/api";

export default function AppTeam() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [staff, setStaff] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAgenda, setShowAgenda] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "",
    specialty: "",
  });

  useEffect(() => {
    if (user?.id) {
      loadStaff();
    }
  }, [user?.id]);

  const loadStaff = async () => {
    if (!user?.id) return;
    try {
      const data = await fetchStaff(user.id);
      setStaff(data);
    } catch (error) {
      console.error("Error loading staff:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStaff = async () => {
    if (!user?.id || !newStaff.name || !newStaff.role) {
      toast({
        title: "Erro",
        description: "Preencha nome e função.",
        variant: "destructive"
      });
      return;
    }

    try {
      const member = await createStaff({
        userId: user.id,
        name: newStaff.name,
        role: newStaff.role,
        specialty: newStaff.specialty || newStaff.role,
        services: [],
      });

      setStaff(prev => [...prev, member]);
      setIsAddModalOpen(false);
      setNewStaff({ name: "", role: "", specialty: "" });
      toast({
        title: "Profissional adicionado!",
        description: `${member.name} foi adicionado à equipe.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao adicionar profissional",
        variant: "destructive"
      });
    }
  };

  const handleDeleteStaff = async (id: string) => {
    const member = staff.find(s => s.id === id);
    try {
      await deleteStaff(id);
      setStaff(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Profissional removido",
        description: `${member?.name} foi removido da equipe.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao remover profissional",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8">
         <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">Profissionais</h2>
            <p className="text-slate-500">Organize sua equipe e seus horários com facilidade.</p>
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 font-bold" 
            data-testid="button-add-professional"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Profissional
          </Button>
        </div>

        <Dialog open={!!showAgenda} onOpenChange={(open) => !open && setShowAgenda(null)}>
           <DialogContent className="max-w-3xl">
             <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-cyan-600" />
                  Agenda Semanal: {staff.find(s => s.id === showAgenda)?.name}
               </DialogTitle>
             </DialogHeader>
             
             <div className="mt-4">
                <div className="grid grid-cols-6 gap-2 text-center text-sm font-medium text-slate-500 mb-4">
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
                              ? 'bg-cyan-50 border-cyan-200 text-cyan-700' 
                              : 'bg-slate-50 border-slate-200 text-slate-400'
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

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Profissional</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo profissional.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Digite o nome"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff(prev => ({ ...prev, name: e.target.value }))}
                  data-testid="input-staff-name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Função</Label>
                <Input
                  id="role"
                  placeholder="Ex: Cabeleireiro, Manicure..."
                  value={newStaff.role}
                  onChange={(e) => setNewStaff(prev => ({ ...prev, role: e.target.value }))}
                  data-testid="input-staff-role"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="specialty">Especialidade</Label>
                <Input
                  id="specialty"
                  placeholder="Ex: Corte & Coloração"
                  value={newStaff.specialty}
                  onChange={(e) => setNewStaff(prev => ({ ...prev, specialty: e.target.value }))}
                  data-testid="input-staff-specialty"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddStaff} className="bg-gradient-to-r from-cyan-600 to-blue-600" data-testid="button-confirm-add-staff">
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {staff.length === 0 ? (
          <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
            <CardContent className="py-16 text-center">
              <p className="text-slate-500 mb-4">Nenhum profissional cadastrado ainda.</p>
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-cyan-600 to-blue-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar o primeiro profissional
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member) => (
              <Card key={member.id} className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 hover:shadow-2xl transition-all overflow-hidden" data-testid={`card-staff-${member.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-cyan-100 shadow-md">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-cyan-100 text-cyan-700 text-xl">{member.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{member.name}</h3>
                        <Badge className="bg-slate-100 text-slate-600 border-0">{member.role}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-cyan-600 hover:bg-cyan-50" data-testid={`button-edit-${member.id}`}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50" 
                        onClick={() => handleDeleteStaff(member.id)}
                        data-testid={`button-delete-${member.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-amber-500" />
                      <span className="text-slate-600">{member.rating || "5.0"} estrelas</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-cyan-600" />
                      <span className="text-slate-600">{member.specialty}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {(member.services || []).map((service: string) => (
                      <Badge key={service} variant="outline" className="text-xs bg-slate-50 border-slate-200 text-slate-600">{service}</Badge>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
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
        )}
      </div>
    </AppLayout>
  );
}
