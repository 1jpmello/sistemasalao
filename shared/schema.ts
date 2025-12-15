import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  salonName: text("salon_name"),
  adminName: text("admin_name"),
  isOnboarded: boolean("is_onboarded").default(false),
});

export const staff = pgTable("staff", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  role: text("role").notNull(),
  specialty: text("specialty"),
  status: text("status").default("Disponível"),
  avatar: text("avatar"),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("5.0"),
  services: text("services").array(),
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  duration: integer("duration").notNull(),
  category: text("category"),
});

export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  client: text("client").notNull(),
  service: text("service").notNull(),
  staffId: varchar("staff_id").references(() => staff.id),
  time: text("time").notNull(),
  date: text("date").notNull(),
  status: text("status").default("pending"),
});

export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  notes: text("notes"),
});

export const automations = pgTable("automations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  trigger: text("trigger").notNull(),
  channel: text("channel").notNull(),
  message: text("message"),
  active: boolean("active").default(true),
  clientIds: text("client_ids").array(),
  targetAll: boolean("target_all").default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  salonName: true,
  adminName: true,
  isOnboarded: true,
}).partial({
  salonName: true,
  adminName: true,
  isOnboarded: true,
});

export const insertStaffSchema = createInsertSchema(staff).omit({
  id: true,
}).partial({
  status: true,
  avatar: true,
  rating: true,
  services: true,
  specialty: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
});

export const insertAutomationSchema = createInsertSchema(automations).omit({
  id: true,
}).partial({
  message: true,
  active: true,
  clientIds: true,
  targetAll: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertStaff = z.infer<typeof insertStaffSchema>;
export type Staff = typeof staff.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;
export type InsertAutomation = z.infer<typeof insertAutomationSchema>;
export type Automation = typeof automations.$inferSelect;
