import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { InventoryItem } from "@prisma/client";
import axiosInstance from "@/lib/axiosInstance";
import useDebounce from "@/hooks/useDebounce";

export default function useModifyQuantityCard(inventoryItem: InventoryItem) {
  const [quantity, setQuantity] = useState<number>(inventoryItem.quantity);
  const debouncedQuantity = useDebounce(quantity, 500); // Debounce de 500ms

  const { toast } = useToast();

  useEffect(() => {
    if (debouncedQuantity !== inventoryItem.quantity) {
      updateQuantity(debouncedQuantity - inventoryItem.quantity);
    }
  }, [debouncedQuantity]);

  async function addQuantity() {
    setQuantity(prev => prev + 1);
  }

  async function removeQuantity() {
    setQuantity(prev => prev - 1);
  }

  async function updateQuantity(change: number) {
    try {
      toast({ title: "Atualizando item de estoque...", description: "Aguarde." });

      await axiosInstance.put('/inventory-items', {
        ...inventoryItem,
        quantity: inventoryItem.quantity + change
      } as InventoryItem);

      toast({ title: "Item de estoque atualizado!", description: "O item foi atualizado com sucesso." });

    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível atualizar o item de estoque." });

    }
  }

  return {
    quantity,
    addQuantity,
    removeQuantity,
  };
}
