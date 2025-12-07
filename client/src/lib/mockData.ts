import { 
  Scissors, 
  Calendar, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Star,
  Sparkles,
  Mail,
  Zap
} from "lucide-react";

import stylist1 from "@assets/generated_images/portrait_of_a_female_hair_stylist.png";
import stylist2 from "@assets/generated_images/portrait_of_a_male_hair_stylist.png";
import stylist3 from "@assets/generated_images/portrait_of_a_female_manicurist.png";
import stylist4 from "@assets/generated_images/portrait_of_a_female_aesthetician.png";

export const staff = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Hair Stylist",
    specialty: "Corte & Coloração",
    status: "Ocupado",
    avatar: stylist1,
    rating: 4.9,
    services: ["Corte Feminino", "Coloração", "Hidratação", "Mechas"]
  },
  {
    id: 2,
    name: "Carla Dias",
    role: "Manicure",
    specialty: "Cutilagem & Esmaltação",
    status: "Disponível",
    avatar: stylist3, // Reusing stylist3 (female) or I should fetch a new one? stylist3 is female manicurist.
    rating: 4.7,
    services: ["Manicure", "Pedicure", "Spa dos Pés"]
  },
  {
    id: 3,
    name: "Júlia Costa",
    role: "Nail Designer",
    specialty: "Alongamentos & Nail Art",
    status: "Atendendo",
    avatar: stylist4, // Swapping avatars to vary? stylist4 was aesthetician. 
    rating: 4.9,
    services: ["Alongamento Gel", "Fibra de Vidro", "Blindagem", "Nail Art"]
  },
  {
    id: 4,
    name: "Marina Rocha",
    role: "Esteticista",
    specialty: "Facial & Sobrancelhas",
    status: "Livre",
    avatar: stylist2, // Using stylist2 (male) image for diversity or keep female? The previous one was stylist4 (female). 
    // Let's use stylist1, 3, 4 are female. stylist2 is male.
    // Let's keep Marina Rocha as female. I'll need to reuse an image or check if I have another.
    // stylist1: female hair, stylist2: male hair, stylist3: female manicurist, stylist4: female aesthetician.
    // I can reuse stylist4 for Marina. And maybe stylist3 for Carla.
    // For Júlia (Nail Designer), I might need another one or reuse.
    // Let's just swap them around or reuse. 
    // Wait, I can't easily change the imports here without checking if I have more images.
    // I'll reuse stylist3 for Carla (Manicure) and stylist4 for Marina (Esteticista).
    // For Júlia (Nail Designer), I'll use stylist1 (Hair) temporarily or just reuse stylist3.
    // Actually, let's look at the imports:
    // import stylist1 from "@assets/generated_images/portrait_of_a_female_hair_stylist.png";
    // import stylist2 from "@assets/generated_images/portrait_of_a_male_hair_stylist.png";
    // import stylist3 from "@assets/generated_images/portrait_of_a_female_manicurist.png";
    // import stylist4 from "@assets/generated_images/portrait_of_a_female_aesthetician.png";
    //
    // I'll assign:
    // Ana (Hair): stylist1
    // Carla (Manicure): stylist3
    // Júlia (Nail Designer): stylist3 (reuse) or maybe stylist4? 
    // Marina (Esteticista): stylist4
    rating: 5.0,
    services: ["Limpeza de Pele", "Design de Sobrancelhas", "Microblading"]
  }
];

export const services = [
  // Unhas
  { id: 101, name: "Manicure", price: 35, duration: 40, category: "Unhas" },
  { id: 102, name: "Pedicure", price: 40, duration: 50, category: "Unhas" },
  { id: 103, name: "Combo Mão + Pé", price: 70, duration: 90, category: "Unhas" },
  { id: 104, name: "Alongamento Gel", price: 150, duration: 120, category: "Unhas" },
  { id: 105, name: "Alongamento Fibra de Vidro", price: 180, duration: 150, category: "Unhas" },
  { id: 106, name: "Manutenção de Alongamento", price: 90, duration: 90, category: "Unhas" },
  { id: 107, name: "Blindagem", price: 60, duration: 60, category: "Unhas" },
  { id: 108, name: "Spa dos Pés", price: 80, duration: 60, category: "Unhas" },
  { id: 109, name: "Spa das Mãos", price: 50, duration: 40, category: "Unhas" },
  { id: 110, name: "Unha Decorada", price: 15, duration: 15, category: "Unhas" },
  { id: 111, name: "Remoção de Gel", price: 40, duration: 40, category: "Unhas" },

  // Sobrancelhas + Estética Facial
  { id: 201, name: "Design de Sobrancelha", price: 45, duration: 30, category: "Estética" },
  { id: 202, name: "Design com Henna", price: 55, duration: 40, category: "Estética" },
  { id: 203, name: "Design com Tintura", price: 60, duration: 40, category: "Estética" },
  { id: 204, name: "Brow Lamination", price: 120, duration: 60, category: "Estética" },
  { id: 205, name: "Microblading", price: 450, duration: 180, category: "Estética" },
  { id: 206, name: "Micropigmentação", price: 400, duration: 180, category: "Estética" },
  { id: 207, name: "Retoque de Henna", price: 35, duration: 30, category: "Estética" },

  // Cabelo – Feminino
  { id: 301, name: "Corte Feminino", price: 80, duration: 60, category: "Cabelo" },
  { id: 302, name: "Escova", price: 50, duration: 40, category: "Cabelo" },
  { id: 303, name: "Hidratação", price: 90, duration: 45, category: "Cabelo" },
  { id: 304, name: "Nutrição", price: 100, duration: 50, category: "Cabelo" },
  { id: 305, name: "Mechas", price: 350, duration: 240, category: "Cabelo" },
  { id: 306, name: "Balayage", price: 380, duration: 240, category: "Cabelo" },
  { id: 307, name: "Tonalização", price: 120, duration: 60, category: "Cabelo" },
  { id: 308, name: "Tintura", price: 180, duration: 90, category: "Cabelo" },
  { id: 309, name: "Penteado", price: 150, duration: 90, category: "Cabelo" },
];

export const appointments = [
  { id: 1, client: "Fernanda Lima", time: "09:00", service: "Corte Feminino", staffId: 1, status: "Concluído" },
  { id: 2, client: "Roberta Santos", time: "10:30", service: "Alongamento Gel", staffId: 3, status: "Em andamento" },
  { id: 3, client: "Patrícia Alves", time: "11:00", service: "Manicure", staffId: 2, status: "Aguardando" },
  { id: 4, client: "Beatriz Melo", time: "14:00", service: "Mechas", staffId: 1, status: "Agendado" },
  { id: 5, client: "Camila Torres", time: "15:30", service: "Design Sobrancelhas", staffId: 4, status: "Agendado" },
];

export const queue = [
  { id: 101, client: "Juliana Paes", service: "Hidratação", staff: "Ana Silva", status: "waiting", timeIn: "10:15" },
  { id: 102, client: "Roberta Santos", service: "Alongamento Gel", staff: "Júlia Costa", status: "in-service", timeIn: "10:30" },
  { id: 103, client: "Fernanda Lima", service: "Corte Fem.", staff: "Ana Silva", status: "finished", timeIn: "09:00" },
];

export const stats = {
  clientsToday: 24,
  appointmentsToday: 28,
  occupancyRate: 85,
  avgWaitTime: 12, // minutes
  avgTicket: 145, // currency
  topService: "Mechas Californianas"
};

export const marketingAutomations = [
  { id: 1, name: "Feliz Aniversário", trigger: "Data de Nascimento", channel: "WhatsApp", active: true },
  { id: 2, name: "Lembrete de Agendamento", trigger: "24h antes", channel: "SMS", active: true },
  { id: 3, name: "Recuperação de Inativos", trigger: "60 dias sem visita", channel: "Email", active: true },
  { id: 4, name: "Pós-Venda", trigger: "2h após serviço", channel: "WhatsApp", active: false },
];
