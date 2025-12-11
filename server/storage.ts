import { 
  type User, type InsertUser, 
  type Staff, type InsertStaff,
  type Service, type InsertService,
  type Appointment, type InsertAppointment,
  type Client, type InsertClient,
  users, staff, services, appointments, clients 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined>;
  
  getStaffByUserId(userId: string): Promise<Staff[]>;
  createStaff(staffData: InsertStaff): Promise<Staff>;
  deleteStaff(id: string): Promise<void>;
  
  getServicesByUserId(userId: string): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  deleteService(id: string): Promise<void>;
  
  getAppointmentsByUserId(userId: string): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: string, data: Partial<InsertAppointment>): Promise<Appointment | undefined>;
  deleteAppointment(id: string): Promise<void>;
  
  getClientsByUserId(userId: string): Promise<Client[]>;
  createClient(client: InsertClient): Promise<Client>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user;
  }

  async getStaffByUserId(userId: string): Promise<Staff[]> {
    return db.select().from(staff).where(eq(staff.userId, userId));
  }

  async createStaff(staffData: InsertStaff): Promise<Staff> {
    const [member] = await db.insert(staff).values(staffData).returning();
    return member;
  }

  async deleteStaff(id: string): Promise<void> {
    await db.delete(staff).where(eq(staff.id, id));
  }

  async getServicesByUserId(userId: string): Promise<Service[]> {
    return db.select().from(services).where(eq(services.userId, userId));
  }

  async createService(service: InsertService): Promise<Service> {
    const [svc] = await db.insert(services).values(service).returning();
    return svc;
  }

  async deleteService(id: string): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  async getAppointmentsByUserId(userId: string): Promise<Appointment[]> {
    return db.select().from(appointments).where(eq(appointments.userId, userId));
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [apt] = await db.insert(appointments).values(appointment).returning();
    return apt;
  }

  async updateAppointment(id: string, data: Partial<InsertAppointment>): Promise<Appointment | undefined> {
    const [apt] = await db.update(appointments).set(data).where(eq(appointments.id, id)).returning();
    return apt;
  }

  async deleteAppointment(id: string): Promise<void> {
    await db.delete(appointments).where(eq(appointments.id, id));
  }

  async getClientsByUserId(userId: string): Promise<Client[]> {
    return db.select().from(clients).where(eq(clients.userId, userId));
  }

  async createClient(client: InsertClient): Promise<Client> {
    const [cl] = await db.insert(clients).values(client).returning();
    return cl;
  }
}

export const storage = new DatabaseStorage();
