"use server";

import { revalidatePath } from "next/cache";

import { UpdateQuantityInventoryItemDto } from "@/lib/dto/UpdateQuantityInventoryItemDto";

import { InventoryItemService } from "@/services/InventoryItemService";

export async function updateQuantityInventoryItem(
    data: UpdateQuantityInventoryItemDto
) {
    try {
        console.log(data);
        return await InventoryItemService.updateQuantity(data);
    } catch (error) {
        console.error(error);
    } finally {
        revalidatePath(
            `/dashboard/family/${data.familyId}/inventory/modify-quantity`
        );
    }
}
