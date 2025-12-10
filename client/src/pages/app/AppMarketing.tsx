import AppLayout from "@/components/layout/AppLayout";
import { marketingAutomations } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail, Gift, CalendarClock, Zap, PlayCircle, PauseCircle, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AppMarketing() {
  const [automations, setAutomations] = useState(marketingAutomations.map(a => ({ ...a, enabled: Math.random() > 0.3 })));

  const toggleAutomation = (id: number) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Marketing Automático</h2>
            <p className="text-slate-400">Engaje seus clientes e aumente a retenção automaticamente.</p>
          </div>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white" data-testid="button-new-automation">
            <Plus className="h-4 w-4 mr-2" />
            Nova Automação
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700 overflow-hidden relative min-h-[400px]">
             <div className="absolute inset-0 bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
             
             <CardHeader className="relative z-10">
               <CardTitle className="text-white">Fluxo de Retenção: "Cliente Sumido"</CardTitle>
               <CardDescription className="text-slate-400">Visualização da campanha ativa</CardDescription>
             </CardHeader>

             <CardContent className="relative z-10 h-full flex items-center justify-center py-10">
                <div className="flex items-center gap-6">
                  <FlowNode icon={<CalendarClock className="h-5 w-5" />} label="30 dias sem visita" color="bg-amber-500/20 border-amber-500/50 text-amber-400" />
                  <Arrow />
                  <FlowNode icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp automático" color="bg-green-500/20 border-green-500/50 text-green-400" />
                  <Arrow />
                  <FlowNode icon={<Gift className="h-5 w-5" />} label="Cupom 10% OFF" color="bg-purple-500/20 border-purple-500/50 text-purple-400" />
                  <Arrow />
                  <FlowNode icon={<Zap className="h-5 w-5" />} label="Agendamento" color="bg-cyan-500/20 border-cyan-500/50 text-cyan-400" />
                </div>
             </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Mensagens Enviadas</p>
                    <p className="text-2xl font-bold text-green-400">1.247</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400">Este mês</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <CalendarClock className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Clientes Recuperados</p>
                    <p className="text-2xl font-bold text-cyan-400">89</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400">Últimos 30 dias</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Automações Ativas</CardTitle>
            <CardDescription className="text-slate-400">Configure e gerencie suas campanhas automáticas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automations.map((automation) => (
                <div 
                  key={automation.id} 
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-700"
                  data-testid={`automation-${automation.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      automation.enabled ? 'bg-cyan-500/20' : 'bg-slate-700'
                    }`}>
                      {automation.channel === 'WhatsApp' ? (
                        <MessageCircle className={`h-5 w-5 ${automation.enabled ? 'text-cyan-400' : 'text-slate-500'}`} />
                      ) : (
                        <Mail className={`h-5 w-5 ${automation.enabled ? 'text-cyan-400' : 'text-slate-500'}`} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">{automation.name}</p>
                      <p className="text-sm text-slate-400">{automation.trigger} • {automation.channel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={automation.enabled ? "bg-green-500/20 text-green-400" : "bg-slate-700 text-slate-400"}>
                      {automation.enabled ? 'Ativo' : 'Pausado'}
                    </Badge>
                    <Switch 
                      checked={automation.enabled} 
                      onCheckedChange={() => toggleAutomation(automation.id)}
                      data-testid={`switch-automation-${automation.id}`}
                    />
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-cyan-400 hover:bg-slate-700" data-testid={`button-edit-automation-${automation.id}`}>
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
    <div className="text-slate-600">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14m-4-4l4 4-4 4" />
      </svg>
    </div>
  );
}
