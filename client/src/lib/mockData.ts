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
  { id: 1, name: "Corte Feminino Premium", price: 120, duration: 60, category: "Cabelo" },
  { id: 2, name: "Coloração Global", price: 250, duration: 120, category: "Cabelo" },
  { id: 3, name: "Manicure Gel", price: 85, duration: 90, category: "Unhas" },
  { id: 4, name: "Design de Sobrancelhas", price: 45, duration: 30, category: "Estética" },
  { id: 5, name: "Hidratação Profunda", price: 150, duration: 45, category: "Cabelo" },
  { id: 6, name: "Corte Masculino", price: 60, duration: 40, category: "Cabelo" },
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
