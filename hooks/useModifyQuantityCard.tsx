import {useState} from "react";

import {useToast} from "@/hooks/use-toast";

import {InventoryItem} from "@prisma/client";

import axiosInstance from "@/lib/axiosInstance";

export default function useModifyQuantityCard(inventoryItem: InventoryItem) {
  const [quantity, setQuantity] = useState<number>(inventoryItem.quantity);

  const {toast} = useToast();

  async function addQuantity() {
    const factor = 1;
    setQuantity(quantity + factor);
    await updateQuantity(factor)
  }

  async function removeQuantity() {
    const factor = -1;
    setQuantity(quantity + factor);
    await updateQuantity(factor)
  }

  async function updateQuantity(factor: number) {
    try {
      toast({title: "Atualizando item de estoque...", description: "Aguarde."});

      await axiosInstance.put('/inventory-items', {
        ...inventoryItem,
        quantity: quantity + factor
      } as InventoryItem);

      toast({title: "Item de estoque atualizado!", description: "O item foi atualizado com sucesso."});

    } catch (error) {
      toast({title: "Erro", description: "Não foi possível atualizar o item de estoque."});

    }
  }

  return {
    quantity,
    addQuantity,
    removeQuantity,
  };
}
