"use server";

import { revalidatePath } from "next/cache";

import { InventoryItemService } from "@/services/InventoryItemService";

export async function deleteInventoryItem(id: string, familyId: string) {
    const item = await InventoryItemService.remove(id);

    if (!item) throw new Error("Something Went Wrong");

    revalidatePath(`/dashboard/family/${familyId}/inventory/delete`);
    revalidatePath(`/dashboard/family/${familyId}/inventory/modify-quantity`);

    return item;
}
