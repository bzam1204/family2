"use server";

import { revalidatePath } from "next/cache";

import { CreateInventoryItemDto } from "@/lib/dto/CreateInventoryItemDto";

import { InventoryItemService } from "@/services/InventoryItemService";
import { Decimal } from "@prisma/client/runtime/library";

export async function createInventoryItem(
    values: Omit<CreateInventoryItemDto, "mediaPrice"> & { mediaPrice: string }
) {
    const item = await InventoryItemService.create({
        ...values,
        mediaPrice: values.mediaPrice ? new Decimal(values.mediaPrice) : null,
    });

    if (!item) throw new Error("Algo deu errado");

    revalidatePath(`./items`);

    return item;
}
