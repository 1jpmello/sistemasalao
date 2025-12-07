import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";
import { staff } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Agenda() {
  const timeSlots = Array.from({ length: 13 }, (_, i) => i + 8); // 8am to 8pm

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-serif font-bold">Agenda Inteligente</h2>
            <p className="text-muted-foreground">Agendamentos rápidos, organizados e sem erros.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white rounded-lg border shadow-sm p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-4 text-sm font-medium">Hoje, 06 Dez</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button className="bg-primary text-white shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <Card className="flex-1 border-none shadow-sm glass-card overflow-hidden flex flex-col">
          {/* Header Row - Staff */}
          <div className="flex border-b bg-muted/30">
            <div className="w-20 flex-shrink-0 border-r p-4 bg-muted/50">
              <Clock className="h-4 w-4 text-muted-foreground mx-auto" />
            </div>
            <div className="flex-1 grid grid-cols-4 divide-x">
              {staff.map((s) => (
                <div key={s.id} className="p-4 flex flex-col items-center gap-2 min-w-[150px]">
                  <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                    <AvatarImage src={s.avatar} />
                    <AvatarFallback>{s.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="font-medium text-sm">{s.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {timeSlots.map((hour) => (
              <div key={hour} className="flex border-b last:border-none min-h-[100px]">
                {/* Time Column */}
                <div className="w-20 flex-shrink-0 border-r p-2 text-xs font-medium text-muted-foreground text-center sticky left-0 bg-white/95 backdrop-blur">
                  {hour}:00
                </div>

                {/* Staff Columns */}
                <div className="flex-1 grid grid-cols-4 divide-x relative">
                  {/* Horizontal grid lines for half hours could go here */}
                  
                  {staff.map((s, i) => {
                    // Mock logic to place random appointments
                    const isBusy = (hour + i) % 3 === 0; // simple pattern
                    const isBusy2 = (hour + i) % 5 === 0;

                    return (
                      <div key={s.id} className="relative p-1 group hover:bg-muted/5 transition-colors">
                        {isBusy && (
                          <div className="absolute top-2 left-2 right-2 bottom-2 bg-purple-100 border-l-4 border-purple-500 rounded-md p-2 cursor-pointer hover:shadow-md transition-all">
                            <p className="text-xs font-bold text-purple-700">Corte Feminino</p>
                            <p className="text-[10px] text-purple-600">Maria Clara</p>
                          </div>
                        )}
                         {isBusy2 && !isBusy && (
                          <div className="absolute top-10 left-2 right-2 bottom-[-20px] z-10 bg-pink-100 border-l-4 border-pink-500 rounded-md p-2 cursor-pointer hover:shadow-md transition-all">
                            <p className="text-xs font-bold text-pink-700">Coloração</p>
                            <p className="text-[10px] text-pink-600">Joana Dark</p>
                          </div>
                        )}
                        
                        {/* Add button on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           {!isBusy && !isBusy2 && (
                             <Button variant="ghost" size="sm" className="h-6 w-6 rounded-full bg-primary/10 text-primary">
                               <Plus className="h-4 w-4" />
                             </Button>
                           )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
