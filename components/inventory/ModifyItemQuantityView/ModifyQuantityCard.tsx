'use client'

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Minus, Plus } from "lucide-react";

import { useModifyQuantity } from "@/hooks/useModifyQuantity";
import { SerializedInventoryItem } from "@/lib/types/SerializedInventoryItem";
import { clsx } from "clsx";
import { formatToDecimal } from "@/lib/utils/formatToDecimal";

interface ModifyQuantityCardProps {
  item : SerializedInventoryItem;
}

function ModifyQuantityCard( { item } : Readonly<ModifyQuantityCardProps> ) {
  const {
    error,
    quantity,
    addQuantity,
    currentPrice,
    removeQuantity,
    handleSetCurrentPrice
  } = useModifyQuantity( item );

  return (
      <Card className={ "flex justify-center px-4 py-2 items-center shadow-md bg-white relative" }>
        <div className="text-lg flex-[4] p-0  md:text-xl font-semibold">{ item.name }</div>
        <div className="flex-[2] text-center text-sm md:text-base">{ quantity }</div>
        <div className="flex-[2] flex gap-2 justify-end">
          <input
              defaultValue={ formatToDecimal( currentPrice ) }
              className={ clsx( "indent-2 !w-[75px] text-black border-gray-100 border-2 rounded-md focus:outline-primary", error && "border-red-500 text-red-500 focus:outline-red-500" ) }
              onBlur={ ( e ) => handleSetCurrentPrice( e.target.value ) }
          />
          <Button onClick={ addQuantity } variant="outline" className="flex items-center gap-1" disabled={ !!error }>
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">Adicionar</span>
          </Button>
          <Button onClick={ removeQuantity } className="flex items-center gap-1" disabled={ !!error }>
            <Minus className="w-4 h-4" />
            <span className="hidden md:inline">Remover</span>
          </Button>
        </div>
      </Card>
  );
}

export default ModifyQuantityCard;

