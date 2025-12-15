import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertStaffSchema, insertServiceSchema, insertAppointmentSchema, insertClientSchema, insertAutomationSchema } from "@shared/schema";
import bcrypt from "bcryptjs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(401).json({ error: "Login ou senha incorretos" });
      }
      
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Login ou senha incorretos" });
      }
      
      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          salonName: user.salonName,
          adminName: user.adminName,
          isOnboarded: user.isOnboarded 
        } 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const parsed = insertUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Dados inválidos" });
      }
      
      const existing = await storage.getUserByUsername(parsed.data.username);
      if (existing) {
        return res.status(400).json({ error: "Usuário já existe" });
      }
      
      const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
      const user = await storage.createUser({
        ...parsed.data,
        password: hashedPassword
      });
      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          salonName: user.salonName,
          adminName: user.adminName,
          isOnboarded: user.isOnboarded 
        } 
      });
    } catch (error) {
<<<<<<< HEAD
      console.error("Register error:", error);
      res.status(500).json({ error: "Erro no servidor" });
=======
      console.error("REGISTER ERROR:");
console.error(error);

res.status(500).json({
  error: "Erro no servidor",
  detail: error?.message || "unknown"
});

>>>>>>> 931c5599ff51647f06f373e26a4d441c8dfa80fc
    }
  });

  app.get("/api/user/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          salonName: user.salonName,
          adminName: user.adminName,
          isOnboarded: user.isOnboarded 
        } 
      });
    } catch (error) {
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.patch("/api/user/:id", async (req, res) => {
    try {
      const user = await storage.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          salonName: user.salonName,
          adminName: user.adminName,
          isOnboarded: user.isOnboarded 
        } 
      });
    } catch (error) {
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.get("/api/staff/:userId", async (req, res) => {
    try {
      const staffList = await storage.getStaffByUserId(req.params.userId);
      res.json(staffList);
    } catch (error) {
      console.error("Get staff error:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.post("/api/staff", async (req, res) => {
    try {
      const parsed = insertStaffSchema.safeParse(req.body);
      if (!parsed.success) {
        console.error("Staff validation error:", parsed.error);
        return res.status(400).json({ error: "Dados inválidos" });
      }
      const member = await storage.createStaff(parsed.data);
      res.json(member);
    } catch (error) {
      console.error("Create staff error:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.delete("/api/staff/:id", async (req, res) => {
    try {
      await storage.deleteStaff(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.get("/api/services/:userId", async (req, res) => {
    try {
      const servicesList = await storage.getServicesByUserId(req.params.userId);
      res.json(servicesList);
    } catch (error) {
      console.error("Get services error:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const parsed = insertServiceSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Dados inválidos" });
      }
      const service = await storage.createService(parsed.data);
      res.json(service);
    } catch (error) {
      console.error("Create service error:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.delete("/api/services/:id", async (req, res) => {
    try {
      await storage.deleteService(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.get("/api/appointments/:userId", async (req, res) => {
    try {
      const appointmentsList = await storage.getAppointmentsByUserId(req.params.userId);
      res.json(appointmentsList);
    } catch (error) {
      console.error("Get appointments error:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const parsed = insertAppointmentSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Dados inválidos" });
      }
      const appointment = await storage.createAppointment(parsed.data);
      res.json(appointment);
    } catch (error) {
      console.error("Create appointment error:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.patch("/api/appointments/:id", async (req, res) => {
    try {
      const appointment = await storage.updateAppointment(req.params.id, req.body);
      if (!appointment) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.delete("/api/appointments/:id", async (req, res) => {
    try {
      await storage.deleteAppointment(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.get("/api/clients/:userId", async (req, res) => {
    try {
      const clientsList = await storage.getClientsByUserId(req.params.userId);
      res.json(clientsList);
    } catch (error) {
      console.error("Get clients error:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.post("/api/clients", async (req, res) => {
    try {
      const parsed = insertClientSchema.safeParse(req.body);
      if (!parsed.success) {
        console.error("Client validation error:", parsed.error);
        return res.status(400).json({ error: "Dados inválidos" });
      }
      const client = await storage.createClient(parsed.data);
      res.json(client);
    } catch (error) {
      console.error("Create client error:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.get("/api/automations/:userId", async (req, res) => {
    try {
      const automationsList = await storage.getAutomationsByUserId(req.params.userId);
      res.json(automationsList);
    } catch (error) {
      console.error("Get automations error:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.post("/api/automations", async (req, res) => {
    try {
      const parsed = insertAutomationSchema.safeParse(req.body);
      if (!parsed.success) {
        console.error("Automation validation error:", parsed.error);
        return res.status(400).json({ error: "Dados inválidos" });
      }
      const automation = await storage.createAutomation(parsed.data);
      res.json(automation);
    } catch (error) {
      console.error("Create automation error:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.patch("/api/automations/:id", async (req, res) => {
    try {
      const automation = await storage.updateAutomation(req.params.id, req.body);
      if (!automation) {
        return res.status(404).json({ error: "Automação não encontrada" });
      }
      res.json(automation);
    } catch (error) {
      console.error("Update automation error:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.delete("/api/automations/:id", async (req, res) => {
    try {
      await storage.deleteAutomation(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  return httpServer;
}
