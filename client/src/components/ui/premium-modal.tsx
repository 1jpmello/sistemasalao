import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface PremiumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  body: string;
  checklist: string[];
  cta: string;
}

export function PremiumModal({ open, onOpenChange, title, body, checklist, cta }: PremiumModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center p-0 overflow-hidden gap-0 border-none shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent z-0 pointer-events-none" />
        
        <div className="p-6 pb-2 relative z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 ring-8 ring-primary/5"
          >
            <Lock className="h-8 w-8 text-primary drop-shadow-sm" />
          </motion.div>
          
          <DialogHeader>
            <DialogTitle className="text-xl text-center font-bold font-serif mb-2">{title}</DialogTitle>
          </DialogHeader>
          
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            {body}
          </p>
          
          <div className="bg-muted/30 p-4 rounded-xl space-y-3 text-left mb-4 border border-border/50">
            {checklist.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm font-medium text-foreground/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="p-6 pt-2 sm:justify-center relative z-10 bg-muted/10">
          <Button 
            className="w-full sm:w-auto px-8 py-6 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all" 
            onClick={() => onOpenChange(false)}
          >
            {cta}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
