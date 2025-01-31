import { InventoryItem, InventoryItemModificationLog } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { clsx } from "clsx";

interface ItemLogCardProps {
  log : InventoryItemModificationLog & { InventoryItem : InventoryItem };
}

export function ItemLogCard({ log } : Readonly<ItemLogCardProps>) {
  const bgColor = log.change > 0 ? 'text-green-500' : "text-red-500"
  return (
      <Card className={clsx("flex justify-between px-4 py-2 items-center shadow-md bg-white")}>
        <p>{log.InventoryItem.name}</p>
        <p className={bgColor}>{log.change}</p>
        <p>{log.changedAt.toString()}</p>
        <p>$ {log.currentPrice?.toString()}</p>
      </Card>
  )
}