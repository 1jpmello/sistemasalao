import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PremiumModal } from "@/components/ui/premium-modal";
import { useState } from "react";
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal
} from "lucide-react";
import { staff, appointments, stats } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const [reportModal, setReportModal] = useState(false);
  const [dashboardModal, setDashboardModal] = useState(false);

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
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
          open={dashboardModal}
          onOpenChange={setDashboardModal}
          title="Dashboard completo disponível no plano profissional"
          body="Acompanhe métricas reais do seu salão e tome decisões inteligentes."
          checklist={[
            "Atendimentos por profissional",
            "Faturamento por serviço",
            "Clientes recorrentes"
          ]}
          cta="Liberar dashboard"
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-4xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400">Visão Geral</h2>
            <p className="text-slate-500 font-medium text-lg mt-1">Controle total do seu salão em um lugar só.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white/50 backdrop-blur-sm border-slate-200 text-slate-700 hover:bg-white hover:text-slate-900 font-semibold" onClick={() => setReportModal(true)}>Exportar Relatório</Button>
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 font-bold tracking-wide transition-all hover:scale-105">
              + Novo Agendamento
            </Button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 cursor-pointer" onClick={() => setDashboardModal(true)}>
          <KpiCard 
            title="Clientes Hoje" 
            value={stats.clientsToday} 
            icon={Users} 
            trend="+12%" 
            trendUp={true}
            sub="vs. ontem"
            color="cyan"
          />
          <KpiCard 
            title="Agendamentos" 
            value={stats.appointmentsToday} 
            icon={Calendar} 
            trend="+5%" 
            trendUp={true}
            sub="vs. ontem"
            color="purple"
          />
          <KpiCard 
            title="Ticket Médio" 
            value={`R$ ${stats.avgTicket}`} 
            icon={TrendingUp} 
            trend="+8%" 
            trendUp={true}
            sub="vs. semana passada"
            color="emerald"
          />
          <KpiCard 
            title="Tempo Espera" 
            value={`${stats.avgWaitTime} min`} 
            icon={Clock} 
            trend="-2%" 
            trendUp={false} 
            sub="Média do dia"
            color="blue"
          />
        </div>

        {/* Main Content Split */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Appointments List */}
          <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-xl cursor-pointer hover:shadow-2xl transition-all duration-300" onClick={() => setDashboardModal(true)}>
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-6">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Próximos Compromissos</CardTitle>
                <CardDescription className="text-slate-500 font-medium">Sua agenda para as próximas horas</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-cyan-600 hover:bg-cyan-50">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {appointments.slice(0, 4).map((apt) => {
                  const staffMember = staff.find(s => s.id === apt.staffId);
                  return (
                    <div key={apt.id} className="flex items-center justify-between p-4 hover:bg-white rounded-2xl transition-all duration-300 border border-transparent hover:border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 group">
                      <div className="flex items-center gap-5">
                        <div className="flex flex-col items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-100 to-white border border-slate-200 text-slate-900 font-bold shadow-sm group-hover:from-cyan-50 group-hover:to-white group-hover:border-cyan-200 group-hover:text-cyan-700 transition-all">
                          <span className="text-base">{apt.time}</span>
                        </div>
                        <div>
                          <p className="font-bold text-lg text-slate-900 mb-1">{apt.client}</p>
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                             <span className="text-cyan-600">{apt.service}</span>
                             <span className="h-1 w-1 rounded-full bg-slate-300" />
                             <span>com {staffMember?.name.split(' ')[0]}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className={`
                          px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border-0
                          ${apt.status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' : ''}
                          ${apt.status === 'Em andamento' ? 'bg-blue-100 text-blue-700' : ''}
                          ${apt.status === 'Aguardando' ? 'bg-amber-100 text-amber-700' : ''}
                          ${apt.status === 'Agendado' ? 'bg-purple-100 text-purple-700' : ''}
                        `}>
                          {apt.status}
                        </Badge>
                        <Avatar className="h-10 w-10 border-2 border-white shadow-md ring-2 ring-transparent group-hover:ring-cyan-100 transition-all">
                          <AvatarImage src={staffMember?.avatar} />
                          <AvatarFallback className="bg-slate-900 text-white font-bold">{staffMember?.name[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top Services */}
          <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-xl">
            <CardHeader className="border-b border-slate-100 pb-6">
              <CardTitle className="text-xl font-bold text-slate-900">Serviços em Alta</CardTitle>
              <CardDescription className="text-slate-500 font-medium">Mais solicitados hoje</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8">
                {[
                  { name: "Alongamento Gel", count: 15, val: 85, color: "bg-purple-500" },
                  { name: "Mechas", count: 10, val: 65, color: "bg-pink-500" },
                  { name: "Microblading", count: 4, val: 40, color: "bg-cyan-500" },
                  { name: "Spa dos Pés", count: 8, val: 30, color: "bg-emerald-500" },
                ].map((item, i) => (
                  <div key={i} className="space-y-3 group">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-slate-700 group-hover:text-slate-900 transition-colors">{item.name}</span>
                      <span className="text-slate-400 group-hover:text-cyan-600 transition-colors">{item.count} atendimentos</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full ${item.color} rounded-full shadow-sm transition-all duration-1000 ease-out group-hover:brightness-110`} 
                        style={{ width: `${item.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

function KpiCard({ title, value, icon: Icon, trend, trendUp, sub, color }: any) {
  const colors: any = {
    cyan: "from-cyan-500 to-blue-500 text-cyan-50",
    purple: "from-purple-500 to-pink-500 text-purple-50",
    emerald: "from-emerald-500 to-teal-500 text-emerald-50",
    blue: "from-blue-500 to-indigo-500 text-blue-50",
  };

  const iconColors: any = {
    cyan: "text-cyan-600 bg-cyan-50",
    purple: "text-purple-600 bg-purple-50",
    emerald: "text-emerald-600 bg-emerald-50",
    blue: "text-blue-600 bg-blue-50",
  };

  return (
    <Card className="border-none shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-300/40 transition-all duration-500 bg-white group hover:-translate-y-1 overflow-hidden relative">
      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${colors[color].split(' ')[0]} ${colors[color].split(' ')[2]} opacity-50 group-hover:opacity-100 transition-opacity`} />
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3.5 rounded-2xl ${iconColors[color]} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
            <Icon className="h-6 w-6" />
          </div>
          {trend && (
            <div className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-lg ${trendUp ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'}`}>
              {trendUp ? <ArrowUpRight className="h-3.5 w-3.5 mr-1 stroke-[3]" /> : <ArrowDownRight className="h-3.5 w-3.5 mr-1 stroke-[3]" />}
              {trend}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-500 mb-1 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-sans font-extrabold text-slate-900 tracking-tight">{value}</h3>
          {sub && <p className="text-xs font-medium text-slate-400 mt-2">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
