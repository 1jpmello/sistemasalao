import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staff } from "@/lib/mockData";
import { Star, Clock, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Team() {
  return (
    <Layout>
      <div className="space-y-8">
         <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold">Profissionais</h2>
            <p className="text-muted-foreground">Organize sua equipe e seus horários com facilidade.</p>
          </div>
          <Button className="bg-primary text-white shadow-lg shadow-primary/20">
            + Adicionar Profissional
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {staff.map((person) => (
            <Card key={person.id} className="border-none shadow-sm glass-card overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="h-24 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 opacity-50 group-hover:opacity-100 transition-opacity" />
              <CardContent className="relative pt-0 pb-6 px-6 text-center">
                <div className="relative -top-12 mb-[-30px]">
                   <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg mx-auto">
                    <AvatarImage src={person.avatar} className="object-cover" />
                    <AvatarFallback>{person.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-1 right-[calc(50%-40px)] w-4 h-4 rounded-full border-2 border-white ${
                    person.status === 'Disponível' || person.status === 'Livre' ? 'bg-emerald-500' : 
                    person.status === 'Atendendo' ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                </div>

                <div className="mt-12 space-y-1">
                  <h3 className="font-serif font-bold text-xl">{person.name}</h3>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{person.role}</p>
                </div>

                <div className="flex items-center justify-center gap-1 my-4 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold text-foreground">{person.rating}</span>
                  <span className="text-xs text-muted-foreground">(124 avaliações)</span>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {person.services.slice(0, 2).map((s, i) => (
                    <Badge key={i} variant="secondary" className="bg-secondary/50 font-normal">
                      {s}
                    </Badge>
                  ))}
                  {person.services.length > 2 && (
                    <Badge variant="secondary" className="bg-secondary/50 font-normal">+{person.services.length - 2}</Badge>
                  )}
                </div>

                <div className="flex gap-2 justify-center">
                  <Button variant="outline" className="w-full text-xs h-9">Ver Agenda</Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9"><MoreHorizontal className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
