"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteInventoryItem(id: string, familyId: string) {
    const item = await db.inventoryItem.delete({ where: { id } });

    if (!item) throw new Error("Something Went Wrong");

    revalidatePath(`/dashboard/family/${familyId}/inventory/delete`);
    revalidatePath(`/dashboard/family/${familyId}/inventory/modify-quantity`);

    return item;
}
