import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useTour } from "@/context/TourContext";

export function WelcomeModal() {
  const { isWelcomeOpen, closeWelcome, startTour } = useTour();

  return (
    <Dialog open={isWelcomeOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-md text-center" 
        onPointerDownOutside={(e) => e.preventDefault()} 
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-center">Bem-vindo ao Sistema para Salões ✂️✨</DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Aqui você pode ver como seu salão funciona de forma organizada: agendamentos, clientes, serviços e financeiro — tudo simples e rápido.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center mt-6">
          <Button 
            size="lg" 
            className="w-full sm:w-auto px-8 rounded-full shadow-lg shadow-primary/20 animate-pulse" 
            onClick={startTour}
          >
            Começar Tour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
