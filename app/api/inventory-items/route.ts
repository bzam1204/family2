import {getAllInventoryItems} from "@/services/inventory/inventoryService";

export async function GET() {
  const items = await getAllInventoryItems();

  return Response.json({ items })
}
