import { useTour } from "@/context/TourContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function TourOverlay() {
  const { isTourActive, currentStep, nextStep, stopTour, currentStepIndex } = useTour();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isTourActive && currentStep) {
      const element = document.getElementById(currentStep.target);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        // Element not found (e.g., hidden in mobile menu)
        setTargetRect(null);
      }
    }
  }, [isTourActive, currentStep, currentStepIndex]);

  if (!isTourActive || !currentStep) return null;

  // On mobile or if target not found, show centered/bottom card without highlight
  if (isMobile || !targetRect) {
    return createPortal(
      <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center pointer-events-none p-4 pb-8">
        {/* Dimmed Background */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-auto" onClick={stopTour} />
        
        {/* Mobile/Fallback Card */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto relative animate-in slide-in-from-bottom-10 fade-in duration-300 border border-slate-100">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg text-slate-900">{currentStep.title}</h3>
            <button onClick={stopTour} className="text-slate-400 hover:text-slate-900 p-1 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-slate-600 mb-6 leading-relaxed text-sm">{currentStep.content}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
              {currentStepIndex + 1} de 6
            </span>
            <Button onClick={nextStep} className="rounded-full shadow-lg shadow-cyan-500/20 bg-cyan-600 hover:bg-cyan-700 text-white">
              {currentStepIndex === 5 ? "Concluir" : "Próximo"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // Desktop with target found - Highlight logic
  const top = targetRect.top + window.scrollY;
  const left = targetRect.right + 20;

  return createPortal(
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Dimmed Background */}
      <div className="absolute inset-0 bg-black/50 transition-opacity duration-300" />
      
      {/* Highlight Cutout */}
      <div 
        className="absolute bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] rounded-lg transition-all duration-300 border-2 border-cyan-400 animate-pulse"
        style={{
          top: targetRect.top - 4,
          left: targetRect.left - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
        }}
      />

      {/* Desktop Tooltip Card */}
      <div 
        className="absolute bg-white p-6 rounded-xl shadow-2xl max-w-sm pointer-events-auto animate-in fade-in zoom-in-95 duration-300 border border-slate-100"
        style={{
          top: Math.max(20, Math.min(window.innerHeight - 250, top)),
          left: Math.min(window.innerWidth - 380, left),
        }}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-900">{currentStep.title}</h3>
          <button onClick={stopTour} className="text-slate-400 hover:text-slate-900 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-slate-600 mb-4 text-sm leading-relaxed">{currentStep.content}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
            Passo {currentStepIndex + 1} de 6
          </span>
          <Button onClick={nextStep} className="rounded-full shadow-md shadow-cyan-500/10 bg-cyan-600 hover:bg-cyan-700 text-white">
            {currentStepIndex === 5 ? "Concluir" : "Próximo"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
