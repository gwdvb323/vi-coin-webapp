import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  coins: integer("coins").notNull().default(0),
  totalClicks: integer("total_clicks").notNull().default(0),
  energy: integer("energy").notNull().default(100),
  lastEnergyRefill: timestamp("last_energy_refill").notNull().default(new Date()),
  clickPower: integer("click_power").notNull().default(1),
  autoClickPower: integer("auto_click_power").notNull().default(0),
});

export const upgrades = pgTable("upgrades", {
  id: serial("id").primaryKey(),
  playerId: integer("player_id").notNull(),
  type: text("type").notNull(), // 'click_power', 'auto_click', 'energy_regen'
  level: integer("level").notNull().default(1),
});

export const insertPlayerSchema = createInsertSchema(players).omit({ 
  id: true,
  coins: true,
  totalClicks: true,
  energy: true,
  lastEnergyRefill: true,
  clickPower: true,
  autoClickPower: true
});

export const insertUpgradeSchema = createInsertSchema(upgrades).omit({
  id: true
});

export type Player = typeof players.$inferSelect;
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Upgrade = typeof upgrades.$inferSelect;
export type InsertUpgrade = z.infer<typeof insertUpgradeSchema>;