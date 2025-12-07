import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Phone, Mail, Calendar, Clock, Star, MoreHorizontal } from "lucide-react";

const clients = [
  { id: 1, name: "Fernanda Lima", lastVisit: "02 Dez", totalVisits: 14, status: "Fiel", phone: "(11) 99999-9999", img: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Juliana Paes", lastVisit: "Hoje", totalVisits: 3, status: "Novo", phone: "(11) 98888-8888", img: "https://i.pravatar.cc/150?img=5" },
  { id: 3, name: "Ricardo Souza", lastVisit: "15 Nov", totalVisits: 8, status: "Regular", phone: "(11) 97777-7777", img: "https://i.pravatar.cc/150?img=11" },
  { id: 4, name: "Patrícia Alves", lastVisit: "20 Out", totalVisits: 1, status: "Sumido", phone: "(11) 96666-6666", img: "https://i.pravatar.cc/150?img=9" },
  { id: 5, name: "Camila Torres", lastVisit: "05 Dez", totalVisits: 22, status: "VIP", phone: "(11) 95555-5555", img: "https://i.pravatar.cc/150?img=24" },
];

export default function Clients() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold">Histórico de Clientes</h2>
            <p className="text-muted-foreground">Conheça quem frequenta seu salão.</p>
          </div>
          <Button className="bg-primary text-white shadow-lg shadow-primary/20">
            + Novo Cliente
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nome ou telefone..." className="pl-9 bg-white border-none shadow-sm h-12 rounded-xl" />
        </div>

        <div className="grid gap-4">
          {clients.map((client) => (
            <Card key={client.id} className="border-none shadow-sm hover:shadow-md transition-all glass-card group">
              <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <Avatar className="h-14 w-14 ring-2 ring-white shadow-sm">
                  <AvatarImage src={client.img} />
                  <AvatarFallback>{client.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h3 className="font-bold text-lg">{client.name}</h3>
                    <Badge variant="outline" className={`
                      ${client.status === 'VIP' ? 'bg-amber-100 text-amber-700 border-amber-200' : ''}
                      ${client.status === 'Fiel' ? 'bg-purple-100 text-purple-700 border-purple-200' : ''}
                      ${client.status === 'Novo' ? 'bg-blue-100 text-blue-700 border-blue-200' : ''}
                      ${client.status === 'Sumido' ? 'bg-red-100 text-red-700 border-red-200' : ''}
                      ${client.status === 'Regular' ? 'bg-slate-100 text-slate-700 border-slate-200' : ''}
                    `}>
                      {client.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {client.phone}</span>
                    <span className="flex items-center gap-1"><HistoryIcon className="h-3 w-3" /> {client.totalVisits} visitas</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                  <div className="text-center sm:text-right">
                    <p className="text-xs text-muted-foreground">Última Visita</p>
                    <p className="font-medium">{client.lastVisit}</p>
                  </div>
                  
                  <div className="flex gap-2">
                     <Button variant="ghost" size="icon" className="h-9 w-9 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 rounded-full">
                       <Phone className="h-4 w-4" />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                       <MoreHorizontal className="h-4 w-4" />
                     </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

function HistoryIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" />
      <path d="M3 3v9h9" />
      <path d="M12 7v5l4 2" />
    </svg>
  )
}
