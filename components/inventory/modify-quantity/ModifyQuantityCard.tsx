'use client'

import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import {Minus, Plus} from "lucide-react";

import {InventoryItem} from "@prisma/client";

import useModifyQuantityCard from "@/hooks/useModifyQuantityCard";

interface ModifyQuantityCardProps {
  inventoryItem: InventoryItem;
}

function ModifyQuantityCard({inventoryItem}: Readonly<ModifyQuantityCardProps>) {
  const {quantity, addQuantity, removeQuantity} = useModifyQuantityCard(inventoryItem);

  return (
    <Card className="flex justify-center px-4 py-2 items-center shadow-md bg-white">
      <div className="text-lg flex-[4] p-0  md:text-xl font-semibold">{inventoryItem.name}</div>
      <div className="flex-[2] text-center text-sm md:text-base">{quantity}</div>
      <div className="flex-[2] flex gap-2 justify-end">
        <Button onClick={addQuantity} variant="outline" className="flex items-center gap-1">
          <Plus className="w-4 h-4"/>
          <span className="hidden md:inline">Adicionar</span>
        </Button>
        <Button onClick={removeQuantity} className="flex items-center gap-1">
          <Minus className="w-4 h-4"/>
          <span className="hidden md:inline">Remover</span>
        </Button>
      </div>
    </Card>
  );
}

export default ModifyQuantityCard;
