import { useState, useEffect } from "react";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search, MessageSquare, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import stylist1 from "@assets/generated_images/portrait_of_a_female_hair_stylist.png";
import { useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{id: number, text: string, time: string, sender: 'bot' | 'user'}[]>([
    { id: 1, text: "Olá! Como posso ajudar o salão hoje?", time: "08:00", sender: "bot" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessages = [
        "Novo agendamento: Maria Silva às 14h",
        "Lembrete: Reunião de equipe amanhã",
        "Estoque de shampoo baixo",
        "Cliente avaliou: 5 estrelas!"
      ];
      const randomMsg = newMessages[Math.floor(Math.random() * newMessages.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: randomMsg,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        sender: "bot"
      }]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <AppSidebar className="hidden md:flex fixed left-0 top-0 z-30 shadow-xl shadow-slate-200/50" />
      
      <main className="md:ml-64 min-h-screen flex flex-col transition-all duration-300">
        <header className="h-16 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-20 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 md:hidden">
             <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-r-slate-200">
                <AppSidebar className="w-full h-full border-none shadow-none" /> 
              </SheetContent>
            </Sheet>
             <span className="font-bold text-lg">Andromeda</span>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar clientes, serviços ou profissionais..." 
                className="pl-9 bg-muted/40 border-transparent focus:bg-background focus:border-primary/20 transition-all rounded-full" 
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full"
              onClick={() => setIsChatOpen(true)}
              data-testid="button-chat"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full ring-2 ring-white animate-pulse" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full" data-testid="button-notifications">
              <Bell className="h-5 w-5" />
            </Button>

            <div className="h-8 w-px bg-border mx-1" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 pl-1 cursor-pointer hover:opacity-80 transition-opacity">
                  <Avatar className="h-8 w-8 border border-primary/20">
                    <AvatarImage src={stylist1} />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-xs">
                    <p className="font-medium">Admin</p>
                    <p className="text-muted-foreground">Gerente</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer" data-testid="button-logout">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent className="w-[400px] sm:w-[440px] flex flex-col p-0">
          <SheetHeader className="p-6 border-b bg-primary/5">
            <SheetTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                Assistente Virtual
                <p className="text-xs font-normal text-muted-foreground">Online agora</p>
              </div>
            </SheetTitle>
          </SheetHeader>
          
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-none' 
                        : 'bg-white border text-foreground rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1">
                    {msg.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar">
            <Button variant="outline" size="sm" className="rounded-full text-xs h-8 whitespace-nowrap bg-white" onClick={() => setMessages(prev => [...prev, {id: Date.now(), text: "Confirmar todos de amanhã", time: "Agora", sender: 'user'}])}>
              Confirmar Agenda
            </Button>
            <Button variant="outline" size="sm" className="rounded-full text-xs h-8 whitespace-nowrap bg-white" onClick={() => setMessages(prev => [...prev, {id: Date.now(), text: "Enviar lembretes de falta", time: "Agora", sender: 'user'}])}>
              Lembretes
            </Button>
            <Button variant="outline" size="sm" className="rounded-full text-xs h-8 whitespace-nowrap bg-white" onClick={() => setMessages(prev => [...prev, {id: Date.now(), text: "Relatório do dia", time: "Agora", sender: 'user'}])}>
              Relatório
            </Button>
          </div>

          <div className="p-4 border-t bg-muted/20">
            <form className="flex gap-2" onSubmit={(e) => {
              e.preventDefault();
            }}>
              <Input placeholder="Digite uma mensagem..." className="flex-1 rounded-full bg-white" data-testid="input-chat-message" />
              <Button size="icon" type="submit" className="rounded-full h-10 w-10" data-testid="button-send-message">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
