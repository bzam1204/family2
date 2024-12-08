'use server'
import prisma from "@/app/services/prisma";

import {InventoryItem} from "@prisma/client"

export async function getAllInventoryItems(): Promise<InventoryItem[]> {
  return prisma.inventoryItem.findMany({
    orderBy: {
      name: 'asc',
    }
  });
}

export async function getInventoryItem(id: string): Promise<InventoryItem | null> {
  return prisma.inventoryItem.findUnique({where: {id}});
}

export async function createInventoryItem(newItem: InventoryItem): Promise<InventoryItem> {
  const createdItem = prisma.inventoryItem.create({data: newItem});

  console.log(createdItem);

  return createdItem;
}

export async function updateInventoryItem(updatedItem: InventoryItem): Promise<InventoryItem> {
  const item = await getInventoryItem(updatedItem.id);

  if (!item) throw new Error("Item não encontrado.");

  return prisma.inventoryItem.update({
    data: updatedItem,
    where: {
      id: updatedItem.id,
    }
  });
}

