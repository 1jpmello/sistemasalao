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
    services: ["Corte Feminino", "Coloração", "Hidratação"]
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Barber Stylist",
    specialty: "Corte Masculino & Barba",
    status: "Disponível",
    avatar: stylist2,
    rating: 5.0,
    services: ["Corte Masculino", "Barba"]
  },
  {
    id: 3,
    name: "Júlia Costa",
    role: "Nail Designer",
    specialty: "Manicure & Pedicure",
    status: "Atendendo",
    avatar: stylist3,
    rating: 4.8,
    services: ["Manicure", "Pedicure", "Spa dos Pés"]
  },
  {
    id: 4,
    name: "Marina Rocha",
    role: "Esteticista",
    specialty: "Facial & Sobrancelhas",
    status: "Livre",
    avatar: stylist4,
    rating: 4.9,
    services: ["Limpeza de Pele", "Design de Sobrancelhas"]
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
  { id: 205, name: "Limpeza de Sobrancelha Masculina", price: 30, duration: 20, category: "Estética" },
  { id: 206, name: "Microblading", price: 450, duration: 180, category: "Estética" },
  { id: 207, name: "Micropigmentação", price: 400, duration: 180, category: "Estética" },
  { id: 208, name: "Revisão de Micropigmentação", price: 150, duration: 90, category: "Estética" },
  { id: 209, name: "Reforço de Micropigmentação", price: 200, duration: 120, category: "Estética" },
  { id: 210, name: "Retoque de Henna", price: 35, duration: 30, category: "Estética" },
  { id: 211, name: "Retoque de Tintura", price: 40, duration: 30, category: "Estética" },

  // Cabelo – Feminino
  { id: 301, name: "Corte Feminino", price: 80, duration: 60, category: "Cabelo" },
  { id: 302, name: "Escova", price: 50, duration: 40, category: "Cabelo" },
  { id: 303, name: "Hidratação", price: 90, duration: 45, category: "Cabelo" },
  { id: 304, name: "Nutrição", price: 100, duration: 50, category: "Cabelo" },
  { id: 305, name: "Reconstrução Capilar", price: 150, duration: 60, category: "Cabelo" },
  { id: 306, name: "Botox Capilar", price: 180, duration: 90, category: "Cabelo" },
  { id: 307, name: "Progressiva", price: 250, duration: 180, category: "Cabelo" },
  { id: 308, name: "Selagem", price: 200, duration: 150, category: "Cabelo" },
  { id: 309, name: "Luzes", price: 300, duration: 240, category: "Cabelo" },
  { id: 310, name: "Mechas", price: 350, duration: 240, category: "Cabelo" },
  { id: 311, name: "Balayage", price: 380, duration: 240, category: "Cabelo" },
  { id: 312, name: "Tonalização", price: 120, duration: 60, category: "Cabelo" },
  { id: 313, name: "Tintura Completa", price: 180, duration: 90, category: "Cabelo" },
  { id: 314, name: "Raiz (Coloração)", price: 100, duration: 60, category: "Cabelo" },
  { id: 315, name: "Matização", price: 80, duration: 45, category: "Cabelo" },
  { id: 316, name: "Penteado", price: 150, duration: 90, category: "Cabelo" },
  { id: 317, name: "Tratamento Anti-quebra", price: 130, duration: 60, category: "Cabelo" },
  { id: 318, name: "Tratamento Anti-frizz", price: 140, duration: 60, category: "Cabelo" },
];

export const appointments = [
  { id: 1, client: "Fernanda Lima", time: "09:00", service: "Corte Feminino", staffId: 1, status: "Concluído" },
  { id: 2, client: "Ricardo Souza", time: "10:30", service: "Corte Masculino", staffId: 2, status: "Em andamento" },
  { id: 3, client: "Patrícia Alves", time: "11:00", service: "Manicure", staffId: 3, status: "Aguardando" },
  { id: 4, client: "Beatriz Melo", time: "14:00", service: "Coloração", staffId: 1, status: "Agendado" },
  { id: 5, client: "Camila Torres", time: "15:30", service: "Design Sobrancelhas", staffId: 4, status: "Agendado" },
];

export const queue = [
  { id: 101, client: "Juliana Paes", service: "Hidratação", staff: "Ana Silva", status: "waiting", timeIn: "10:15" },
  { id: 102, client: "Ricardo Souza", service: "Corte Masc.", staff: "Carlos Mendes", status: "in-service", timeIn: "10:30" },
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
