import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Search, Phone, Mail, Calendar, Clock, Star, MoreHorizontal, Plus, MessageCircle, History } from "lucide-react";

const clients = [
  { id: 1, name: "Fernanda Lima", lastVisit: "02 Dez", totalVisits: 14, status: "Fiel", phone: "(11) 99999-9999", email: "fernanda@email.com", img: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Juliana Paes", lastVisit: "Hoje", totalVisits: 3, status: "Novo", phone: "(11) 98888-8888", email: "juliana@email.com", img: "https://i.pravatar.cc/150?img=5" },
  { id: 3, name: "Ricardo Souza", lastVisit: "15 Nov", totalVisits: 8, status: "Regular", phone: "(11) 97777-7777", email: "ricardo@email.com", img: "https://i.pravatar.cc/150?img=11" },
  { id: 4, name: "Patrícia Alves", lastVisit: "20 Out", totalVisits: 1, status: "Sumido", phone: "(11) 96666-6666", email: "patricia@email.com", img: "https://i.pravatar.cc/150?img=9" },
  { id: 5, name: "Camila Torres", lastVisit: "05 Dez", totalVisits: 22, status: "VIP", phone: "(11) 95555-5555", email: "camila@email.com", img: "https://i.pravatar.cc/150?img=24" },
];

export default function AppClients() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VIP": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Fiel": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Regular": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Novo": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "Sumido": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Clientes</h2>
            <p className="text-slate-400">Gerencie o histórico e informações dos seus clientes.</p>
          </div>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white" data-testid="button-add-client">
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <Input 
            placeholder="Buscar por nome ou telefone..." 
            className="pl-9 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="input-search-clients"
          />
        </div>

        <div className="grid gap-4">
          {filteredClients.map((client) => (
            <Card key={client.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-all" data-testid={`card-client-${client.id}`}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-cyan-500/30">
                      <AvatarImage src={client.img} />
                      <AvatarFallback className="bg-cyan-500/20 text-cyan-400">{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white">{client.name}</h3>
                        <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {client.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Última visita: {client.lastVisit}
                        </span>
                        <span className="flex items-center gap-1">
                          <History className="h-3 w-3" />
                          {client.totalVisits} visitas
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700" data-testid={`button-whatsapp-${client.id}`}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700" data-testid={`button-history-${client.id}`}>
                      <History className="h-4 w-4 mr-2" />
                      Histórico
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-700" data-testid={`button-more-${client.id}`}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
