import AppLayout from "@/components/layout/AppLayout";
import { queue, staff } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, CheckCircle2, User, MoreVertical, Play, Pause, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AppQueue() {
  const waiting = queue.filter(q => q.status === 'waiting');
  const inService = queue.filter(q => q.status === 'in-service');
  const finished = queue.filter(q => q.status === 'finished');

  return (
    <AppLayout>
      <div className="space-y-8 h-[calc(100vh-8rem)] flex flex-col">
        <div>
          <h2 className="text-3xl font-bold text-white">Fluxo de Atendimento</h2>
          <p className="text-slate-400">Acompanhe o status dos clientes em tempo real.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 flex-1 overflow-hidden">
          <Column title="Aguardando" count={waiting.length + 1} color="bg-amber-500/10 border-amber-500/30">
            {waiting.map((item) => (
               <QueueCard key={item.id} item={item} color="border-l-amber-500" />
            ))}
             <QueueCard item={{id: 99, client: "Ana Paula", service: "Avaliação", staff: "Qualquer", timeIn: "10:45"}} color="border-l-amber-500" />
          </Column>

          <Column title="Em Atendimento" count={inService.length + 1} color="bg-cyan-500/10 border-cyan-500/30">
             {inService.map((item) => (
               <QueueCard key={item.id} item={item} color="border-l-cyan-500" active />
            ))}
             <QueueCard item={{id: 98, client: "Carla Dias", service: "Manicure", staff: "Júlia Costa", timeIn: "10:00"}} color="border-l-cyan-500" active />
          </Column>

          <Column title="Finalizado / Pagamento" count={finished.length} color="bg-green-500/10 border-green-500/30">
             {finished.map((item) => (
               <QueueCard key={item.id} item={item} color="border-l-green-500" />
            ))}
          </Column>
        </div>
      </div>
    </AppLayout>
  );
}

function Column({ title, count, children, color }: any) {
  return (
    <div className={`rounded-2xl border ${color} flex flex-col h-full max-h-full bg-slate-800/30`}>
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
        <h3 className="font-bold text-white">{title}</h3>
        <Badge className="bg-slate-700 text-slate-300">{count}</Badge>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {children}
      </div>
    </div>
  );
}

function QueueCard({ item, color, active }: { item: any, color: string, active?: boolean }) {
  const staffMember = staff.find(s => s.name === item.staff);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-slate-800 border border-slate-700 rounded-xl p-4 border-l-4 ${color} ${active ? 'ring-2 ring-cyan-500/30' : ''}`}
      data-testid={`queue-card-${item.id}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border border-slate-600">
            <AvatarFallback className="bg-slate-700 text-white text-xs">{item.client.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-white text-sm">{item.client}</p>
            <p className="text-xs text-slate-400">{item.service}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700" data-testid={`button-more-queue-${item.id}`}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {item.timeIn}
        </span>
        {staffMember && (
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {item.staff}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {active ? (
          <>
            <Button size="sm" variant="outline" className="flex-1 bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700 text-xs" data-testid={`button-pause-${item.id}`}>
              <Pause className="h-3 w-3 mr-1" />
              Pausar
            </Button>
            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-xs" data-testid={`button-finish-${item.id}`}>
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Finalizar
            </Button>
          </>
        ) : item.status === 'finished' ? (
          <Button size="sm" className="w-full bg-cyan-500 hover:bg-cyan-600 text-xs" data-testid={`button-payment-${item.id}`}>
            <DollarSign className="h-3 w-3 mr-1" />
            Registrar Pagamento
          </Button>
        ) : (
          <Button size="sm" className="w-full bg-cyan-500 hover:bg-cyan-600 text-xs" data-testid={`button-start-${item.id}`}>
            <Play className="h-3 w-3 mr-1" />
            Iniciar Atendimento
          </Button>
        )}
      </div>
    </motion.div>
  );
}
