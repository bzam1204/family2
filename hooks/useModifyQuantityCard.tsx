'use client'

import { useState, useEffect } from "react";

import { useToast } from "@/hooks/use-toast";

import { InventoryItem } from "@prisma/client";

import useDebounce from "@/hooks/useDebounce";

import { useSelectFamilyContext } from "./context/useSelectFamilyContext";
import { UpdateQuantityInventoryItemDto } from "@/lib/dto/UpdateQuantityInventoryItemDto";
import { updateQuantityInventoryItem } from "@/actions/updateQuantityInventoryItem";

export default function useModifyQuantityCard(item: InventoryItem) {
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [currentPrice, setCurrentPrice] = useState<number | null>(Number(item.mediaPrice));
  const debouncedQuantity = useDebounce(quantity, 500); // Debounce de 500ms
  const { selectedFamily } = useSelectFamilyContext();

  const { toast } = useToast();

  useEffect(() => {
    if (debouncedQuantity !== item.quantity) {
      updateQuantity(debouncedQuantity - item.quantity);
    }
  }, [debouncedQuantity]);

  async function addQuantity() {
    setQuantity(prev => prev + 1);
  }

  async function removeQuantity() {
    setQuantity(prev => prev - 1);
  }

  function handleSetCurrentPrice(price: string) {
    setCurrentPrice(Number(price));
  }

  async function updateQuantity(change: number) {
    try {
      toast({ title: "Atualizando item de estoque...", description: "Aguarde." });

      const data: UpdateQuantityInventoryItemDto = {
        id: item.id,
        quantity: item.quantity + change,
        familyId: selectedFamily.id,
        currentPrice: currentPrice
      }

      console.log({ data })

      await updateQuantityInventoryItem(data)

      toast({ title: "Item de estoque atualizado!", description: "O item foi atualizado com sucesso." });

    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível atualizar o item de estoque." });

    }
  }

  return {
    quantity,
    addQuantity,
    currentPrice,
    removeQuantity,
    handleSetCurrentPrice,
  };
}
