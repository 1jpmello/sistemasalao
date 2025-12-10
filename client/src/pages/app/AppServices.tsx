import AppLayout from "@/components/layout/AppLayout";
import { services } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Search, Filter, Edit, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import haircutImg from "@assets/generated_images/close_up_of_a_premium_haircut_texture.png";
import manicureImg from "@assets/generated_images/close_up_of_artistic_manicure.png";
import facialImg from "@assets/generated_images/spa_facial_treatment_setup.png";

export default function AppServices() {
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Catálogo de Serviços</h2>
            <p className="text-slate-400">Gerencie todos os serviços do seu salão.</p>
          </div>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white" data-testid="button-add-service">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Serviço
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <Input 
              placeholder="Buscar serviços..." 
              className="pl-9 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-search-services"
            />
          </div>
          <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700" data-testid="button-filter-services">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
        </div>

        {filteredCategories.map(({ category, services: categoryServices }) => (
           <div key={category} className="space-y-4">
             <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2">{category}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categoryServices.map((service) => (
                  <Card key={service.id} className="overflow-hidden bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-all group" data-testid={`card-service-${service.id}`}>
                    <div className="h-32 relative overflow-hidden">
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                      <Badge className="absolute top-2 right-2 bg-cyan-500/20 text-cyan-400">{service.category}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white">{service.name}</h4>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-cyan-400 hover:bg-slate-700" data-testid={`button-edit-service-${service.id}`}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-slate-700" data-testid={`button-delete-service-${service.id}`}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-slate-400">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">{service.duration} min</span>
                        </div>
                        <p className="text-lg font-bold text-cyan-400">R$ {service.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <button 
                  className="h-full min-h-[200px] border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-cyan-500/50 hover:bg-slate-800/30 transition-all text-slate-500 hover:text-cyan-400"
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
