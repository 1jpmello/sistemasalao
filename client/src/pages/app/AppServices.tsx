import AppLayout from "@/components/layout/AppLayout";
import { services as initialServices } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Search, Filter, Edit, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import haircutImg from "@assets/generated_images/close_up_of_a_premium_haircut_texture.png";
import manicureImg from "@assets/generated_images/close_up_of_artistic_manicure.png";
import facialImg from "@assets/generated_images/spa_facial_treatment_setup.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function AppServices() {
  const { toast } = useToast();
  const [services, setServices] = useState(initialServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    category: "",
    duration: "",
    price: "",
  });

  const visualServices = services.map((s) => {
    let image = haircutImg;
    if (s.category === "Unhas") image = manicureImg;
    else if (s.category === "Estética") image = facialImg;
    else if (s.category === "Cabelo") image = haircutImg;
    
    return { ...s, image };
  });

  const groupedServices = visualServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof visualServices>);

  const orderedCategories = ["Unhas", "Estética", "Cabelo"].filter(c => groupedServices[c]);

  const filteredCategories = orderedCategories.map(category => ({
    category,
    services: groupedServices[category].filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(g => g.services.length > 0);

  const handleAddService = () => {
    if (!newService.name || !newService.category || !newService.price || !newService.duration) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    const service = {
      id: Date.now(),
      name: newService.name,
      category: newService.category,
      duration: parseInt(newService.duration),
      price: parseFloat(newService.price),
    };

    setServices(prev => [...prev, service]);
    setIsAddModalOpen(false);
    setNewService({ name: "", category: "", duration: "", price: "" });
    toast({
      title: "Serviço adicionado!",
      description: `${service.name} foi adicionado ao catálogo.`,
    });
  };

  const handleDeleteService = (id: number) => {
    const service = services.find(s => s.id === id);
    setServices(prev => prev.filter(s => s.id !== id));
    toast({
      title: "Serviço removido",
      description: `${service?.name} foi removido do catálogo.`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">Catálogo de Serviços</h2>
            <p className="text-slate-500">Gerencie todos os serviços do seu salão.</p>
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 font-bold" 
            data-testid="button-add-service"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Serviço
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Buscar serviços..." 
              className="pl-9 bg-white border-slate-200 focus:border-cyan-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-search-services"
            />
          </div>
          <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50" data-testid="button-filter-services">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Serviço</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo serviço.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do Serviço</Label>
                <Input
                  id="name"
                  placeholder="Ex: Corte Feminino"
                  value={newService.name}
                  onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                  data-testid="input-service-name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={newService.category} onValueChange={(value) => setNewService(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger data-testid="select-category">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cabelo">Cabelo</SelectItem>
                    <SelectItem value="Unhas">Unhas</SelectItem>
                    <SelectItem value="Estética">Estética</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duração (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="60"
                    value={newService.duration}
                    onChange={(e) => setNewService(prev => ({ ...prev, duration: e.target.value }))}
                    data-testid="input-service-duration"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="100.00"
                    value={newService.price}
                    onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                    data-testid="input-service-price"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddService} className="bg-gradient-to-r from-cyan-600 to-blue-600" data-testid="button-confirm-add-service">
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {filteredCategories.map(({ category, services: categoryServices }) => (
           <div key={category} className="space-y-4">
             <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">{category}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categoryServices.map((service) => (
                  <Card key={service.id} className="overflow-hidden border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 hover:shadow-2xl transition-all group" data-testid={`card-service-${service.id}`}>
                    <div className="h-32 relative overflow-hidden">
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                      <Badge className="absolute top-2 right-2 bg-cyan-100 text-cyan-700 border-0">{service.category}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900">{service.name}</h4>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50" data-testid={`button-edit-service-${service.id}`}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50" 
                            onClick={() => handleDeleteService(service.id)}
                            data-testid={`button-delete-service-${service.id}`}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">{service.duration} min</span>
                        </div>
                        <p className="text-lg font-bold text-cyan-600">R$ {service.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="h-full min-h-[200px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-cyan-300 hover:bg-cyan-50/30 transition-all text-slate-400 hover:text-cyan-600"
                  data-testid={`button-add-service-${category}`}
                >
                  <div className="h-12 w-12 rounded-full border-2 border-current flex items-center justify-center">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold">Adicionar Novo Serviço</p>
                    <p className="text-sm opacity-70">Com foto e descrição</p>
                  </div>
                </button>
              </div>
           </div>
        ))}
      </div>
    </AppLayout>
  );
}
