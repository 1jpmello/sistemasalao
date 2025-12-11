import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertStaffSchema, insertServiceSchema, insertAppointmentSchema, insertClientSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
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
      
      const user = await storage.createUser(parsed.data);
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
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.post("/api/staff", async (req, res) => {
    try {
      const parsed = insertStaffSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Dados inválidos" });
      }
      const member = await storage.createStaff(parsed.data);
      res.json(member);
    } catch (error) {
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
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  app.post("/api/clients", async (req, res) => {
    try {
      const parsed = insertClientSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Dados inválidos" });
      }
      const client = await storage.createClient(parsed.data);
      res.json(client);
    } catch (error) {
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  return httpServer;
}
