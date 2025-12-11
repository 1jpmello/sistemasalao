import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Search, Phone, Mail, Calendar, Clock, Star, MoreHorizontal, Plus, MessageCircle, History } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const initialClients = [
  { id: 1, name: "Fernanda Lima", lastVisit: "02 Dez", totalVisits: 14, status: "Fiel", phone: "(11) 99999-9999", email: "fernanda@email.com", img: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Juliana Paes", lastVisit: "Hoje", totalVisits: 3, status: "Novo", phone: "(11) 98888-8888", email: "juliana@email.com", img: "https://i.pravatar.cc/150?img=5" },
  { id: 3, name: "Ricardo Souza", lastVisit: "15 Nov", totalVisits: 8, status: "Regular", phone: "(11) 97777-7777", email: "ricardo@email.com", img: "https://i.pravatar.cc/150?img=11" },
  { id: 4, name: "Patrícia Alves", lastVisit: "20 Out", totalVisits: 1, status: "Sumido", phone: "(11) 96666-6666", email: "patricia@email.com", img: "https://i.pravatar.cc/150?img=9" },
  { id: 5, name: "Camila Torres", lastVisit: "05 Dez", totalVisits: 22, status: "VIP", phone: "(11) 95555-5555", email: "camila@email.com", img: "https://i.pravatar.cc/150?img=24" },
];

export default function AppClients() {
  const { toast } = useToast();
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VIP": return "bg-purple-100 text-purple-700 border-0";
      case "Fiel": return "bg-emerald-100 text-emerald-700 border-0";
      case "Regular": return "bg-blue-100 text-blue-700 border-0";
      case "Novo": return "bg-cyan-100 text-cyan-700 border-0";
      case "Sumido": return "bg-red-100 text-red-700 border-0";
      default: return "bg-slate-100 text-slate-700 border-0";
    }
  };

  const handleAddClient = () => {
    if (!newClient.name || !newClient.phone) {
      toast({
        title: "Erro",
        description: "Preencha nome e telefone.",
        variant: "destructive"
      });
      return;
    }

    const client = {
      id: Date.now(),
      name: newClient.name,
      phone: newClient.phone,
      email: newClient.email || "",
      lastVisit: "Hoje",
      totalVisits: 0,
      status: "Novo",
      img: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };

    setClients(prev => [client, ...prev]);
    setIsAddModalOpen(false);
    setNewClient({ name: "", phone: "", email: "" });
    toast({
      title: "Cliente adicionado!",
      description: `${client.name} foi cadastrado.`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">Clientes</h2>
            <p className="text-slate-500">Gerencie o histórico e informações dos seus clientes.</p>
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 font-bold" 
            data-testid="button-add-client"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo cliente.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Digite o nome"
                  value={newClient.name}
                  onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                  data-testid="input-client-name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={newClient.phone}
                  onChange={(e) => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                  data-testid="input-client-phone"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email (opcional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="cliente@email.com"
                  value={newClient.email}
                  onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                  data-testid="input-client-email"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddClient} className="bg-gradient-to-r from-cyan-600 to-blue-600" data-testid="button-confirm-add-client">
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Buscar por nome ou telefone..." 
            className="pl-9 bg-white border-slate-200 focus:border-cyan-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="input-search-clients"
          />
        </div>

        <div className="grid gap-4">
          {filteredClients.map((client) => (
            <Card key={client.id} className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 hover:shadow-2xl transition-all" data-testid={`card-client-${client.id}`}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-cyan-100 shadow-md">
                      <AvatarImage src={client.img} />
                      <AvatarFallback className="bg-cyan-100 text-cyan-700">{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900">{client.name}</h3>
                        <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
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
                    <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50" data-testid={`button-whatsapp-${client.id}`}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50" data-testid={`button-history-${client.id}`}>
                      <History className="h-4 w-4 mr-2" />
                      Histórico
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 hover:bg-slate-100" data-testid={`button-more-${client.id}`}>
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
