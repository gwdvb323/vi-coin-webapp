import { create } from "zustand";
import { apiRequest } from "./queryClient";
import { type Player } from "@shared/schema";

interface GameState {
  player: Player | null;
  upgrades: Record<string, { level: number }>;
  initializePlayer: () => Promise<void>;
  click: () => void;
  buyUpgrade: (upgradeId: string) => void;
}

export const useGameState = create<GameState>((set, get) => ({
  player: null,
  upgrades: {},

  initializePlayer: async () => {
    try {
      const res = await apiRequest("POST", "/api/players", { username: "player1" });
      const player = await res.json();
      set({ player });

      // Start energy regeneration
      setInterval(() => {
        const { player } = get();
        if (!player || player.energy >= 100) return;
        
        set({
          player: {
            ...player,
            energy: Math.min(100, player.energy + 1)
          }
        });
      }, 1000);

    } catch (error) {
      console.error("Failed to initialize player:", error);
    }
  },

  click: () => {
    const { player } = get();
    if (!player || player.energy <= 0) return;

    set({
      player: {
        ...player,
        coins: player.coins + player.clickPower,
        totalClicks: player.totalClicks + 1,
        energy: player.energy - 1
      }
    });
  },

  buyUpgrade: (upgradeId: string) => {
    const { player, upgrades } = get();
    if (!player) return;

    const currentLevel = upgrades[upgradeId]?.level || 0;
    const price = Math.floor(10 * Math.pow(1.5, currentLevel));

    if (player.coins < price) return;

    set({
      player: {
        ...player,
        coins: player.coins - price,
        clickPower: upgradeId === "click_power" ? player.clickPower + 1 : player.clickPower,
        autoClickPower: upgradeId === "auto_click" ? player.autoClickPower + 1 : player.autoClickPower
      },
      upgrades: {
        ...upgrades,
        [upgradeId]: { level: currentLevel + 1 }
      }
    });
  }
}));
