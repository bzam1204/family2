import {useState} from "react";

import {InventoryItem} from "@prisma/client";
import {updateInventoryItem} from "@/app/services/inventory/inventoryService";

export default function useModifyQuantityCard(inventoryItem: InventoryItem) {
  const [quantity, setQuantity] = useState<number>(inventoryItem.quantity);

  async function addQuantity() {
    const factor = 1;
    setQuantity(quantity + factor);
    await updateInventoryItem({
      ...inventoryItem,
      quantity: quantity + factor
    } as InventoryItem);
  }

  async function removeQuantity() {
    const factor = -1;
    setQuantity(quantity + factor);
    await updateInventoryItem({
      ...inventoryItem,
      quantity: quantity + factor
    } as InventoryItem);
  }

  return {
    quantity,
    addQuantity,
    removeQuantity,
  };
}
