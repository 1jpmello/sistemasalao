import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Download,
  Plus
} from "lucide-react";
import { staff, appointments, stats } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function AppDashboard() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-4xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">Visão Geral</h2>
            <p className="text-slate-400 font-medium text-lg mt-1">Controle total do seu salão em um lugar só.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700" data-testid="button-export-report">
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white" data-testid="button-new-appointment">
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: "Agendamentos Hoje", value: stats.appointmentsToday, change: "+12%", positive: true, icon: Calendar },
            { title: "Clientes Hoje", value: stats.clientsToday, change: "+8%", positive: true, icon: Users },
            { title: "Taxa Ocupação", value: `${stats.occupancyRate}%`, change: "+5%", positive: true, icon: Clock },
            { title: "Ticket Médio", value: `R$ ${stats.avgTicket}`, change: "+15%", positive: true, icon: TrendingUp },
          ].map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-all" data-testid={`card-stat-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <Badge variant={stat.positive ? "default" : "destructive"} className={stat.positive ? "bg-green-500/20 text-green-400" : ""}>
                    {stat.positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-400">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Próximos Agendamentos</CardTitle>
              <CardDescription className="text-slate-400">Atendimentos de hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.slice(0, 5).map((apt, index) => (
                  <div key={apt.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-700" data-testid={`row-appointment-${apt.id}`}>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-cyan-400">{apt.time}</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{apt.client}</p>
                        <p className="text-sm text-slate-400">{apt.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-slate-700 text-slate-300">{staff.find(s => s.id === apt.staffId)?.name || 'N/A'}</Badge>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white" data-testid={`button-more-${apt.id}`}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Equipe Disponível</CardTitle>
              <CardDescription className="text-slate-400">Profissionais ativos hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staff.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-700" data-testid={`card-staff-${member.id}`}>
                    <Avatar className="h-10 w-10 border border-cyan-500/30">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-cyan-500/20 text-cyan-400">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-white">{member.name}</p>
                      <p className="text-xs text-slate-400">{member.role}</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Disponível</Badge>
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
