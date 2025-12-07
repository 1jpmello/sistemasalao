import Layout from "@/components/layout/Layout";
import { services } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Search, Filter, Edit, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import haircutImg from "@assets/generated_images/close_up_of_a_premium_haircut_texture.png";
import manicureImg from "@assets/generated_images/close_up_of_artistic_manicure.png";
import facialImg from "@assets/generated_images/spa_facial_treatment_setup.png";
import barberImg from "@assets/generated_images/barber_shop_tools_detail.png";

export default function Services() {
  // Add images based on category
  const visualServices = services.map((s) => {
    let image = haircutImg;
    if (s.category === "Unhas") image = manicureImg;
    else if (s.category === "Estética") image = facialImg;
    else if (s.category === "Cabelo") image = haircutImg;
    
    return { ...s, image };
  });

  // Group services by category
  const groupedServices = visualServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof visualServices>);

  // Order categories: Unhas, Estética, Cabelo
  const orderedCategories = ["Unhas", "Estética", "Cabelo"].filter(c => groupedServices[c]);

  return (
    <Layout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold">Catálogo Visual</h2>
            <p className="text-muted-foreground">Seus serviços com fotos e preços claros.</p>
          </div>
          <Button className="bg-primary text-white shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Novo Serviço
          </Button>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-border/50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar serviço..." className="pl-9 bg-muted/20 border-transparent" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
        </div>

        <div className="space-y-12">
          {orderedCategories.map((category) => (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-4">
                 <h3 className="text-2xl font-serif font-bold text-primary">{category}</h3>
                 <div className="h-px flex-1 bg-border/60"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedServices[category].map((service) => (
                  <Card key={service.id} className="border-none shadow-sm hover:shadow-lg transition-all duration-300 glass-card group overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-sm">
                        R$ {service.price},00
                      </div>
                      <div className="absolute top-3 left-3">
                         <Badge variant="secondary" className="bg-white/90 backdrop-blur text-xs font-normal shadow-sm">
                           {service.category}
                         </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="font-bold text-lg leading-tight">{service.name}</h3>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {service.duration} min
                        </span>
                        {/* Removed random staff count for cleaner look */}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 hover:bg-primary hover:text-white transition-colors">
                          <Edit className="h-3 w-3 mr-2" />
                          Editar
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
          
          {/* Add New Placeholder at the bottom */}
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <h3 className="text-2xl font-serif font-bold text-muted-foreground/50">Adicionar</h3>
                 <div className="h-px flex-1 bg-border/60"></div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <button className="border-2 border-dashed border-muted hover:border-primary/50 hover:bg-primary/5 rounded-xl flex flex-col items-center justify-center gap-4 h-[340px] transition-all group w-full">
                  <div className="h-16 w-16 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <ImageIcon className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground">Adicionar Novo Serviço</p>
                    <p className="text-sm text-muted-foreground">Com foto e descrição</p>
                  </div>
                </button>
              </div>
           </div>
        </div>
      </div>
    </Layout>
  );
}
