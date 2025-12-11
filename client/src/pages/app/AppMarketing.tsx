import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail, Gift, CalendarClock, Zap, Plus, Edit, Megaphone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const suggestedAutomations = [
  { id: 1, name: "Feliz Aniversário", trigger: "Data de Nascimento", channel: "WhatsApp", description: "Envie parabéns com cupom especial" },
  { id: 2, name: "Lembrete de Agendamento", trigger: "24h antes", channel: "WhatsApp", description: "Confirme presença do cliente" },
  { id: 3, name: "Recuperação de Inativos", trigger: "60 dias sem visita", channel: "WhatsApp", description: "Traga clientes de volta" },
  { id: 4, name: "Pós-Atendimento", trigger: "2h após serviço", channel: "WhatsApp", description: "Peça avaliação e feedback" },
];

export default function AppMarketing() {
  const { toast } = useToast();
  const [automations, setAutomations] = useState<any[]>([]);

  const messagesSent = automations.filter(a => a.enabled).length * 12;
  const clientsRecovered = Math.floor(messagesSent * 0.3);

  const toggleAutomation = (id: number) => {
    const automation = automations.find(a => a.id === id);
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
    toast({
      title: automation?.enabled ? "Automação pausada" : "Automação ativada",
      description: automation?.name
    });
  };

  const addAutomation = (suggestion: typeof suggestedAutomations[0]) => {
    const exists = automations.find(a => a.name === suggestion.name);
    if (exists) {
      toast({ title: "Automação já adicionada", variant: "destructive" });
      return;
    }
    setAutomations(prev => [...prev, { ...suggestion, id: Date.now(), enabled: true }]);
    toast({ title: "Automação adicionada!", description: suggestion.name });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">Marketing Automático</h2>
            <p className="text-slate-500">Engaje seus clientes e aumente a retenção automaticamente.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 overflow-hidden relative">
             <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
             
             <CardHeader className="relative z-10">
               <CardTitle className="text-slate-900">Sugestões de Automação</CardTitle>
               <CardDescription className="text-slate-500">Clique para adicionar ao seu fluxo</CardDescription>
             </CardHeader>

             <CardContent className="relative z-10 grid sm:grid-cols-2 gap-4">
               {suggestedAutomations.map((suggestion) => {
                 const isAdded = automations.some(a => a.name === suggestion.name);
                 return (
                   <div 
                     key={suggestion.id}
                     className={`p-4 rounded-xl border transition-all cursor-pointer ${
                       isAdded 
                         ? 'bg-cyan-50 border-cyan-200' 
                         : 'bg-white border-slate-200 hover:border-cyan-300 hover:shadow-md'
                     }`}
                     onClick={() => !isAdded && addAutomation(suggestion)}
                     data-testid={`suggestion-${suggestion.id}`}
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
                    <p className="font-bold text-slate-900">Mensagens Enviadas</p>
                    <p className="text-2xl font-bold text-emerald-600">{messagesSent}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500">Este mês</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                    <CalendarClock className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Clientes Recuperados</p>
                    <p className="text-2xl font-bold text-cyan-600">{clientsRecovered}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500">Últimos 30 dias</p>
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
                        automation.enabled ? 'bg-cyan-100' : 'bg-slate-100'
                      }`}>
                        <MessageCircle className={`h-5 w-5 ${automation.enabled ? 'text-cyan-600' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{automation.name}</p>
                        <p className="text-sm text-slate-500">{automation.trigger} • {automation.channel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={automation.enabled ? "bg-emerald-100 text-emerald-700 border-0" : "bg-slate-100 text-slate-500 border-0"}>
                        {automation.enabled ? 'Ativo' : 'Pausado'}
                      </Badge>
                      <Switch 
                        checked={automation.enabled} 
                        onCheckedChange={() => toggleAutomation(automation.id)}
                        data-testid={`switch-automation-${automation.id}`}
                      />
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-cyan-600 hover:bg-cyan-50" data-testid={`button-edit-automation-${automation.id}`}>
                        <Edit className="h-4 w-4" />
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
