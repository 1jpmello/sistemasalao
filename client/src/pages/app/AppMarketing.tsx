import AppLayout from "@/components/layout/AppLayout";
import { marketingAutomations } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail, Gift, CalendarClock, Zap, PlayCircle, PauseCircle, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AppMarketing() {
  const { toast } = useToast();
  const [automations, setAutomations] = useState(marketingAutomations.map(a => ({ ...a, enabled: Math.random() > 0.3 })));

  const toggleAutomation = (id: number) => {
    const automation = automations.find(a => a.id === id);
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
    toast({
      title: automation?.enabled ? "Automação pausada" : "Automação ativada",
      description: automation?.name
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">Marketing Automático</h2>
            <p className="text-slate-500">Engaje seus clientes e aumente a retenção automaticamente.</p>
          </div>
          <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 font-bold" data-testid="button-new-automation">
            <Plus className="h-4 w-4 mr-2" />
            Nova Automação
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 overflow-hidden relative min-h-[400px]">
             <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
             
             <CardHeader className="relative z-10">
               <CardTitle className="text-slate-900">Fluxo de Retenção: "Cliente Sumido"</CardTitle>
               <CardDescription className="text-slate-500">Visualização da campanha ativa</CardDescription>
             </CardHeader>

             <CardContent className="relative z-10 h-full flex items-center justify-center py-10">
                <div className="flex items-center gap-6">
                  <FlowNode icon={<CalendarClock className="h-5 w-5" />} label="30 dias sem visita" color="bg-amber-50 border-amber-200 text-amber-700" />
                  <Arrow />
                  <FlowNode icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp automático" color="bg-emerald-50 border-emerald-200 text-emerald-700" />
                  <Arrow />
                  <FlowNode icon={<Gift className="h-5 w-5" />} label="Cupom 10% OFF" color="bg-purple-50 border-purple-200 text-purple-700" />
                  <Arrow />
                  <FlowNode icon={<Zap className="h-5 w-5" />} label="Agendamento" color="bg-cyan-50 border-cyan-200 text-cyan-700" />
                </div>
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
                    <p className="text-2xl font-bold text-emerald-600">1.247</p>
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
                    <p className="text-2xl font-bold text-cyan-600">89</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500">Últimos 30 dias</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
          <CardHeader>
            <CardTitle className="text-slate-900">Automações Ativas</CardTitle>
            <CardDescription className="text-slate-500">Configure e gerencie suas campanhas automáticas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automations.map((automation) => (
                <div 
                  key={automation.id} 
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100"
                  data-testid={`automation-${automation.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      automation.enabled ? 'bg-cyan-100' : 'bg-slate-100'
                    }`}>
                      {automation.channel === 'WhatsApp' ? (
                        <MessageCircle className={`h-5 w-5 ${automation.enabled ? 'text-cyan-600' : 'text-slate-400'}`} />
                      ) : (
                        <Mail className={`h-5 w-5 ${automation.enabled ? 'text-cyan-600' : 'text-slate-400'}`} />
                      )}
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
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

function FlowNode({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${color}`}>
      {icon}
      <span className="text-xs font-medium text-center max-w-[80px]">{label}</span>
    </div>
  );
}

function Arrow() {
  return (
    <div className="text-slate-300">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14m-4-4l4 4-4 4" />
      </svg>
    </div>
  );
}
