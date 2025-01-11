'use client'

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Minus, Plus } from "lucide-react";

import { InventoryItem } from "@prisma/client";

import useModifyQuantityCard from "@/hooks/useModifyQuantityCard";

interface ModifyQuantityCardProps {
  item: InventoryItem;
}

function ModifyQuantityCard({ item }: Readonly<ModifyQuantityCardProps>) {
  const { quantity, addQuantity, currentPrice, removeQuantity, handleSetCurrentPrice } = useModifyQuantityCard(item);

  return (
    <Card className="flex justify-center px-4 py-2 items-center shadow-md bg-white">
      <div className="text-lg flex-[4] p-0  md:text-xl font-semibold">{item.name}</div>
      <div className="flex-[2] text-center text-sm md:text-base">{quantity}</div>
      <div className="flex-[2] flex gap-2 justify-end">
        <input
          type="number"
          value={currentPrice?.toString()}
          className="!w-[75px] text-black border-gray-100 border-2 rounded-md"
          onChange={(e) => handleSetCurrentPrice(e.target.value)}
        />
        <Button onClick={addQuantity} variant="outline" className="flex items-center gap-1">
          <Plus className="w-4 h-4" />
          <span className="hidden md:inline">Adicionar</span>
        </Button>
        <Button onClick={removeQuantity} className="flex items-center gap-1">
          <Minus className="w-4 h-4" />
          <span className="hidden md:inline">Remover</span>
        </Button>
      </div>
    </Card>
  );
}

export default ModifyQuantityCard;
