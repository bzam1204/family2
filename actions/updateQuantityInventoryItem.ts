"use server";

import { revalidatePath } from "next/cache";

import { InventoryItemService } from "@/services/InventoryItemService";

import { UpdateQuantityInventoryItemDto } from "@/lib/dto/UpdateQuantityInventoryItemDto";

import { currentPriceSchema } from "@/lib/schemas/currentPriceSchema";

export async function updateQuantityInventoryItem(
    data : Omit<UpdateQuantityInventoryItemDto, "currentPrice"> & { currentPrice : string }
) {

  try {
    const price = data.currentPrice.length > 0 ? data.currentPrice.replace( ",", "." ) : null;

    console.log( { fn : updateQuantityInventoryItem, price } );

    const validation = currentPriceSchema.safeParse( price );

    if ( !validation.success ) throw new Error( validation.error.message );

    await InventoryItemService.updateQuantity( { ...data, currentPrice : validation.data } );
  } catch ( error ) {
    console.error( error );

    throw error;
  } finally {
    revalidatePath( `/dashboard/family/${ data.familyId }/inventory/modify-quantity` );
  }
}
