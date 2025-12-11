import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Download,
  Plus,
  X
} from "lucide-react";
import { staff, appointments as initialAppointments, stats, services } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export default function AppDashboard() {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    client: "",
    service: "",
    staffId: "",
    time: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleCreateAppointment = () => {
    if (!newAppointment.client || !newAppointment.service || !newAppointment.staffId || !newAppointment.time) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const appointment = {
      id: Date.now(),
      client: newAppointment.client,
      service: newAppointment.service,
      staffId: parseInt(newAppointment.staffId),
      time: newAppointment.time,
      status: "pending" as const
    };

    setAppointments(prev => [...prev, appointment]);
    setIsNewAppointmentOpen(false);
    setNewAppointment({ client: "", service: "", staffId: "", time: "", date: new Date().toISOString().split('T')[0] });
    
    toast({
      title: "Agendamento criado!",
      description: `${appointment.client} às ${appointment.time}`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-4xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">Visão Geral</h2>
            <p className="text-slate-500 font-medium text-lg mt-1">Controle total do seu salão em um lugar só.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white/50 backdrop-blur-sm border-slate-200 text-slate-700 hover:bg-white hover:text-slate-900 font-semibold" data-testid="button-export-report">
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
            <Button 
              onClick={() => setIsNewAppointmentOpen(true)}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 font-bold tracking-wide transition-all hover:scale-105" 
              data-testid="button-new-appointment"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Clientes Hoje", value: stats.clientsToday, change: "+12%", positive: true, icon: Users, color: "cyan" },
            { title: "Agendamentos", value: stats.appointmentsToday, change: "+5%", positive: true, icon: Calendar, color: "purple" },
            { title: "Ticket Médio", value: `R$ ${stats.avgTicket}`, change: "+8%", positive: true, icon: TrendingUp, color: "emerald" },
            { title: "Tempo Espera", value: `${stats.avgWaitTime} min`, change: "-2%", positive: false, icon: Clock, color: "blue" },
          ].map((stat, index) => (
            <KpiCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-xl">
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
                {appointments.slice(0, 5).map((apt) => {
                  const staffMember = staff.find(s => s.id === apt.staffId);
                  return (
                    <div key={apt.id} className="flex items-center justify-between p-4 hover:bg-white rounded-2xl transition-all duration-300 border border-transparent hover:border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 group" data-testid={`row-appointment-${apt.id}`}>
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
                          ${apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : ''}
                          ${apt.status === 'pending' ? 'bg-amber-100 text-amber-700' : ''}
                          ${apt.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
                        `}>
                          {apt.status === 'confirmed' ? 'Confirmado' : apt.status === 'pending' ? 'Pendente' : 'Cancelado'}
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

          <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-xl">
            <CardHeader className="border-b border-slate-100 pb-6">
              <CardTitle className="text-xl font-bold text-slate-900">Equipe Disponível</CardTitle>
              <CardDescription className="text-slate-500 font-medium">Profissionais ativos hoje</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {staff.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-all" data-testid={`card-staff-${member.id}`}>
                    <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-cyan-100 text-cyan-700">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{member.name}</p>
                      <p className="text-xs text-slate-500">{member.role}</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 border-0">Disponível</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
            <DialogDescription>
              Preencha os dados para criar um novo agendamento.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="client">Nome do Cliente</Label>
              <Input
                id="client"
                placeholder="Digite o nome do cliente"
                value={newAppointment.client}
                onChange={(e) => setNewAppointment(prev => ({ ...prev, client: e.target.value }))}
                data-testid="input-client-name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="service">Serviço</Label>
              <Select value={newAppointment.service} onValueChange={(value) => setNewAppointment(prev => ({ ...prev, service: value }))}>
                <SelectTrigger data-testid="select-service">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.name}>{service.name} - R$ {service.price}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="staff">Profissional</Label>
              <Select value={newAppointment.staffId} onValueChange={(value) => setNewAppointment(prev => ({ ...prev, staffId: value }))}>
                <SelectTrigger data-testid="select-staff">
                  <SelectValue placeholder="Selecione o profissional" />
                </SelectTrigger>
                <SelectContent>
                  {staff.map((member) => (
                    <SelectItem key={member.id} value={member.id.toString()}>{member.name} - {member.specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))}
                  data-testid="input-date"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Horário</Label>
                <Input
                  id="time"
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment(prev => ({ ...prev, time: e.target.value }))}
                  data-testid="input-time"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>Cancelar</Button>
            <Button onClick={handleCreateAppointment} className="bg-gradient-to-r from-cyan-600 to-blue-600" data-testid="button-confirm-appointment">
              Criar Agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

function KpiCard({ title, value, icon: Icon, change, positive, color }: any) {
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
    <Card className="border-none shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-300/40 transition-all duration-500 bg-white group hover:-translate-y-1 overflow-hidden relative" data-testid={`card-kpi-${title.toLowerCase().replace(' ', '-')}`}>
      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${colors[color].split(' ')[0]} ${colors[color].split(' ')[2]} opacity-50 group-hover:opacity-100 transition-opacity`} />
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3.5 rounded-2xl ${iconColors[color]} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
            <Icon className="h-6 w-6" />
          </div>
          {change && (
            <div className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-lg ${positive ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'}`}>
              {positive ? <ArrowUpRight className="h-3.5 w-3.5 mr-1 stroke-[3]" /> : <ArrowDownRight className="h-3.5 w-3.5 mr-1 stroke-[3]" />}
              {change}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-500 mb-1 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-sans font-extrabold text-slate-900 tracking-tight">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
