import Layout from "@/components/layout/Layout";
import { queue, staff } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, CheckCircle2, User, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

export default function Queue() {
  const waiting = queue.filter(q => q.status === 'waiting');
  const inService = queue.filter(q => q.status === 'in-service');
  const finished = queue.filter(q => q.status === 'finished');

  return (
    <Layout>
      <div className="space-y-8 h-[calc(100vh-8rem)] flex flex-col">
        <div>
          <h2 className="text-3xl font-serif font-bold">Fluxo de Atendimento</h2>
          <p className="text-muted-foreground">Acompanhe o status dos clientes em tempo real.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 flex-1 overflow-hidden">
          {/* Column 1: Waiting */}
          <Column title="Aguardando" count={waiting.length} color="bg-amber-500/10 border-amber-200">
            {waiting.map((item) => (
               <QueueCard key={item.id} item={item} color="border-l-amber-500" />
            ))}
             {/* Fake extra items to fill space */}
             <QueueCard item={{id: 99, client: "Ana Paula", service: "Avaliação", staff: "Qualquer", timeIn: "10:45"}} color="border-l-amber-500" />
          </Column>

          {/* Column 2: In Service */}
          <Column title="Em Atendimento" count={inService.length} color="bg-blue-500/10 border-blue-200">
             {inService.map((item) => (
               <QueueCard key={item.id} item={item} color="border-l-blue-500" active />
            ))}
             <QueueCard item={{id: 98, client: "Carla Dias", service: "Manicure", staff: "Júlia Costa", timeIn: "10:00"}} color="border-l-blue-500" active />
          </Column>

          {/* Column 3: Finished */}
          <Column title="Finalizado / Pagamento" count={finished.length} color="bg-green-500/10 border-green-200">
             {finished.map((item) => (
               <QueueCard key={item.id} item={item} color="border-l-green-500" />
            ))}
          </Column>
        </div>
      </div>
    </Layout>
  );
}

function Column({ title, count, children, color }: any) {
  return (
    <div className={`rounded-2xl border ${color} flex flex-col h-full max-h-full`}>
      <div className="p-4 border-b border-inherit bg-white/50 backdrop-blur-sm rounded-t-2xl flex justify-between items-center">
        <h3 className="font-bold text-foreground">{title}</h3>
        <Badge variant="secondary" className="bg-white text-foreground font-bold">{count}</Badge>
      </div>
      <div className="p-4 space-y-3 overflow-y-auto flex-1 bg-white/30">
        {children}
      </div>
    </div>
  );
}

function QueueCard({ item, color, active }: any) {
  // Find staff avatar mock
  const staffMember = staff.find(s => s.name === item.staff);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white p-4 rounded-xl shadow-sm border border-border/50 border-l-4 ${color} cursor-grab active:cursor-grabbing hover:shadow-md transition-all`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="font-bold text-sm text-foreground">{item.client}</p>
            <p className="text-xs text-muted-foreground">{item.service}</p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex items-center justify-between pt-2 border-t border-dashed">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{item.timeIn}</span>
        </div>
        
        <div className="flex items-center gap-2">
           {active && <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>}
           <Avatar className="h-6 w-6 border border-white">
            <AvatarImage src={staffMember?.avatar} />
            <AvatarFallback>S</AvatarFallback>
           </Avatar>
        </div>
      </div>
    </motion.div>
  );
}
