import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import UpgradeCard from "@/components/game/upgrade-card";
import { useGameState } from "@/lib/game-state";

export default function Shop() {
  const { upgrades } = useGameState();

  const UPGRADES = [
    {
      id: "click_power",
      name: "Сила Клика",
      description: "Увеличивает количество монет за клик",
      basePrice: 10,
      priceMultiplier: 1.5
    },
    {
      id: "auto_click",
      name: "Авто-Кликер",
      description: "Автоматически генерирует монеты",
      basePrice: 50,
      priceMultiplier: 2
    },
    {
      id: "energy_regen",
      name: "Регенерация Энергии",
      description: "Ускоряет восстановление энергии",
      basePrice: 100,
      priceMultiplier: 2.5
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-background p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-2xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к игре
          </Button>
        </Link>
        
        <Card className="bg-gradient-to-br from-background to-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Магазин</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[70vh] pr-4">
              <div className="space-y-4">
                {UPGRADES.map((upgrade) => (
                  <UpgradeCard
                    key={upgrade.id}
                    upgrade={upgrade}
                    level={upgrades[upgrade.id]?.level || 0}
                  />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
