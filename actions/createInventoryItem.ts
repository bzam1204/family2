"use server";

import { revalidatePath } from "next/cache";

import { CreateInventoryItemDto } from "@/lib/dto/CreateInventoryItemDto";

import { InventoryItemService } from "@/services/InventoryItemService";

export async function createInventoryItem(values: CreateInventoryItemDto) {
    const item = await InventoryItemService.create(values);

    if (!item) throw new Error("Algo deu errado");

    revalidatePath(`/dashboard/family/${values.familyId}/inventory/`);

    return item;
}
