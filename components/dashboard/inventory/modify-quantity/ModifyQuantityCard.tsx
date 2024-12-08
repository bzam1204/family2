'use client'

import {InventoryItem} from "@prisma/client";

import {Minus, Plus} from "lucide-react";

import {Button} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import useModifyQuantityCard from "@/hooks/useModifyQuantityCard";

interface ModifyQuantityCardProps {
  inventoryItem: InventoryItem;
}

function ModifyQuantityCard({inventoryItem}: Readonly<ModifyQuantityCardProps>) {
  const { quantity,  addQuantity, removeQuantity} = useModifyQuantityCard(inventoryItem)

  return (
    <Card className="w-[10px] flex items-center gap-4 px-4">
      <CardHeader>
        <CardTitle>{inventoryItem.name}</CardTitle>
      </CardHeader>
      <CardContent>{quantity}</CardContent>

      <Button onClick={addQuantity} variant="outline"><Plus/>Adicionar</Button>
      <Button onClick={removeQuantity}><Minus/>Remover</Button>
    </Card>
  )
}

export default ModifyQuantityCard;
