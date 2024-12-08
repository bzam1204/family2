import ModifyQuantityCard from "@/components/dashboard/inventory/modify-quantity/ModifyQuantityCard";
import {getAllInventoryItems} from "@/app/services/inventory/inventoryService";

export default async function InventoryItemsList() {
  const itens = await getAllInventoryItems();

  return (<div className="flex-1 bg-fuchsia-200 ">
    {itens.map((item) => (<div key={item.id}><ModifyQuantityCard inventoryItem={item}/></div>))}
  </div>)
}
