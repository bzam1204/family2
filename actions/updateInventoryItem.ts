'use server'

import { revalidatePath } from "next/cache";

import { InventoryItemService } from "@/services/InventoryItemService";

import { UpdateInventoryItemDto } from "@/lib/dto/UpdateInventoryItemDto";

export async function updateInventoryItem(
    data: UpdateInventoryItemDto,
    familyId: string
) {
    const item = await InventoryItemService.update(data);

    if (!item) throw new Error("Something Went Wrong");

    revalidatePath(`/dashboard/family/${familyId}/inventory/modify-quantity`);

    return item;
}
