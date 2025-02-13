import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGameState } from "@/lib/game-state";
import { useToast } from "@/hooks/use-toast";

interface UpgradeCardProps {
  upgrade: {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    priceMultiplier: number;
  };
  level: number;
}

export default function UpgradeCard({ upgrade, level }: UpgradeCardProps) {
  const { buyUpgrade, player } = useGameState();
  const { toast } = useToast();

  if (!player) return null;

  const price = Math.floor(
    upgrade.basePrice * Math.pow(upgrade.priceMultiplier, level)
  );

  const handleBuy = () => {
    if (player.coins < price) {
      toast({
        title: "Not enough coins!",
        description: `You need ${price - player.coins} more coins`,
        variant: "destructive"
      });
      return;
    }
    buyUpgrade(upgrade.id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{upgrade.name}</CardTitle>
        <CardDescription>{upgrade.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-sm">Level: {level}</div>
          <Button onClick={handleBuy}>Buy ({price} coins)</Button>
        </div>
      </CardContent>
    </Card>
  );
}