import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AiFooterDisclaimer() {
  return (
    <div className="mt-8 pt-6 border-t border-border/40 text-center">
      <p className="text-xs text-muted-foreground/60 flex items-center justify-center gap-2">
        <Info className="h-3 w-3" />
        As imagens exibidas nesta demonstração são geradas por IA e servem apenas como ilustração.
      </p>
    </div>
  );
}

export function AiImageTooltip({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className="relative group cursor-help">
            {children}
            <div className="absolute -top-1 -right-1 bg-white/90 backdrop-blur-sm rounded-full p-0.5 shadow-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <Info className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs max-w-[200px] text-center bg-white/90 backdrop-blur shadow-lg border-border/50 text-muted-foreground">
          <p>Fotos ilustrativas geradas por Inteligência Artificial. Não representam pessoas reais.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
