import Layout from "@/components/layout/Layout";
import { marketingAutomations } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { MessageCircle, Mail, Gift, CalendarClock, Zap, PlayCircle, PauseCircle, Lock } from "lucide-react";
import { useState } from "react";

export default function Marketing() {
  const [showProModal, setShowProModal] = useState(false);

  const handleProAction = () => {
    setShowProModal(true);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold">Marketing Automático</h2>
            <p className="text-muted-foreground">Engaje seus clientes e aumente a retenção automaticamente.</p>
          </div>
          <Button 
            className="bg-primary text-white shadow-lg shadow-primary/20"
            onClick={handleProAction}
          >
            + Nova Automação
          </Button>
        </div>

        <Dialog open={showProModal} onOpenChange={setShowProModal}>
          <DialogContent className="sm:max-w-md text-center">
             <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
             </div>
             <DialogHeader>
               <DialogTitle className="text-xl text-center">🚀 Área exclusiva para clientes ativos</DialogTitle>
             </DialogHeader>
             
             <div className="py-4 text-sm text-muted-foreground space-y-4 text-left">
               <p>
                 Automações são a parte mais poderosa do sistema — elas aumentam vendas, reduzem o tempo de atendimento e fidelizam clientes automaticamente.
               </p>
               <p className="font-medium text-foreground">
                 Para continuar, você precisa ativar sua conta profissional.
               </p>
               
               <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                 <p className="font-medium text-foreground mb-2">Ao ativar, você destrava:</p>
                 <div className="flex items-center gap-2"><span>🔥</span> Automações completas de WhatsApp</div>
                 <div className="flex items-center gap-2"><span>🔥</span> Agendamentos inteligentes</div>
                 <div className="flex items-center gap-2"><span>🔥</span> Campanhas de recuperação de clientes</div>
                 <div className="flex items-center gap-2"><span>🔥</span> Suporte personalizado</div>
               </div>
               
               <p className="text-center font-medium text-primary">Ative agora e tenha acesso imediato.</p>
             </div>

             <DialogFooter className="sm:justify-center">
               <Button className="w-full sm:w-auto px-8" onClick={() => setShowProModal(false)}>
                 Ativar Conta Profissional
               </Button>
             </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Visual Flow Simulation - The "Wow" Factor */}
          <Card className="lg:col-span-2 border-none shadow-lg glass-card overflow-hidden relative min-h-[400px]">
             <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
             
             <CardHeader className="relative z-10">
               <CardTitle>Fluxo de Retenção: "Cliente Sumido"</CardTitle>
               <CardDescription>Visualização da campanha ativa</CardDescription>
             </CardHeader>

             <CardContent className="relative z-10 h-full flex items-center justify-center py-10">
                {/* Simulated Flowchart */}
                <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
                   {/* Trigger */}
                   <div className="bg-white border-2 border-slate-200 p-4 rounded-xl shadow-sm flex items-center gap-3 w-64">
                      <div className="bg-amber-100 p-2 rounded-lg text-amber-600"><CalendarClock className="h-5 w-5" /></div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Gatilho</p>
                        <p className="font-medium">60 dias sem visita</p>
                      </div>
                   </div>

                   <div className="h-8 w-0.5 bg-slate-300" />

                   {/* Action 1 */}
                   <div className="bg-white border-2 border-primary/30 p-4 rounded-xl shadow-md flex items-center gap-3 w-64 ring-4 ring-primary/5">
                      <div className="bg-green-100 p-2 rounded-lg text-green-600"><MessageCircle className="h-5 w-5" /></div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Ação 1</p>
                        <p className="font-medium">Enviar WhatsApp</p>
                        <p className="text-xs text-green-600">"Sentimos sua falta! 👋"</p>
                      </div>
                   </div>

                   <div className="h-8 w-0.5 bg-slate-300" />

                   {/* Condition */}
                   <div className="relative">
                      <div className="bg-slate-100 border-2 border-slate-200 px-6 py-2 rounded-full text-sm font-medium text-slate-600">
                        Cliente Agendou?
                      </div>
                      {/* Branch lines would go here in a real SVG but keeping it simple */}
                   </div>

                   <div className="flex gap-16 mt-4 w-full justify-center">
                      <div className="flex flex-col items-center gap-2 opacity-50">
                        <div className="h-4 w-0.5 bg-slate-300" />
                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">Sim</Badge>
                        <div className="p-3 rounded-lg border border-dashed border-slate-300 text-sm text-slate-400">Fim do fluxo</div>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="h-4 w-0.5 bg-slate-300" />
                        <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">Não (3 dias)</Badge>
                        <div className="bg-white border-2 border-slate-200 p-4 rounded-xl shadow-sm flex items-center gap-3 w-64">
                          <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Gift className="h-5 w-5" /></div>
                          <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase">Ação 2</p>
                            <p className="font-medium">Enviar Cupom 15%</p>
                          </div>
                       </div>
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>

          {/* List of Automations */}
          <div className="space-y-4">
            {marketingAutomations.map((auto) => (
              <Card key={auto.id} className="border-none shadow-sm hover:shadow-md transition-all glass-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                     <div className={`p-2 rounded-lg ${auto.channel === 'WhatsApp' ? 'bg-green-100 text-green-600' : auto.channel === 'Email' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                        {auto.channel === 'WhatsApp' ? <MessageCircle className="h-4 w-4" /> : auto.channel === 'Email' ? <Mail className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
                     </div>
                     <Switch checked={auto.active} />
                  </div>
                  <h4 className="font-bold text-foreground">{auto.name}</h4>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Zap className="h-3 w-3" />
                    <span>Gatilho: {auto.trigger}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium px-2 py-1 bg-muted rounded-md">243 disparos</span>
                    <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={handleProAction}>Editar</Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed border-2 border-muted bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer shadow-none">
               <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                 <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                   <PlayCircle className="h-6 w-6" />
                 </div>
                 <p className="font-medium text-primary">Ver Tutoriais</p>
                 <p className="text-xs text-muted-foreground">Aprenda a vender mais</p>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
