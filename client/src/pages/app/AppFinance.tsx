import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Wallet,
  Calendar,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";

const data = [
  { name: "Seg", total: 1200 },
  { name: "Ter", total: 900 },
  { name: "Qua", total: 1600 },
  { name: "Qui", total: 1400 },
  { name: "Sex", total: 2400 },
  { name: "Sáb", total: 3100 },
  { name: "Dom", total: 0 },
];

const transactions = [
  { id: 1, type: "income", description: "Corte + Escova - Maria Silva", amount: 150, time: "14:30" },
  { id: 2, type: "income", description: "Manicure + Pedicure - Ana Paula", amount: 80, time: "13:00" },
  { id: 3, type: "expense", description: "Compra de produtos", amount: -320, time: "11:45" },
  { id: 4, type: "income", description: "Coloração - Fernanda Lima", amount: 280, time: "10:30" },
  { id: 5, type: "income", description: "Tratamento Capilar - Juliana", amount: 200, time: "09:00" },
];

export default function AppFinance() {
  return (
    <AppLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Financeiro</h2>
            <p className="text-slate-400">Acompanhe faturamento, despesas e fluxo de caixa.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700" data-testid="button-export-report">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white" data-testid="button-new-transaction">
              <Plus className="h-4 w-4 mr-2" />
              Nova Transação
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: "Faturamento Hoje", value: "R$ 1.840", change: "+18%", positive: true, icon: DollarSign },
            { title: "Faturamento Semana", value: "R$ 10.600", change: "+12%", positive: true, icon: TrendingUp },
            { title: "Despesas Mês", value: "R$ 3.200", change: "-8%", positive: true, icon: CreditCard },
            { title: "Lucro Líquido", value: "R$ 7.400", change: "+15%", positive: true, icon: Wallet },
          ].map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700" data-testid={`card-finance-stat-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <Badge className={stat.positive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                    {stat.positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Faturamento Semanal</CardTitle>
              <CardDescription className="text-slate-400">Receita por dia da semana</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" tickFormatter={(value) => `R$${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value: number) => [`R$ ${value}`, 'Faturamento']}
                  />
                  <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.total > 0 ? '#06b6d4' : '#334155'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Últimas Transações</CardTitle>
              <CardDescription className="text-slate-400">Movimentações de hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700" data-testid={`row-transaction-${tx.id}`}>
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        tx.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        {tx.type === 'income' ? (
                          <ArrowUpRight className="h-4 w-4 text-green-400" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white truncate max-w-[150px]">{tx.description}</p>
                        <p className="text-xs text-slate-500">{tx.time}</p>
                      </div>
                    </div>
                    <p className={`font-bold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'income' ? '+' : ''}R$ {Math.abs(tx.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
