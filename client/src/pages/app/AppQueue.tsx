import AppLayout from "@/components/layout/AppLayout";
import { queue as initialQueue, staff } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, CheckCircle2, User, MoreVertical, Play, Pause, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AppQueue() {
  const { toast } = useToast();
  const [queue, setQueue] = useState([
    ...initialQueue,
    { id: 99, client: "Ana Paula", service: "Avaliação", staff: "Qualquer", timeIn: "10:45", status: 'waiting' },
    { id: 98, client: "Carla Dias", service: "Manicure", staff: "Júlia Costa", timeIn: "10:00", status: 'in-service' }
  ]);

  const waiting = queue.filter(q => q.status === 'waiting');
  const inService = queue.filter(q => q.status === 'in-service');
  const finished = queue.filter(q => q.status === 'finished');

  const handleStartService = (id: number) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'in-service' } : q));
    toast({ title: "Atendimento iniciado!" });
  };

  const handleFinishService = (id: number) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'finished' } : q));
    toast({ title: "Atendimento finalizado!" });
  };

  const handlePayment = (id: number) => {
    setQueue(prev => prev.filter(q => q.id !== id));
    toast({ title: "Pagamento registrado!" });
  };

  return (
    <AppLayout>
      <div className="space-y-8 h-[calc(100vh-8rem)] flex flex-col">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">Fluxo de Atendimento</h2>
          <p className="text-slate-500">Acompanhe o status dos clientes em tempo real.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 flex-1 overflow-hidden">
          <Column title="Aguardando" count={waiting.length} color="bg-amber-50 border-amber-200">
            {waiting.map((item) => (
               <QueueCard 
                 key={item.id} 
                 item={item} 
                 color="border-l-amber-500" 
                 onStart={() => handleStartService(item.id)}
               />
            ))}
          </Column>

          <Column title="Em Atendimento" count={inService.length} color="bg-cyan-50 border-cyan-200">
             {inService.map((item) => (
               <QueueCard 
                 key={item.id} 
                 item={item} 
                 color="border-l-cyan-500" 
                 active 
                 onFinish={() => handleFinishService(item.id)}
               />
            ))}
          </Column>

          <Column title="Finalizado / Pagamento" count={finished.length} color="bg-emerald-50 border-emerald-200">
             {finished.map((item) => (
               <QueueCard 
                 key={item.id} 
                 item={item} 
                 color="border-l-emerald-500" 
                 onPayment={() => handlePayment(item.id)}
               />
            ))}
          </Column>
        </div>
      </div>
    </AppLayout>
  );
}

function Column({ title, count, children, color }: any) {
  return (
    <div className={`rounded-2xl border ${color} flex flex-col h-full max-h-full bg-white shadow-xl shadow-slate-200/50`}>
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-900">{title}</h3>
        <Badge className="bg-slate-100 text-slate-600 border-0">{count}</Badge>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {children}
      </div>
    </div>
  );
}

function QueueCard({ item, color, active, onStart, onFinish, onPayment }: { item: any, color: string, active?: boolean, onStart?: () => void, onFinish?: () => void, onPayment?: () => void }) {
  const staffMember = staff.find(s => s.name === item.staff);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border border-slate-100 rounded-xl p-4 border-l-4 ${color} shadow-md ${active ? 'ring-2 ring-cyan-200' : ''}`}
      data-testid={`queue-card-${item.id}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border border-slate-200">
            <AvatarFallback className="bg-slate-100 text-slate-700 text-xs">{item.client.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-slate-900 text-sm">{item.client}</p>
            <p className="text-xs text-slate-500">{item.service}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 hover:bg-slate-100" data-testid={`button-more-queue-${item.id}`}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {item.timeIn}
        </span>
        {item.staff && (
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {item.staff}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {active ? (
          <>
            <Button size="sm" variant="outline" className="flex-1 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 text-xs" data-testid={`button-pause-${item.id}`}>
              <Pause className="h-3 w-3 mr-1" />
              Pausar
            </Button>
            <Button size="sm" onClick={onFinish} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-xs" data-testid={`button-finish-${item.id}`}>
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Finalizar
            </Button>
          </>
        ) : item.status === 'finished' ? (
          <Button size="sm" onClick={onPayment} className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-xs" data-testid={`button-payment-${item.id}`}>
            <DollarSign className="h-3 w-3 mr-1" />
            Registrar Pagamento
          </Button>
        ) : (
          <Button size="sm" onClick={onStart} className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-xs" data-testid={`button-start-${item.id}`}>
            <Play className="h-3 w-3 mr-1" />
            Iniciar Atendimento
          </Button>
        )}
      </div>
    </motion.div>
  );
}
