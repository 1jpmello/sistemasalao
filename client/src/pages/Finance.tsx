import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PremiumModal } from "@/components/ui/premium-modal";
import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Wallet,
  Calendar,
  Download,
  Zap,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";

const data = [
  { name: "Seg", total: 1200 },
  { name: "Ter", total: 900 },
  { name: "Qua", total: 1600 },
  { name: "Qui", total: 1400 },
  { name: "Sex", total: 2400 },
  { name: "Sáb", total: 3100 },
  { name: "Dom", total: 0 },
];

export default function Finance() {
  const [financeModal, setFinanceModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [terminalModal, setTerminalModal] = useState(false);

  return (
    <Layout>
      <div className="space-y-8 max-w-7xl mx-auto">
        <PremiumModal
          open={financeModal}
          onOpenChange={setFinanceModal}
          title="Financeiro avançado disponível apenas no plano profissional"
          body="Tenha controle total de faturamento, despesas e lucros."
          checklist={[
            "Controle de caixa",
            "Despesas",
            "Indicadores inteligentes"
          ]}
          cta="Liberar financeiro completo"
        />

        <PremiumModal
          open={reportModal}
          onOpenChange={setReportModal}
          title="Exportação disponível apenas para clientes"
          body="Ative seu acesso profissional e libere relatórios completos de atendimento, faturamento e desempenho da equipe."
          checklist={[
            "Relatórios profissionais",
            "Exportação PDF e Excel",
            "Métricas completas"
          ]}
          cta="Quero liberar relatórios"
        />

        <PremiumModal
          open={terminalModal}
          onOpenChange={setTerminalModal}
          title="Integração de Pagamentos Exclusiva"
          body="Conecte sua maquininha Stone, PagSeguro ou Mercado Pago e automatize sua baixa de pagamentos."
          checklist={[
            "Sincronização automática",
            "Zero erros de caixa",
            "Taxas negociadas para parceiros"
          ]}
          cta="Quero integrar minha maquininha"
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-6">
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Financeiro</h2>
            <p className="text-muted-foreground mt-1">Visão geral do seu faturamento e saúde do negócio.</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="gap-2 rounded-full border-slate-300 hover:bg-slate-50" onClick={() => setFinanceModal(true)}>
               <Calendar className="h-4 w-4" />
               Esta Semana
             </Button>
             <Button variant="default" className="gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/10" onClick={() => setReportModal(true)}>
               <Download className="h-4 w-4" />
               Exportar Relatório
             </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3 cursor-pointer" onClick={() => setFinanceModal(true)}>
          <Card className="border-none shadow-lg shadow-emerald-500/5 bg-white overflow-hidden group hover:-translate-y-1 transition-all duration-300 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm group-hover:shadow-md transition-all">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Entradas (Hoje)</p>
                  <h3 className="text-3xl font-bold text-slate-900">R$ 1.250,00</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3" />
                +12% vs ontem
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg shadow-rose-500/5 bg-white overflow-hidden group hover:-translate-y-1 transition-all duration-300 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-sm group-hover:shadow-md transition-all">
                  <TrendingDown className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Saídas (Hoje)</p>
                  <h3 className="text-3xl font-bold text-slate-900">R$ 320,00</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-rose-600 bg-rose-50 w-fit px-2 py-1 rounded-full">
                <TrendingDown className="h-3 w-3" />
                +2% vs média
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg shadow-blue-500/5 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden group hover:-translate-y-1 transition-all duration-300 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-tr-full -ml-4 -mb-4 pointer-events-none" />
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-cyan-300 shadow-inner border border-white/10">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300 mb-1">Saldo do Mês</p>
                  <h3 className="text-3xl font-bold text-white">R$ 12.450,00</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-cyan-300 bg-cyan-950/30 w-fit px-2 py-1 rounded-full border border-cyan-500/20">
                <CheckCircle2 className="h-3 w-3" />
                Meta atingida
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Maquininha Integration - Premium Tech Look */}
        <div className="relative group overflow-hidden rounded-2xl">
           <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] to-slate-900 z-0" />
           {/* Decorative elements */}
           <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-[60px] rounded-full pointer-events-none -mr-20 -mt-20" />
           <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-500/10 blur-[50px] rounded-full pointer-events-none -ml-10 -mb-10" />
           
           <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="space-y-4 max-w-xl">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/30 backdrop-blur-sm">
                  <Zap className="h-3 w-3 fill-cyan-400" />
                  Automação Financeira
               </div>
               
               <h3 className="text-2xl md:text-3xl font-bold text-white">Integre sua Maquininha</h3>
               
               <p className="text-slate-300 text-lg leading-relaxed">
                 Conecte sua maquininha de cartão para sincronizar vendas automaticamente e eliminar erros de caixa. Tecnologia exclusiva <span className="text-cyan-400 font-bold">Andromeda Solutions</span>.
               </p>
               
               <div className="flex items-center gap-4 text-sm text-slate-400 pt-2">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">STONE</div>
                    <div className="h-8 w-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">PAG</div>
                    <div className="h-8 w-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">MP</div>
                  </div>
                  <span>+15 modelos compatíveis</span>
               </div>
             </div>
             
             <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/30 transition-all rounded-xl h-14 px-6"
                  onClick={() => setTerminalModal(true)}
                >
                   Ver Compatíveis
                </Button>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold border-none shadow-lg shadow-cyan-900/40 hover:shadow-cyan-500/20 hover:scale-105 transition-all rounded-xl h-14 px-8"
                  onClick={() => setTerminalModal(true)}
                >
                   Conectar Agora
                   <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
             </div>
           </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-8 cursor-pointer" onClick={() => setFinanceModal(true)}>
           <Card className="lg:col-span-2 border-none shadow-sm hover:shadow-md transition-all bg-white overflow-hidden relative group">
            <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <div className="text-center scale-95 group-hover:scale-100 transition-transform duration-300">
                 <div className="h-12 w-12 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl">
                   <TrendingUp className="h-6 w-6" />
                 </div>
                 <h4 className="font-bold text-slate-900 text-lg">Análise Detalhada</h4>
                 <p className="text-slate-500 text-sm mb-4">Disponível no plano PRO</p>
                 <Button className="rounded-full bg-slate-900 text-white shadow-lg">Desbloquear Gráficos</Button>
               </div>
            </div>
            
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Faturamento Semanal</CardTitle>
                  <CardDescription>Visão clara dos seus melhores dias.</CardDescription>
                </div>
                <div className="bg-slate-100 p-2 rounded-lg">
                  <BarChart className="h-5 w-5 text-slate-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} barSize={32}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `R$${value}`}
                    dx={-10}
                  />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', color: '#fff' }}
                  />
                  <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 5 ? '#0f172a' : '#cbd5e1'} 
                        className="transition-all duration-300 hover:opacity-80"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
           </Card>

           <Card className="border-none shadow-sm bg-white hover:shadow-md transition-all">
             <CardHeader>
               <CardTitle className="text-xl font-bold text-slate-900">Métodos de Pagamento</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="space-y-6">
                 {[
                   { name: "Pix", val: 65, color: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
                   { name: "Cartão de Crédito", val: 25, color: "bg-blue-500", text: "text-blue-700", bg: "bg-blue-50" },
                   { name: "Dinheiro", val: 10, color: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
                 ].map((item) => (
                   <div key={item.name} className="space-y-2">
                     <div className="flex justify-between text-sm font-medium">
                       <span className="text-slate-700">{item.name}</span>
                       <span className={item.text}>{item.val}%</span>
                     </div>
                     <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }} />
                     </div>
                   </div>
                 ))}
               </div>

               <div className="mt-8 p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200/60 relative overflow-hidden">
                 <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl" />
                 
                 <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-slate-900">
                   <div className="p-1 bg-blue-100 rounded-md text-blue-600">
                     <CreditCard className="h-3 w-3" />
                   </div>
                   Insight Financeiro
                 </h4>
                 <p className="text-xs text-slate-500 leading-relaxed">
                   Taxas de cartão estão consumindo <span className="font-bold text-rose-500">4% do seu lucro</span>. Considere incentivar pagamentos via Pix com 5% de desconto para aumentar sua margem.
                 </p>
               </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </Layout>
  );
}
