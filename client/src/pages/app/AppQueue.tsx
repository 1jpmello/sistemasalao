import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, CheckCircle2, User, MoreVertical, Play, Pause, DollarSign, Plus, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface QueueItem {
  id: number;
  client: string;
  service: string;
  staff: string;
  timeIn: string;
  status: 'waiting' | 'in-service' | 'finished';
}

export default function AppQueue() {
  const { toast } = useToast();
  const [queue, setQueue] = useState<QueueItem[]>([]);

  const waiting = queue.filter(q => q.status === 'waiting');
  const inService = queue.filter(q => q.status === 'in-service');
  const finished = queue.filter(q => q.status === 'finished');

  const handleStartService = (id: number) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'in-service' as const } : q));
    toast({ title: "Atendimento iniciado!" });
  };

  const handleFinishService = (id: number) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'finished' as const } : q));
    toast({ title: "Atendimento finalizado!" });
  };

  const handlePayment = (id: number) => {
    setQueue(prev => prev.filter(q => q.id !== id));
    toast({ title: "Pagamento registrado!" });
  };

  const addToQueue = () => {
    const newItem: QueueItem = {
      id: Date.now(),
      client: "Novo Cliente",
      service: "Atendimento",
      staff: "Disponível",
      timeIn: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      status: 'waiting'
    };
    setQueue(prev => [...prev, newItem]);
    toast({ title: "Cliente adicionado à fila!" });
  };

  return (
    <AppLayout>
      <div className="space-y-8 h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">Fluxo de Atendimento</h2>
            <p className="text-slate-500">Acompanhe o status dos clientes em tempo real.</p>
          </div>
          <Button 
            onClick={addToQueue}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 font-bold"
            data-testid="button-add-queue"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Cliente
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 flex-1 overflow-hidden">
          <Column title="Aguardando" count={waiting.length} color="bg-amber-50 border-amber-200">
            {waiting.length === 0 ? (
              <EmptyState text="Nenhum cliente aguardando" />
            ) : (
              waiting.map((item) => (
                <QueueCard 
                  key={item.id} 
                  item={item} 
                  color="border-l-amber-500" 
                  onStart={() => handleStartService(item.id)}
                />
              ))
            )}
          </Column>

          <Column title="Em Atendimento" count={inService.length} color="bg-cyan-50 border-cyan-200">
            {inService.length === 0 ? (
              <EmptyState text="Nenhum atendimento em andamento" />
            ) : (
              inService.map((item) => (
                <QueueCard 
                  key={item.id} 
                  item={item} 
                  color="border-l-cyan-500" 
                  active 
                  onFinish={() => handleFinishService(item.id)}
                />
              ))
            )}
          </Column>

          <Column title="Finalizado / Pagamento" count={finished.length} color="bg-emerald-50 border-emerald-200">
            {finished.length === 0 ? (
              <EmptyState text="Nenhum atendimento finalizado" />
            ) : (
              finished.map((item) => (
                <QueueCard 
                  key={item.id} 
                  item={item} 
                  color="border-l-emerald-500" 
                  onPayment={() => handlePayment(item.id)}
                />
              ))
            )}
          </Column>
        </div>
      </div>
    </AppLayout>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-slate-400">
      <Users className="h-10 w-10 mb-2 opacity-30" />
      <p className="text-sm text-center">{text}</p>
    </div>
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

function QueueCard({ item, color, active, onStart, onFinish, onPayment }: { 
  item: QueueItem, 
  color: string, 
  active?: boolean, 
  onStart?: () => void, 
  onFinish?: () => void, 
  onPayment?: () => void 
}) {
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
