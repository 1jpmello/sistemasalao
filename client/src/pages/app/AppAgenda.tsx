import { useState, useMemo } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MoreVertical, 
  Check, 
  X, 
  MessageCircle, 
  Phone,
  User,
  Scissors,
  Plus,
  Filter
} from "lucide-react";
import { staff, appointments as initialAppointments, services } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { format, addDays, subDays, isSameDay, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
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

const START_HOUR = 8;
const END_HOUR = 20;
const SLOT_HEIGHT = 60;
const PIXELS_PER_MINUTE = SLOT_HEIGHT / 30;

const getPositionFromTime = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const totalMinutes = (hours - START_HOUR) * 60 + minutes;
  return totalMinutes * PIXELS_PER_MINUTE;
};

const getDurationHeight = (serviceName: string) => {
  const service = services.find(s => s.name === serviceName);
  const duration = service ? service.duration : 60;
  return duration * PIXELS_PER_MINUTE;
};

export default function AppAgenda() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedStaff, setSelectedStaff] = useState<number[]>(staff.map(s => s.id));
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    client: "",
    service: "",
    staffId: "",
    time: "",
  });

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = START_HOUR; hour < END_HOUR; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  }, []);

  const filteredStaff = staff.filter(s => selectedStaff.includes(s.id));

  const getAppointmentsForStaff = (staffId: number) => {
    return appointments.filter(apt => apt.staffId === staffId);
  };

  const handleOpenAppointment = (apt: any) => {
    setSelectedAppointment(apt);
    setIsDrawerOpen(true);
  };

  const handleConfirmAppointment = () => {
    if (selectedAppointment) {
      setAppointments(prev => prev.map(apt => 
        apt.id === selectedAppointment.id ? { ...apt, status: 'confirmed' } : apt
      ));
      setSelectedAppointment({ ...selectedAppointment, status: 'confirmed' });
      toast({
        title: "Agendamento confirmado!",
        description: `${selectedAppointment.client} às ${selectedAppointment.time}`,
      });
    }
  };

  const handleCancelAppointment = () => {
    if (selectedAppointment) {
      setAppointments(prev => prev.map(apt => 
        apt.id === selectedAppointment.id ? { ...apt, status: 'cancelled' } : apt
      ));
      setIsDrawerOpen(false);
      setSelectedAppointment(null);
      toast({
        title: "Agendamento cancelado",
        variant: "destructive"
      });
    }
  };

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
    setNewAppointment({ client: "", service: "", staffId: "", time: "" });
    
    toast({
      title: "Agendamento criado!",
      description: `${appointment.client} às ${appointment.time}`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">Agenda</h2>
            <p className="text-slate-500">Gerencie todos os agendamentos do salão.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white/50 border-slate-200 text-slate-700 hover:bg-white" data-testid="button-filter">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            <Button 
              onClick={() => setIsNewAppointmentOpen(true)}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 font-bold" 
              data-testid="button-new-appointment"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setDate(subDays(date, 1))} 
              className="text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              data-testid="button-prev-day"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50" data-testid="button-select-date">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {format(date, "EEEE, d 'de' MMMM", { locale: ptBR })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setDate(addDays(date, 1))} 
              className="text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              data-testid="button-next-day"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => setDate(new Date())} 
            className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
            data-testid="button-today"
          >
            Hoje
          </Button>
        </div>

        <Card className="flex-1 overflow-hidden border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
          <div className="flex h-full">
            <div className="w-16 flex-shrink-0 border-r border-slate-100 bg-slate-50/50 pt-14">
              {timeSlots.map((slot, index) => (
                <div 
                  key={slot} 
                  className="h-[60px] text-xs text-slate-400 text-right pr-2 relative"
                  style={{ top: index === 0 ? 0 : -8 }}
                >
                  {slot}
                </div>
              ))}
            </div>

            <ScrollArea className="flex-1">
              <div className="flex min-w-max">
                {filteredStaff.map((member) => (
                  <div key={member.id} className="w-64 flex-shrink-0 border-r border-slate-100 last:border-r-0">
                    <div className="h-14 p-3 border-b border-slate-100 bg-slate-50/50 sticky top-0 z-10">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-cyan-100 text-cyan-700">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{member.name}</p>
                          <p className="text-xs text-slate-500">{member.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative" style={{ height: timeSlots.length * SLOT_HEIGHT }}>
                      {timeSlots.map((slot, index) => (
                        <div 
                          key={slot} 
                          className="absolute w-full h-[60px] border-b border-slate-100/50"
                          style={{ top: index * SLOT_HEIGHT }}
                        />
                      ))}

                      {getAppointmentsForStaff(member.id).map((apt) => {
                        const top = getPositionFromTime(apt.time);
                        const height = getDurationHeight(apt.service);
                        const statusColors: Record<string, string> = {
                          confirmed: "bg-emerald-50 border-emerald-200 text-emerald-700",
                          pending: "bg-amber-50 border-amber-200 text-amber-700",
                          cancelled: "bg-red-50 border-red-200 text-red-700",
                        };

                        return (
                          <div
                            key={apt.id}
                            className={cn(
                              "absolute left-1 right-1 rounded-lg p-2 border cursor-pointer transition-all hover:shadow-lg",
                              statusColors[apt.status] || statusColors.pending
                            )}
                            style={{ top, height: Math.max(height - 4, 40) }}
                            onClick={() => handleOpenAppointment(apt)}
                            data-testid={`appointment-${apt.id}`}
                          >
                            <p className="text-xs font-semibold truncate">{apt.client}</p>
                            <p className="text-xs opacity-80 truncate">{apt.service}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" />
                              <span className="text-xs">{apt.time}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>

        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetContent className="bg-white border-slate-200">
            <SheetHeader>
              <SheetTitle className="text-slate-900">Detalhes do Agendamento</SheetTitle>
              <SheetDescription className="text-slate-500">
                Informações completas do atendimento
              </SheetDescription>
            </SheetHeader>

            {selectedAppointment && (
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <Avatar className="h-14 w-14 border-2 border-cyan-500">
                    <AvatarFallback className="bg-cyan-100 text-cyan-700 text-xl">{selectedAppointment.client.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-bold text-slate-900">{selectedAppointment.client}</p>
                    <Badge className={
                      selectedAppointment.status === 'confirmed' ? "bg-emerald-100 text-emerald-700 border-0" :
                      selectedAppointment.status === 'cancelled' ? "bg-red-100 text-red-700 border-0" :
                      "bg-amber-100 text-amber-700 border-0"
                    }>
                      {selectedAppointment.status === 'confirmed' ? 'Confirmado' : 
                       selectedAppointment.status === 'cancelled' ? 'Cancelado' : 'Pendente'}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50">
                    <Scissors className="h-5 w-5 text-cyan-600" />
                    <div>
                      <p className="text-sm text-slate-500">Serviço</p>
                      <p className="font-medium text-slate-900">{selectedAppointment.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50">
                    <Clock className="h-5 w-5 text-cyan-600" />
                    <div>
                      <p className="text-sm text-slate-500">Horário</p>
                      <p className="font-medium text-slate-900">{selectedAppointment.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50">
                    <User className="h-5 w-5 text-cyan-600" />
                    <div>
                      <p className="text-sm text-slate-500">Profissional</p>
                      <p className="font-medium text-slate-900">{staff.find(s => s.id === selectedAppointment.staffId)?.name || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-white border-slate-200 text-slate-700 hover:bg-slate-50" data-testid="button-whatsapp">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="flex-1 bg-white border-slate-200 text-slate-700 hover:bg-slate-50" data-testid="button-call">
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar
                  </Button>
                </div>
              </div>
            )}

            <SheetFooter className="mt-6 flex gap-2">
              {selectedAppointment?.status !== 'confirmed' && selectedAppointment?.status !== 'cancelled' && (
                <Button onClick={handleConfirmAppointment} className="flex-1 bg-emerald-600 hover:bg-emerald-700" data-testid="button-confirm">
                  <Check className="h-4 w-4 mr-2" />
                  Confirmar
                </Button>
              )}
              {selectedAppointment?.status !== 'cancelled' && (
                <Button onClick={handleCancelAppointment} variant="destructive" className="flex-1" data-testid="button-cancel">
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>

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
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>Cancelar</Button>
              <Button onClick={handleCreateAppointment} className="bg-gradient-to-r from-cyan-600 to-blue-600" data-testid="button-confirm-appointment">
                Criar Agendamento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
