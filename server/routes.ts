import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPlayerSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.post("/api/players", async (req, res) => {
    const parsed = insertPlayerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }
    
    const player = await storage.createPlayer(parsed.data);
    res.json(player);
  });

  app.get("/api/players/:id", async (req, res) => {
    const player = await storage.getPlayer(Number(req.params.id));
    if (!player) return res.status(404).json({ error: "Player not found" });
    res.json(player);
  });

  app.patch("/api/players/:id", async (req, res) => {
    const player = await storage.updatePlayer(Number(req.params.id), req.body);
    res.json(player);
  });

  app.get("/api/players/:id/upgrades", async (req, res) => {
    const upgrades = await storage.getUpgrades(Number(req.params.id));
    res.json(upgrades);
  });

  app.post("/api/upgrades", async (req, res) => {
    const upgrade = await storage.addUpgrade(req.body);
    res.json(upgrade);
  });

  const httpServer = createServer(app);
  return httpServer;
}
