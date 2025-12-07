import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
  Filter,
  AlertTriangle,
  Move,
  MessageSquare
} from "lucide-react";
import { staff, appointments as initialAppointments, services } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { format, addDays, subDays, isSameDay, startOfDay, addMinutes, parse, getHours, getMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { motion, Reorder, useDragControls } from "framer-motion";

// Helper to calculate position based on time
const START_HOUR = 8;
const END_HOUR = 20;
const SLOT_HEIGHT = 60; // height per 30 mins -> 120px per hour
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

export default function Calendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedStaff, setSelectedStaff] = useState<number[]>(staff.map(s => s.id));
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [conflictModal, setConflictModal] = useState<{isOpen: boolean, appointment: any, newTime: string, newStaff: number} | null>(null);

  // Time slots for the sidebar (08:00 - 20:00, 30 min intervals)
  const timeSlots = Array.from({ length: (END_HOUR - START_HOUR) * 2 + 1 }, (_, i) => {
    const totalMinutes = i * 30;
    const hour = START_HOUR + Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  });

  // Filter appointments for today
  const todaysAppointments = useMemo(() => {
    return appointments.filter(apt => true); // In a real app check date. Mock data is timeless/generic.
  }, [appointments, date]);

  const handleAppointmentClick = (apt: any) => {
    setSelectedAppointment(apt);
    setIsDrawerOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Concluído': return 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200';
      case 'Em andamento': return 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200';
      case 'Aguardando': return 'bg-yellow-100 border-yellow-300 text-yellow-700 hover:bg-yellow-200';
      case 'Agendado': return 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm';
      case 'Cancelado': return 'bg-red-50 border-red-200 text-red-400 opacity-60';
      default: return 'bg-white border-slate-200';
    }
  };

  const handleDragEnd = (event: any, info: any, apt: any) => {
    // Mock conflict detection logic
    // If dragged significantly, show conflict modal
    if (Math.abs(info.offset.y) > 50 || Math.abs(info.offset.x) > 50) {
       setConflictModal({
         isOpen: true,
         appointment: apt,
         newTime: "14:30", // mock calculated time
         newStaff: apt.staffId // mock calculated staff
       });
    }
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-6rem)] flex flex-col gap-4">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-muted/30 rounded-lg p-1 border">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDate(subDays(date, 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="h-8 font-medium min-w-[140px]">
                    {format(date, "EEE, dd MMM", { locale: ptBR })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus />
                </PopoverContent>
              </Popover>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDate(addDays(date, 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>Hoje</Button>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex flex-col items-center">
               <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Atendimentos</span>
               <span className="font-bold text-lg">{todaysAppointments.length}</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col items-center">
               <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Vagas</span>
               <span className="font-bold text-lg text-green-600">8</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="hidden lg:flex flex-col">
               <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">Próximos</span>
               <div className="flex -space-x-2">
                 {todaysAppointments.slice(0, 3).map((apt, i) => (
                   <div key={i} className="h-6 w-6 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center text-[10px] font-bold text-primary">
                     {apt.client.charAt(0)}
                   </div>
                 ))}
               </div>
            </div>
            
            <Button className="ml-4 bg-primary text-white shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </div>
        </div>

        {/* Mobile View - List */}
        <div className="md:hidden flex-1 overflow-y-auto space-y-4 pb-20">
           <div className="flex items-center justify-between px-1">
              <h3 className="font-medium text-lg">Próximos Horários</h3>
              <Button variant="ghost" size="sm" className="text-muted-foreground">Ver todos</Button>
           </div>
           
           {todaysAppointments.map((apt) => (
             <motion.div 
               key={apt.id}
               drag="x"
               dragConstraints={{ left: -100, right: 0 }}
               className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 relative overflow-hidden group"
             >
                {/* Swipe Actions Background (Mock) */}
                <div className="absolute inset-y-0 right-0 w-24 bg-red-500 flex items-center justify-center text-white -z-10 rounded-r-xl">
                   <X className="h-6 w-6" />
                </div>
                
                <div className="flex items-start gap-4 bg-white z-10 relative">
                   <div className="flex flex-col items-center min-w-[3rem]">
                      <span className="text-lg font-bold text-foreground">{apt.time}</span>
                      <span className="text-xs text-muted-foreground uppercase">Hoje</span>
                   </div>
                   
                   <div className="h-10 w-1 rounded-full bg-primary/20" />
                   
                   <div className="flex-1 min-w-0">
                      <h4 className="font-bold truncate">{apt.client}</h4>
                      <p className="text-sm text-muted-foreground truncate">{apt.service}</p>
                      <div className="flex items-center gap-2 mt-2">
                         <Avatar className="h-5 w-5">
                            <AvatarImage src={staff.find(s => s.id === apt.staffId)?.avatar} />
                            <AvatarFallback>S</AvatarFallback>
                         </Avatar>
                         <span className="text-xs text-muted-foreground">{staff.find(s => s.id === apt.staffId)?.name}</span>
                      </div>
                   </div>
                   
                   <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0.5 h-auto", getStatusColor(apt.status))}>
                      {apt.status}
                   </Badge>
                </div>
                
                {/* Mobile Actions */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t">
                   <Button size="sm" variant="ghost" className="h-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                      <Check className="h-4 w-4 mr-2" /> Confirmar
                   </Button>
                   <Button size="sm" variant="ghost" className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                      <X className="h-4 w-4 mr-2" /> Cancelar
                   </Button>
                </div>
             </motion.div>
           ))}
           
           {/* Mobile FAB */}
           <Button 
             className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl bg-primary text-white z-50 flex items-center justify-center"
           >
             <Plus className="h-6 w-6" />
           </Button>
        </div>

        {/* Main Content Area - Desktop */}
        <div className="hidden md:flex flex-1 gap-4 overflow-hidden">
          {/* Left Panel - Filters */}
          <Card className="w-64 hidden xl:flex flex-col border-none shadow-sm h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Profissionais</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pr-2">
              <div className="space-y-3">
                {staff.map((s) => (
                  <div key={s.id} className="flex items-center justify-between group cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                          <AvatarImage src={s.avatar} />
                          <AvatarFallback>{s.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className={cn("absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white", s.status === 'Disponível' || s.status === 'Livre' ? 'bg-green-500' : 'bg-amber-500')} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none">{s.name}</span>
                        <span className="text-xs text-muted-foreground mt-1">{s.role}</span>
                      </div>
                    </div>
                    <Check className={cn("h-4 w-4 text-primary", !selectedStaff.includes(s.id) && "opacity-0")} />
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                 <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Legenda</h4>
                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
                   <div className="w-3 h-3 rounded-sm bg-green-100 border border-green-300" /> Confirmado
                 </div>
                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
                   <div className="w-3 h-3 rounded-sm bg-yellow-100 border border-yellow-300" /> Aguardando
                 </div>
                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
                   <div className="w-3 h-3 rounded-sm bg-blue-100 border border-blue-300" /> Em atendimento
                 </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Grid */}
          <div className="flex-1 bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col relative">
            
            {/* Onboarding Hint */}
            <div className="bg-blue-50 text-blue-700 px-4 py-2 text-xs flex items-center justify-between border-b border-blue-100">
               <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span><strong>Dica:</strong> Arraste os cards para mudar o horário ou clique para ver detalhes.</span>
               </div>
               <Button variant="ghost" size="icon" className="h-5 w-5 text-blue-700 hover:bg-blue-100 rounded-full">
                  <X className="h-3 w-3" />
               </Button>
            </div>

            {/* Header - Staff Columns */}
            <div className="flex border-b sticky top-0 bg-white z-20 shadow-sm">
              <div className="w-16 flex-shrink-0 border-r bg-muted/5 flex items-center justify-center">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 grid grid-cols-4 divide-x">
                {staff.filter(s => selectedStaff.includes(s.id)).map((s) => (
                   <div key={s.id} className="p-3 flex items-center gap-3 justify-center min-w-[140px]">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={s.avatar} />
                        <AvatarFallback>{s.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium truncate">{s.name}</span>
                   </div>
                ))}
              </div>
            </div>

            {/* Scrollable Timeline */}
            <ScrollArea className="flex-1 relative bg-slate-50/30">
              <div className="flex relative" style={{ height: (END_HOUR - START_HOUR + 1) * 2 * SLOT_HEIGHT }}>
                 {/* Time Axis */}
                 <div className="w-16 flex-shrink-0 border-r bg-white flex flex-col text-xs text-muted-foreground font-medium sticky left-0 z-10">
                   {timeSlots.map((time, i) => (
                     <div key={time} className="h-[60px] flex items-start justify-center pt-2 border-b border-dashed border-slate-100 relative">
                        {time}
                     </div>
                   ))}
                 </div>

                 {/* Columns Background */}
                 <div className="flex-1 grid grid-cols-4 divide-x h-full absolute inset-0 pl-16 w-full">
                    {staff.filter(s => selectedStaff.includes(s.id)).map((s, colIndex) => (
                      <div key={s.id} className="relative h-full">
                         {/* Horizontal Lines */}
                         {timeSlots.map((_, i) => (
                            <div key={i} className="h-[60px] border-b border-slate-100 w-full absolute top-0 left-0" style={{ top: i * 60 }} />
                         ))}

                         {/* Current Time Line Mockup */}
                         {colIndex === 0 && (
                           <div className="absolute top-[320px] left-0 right-0 w-[400%] h-0.5 bg-red-400 z-10 flex items-center pointer-events-none">
                             <div className="w-2 h-2 rounded-full bg-red-500 -ml-1" />
                           </div>
                         )}
                         
                         {/* Appointments */}
                         {todaysAppointments.filter(apt => apt.staffId === s.id).map((apt) => (
                           <motion.div
                             key={apt.id}
                             drag
                             dragMomentum={false}
                             onDragEnd={(e, info) => handleDragEnd(e, info, apt)}
                             whileDrag={{ scale: 1.05, zIndex: 50, opacity: 0.9 }}
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             className={cn(
                               "absolute left-1 right-1 rounded-md border p-2 text-xs cursor-pointer overflow-hidden transition-all group",
                               getStatusColor(apt.status)
                             )}
                             style={{
                               top: getPositionFromTime(apt.time),
                               height: getDurationHeight(apt.service)
                             }}
                             onClick={() => handleAppointmentClick(apt)}
                           >
                             <div className="flex justify-between items-start">
                               <span className="font-bold truncate">{apt.time}</span>
                               <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity bg-white/50 rounded p-0.5 backdrop-blur-sm">
                                  <MessageCircle className="h-3 w-3 text-green-600" />
                                  <Move className="h-3 w-3 text-slate-500" />
                               </div>
                             </div>
                             <p className="font-bold mt-0.5 truncate text-sm">{apt.client}</p>
                             <p className="truncate opacity-80">{apt.service}</p>
                           </motion.div>
                         ))}
                      </div>
                    ))}
                 </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Appointment Drawer */}
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetContent className="sm:max-w-md overflow-y-auto">
            {selectedAppointment && (
              <div className="space-y-6">
                <SheetHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={cn("px-2 py-0.5 rounded-full text-xs font-normal border-0", getStatusColor(selectedAppointment.status))}>
                      {selectedAppointment.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{format(date, "dd MMMM yyyy", { locale: ptBR })}</span>
                  </div>
                  <SheetTitle className="text-2xl">{selectedAppointment.service}</SheetTitle>
                  <SheetDescription>
                    Agendado para as {selectedAppointment.time} com {staff.find(s => s.id === selectedAppointment.staffId)?.name}
                  </SheetDescription>
                </SheetHeader>

                <div className="flex items-center gap-4 p-4 border rounded-xl bg-muted/20">
                  <Avatar className="h-12 w-12 border-2 border-white">
                    <AvatarFallback>{selectedAppointment.client[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-bold text-base">{selectedAppointment.client}</h4>
                    <p className="text-xs text-muted-foreground">Cliente recorrente • 12 visitas</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-8 w-8 rounded-full text-green-600 border-green-200 hover:bg-green-50">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Detalhes</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs">Duração</span>
                      </div>
                      <p className="font-medium">60 min</p>
                    </div>
                    <div className="border p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Scissors className="h-4 w-4" />
                        <span className="text-xs">Profissional</span>
                      </div>
                      <p className="font-medium">{staff.find(s => s.id === selectedAppointment.staffId)?.name}</p>
                    </div>
                  </div>
                  
                  <div className="border p-3 rounded-lg">
                     <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs">Notas internas</span>
                     </div>
                     <p className="text-sm">Cliente prefere produtos sem sulfato. Oferecer hidratação na próxima visita.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Histórico Recente</h4>
                  <div className="space-y-3 relative before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-border">
                    {[1, 2].map((_, i) => (
                      <div key={i} className="flex gap-3 relative pl-6">
                        <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-muted border-2 border-background z-10" />
                        <div>
                          <p className="text-sm font-medium">Corte Feminino</p>
                          <p className="text-xs text-muted-foreground">20 Nov • R$ 80,00</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <SheetFooter className="flex-col sm:flex-col gap-2">
                   <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Confirmar Presença</Button>
                   <div className="grid grid-cols-2 gap-2 w-full">
                     <Button variant="outline" className="w-full">Reagendar</Button>
                     <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">Cancelar</Button>
                   </div>
                </SheetFooter>
              </div>
            )}
          </SheetContent>
        </Sheet>
        
        {/* Conflict Dialog */}
        <Popover open={!!conflictModal} onOpenChange={(open) => !open && setConflictModal(null)}>
           <PopoverContent className="w-80" align="center">
              <div className="space-y-4">
                 <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="h-5 w-5" />
                    <h4 className="font-bold">Conflito de Horário</h4>
                 </div>
                 <p className="text-sm text-muted-foreground">
                   O horário <strong>{conflictModal?.newTime}</strong> já está ocupado ou indisponível para este profissional.
                 </p>
                 <div className="flex flex-col gap-2">
                    <Button size="sm" variant="secondary" onClick={() => setConflictModal(null)}>Forçar Agendamento</Button>
                    <Button size="sm" className="bg-primary text-white" onClick={() => setConflictModal(null)}>Sugerir Próximo Horário</Button>
                    <Button size="sm" variant="ghost" className="text-red-500" onClick={() => setConflictModal(null)}>Cancelar</Button>
                 </div>
              </div>
           </PopoverContent>
        </Popover>
      </div>
    </Layout>
  );
}
