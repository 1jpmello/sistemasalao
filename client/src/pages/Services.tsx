import Layout from "@/components/layout/Layout";
import { services } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Search, Filter, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Services() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold">Catálogo de Serviços</h2>
            <p className="text-muted-foreground">Configure preços, duração e categorias.</p>
          </div>
          <Button className="bg-primary text-white shadow-lg shadow-primary/20">
            + Novo Serviço
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

        <div className="grid gap-4">
          {services.map((service) => (
            <Card key={service.id} className="border-none shadow-sm hover:shadow-md transition-all glass-card group overflow-hidden">
              <CardContent className="p-0 flex items-stretch">
                <div className="w-2 bg-primary/20 group-hover:bg-primary transition-colors" />
                <div className="flex-1 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                       <h3 className="font-bold text-lg">{service.name}</h3>
                       <Badge variant="secondary" className="text-xs font-normal bg-secondary text-secondary-foreground">
                         {service.category}
                       </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {service.duration} min
                      </span>
                      <span>•</span>
                      <span>4 Profissionais habilitados</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground block">Valor</span>
                      <span className="text-xl font-bold text-primary">R$ {service.price},00</span>
                    </div>
                    <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
