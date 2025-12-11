import { db } from "./db";
import { users, staff, services, appointments } from "@shared/schema";
import { addDays, format } from "date-fns";

async function seed() {
  console.log("Seeding database...");

  const andromedaUser = await db.insert(users).values({
    username: "andromedateste123",
    password: "andromedasolutions123",
    salonName: "Studio Andromeda Beauty",
    adminName: "Fernanda Oliveira",
    isOnboarded: true,
  }).returning();

  const userId = andromedaUser[0].id;
  console.log("Created andromeda user:", userId);

  const staffMembers = await db.insert(staff).values([
    {
      userId,
      name: "Ana Silva",
      role: "Hair Stylist",
      specialty: "Corte & Coloração",
      status: "Disponível",
      rating: "4.9",
      services: ["Corte Feminino", "Coloração", "Hidratação", "Mechas"],
    },
    {
      userId,
      name: "Carla Dias",
      role: "Manicure",
      specialty: "Cutilagem & Esmaltação",
      status: "Disponível",
      rating: "4.7",
      services: ["Manicure", "Pedicure", "Spa dos Pés"],
    },
    {
      userId,
      name: "Júlia Costa",
      role: "Nail Designer",
      specialty: "Alongamentos & Nail Art",
      status: "Atendendo",
      rating: "4.9",
      services: ["Alongamento Gel", "Fibra de Vidro", "Blindagem", "Nail Art"],
    },
    {
      userId,
      name: "Marina Rocha",
      role: "Esteticista",
      specialty: "Facial & Sobrancelhas",
      status: "Disponível",
      rating: "5.0",
      services: ["Limpeza de Pele", "Design de Sobrancelhas", "Microblading"],
    },
  ]).returning();

  console.log("Created staff:", staffMembers.length);

  const servicesList = await db.insert(services).values([
    { userId, name: "Manicure", price: 35, duration: 40, category: "Unhas" },
    { userId, name: "Pedicure", price: 40, duration: 50, category: "Unhas" },
    { userId, name: "Combo Mão + Pé", price: 70, duration: 90, category: "Unhas" },
    { userId, name: "Alongamento Gel", price: 150, duration: 120, category: "Unhas" },
    { userId, name: "Alongamento Fibra de Vidro", price: 180, duration: 150, category: "Unhas" },
    { userId, name: "Manutenção de Alongamento", price: 90, duration: 90, category: "Unhas" },
    { userId, name: "Blindagem", price: 60, duration: 60, category: "Unhas" },
    { userId, name: "Design de Sobrancelha", price: 45, duration: 30, category: "Estética" },
    { userId, name: "Design com Henna", price: 55, duration: 40, category: "Estética" },
    { userId, name: "Brow Lamination", price: 120, duration: 60, category: "Estética" },
    { userId, name: "Limpeza de Pele", price: 150, duration: 90, category: "Estética" },
    { userId, name: "Corte Feminino", price: 80, duration: 60, category: "Cabelo" },
    { userId, name: "Escova", price: 50, duration: 40, category: "Cabelo" },
    { userId, name: "Hidratação", price: 90, duration: 45, category: "Cabelo" },
    { userId, name: "Mechas", price: 350, duration: 240, category: "Cabelo" },
    { userId, name: "Balayage", price: 380, duration: 240, category: "Cabelo" },
    { userId, name: "Tintura", price: 180, duration: 90, category: "Cabelo" },
  ]).returning();

  console.log("Created services:", servicesList.length);

  const today = new Date();
  const clientNames = [
    "Beatriz Mendes", "Camila Torres", "Daniela Souza", "Elaine Castro",
    "Fabiana Lima", "Gabriela Santos", "Helena Rodrigues", "Isabela Ferreira",
    "Juliana Alves", "Karla Martins", "Larissa Costa", "Mariana Oliveira",
    "Natália Pereira", "Patrícia Nunes", "Rafaela Cardoso", "Sandra Vieira",
    "Tatiana Gomes", "Vanessa Ribeiro", "Yasmin Araújo", "Amanda Barbosa",
  ];

  const appointmentData = [];
  const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
  const serviceNames = ["Manicure", "Pedicure", "Corte Feminino", "Escova", "Hidratação", "Design de Sobrancelha", "Alongamento Gel", "Limpeza de Pele"];
  const statuses = ["confirmed", "pending", "confirmed", "confirmed", "pending"];

  for (let dayOffset = 0; dayOffset <= 7; dayOffset++) {
    const date = addDays(today, dayOffset);
    const dateStr = format(date, "yyyy-MM-dd");
    
    const numAppointments = Math.floor(Math.random() * 6) + 3;
    const usedTimes = new Set<string>();
    
    for (let i = 0; i < numAppointments; i++) {
      let time;
      do {
        time = times[Math.floor(Math.random() * times.length)];
      } while (usedTimes.has(time));
      usedTimes.add(time);

      const randomStaff = staffMembers[Math.floor(Math.random() * staffMembers.length)];
      const randomClient = clientNames[Math.floor(Math.random() * clientNames.length)];
      const randomService = serviceNames[Math.floor(Math.random() * serviceNames.length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      appointmentData.push({
        userId,
        client: randomClient,
        service: randomService,
        staffId: randomStaff.id,
        time,
        date: dateStr,
        status: randomStatus,
      });
    }
  }

  await db.insert(appointments).values(appointmentData);
  console.log("Created appointments:", appointmentData.length);

  const giovannaUser = await db.insert(users).values({
    username: "giovannakilzerteste",
    password: "gigi123",
    salonName: null,
    adminName: null,
    isOnboarded: false,
  }).returning();

  console.log("Created giovanna user:", giovannaUser[0].id);

  console.log("Seeding completed!");
}

seed().catch(console.error).finally(() => process.exit(0));
