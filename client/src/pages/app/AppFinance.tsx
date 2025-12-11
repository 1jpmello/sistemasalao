import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
  ArrowDownRight,
  BarChart3
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function AppFinance() {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: "",
    description: "",
    amount: "",
  });

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netProfit = totalIncome - totalExpense;

  const chartData = [
    { name: "Seg", total: 0 },
    { name: "Ter", total: 0 },
    { name: "Qua", total: 0 },
    { name: "Qui", total: 0 },
    { name: "Sex", total: 0 },
    { name: "Sáb", total: 0 },
    { name: "Dom", total: 0 },
  ];

  const handleAddTransaction = () => {
    if (!newTransaction.type || !newTransaction.description || !newTransaction.amount) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(newTransaction.amount);
    const transaction = {
      id: Date.now(),
      type: newTransaction.type,
      description: newTransaction.description,
      amount: newTransaction.type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTransactions(prev => [transaction, ...prev]);
    setIsAddModalOpen(false);
    setNewTransaction({ type: "", description: "", amount: "" });
    toast({
      title: "Transação registrada!",
      description: `${transaction.description}`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">Financeiro</h2>
            <p className="text-slate-500">Acompanhe faturamento, despesas e fluxo de caixa.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50" data-testid="button-export-report">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 font-bold" 
              data-testid="button-new-transaction"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Transação
            </Button>
          </div>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nova Transação</DialogTitle>
              <DialogDescription>
                Registre uma nova entrada ou saída.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo</Label>
                <Select value={newTransaction.type} onValueChange={(value) => setNewTransaction(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger data-testid="select-transaction-type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Entrada</SelectItem>
                    <SelectItem value="expense">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  placeholder="Ex: Corte + Escova - Maria"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                  data-testid="input-transaction-description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="100.00"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                  data-testid="input-transaction-amount"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddTransaction} className="bg-gradient-to-r from-cyan-600 to-blue-600" data-testid="button-confirm-transaction">
                Registrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: "Faturamento Hoje", value: `R$ ${totalIncome}`, change: transactions.length > 0 ? "+0%" : null, positive: true, icon: DollarSign, color: "cyan" },
            { title: "Faturamento Semana", value: `R$ ${totalIncome}`, change: transactions.length > 0 ? "+0%" : null, positive: true, icon: TrendingUp, color: "purple" },
            { title: "Despesas Mês", value: `R$ ${totalExpense}`, change: transactions.length > 0 ? "-0%" : null, positive: true, icon: CreditCard, color: "emerald" },
            { title: "Lucro Líquido", value: `R$ ${netProfit}`, change: transactions.length > 0 ? "+0%" : null, positive: true, icon: Wallet, color: "blue" },
          ].map((stat, index) => (
            <Card key={index} className="border-none shadow-xl shadow-slate-200/40 bg-white" data-testid={`card-finance-stat-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                    stat.color === 'cyan' ? 'bg-cyan-50 text-cyan-600' :
                    stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                    stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  {stat.change && (
                    <Badge className={stat.positive ? "bg-emerald-100 text-emerald-700 border-0" : "bg-red-100 text-red-700 border-0"}>
                      {stat.positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </Badge>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
            <CardHeader>
              <CardTitle className="text-slate-900">Faturamento Semanal</CardTitle>
              <CardDescription className="text-slate-500">Receita por dia da semana</CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
                  <BarChart3 className="h-16 w-16 mb-4 opacity-30" />
                  <p className="text-lg font-medium">Nenhuma transação registrada</p>
                  <p className="text-sm">Adicione transações para ver o gráfico</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" tickFormatter={(value) => `R$${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                      labelStyle={{ color: '#0f172a' }}
                      formatter={(value: number) => [`R$ ${value}`, 'Faturamento']}
                    />
                    <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.total > 0 ? '#0891b2' : '#e2e8f0'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
            <CardHeader>
              <CardTitle className="text-slate-900">Últimas Transações</CardTitle>
              <CardDescription className="text-slate-500">Movimentações de hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                    <DollarSign className="h-12 w-12 mb-3 opacity-30" />
                    <p className="text-sm">Nenhuma transação ainda</p>
                  </div>
                ) : (
                  transactions.slice(0, 5).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100" data-testid={`row-transaction-${tx.id}`}>
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          tx.type === 'income' ? 'bg-emerald-100' : 'bg-red-100'
                        }`}>
                          {tx.type === 'income' ? (
                            <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 truncate max-w-[150px]">{tx.description}</p>
                          <p className="text-xs text-slate-500">{tx.time}</p>
                        </div>
                      </div>
                      <p className={`font-bold ${tx.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {tx.type === 'income' ? '+' : ''}R$ {Math.abs(tx.amount)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
