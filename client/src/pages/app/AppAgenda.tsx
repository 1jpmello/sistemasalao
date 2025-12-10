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
  const [date, setDate] = useState<Date>(new Date());
  const [selectedStaff, setSelectedStaff] = useState<number[]>(staff.map(s => s.id));
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    }
  };

  const handleCancelAppointment = () => {
    if (selectedAppointment) {
      setAppointments(prev => prev.map(apt => 
        apt.id === selectedAppointment.id ? { ...apt, status: 'cancelled' } : apt
      ));
      setIsDrawerOpen(false);
      setSelectedAppointment(null);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Agenda</h2>
            <p className="text-slate-400">Gerencie todos os agendamentos do salão.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700" data-testid="button-filter">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white" data-testid="button-new-appointment">
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
              className="text-slate-400 hover:text-white hover:bg-slate-800"
              data-testid="button-prev-day"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700" data-testid="button-select-date">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {format(date, "EEEE, d 'de' MMMM", { locale: ptBR })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  locale={ptBR}
                  className="text-white"
                />
              </PopoverContent>
            </Popover>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setDate(addDays(date, 1))} 
              className="text-slate-400 hover:text-white hover:bg-slate-800"
              data-testid="button-next-day"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => setDate(new Date())} 
            className="text-cyan-400 hover:text-cyan-300 hover:bg-slate-800"
            data-testid="button-today"
          >
            Hoje
          </Button>
        </div>

        <Card className="flex-1 overflow-hidden bg-slate-800/50 border-slate-700">
          <div className="flex h-full">
            <div className="w-16 flex-shrink-0 border-r border-slate-700 bg-slate-900/50 pt-14">
              {timeSlots.map((slot, index) => (
                <div 
                  key={slot} 
                  className="h-[60px] text-xs text-slate-500 text-right pr-2 relative"
                  style={{ top: index === 0 ? 0 : -8 }}
                >
                  {slot}
                </div>
              ))}
            </div>

            <ScrollArea className="flex-1">
              <div className="flex min-w-max">
                {filteredStaff.map((member) => (
                  <div key={member.id} className="w-64 flex-shrink-0 border-r border-slate-700 last:border-r-0">
                    <div className="h-14 p-3 border-b border-slate-700 bg-slate-900/50 sticky top-0 z-10">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border border-cyan-500/30">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-cyan-500/20 text-cyan-400">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-white">{member.name}</p>
                          <p className="text-xs text-slate-400">{member.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative" style={{ height: timeSlots.length * SLOT_HEIGHT }}>
                      {timeSlots.map((slot, index) => (
                        <div 
                          key={slot} 
                          className="absolute w-full h-[60px] border-b border-slate-700/50"
                          style={{ top: index * SLOT_HEIGHT }}
                        />
                      ))}

                      {getAppointmentsForStaff(member.id).map((apt) => {
                        const top = getPositionFromTime(apt.time);
                        const height = getDurationHeight(apt.service);
                        const statusColors: Record<string, string> = {
                          confirmed: "bg-green-500/20 border-green-500/50 text-green-400",
                          pending: "bg-amber-500/20 border-amber-500/50 text-amber-400",
                          cancelled: "bg-red-500/20 border-red-500/50 text-red-400",
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
          <SheetContent className="bg-slate-900 border-slate-700 text-white">
            <SheetHeader>
              <SheetTitle className="text-white">Detalhes do Agendamento</SheetTitle>
              <SheetDescription className="text-slate-400">
                Informações completas do atendimento
              </SheetDescription>
            </SheetHeader>

            {selectedAppointment && (
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <Avatar className="h-14 w-14 border-2 border-cyan-500">
                    <AvatarFallback className="bg-cyan-500/20 text-cyan-400 text-xl">{selectedAppointment.client.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-bold text-white">{selectedAppointment.client}</p>
                    <Badge className={
                      selectedAppointment.status === 'confirmed' ? "bg-green-500/20 text-green-400" :
                      selectedAppointment.status === 'cancelled' ? "bg-red-500/20 text-red-400" :
                      "bg-amber-500/20 text-amber-400"
                    }>
                      {selectedAppointment.status === 'confirmed' ? 'Confirmado' : 
                       selectedAppointment.status === 'cancelled' ? 'Cancelado' : 'Pendente'}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                    <Scissors className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="text-sm text-slate-400">Serviço</p>
                      <p className="font-medium text-white">{selectedAppointment.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                    <Clock className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="text-sm text-slate-400">Horário</p>
                      <p className="font-medium text-white">{selectedAppointment.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                    <User className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="text-sm text-slate-400">Profissional</p>
                      <p className="font-medium text-white">{staff.find(s => s.id === selectedAppointment.staffId)?.name || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-slate-800 border-slate-700 text-white hover:bg-slate-700" data-testid="button-whatsapp">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="flex-1 bg-slate-800 border-slate-700 text-white hover:bg-slate-700" data-testid="button-call">
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar
                  </Button>
                </div>
              </div>
            )}

            <SheetFooter className="mt-6 flex gap-2">
              {selectedAppointment?.status !== 'confirmed' && selectedAppointment?.status !== 'cancelled' && (
                <Button onClick={handleConfirmAppointment} className="flex-1 bg-green-600 hover:bg-green-700" data-testid="button-confirm">
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
      </div>
    </AppLayout>
  );
}
