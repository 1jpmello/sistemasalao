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
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { staff, appointments, stats } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const chartData = [
  { time: "08h", clients: 2 },
  { time: "10h", clients: 5 },
  { time: "12h", clients: 8 },
  { time: "14h", clients: 6 },
  { time: "16h", clients: 9 },
  { time: "18h", clients: 7 },
  { time: "20h", clients: 3 },
];

export default function Dashboard() {
  const [reportModal, setReportModal] = useState(false);
  const [dashboardModal, setDashboardModal] = useState(false);

  return (
    <Layout>
      <div className="space-y-8">
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
            <h2 className="text-3xl font-serif font-bold text-foreground">Visão Geral</h2>
            <p className="text-muted-foreground">Controle total do seu salão em um lugar só.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white" onClick={() => setReportModal(true)}>Exportar Relatório</Button>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
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
          />
          <KpiCard 
            title="Agendamentos" 
            value={stats.appointmentsToday} 
            icon={Calendar} 
            trend="+5%" 
            trendUp={true}
            sub="vs. ontem"
          />
          <KpiCard 
            title="Ticket Médio" 
            value={`R$ ${stats.avgTicket}`} 
            icon={TrendingUp} 
            trend="+8%" 
            trendUp={true}
            sub="vs. semana passada"
          />
          <KpiCard 
            title="Tempo Espera" 
            value={`${stats.avgWaitTime} min`} 
            icon={Clock} 
            trend="-2%" 
            trendUp={false} // Green because lower is better for wait time? Logic usually red for down, but let's stick to visual arrows
            sub="Média do dia"
          />
        </div>

        {/* Main Content Split */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Appointments List (Replacing Chart) */}
          <Card className="lg:col-span-2 border-none shadow-sm glass-card cursor-pointer hover:shadow-md transition-all" onClick={() => setDashboardModal(true)}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Próximos Compromissos</CardTitle>
                <CardDescription>Sua agenda para as próximas horas</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.slice(0, 4).map((apt) => {
                  const staffMember = staff.find(s => s.id === apt.staffId);
                  return (
                    <div key={apt.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-xl transition-colors border border-transparent hover:border-border/50">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary font-bold">
                          <span className="text-sm">{apt.time}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{apt.client}</p>
                          <p className="text-sm text-muted-foreground">{apt.service} • com {staffMember?.name.split(' ')[0]}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className={`
                          ${apt.status === 'Concluído' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                          ${apt.status === 'Em andamento' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : ''}
                          ${apt.status === 'Aguardando' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' : ''}
                          ${apt.status === 'Agendado' ? 'bg-purple-100 text-purple-700 hover:bg-purple-100' : ''}
                        `}>
                          {apt.status}
                        </Badge>
                        <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                          <AvatarImage src={staffMember?.avatar} />
                          <AvatarFallback>{staffMember?.name[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top Services / Stats */}
          <Card className="border-none shadow-sm glass-card">
            <CardHeader>
              <CardTitle>Serviços em Alta</CardTitle>
              <CardDescription>Mais solicitados hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: "Alongamento Gel", count: 15, val: 85 },
                  { name: "Mechas", count: 10, val: 65 },
                  { name: "Microblading", count: 4, val: 40 },
                  { name: "Spa dos Pés", count: 8, val: 30 },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground">{item.count} atendimentos</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/80 rounded-full" 
                        style={{ width: `${item.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Appointments List (Removed - Merged into top section) */}
        {/*
        <Card className="border-none shadow-sm glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Próximos Agendamentos</CardTitle>
              <CardDescription>Fila de espera e agendados</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((apt) => {
                const staffMember = staff.find(s => s.id === apt.staffId);
                return (
                  <div key={apt.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-xl transition-colors border border-transparent hover:border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary font-bold">
                        <span className="text-sm">{apt.time}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{apt.client}</p>
                        <p className="text-sm text-muted-foreground">{apt.service} • com {staffMember?.name.split(' ')[0]}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className={`
                        ${apt.status === 'Concluído' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                        ${apt.status === 'Em andamento' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : ''}
                        ${apt.status === 'Aguardando' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' : ''}
                        ${apt.status === 'Agendado' ? 'bg-purple-100 text-purple-700 hover:bg-purple-100' : ''}
                      `}>
                        {apt.status}
                      </Badge>
                      <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                        <AvatarImage src={staffMember?.avatar} />
                        <AvatarFallback>{staffMember?.name[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        */}
      </div>
    </Layout>
  );
}

function KpiCard({ title, value, icon: Icon, trend, trendUp, sub }: any) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 glass-card group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <Icon className="h-5 w-5" />
          </div>
          {trend && (
            <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${trendUp ? 'text-emerald-600 bg-emerald-100' : 'text-rose-600 bg-rose-100'}`}>
              {trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {trend}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-serif font-bold text-foreground">{value}</h3>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
