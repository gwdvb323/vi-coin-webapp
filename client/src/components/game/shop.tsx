import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import UpgradeCard from "./upgrade-card";
import { useGameState } from "@/lib/game-state";

const UPGRADES = [
  {
    id: "click_power",
    name: "Click Power",
    description: "Increase coins per click",
    basePrice: 10,
    priceMultiplier: 1.5
  },
  {
    id: "auto_click",
    name: "Auto Clicker",
    description: "Automatically generate coins",
    basePrice: 50,
    priceMultiplier: 2
  },
  {
    id: "energy_regen",
    name: "Energy Regeneration",
    description: "Regenerate energy faster",
    basePrice: 100,
    priceMultiplier: 2.5
  }
];

export default function Shop() {
  const { upgrades } = useGameState();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Shop</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[600px] px-4">
        <div className="space-y-4 pb-4">
          {UPGRADES.map((upgrade) => (
            <UpgradeCard
              key={upgrade.id}
              upgrade={upgrade}
              level={upgrades[upgrade.id]?.level || 0}
            />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
