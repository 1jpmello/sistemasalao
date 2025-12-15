import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, CalendarClock, Zap, Plus, Edit, Megaphone, Users, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { fetchAutomations, createAutomation, updateAutomation, deleteAutomation, fetchClients } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const suggestedAutomations = [
  { name: "Feliz Aniversário", trigger: "Data de Nascimento", channel: "WhatsApp", description: "Envie parabéns com cupom especial" },
  { name: "Lembrete de Agendamento", trigger: "24h antes", channel: "WhatsApp", description: "Confirme presença do cliente" },
  { name: "Recuperação de Inativos", trigger: "60 dias sem visita", channel: "WhatsApp", description: "Traga clientes de volta" },
  { name: "Pós-Atendimento", trigger: "2h após serviço", channel: "WhatsApp", description: "Peça avaliação e feedback" },
];

const triggerOptions = [
  "Data de Nascimento",
  "24h antes",
  "48h antes",
  "2h após serviço",
  "1 dia após serviço",
  "7 dias sem visita",
  "30 dias sem visita",
  "60 dias sem visita",
];

const channelOptions = ["WhatsApp", "SMS", "Email"];

export default function AppMarketing() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [automations, setAutomations] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAutomation, setEditingAutomation] = useState<any>(null);
  
  const [newAutomation, setNewAutomation] = useState({
    name: "",
    trigger: "24h antes",
    channel: "WhatsApp",
    message: "",
    targetAll: true,
    clientIds: [] as string[],
  });

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [user?.id]);

  const loadData = async () => {
    if (!user?.id) return;
    try {
      const [automationsData, clientsData] = await Promise.all([
        fetchAutomations(user.id),
        fetchClients(user.id)
      ]);
      setAutomations(automationsData);
      setClients(clientsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const activeAutomations = automations.filter(a => a.active).length;

  const toggleAutomation = async (id: string) => {
    const automation = automations.find(a => a.id === id);
    if (!automation) return;
    
    try {
      await updateAutomation(id, { active: !automation.active });
      setAutomations(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
      toast({
        title: automation.active ? "Automação pausada" : "Automação ativada",
        description: automation.name
      });
    } catch (error) {
      toast({ title: "Erro ao atualizar automação", variant: "destructive" });
    }
  };

  const handleDeleteAutomation = async (id: string) => {
    try {
      await deleteAutomation(id);
      setAutomations(prev => prev.filter(a => a.id !== id));
      toast({ title: "Automação removida" });
    } catch (error) {
      toast({ title: "Erro ao remover automação", variant: "destructive" });
    }
  };

  const openAddModal = (suggestion?: typeof suggestedAutomations[0]) => {
    if (suggestion) {
      setNewAutomation({
        name: suggestion.name,
        trigger: suggestion.trigger,
        channel: suggestion.channel,
        message: "",
        targetAll: true,
        clientIds: [],
      });
    } else {
      setNewAutomation({
        name: "",
        trigger: "24h antes",
        channel: "WhatsApp",
        message: "",
        targetAll: true,
        clientIds: [],
      });
    }
    setEditingAutomation(null);
    setIsModalOpen(true);
  };

  const openEditModal = (automation: any) => {
    setNewAutomation({
      name: automation.name,
      trigger: automation.trigger,
      channel: automation.channel,
      message: automation.message || "",
      targetAll: automation.targetAll ?? true,
      clientIds: automation.clientIds || [],
    });
    setEditingAutomation(automation);
    setIsModalOpen(true);
  };

  const handleSaveAutomation = async () => {
    if (!user?.id || !newAutomation.name) {
      toast({ title: "Preencha o nome da automação", variant: "destructive" });
      return;
    }

    try {
      if (editingAutomation) {
        const updated = await updateAutomation(editingAutomation.id, {
          name: newAutomation.name,
          trigger: newAutomation.trigger,
          channel: newAutomation.channel,
          message: newAutomation.message || null,
          targetAll: newAutomation.targetAll,
          clientIds: newAutomation.targetAll ? null : newAutomation.clientIds,
        });
        setAutomations(prev => prev.map(a => a.id === editingAutomation.id ? updated : a));
        toast({ title: "Automação atualizada!", description: newAutomation.name });
      } else {
        const automation = await createAutomation({
          userId: user.id,
          name: newAutomation.name,
          trigger: newAutomation.trigger,
          channel: newAutomation.channel,
          message: newAutomation.message || null,
          active: true,
          targetAll: newAutomation.targetAll,
          clientIds: newAutomation.targetAll ? null : newAutomation.clientIds,
        });
        setAutomations(prev => [...prev, automation]);
        toast({ title: "Automação criada!", description: newAutomation.name });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast({ title: "Erro ao salvar automação", variant: "destructive" });
    }
  };

  const toggleClientSelection = (clientId: string) => {
    setNewAutomation(prev => ({
      ...prev,
      clientIds: prev.clientIds.includes(clientId)
        ? prev.clientIds.filter(id => id !== clientId)
        : [...prev.clientIds, clientId]
    }));
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">Marketing Automático</h2>
            <p className="text-slate-500">Engaje seus clientes e aumente a retenção automaticamente.</p>
          </div>
          <Button 
            onClick={() => openAddModal()}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 font-bold"
            data-testid="button-add-automation"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Automação
          </Button>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingAutomation ? "Editar Automação" : "Nova Automação"}</DialogTitle>
              <DialogDescription>
                Configure os detalhes da automação de marketing.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Ex: Lembrete de Agendamento"
                  value={newAutomation.name}
                  onChange={(e) => setNewAutomation(prev => ({ ...prev, name: e.target.value }))}
                  data-testid="input-automation-name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Gatilho</Label>
                  <Select 
                    value={newAutomation.trigger} 
                    onValueChange={(value) => setNewAutomation(prev => ({ ...prev, trigger: value }))}
                  >
                    <SelectTrigger data-testid="select-trigger">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {triggerOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label>Canal</Label>
                  <Select 
                    value={newAutomation.channel} 
                    onValueChange={(value) => setNewAutomation(prev => ({ ...prev, channel: value }))}
                  >
                    <SelectTrigger data-testid="select-channel">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {channelOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">Mensagem (opcional)</Label>
                <Input
                  id="message"
                  placeholder="Mensagem personalizada..."
                  value={newAutomation.message}
                  onChange={(e) => setNewAutomation(prev => ({ ...prev, message: e.target.value }))}
                  data-testid="input-automation-message"
                />
              </div>

              <div className="border-t pt-4 mt-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-500" />
                    <Label>Destinatários</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="targetAll"
                      checked={newAutomation.targetAll}
                      onCheckedChange={(checked) => setNewAutomation(prev => ({ 
                        ...prev, 
                        targetAll: !!checked,
                        clientIds: checked ? [] : prev.clientIds
                      }))}
                      data-testid="checkbox-target-all"
                    />
                    <Label htmlFor="targetAll" className="text-sm font-normal cursor-pointer">
                      Todos os clientes
                    </Label>
                  </div>
                </div>

                {!newAutomation.targetAll && (
                  <div className="border rounded-lg p-2">
                    {clients.length === 0 ? (
                      <p className="text-sm text-slate-400 text-center py-4">
                        Nenhum cliente cadastrado. Adicione clientes primeiro.
                      </p>
                    ) : (
                      <ScrollArea className="h-[150px]">
                        <div className="space-y-2">
                          {clients.map(client => (
                            <div 
                              key={client.id}
                              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                                newAutomation.clientIds.includes(client.id) 
                                  ? 'bg-cyan-50 border border-cyan-200' 
                                  : 'hover:bg-slate-50'
                              }`}
                              onClick={() => toggleClientSelection(client.id)}
                              data-testid={`client-option-${client.id}`}
                            >
                              <Checkbox
                                checked={newAutomation.clientIds.includes(client.id)}
                                onCheckedChange={() => toggleClientSelection(client.id)}
                              />
                              <div>
                                <p className="text-sm font-medium text-slate-900">{client.name}</p>
                                {client.phone && (
                                  <p className="text-xs text-slate-500">{client.phone}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                    {newAutomation.clientIds.length > 0 && (
                      <p className="text-xs text-cyan-600 mt-2 text-center">
                        {newAutomation.clientIds.length} cliente(s) selecionado(s)
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button 
                onClick={handleSaveAutomation} 
                className="bg-gradient-to-r from-cyan-600 to-blue-600"
                data-testid="button-save-automation"
              >
                {editingAutomation ? "Salvar" : "Criar Automação"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 overflow-hidden relative">
             <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
             
             <CardHeader className="relative z-10">
               <CardTitle className="text-slate-900">Sugestões de Automação</CardTitle>
               <CardDescription className="text-slate-500">Clique para adicionar ao seu fluxo</CardDescription>
             </CardHeader>

             <CardContent className="relative z-10 grid sm:grid-cols-2 gap-4">
               {suggestedAutomations.map((suggestion, index) => {
                 const isAdded = automations.some(a => a.name === suggestion.name);
                 return (
                   <div 
                     key={index}
                     className={`p-4 rounded-xl border transition-all cursor-pointer ${
                       isAdded 
                         ? 'bg-cyan-50 border-cyan-200' 
                         : 'bg-white border-slate-200 hover:border-cyan-300 hover:shadow-md'
                     }`}
                     onClick={() => !isAdded && openAddModal(suggestion)}
                     data-testid={`suggestion-${index}`}
                   >
                     <div className="flex items-start justify-between mb-2">
                       <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                         suggestion.channel === 'WhatsApp' ? 'bg-green-100' : 'bg-blue-100'
                       }`}>
                         <MessageCircle className={`h-5 w-5 ${
                           suggestion.channel === 'WhatsApp' ? 'text-green-600' : 'text-blue-600'
                         }`} />
                       </div>
                       {isAdded ? (
                         <Badge className="bg-cyan-100 text-cyan-700 border-0">Adicionada</Badge>
                       ) : (
                         <Button size="sm" variant="ghost" className="h-8 px-2 text-cyan-600 hover:bg-cyan-50">
                           <Plus className="h-4 w-4" />
                         </Button>
                       )}
                     </div>
                     <h4 className="font-bold text-slate-900 mb-1">{suggestion.name}</h4>
                     <p className="text-xs text-slate-500 mb-2">{suggestion.description}</p>
                     <div className="flex items-center gap-2 text-xs text-slate-400">
                       <Zap className="h-3 w-3" />
                       <span>{suggestion.trigger}</span>
                     </div>
                   </div>
                 );
               })}
             </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Clientes Cadastrados</p>
                    <p className="text-2xl font-bold text-emerald-600">{clients.length}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500">Disponíveis para automações</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Automações Ativas</p>
                    <p className="text-2xl font-bold text-purple-600">{activeAutomations}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500">Configuradas</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
          <CardHeader>
            <CardTitle className="text-slate-900">Suas Automações</CardTitle>
            <CardDescription className="text-slate-500">Gerencie suas campanhas automáticas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <Megaphone className="h-12 w-12 mb-3 opacity-30" />
                  <p className="text-sm">Nenhuma automação ativa</p>
                  <p className="text-xs text-slate-400 mt-1">Clique nas sugestões acima para começar</p>
                </div>
              ) : (
                automations.map((automation) => (
                  <div 
                    key={automation.id} 
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100"
                    data-testid={`automation-${automation.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        automation.active ? 'bg-cyan-100' : 'bg-slate-100'
                      }`}>
                        <MessageCircle className={`h-5 w-5 ${automation.active ? 'text-cyan-600' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{automation.name}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <span>{automation.trigger} • {automation.channel}</span>
                          {!automation.targetAll && automation.clientIds?.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              {automation.clientIds.length} cliente(s)
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={automation.active ? "bg-emerald-100 text-emerald-700 border-0" : "bg-slate-100 text-slate-500 border-0"}>
                        {automation.active ? 'Ativo' : 'Pausado'}
                      </Badge>
                      <Switch 
                        checked={automation.active} 
                        onCheckedChange={() => toggleAutomation(automation.id)}
                        data-testid={`switch-automation-${automation.id}`}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-400 hover:text-cyan-600 hover:bg-cyan-50" 
                        onClick={() => openEditModal(automation)}
                        data-testid={`button-edit-automation-${automation.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50" 
                        onClick={() => handleDeleteAutomation(automation.id)}
                        data-testid={`button-delete-automation-${automation.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
