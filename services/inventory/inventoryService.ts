import prisma from "@/services/dbService";

import {InventoryItem} from "@prisma/client"

export const InventoryItemService = {
  get,
  getAll,
  create,
  update,
  remove,
}

export async function getAll(): Promise<InventoryItem[]> {
  return prisma.inventoryItem.findMany({
    orderBy: {
      name: 'asc',
    }
  });
}

export async function get(id: string): Promise<InventoryItem | null> {
  return prisma.inventoryItem.findUnique({where: {id}});
}

export async function create(newItem: InventoryItem): Promise<InventoryItem> {
  const createdItem = prisma.inventoryItem.create({data: newItem});

  console.log(createdItem);

  return createdItem;
}

export async function update(updatedItem: InventoryItem): Promise<InventoryItem> {
  const item = await get(updatedItem.id);

  if (!item) throw new Error("Item não encontrado.");

  return prisma.inventoryItem.update({
    data: updatedItem,
    where: {
      id: updatedItem.id,
    }
  });
}

export async function remove(id: string) {
  return prisma.inventoryItem.delete({where: {id}});
}

