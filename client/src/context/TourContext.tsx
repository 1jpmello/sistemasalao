import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'wouter';

type TourStep = {
  target: string; // ID of the element to highlight
  title: string;
  content: string;
  path: string; // Path where this step is located
};

const TOUR_STEPS: TourStep[] = [
  {
    target: 'nav-agenda',
    title: 'Agenda',
    content: 'Veja seus horários e agende clientes rapidamente.',
    path: '/agenda'
  },
  {
    target: 'nav-clients',
    title: 'Clientes',
    content: 'Acompanhe informações e histórico de cada cliente.',
    path: '/clients'
  },
  {
    target: 'nav-services',
    title: 'Serviços',
    content: 'Gerencie todos os serviços e preços do salão.',
    path: '/services'
  },
  {
    target: 'nav-team',
    title: 'Profissionais',
    content: 'Organize sua equipe e seus horários.',
    path: '/team'
  },
  {
    target: 'nav-finance',
    title: 'Financeiro',
    content: 'Veja o faturamento do dia e serviços mais vendidos.',
    path: '/finance'
  },
  {
    target: 'nav-marketing',
    title: 'Marketing',
    content: 'Envie confirmações automáticas e promoções.',
    path: '/marketing'
  }
];

interface TourContextType {
  isWelcomeOpen: boolean;
  closeWelcome: () => void;
  openWelcome: () => void;
  startTour: () => void;
  isTourActive: boolean;
  currentStepIndex: number;
  nextStep: () => void;
  stopTour: () => void;
  currentStep: TourStep | null;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Show welcome modal when on dashboard
    if (location === '/dashboard') {
       setIsWelcomeOpen(true);
    }
  }, [location]);

  const closeWelcome = () => {
    setIsWelcomeOpen(false);
  };

  const openWelcome = () => {
    setIsWelcomeOpen(true);
  };

  const startTour = () => {
    setIsWelcomeOpen(false);
    setIsTourActive(true);
    setCurrentStepIndex(0);
    // Navigate to the first step's path if needed (though we start at dashboard usually)
    // Actually, let's keep the user on dashboard but point to sidebar items
  };

  const nextStep = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      stopTour();
    }
  };

  const stopTour = () => {
    setIsTourActive(false);
    setCurrentStepIndex(0);
  };

  const currentStep = isTourActive ? TOUR_STEPS[currentStepIndex] : null;

  return (
    <TourContext.Provider value={{
      isWelcomeOpen,
      closeWelcome,
      openWelcome,
      startTour,
      isTourActive,
      currentStepIndex,
      nextStep,
      stopTour,
      currentStep
    }}>
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}
