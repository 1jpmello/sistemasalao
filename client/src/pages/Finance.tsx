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
  Download
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

  return (
    <Layout>
      <div className="space-y-8">
        <PremiumModal
          open={financeModal}
          onOpenChange={setFinanceModal}
          title="Financeiro avançado disponível apenas no plano profissional"
          body="Tenha controle total de faturamento, despesas e lucros."
          checklist={[
            "💸 Controle de caixa",
            "📉 Despesas",
            "📊 Indicadores inteligentes"
          ]}
          cta="Liberar financeiro completo"
        />

        <PremiumModal
          open={reportModal}
          onOpenChange={setReportModal}
          title="Exportação disponível apenas para clientes"
          body="Ative seu acesso profissional e libere relatórios completos de atendimento, faturamento e desempenho da equipe."
          checklist={[
            "📊 Relatórios profissionais",
            "🧾 Exportação PDF e Excel",
            "📈 Métricas completas"
          ]}
          cta="Quero liberar relatórios"
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold">Financeiro</h2>
            <p className="text-muted-foreground">Veja o faturamento do dia e serviços mais vendidos.</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="gap-2" onClick={() => setFinanceModal(true)}>
               <Calendar className="h-4 w-4" />
               Esta Semana
             </Button>
             <Button variant="outline" className="gap-2" onClick={() => setReportModal(true)}>
               <Download className="h-4 w-4" />
               Relatório
             </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3 cursor-pointer" onClick={() => setFinanceModal(true)}>
          <Card className="border-none shadow-sm glass-card bg-emerald-500/5 border-emerald-200 hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Entradas (Hoje)</p>
                  <h3 className="text-2xl font-bold text-emerald-700">R$ 1.250,00</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm glass-card bg-rose-500/5 border-rose-200 hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                  <TrendingDown className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saídas (Hoje)</p>
                  <h3 className="text-2xl font-bold text-rose-700">R$ 320,00</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm glass-card bg-primary/5 border-primary/20 hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saldo do Mês</p>
                  <h3 className="text-2xl font-bold text-foreground">R$ 12.450,00</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Maquininha Integration */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
             <div>
               <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                     <CreditCard className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Integre sua Maquininha</h3>
               </div>
               <p className="text-slate-300 max-w-lg">
                 Conecte sua maquininha de cartão para sincronizar vendas automaticamente e eliminar erros de caixa.
               </p>
             </div>
             <div className="flex gap-3">
                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white">
                   Ver Compatíveis
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-white font-bold border-none shadow-lg shadow-green-500/20">
                   Conectar Agora
                </Button>
             </div>
           </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-8 cursor-pointer" onClick={() => setFinanceModal(true)}>
           <Card className="lg:col-span-2 border-none shadow-sm glass-card hover:shadow-md transition-all relative">
            <div className="absolute inset-0 z-10 bg-white/5 backdrop-blur-[1px] rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
               <Button variant="secondary" className="shadow-lg">Ver detalhes completos</Button>
            </div>
            <CardHeader>
              <CardTitle>Faturamento Semanal</CardTitle>
              <CardDescription>Visão clara dos seus melhores dias.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `R$${value}`}
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 5 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.3)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
           </Card>

           <Card className="border-none shadow-sm glass-card">
             <CardHeader>
               <CardTitle>Métodos de Pagamento</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 {[
                   { name: "Pix", val: 65, color: "bg-emerald-500" },
                   { name: "Cartão de Crédito", val: 25, color: "bg-blue-500" },
                   { name: "Dinheiro", val: 10, color: "bg-amber-500" },
                 ].map((item) => (
                   <div key={item.name} className="space-y-2">
                     <div className="flex justify-between text-sm">
                       <span>{item.name}</span>
                       <span className="font-bold">{item.val}%</span>
                     </div>
                     <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                       <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }} />
                     </div>
                   </div>
                 ))}
               </div>

               <div className="mt-8 p-4 bg-muted/30 rounded-xl">
                 <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                   <CreditCard className="h-4 w-4" />
                   Dica Financeira
                 </h4>
                 <p className="text-xs text-muted-foreground">
                   Taxas de cartão estão consumindo 4% do seu lucro. Considere incentivar pagamentos via Pix com 5% de desconto.
                 </p>
               </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </Layout>
  );
}
