import { type Player, type InsertPlayer, type Upgrade, type InsertUpgrade } from "@shared/schema";

export interface IStorage {
  getPlayer(id: number): Promise<Player | undefined>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  updatePlayer(id: number, data: Partial<Player>): Promise<Player>;
  getUpgrades(playerId: number): Promise<Upgrade[]>;
  addUpgrade(upgrade: InsertUpgrade): Promise<Upgrade>;
  updateUpgrade(id: number, data: Partial<Upgrade>): Promise<Upgrade>;
}

export class MemStorage implements IStorage {
  private players: Map<number, Player>;
  private upgrades: Map<number, Upgrade>;
  private currentPlayerId: number = 1;
  private currentUpgradeId: number = 1;

  constructor() {
    this.players = new Map();
    this.upgrades = new Map();
  }

  async getPlayer(id: number): Promise<Player | undefined> {
    return this.players.get(id);
  }

  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    const id = this.currentPlayerId++;
    const now = new Date();
    const player: Player = {
      ...insertPlayer,
      id,
      coins: 0,
      totalClicks: 0,
      energy: 100,
      lastEnergyRefill: now,
      clickPower: 1,
      autoClickPower: 0
    };
    this.players.set(id, player);
    return player;
  }

  async updatePlayer(id: number, data: Partial<Player>): Promise<Player> {
    const player = await this.getPlayer(id);
    if (!player) throw new Error("Player not found");

    const updatedPlayer = { ...player, ...data };
    this.players.set(id, updatedPlayer);
    return updatedPlayer;
  }

  async getUpgrades(playerId: number): Promise<Upgrade[]> {
    return Array.from(this.upgrades.values()).filter(u => u.playerId === playerId);
  }

  async addUpgrade(upgrade: InsertUpgrade): Promise<Upgrade> {
    const id = this.currentUpgradeId++;
    const newUpgrade: Upgrade = {
      ...upgrade,
      id,
      level: upgrade.level ?? 1 // Ensure level has a default value if not provided
    };
    this.upgrades.set(id, newUpgrade);
    return newUpgrade;
  }

  async updateUpgrade(id: number, data: Partial<Upgrade>): Promise<Upgrade> {
    const upgrade = this.upgrades.get(id);
    if (!upgrade) throw new Error("Upgrade not found");

    const updatedUpgrade = { ...upgrade, ...data };
    this.upgrades.set(id, updatedUpgrade);
    return updatedUpgrade;
  }
}

export const storage = new MemStorage();