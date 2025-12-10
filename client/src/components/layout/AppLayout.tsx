import { useState, useEffect } from "react";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search, MessageSquare, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
        "Cliente avaliou: 5 estrelas! ⭐"
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

  return (
    <div className="min-h-screen bg-[#0B0F19] font-sans">
      <AppSidebar className="hidden md:flex fixed left-0 top-0 z-30" />
      
      <main className="md:ml-64 min-h-screen flex flex-col transition-all duration-300">
        <header className="h-16 border-b border-slate-800 bg-[#0B0F19]/95 backdrop-blur-sm sticky top-0 z-20 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 md:hidden">
             <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white"><Menu className="h-5 w-5" /></Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-r border-slate-800 bg-[#0B0F19]">
                <AppSidebar className="w-full h-full border-none shadow-none" /> 
              </SheetContent>
            </Sheet>
             <span className="font-bold text-lg text-white">Andromeda</span>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                placeholder="Buscar clientes, serviços ou profissionais..." 
                className="pl-9 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:bg-slate-800 focus:border-cyan-500/50 transition-all rounded-full" 
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-full"
              onClick={() => setIsChatOpen(true)}
              data-testid="button-chat"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-cyan-400 rounded-full ring-2 ring-[#0B0F19] animate-pulse" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-full"
              data-testid="button-notifications"
            >
              <Bell className="h-5 w-5" />
            </Button>

            <div className="h-8 w-px bg-slate-700 mx-1" />

            <div className="flex items-center gap-2 pl-1 cursor-pointer hover:opacity-80 transition-opacity">
              <Avatar className="h-8 w-8 border border-cyan-500/30">
                <AvatarFallback className="bg-cyan-500/20 text-cyan-400">AD</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-xs">
                <p className="font-medium text-white">Admin</p>
                <p className="text-slate-500">Gerente</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-x-hidden bg-slate-900/50">
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
        <SheetContent className="w-[400px] sm:w-[440px] flex flex-col p-0 bg-[#0B0F19] border-slate-800">
          <SheetHeader className="p-6 border-b border-slate-800 bg-slate-800/50">
            <SheetTitle className="flex items-center gap-2 text-white">
              <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center text-white">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                Assistente Virtual
                <p className="text-xs font-normal text-slate-400">Online agora</p>
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
                        ? 'bg-cyan-500 text-white rounded-br-none' 
                        : 'bg-slate-800 border border-slate-700 text-white rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 px-1">
                    {msg.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full text-xs h-8 whitespace-nowrap bg-slate-800 border-slate-700 text-white hover:bg-slate-700" 
              onClick={() => setMessages(prev => [...prev, {id: Date.now(), text: "Confirmar todos de amanhã", time: "Agora", sender: 'user'}])}
              data-testid="button-confirm-agenda"
            >
              ✅ Confirmar Agenda
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full text-xs h-8 whitespace-nowrap bg-slate-800 border-slate-700 text-white hover:bg-slate-700" 
              onClick={() => setMessages(prev => [...prev, {id: Date.now(), text: "Enviar lembretes de falta", time: "Agora", sender: 'user'}])}
              data-testid="button-send-reminders"
            >
              📢 Lembretes
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full text-xs h-8 whitespace-nowrap bg-slate-800 border-slate-700 text-white hover:bg-slate-700" 
              onClick={() => setMessages(prev => [...prev, {id: Date.now(), text: "Relatório do dia", time: "Agora", sender: 'user'}])}
              data-testid="button-daily-report"
            >
              📊 Relatório
            </Button>
          </div>

          <div className="p-4 border-t border-slate-800 bg-slate-800/30">
            <form className="flex gap-2" onSubmit={(e) => {
              e.preventDefault();
            }}>
              <Input 
                placeholder="Digite uma mensagem..." 
                className="flex-1 rounded-full bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" 
                data-testid="input-chat-message"
              />
              <Button size="icon" type="submit" className="rounded-full h-10 w-10 bg-cyan-500 hover:bg-cyan-600" data-testid="button-send-message">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
