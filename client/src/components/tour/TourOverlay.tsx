import { useTour } from "@/context/TourContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

export function TourOverlay() {
  const { isTourActive, currentStep, nextStep, stopTour, currentStepIndex } = useTour();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (isTourActive && currentStep) {
      const element = document.getElementById(currentStep.target);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
         // If element not found (maybe page transition), just skip for now or wait
      }
    }
  }, [isTourActive, currentStep, currentStepIndex]);

  if (!isTourActive || !currentStep || !targetRect) return null;

  // Calculate position with mobile support
  const isMobile = window.innerWidth < 768;
  const top = targetRect.top + window.scrollY;
  const left = targetRect.right + 20; // 20px offset
  
  const tooltipStyle = isMobile ? {
    position: 'fixed' as const,
    bottom: '20px',
    left: '20px',
    right: '20px',
    top: 'auto',
    width: 'auto',
    maxWidth: 'none',
    margin: '0 auto'
  } : {
    top: Math.max(20, Math.min(window.innerHeight - 200, top)), // Keep in view vertically
    left: Math.min(window.innerWidth - 340, left), // Keep in view horizontally
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Dimmed Background with cutout */}
      <div className="absolute inset-0 bg-black/50 transition-opacity duration-300" />
      
      {/* Highlight Cutout (Visual only) */}
      <div 
        className="absolute bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] rounded-lg transition-all duration-300 border-2 border-primary animate-pulse"
        style={{
          top: targetRect.top - 4,
          left: targetRect.left - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
        }}
      />

      {/* Tooltip Card */}
      <div 
        className="absolute bg-white p-6 rounded-xl shadow-2xl max-w-sm pointer-events-auto animate-in fade-in zoom-in-95 duration-300"
        style={tooltipStyle}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{currentStep.title}</h3>
          <button onClick={stopTour} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-muted-foreground mb-4">{currentStep.content}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground font-medium">
            Passo {currentStepIndex + 1} de 6
          </span>
          <Button onClick={nextStep} className="rounded-full shadow-md shadow-primary/10">
            {currentStepIndex === 5 ? "Concluir" : "Próximo"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
