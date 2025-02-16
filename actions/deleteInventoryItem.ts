"use server";

import { revalidatePath } from "next/cache";

import { InventoryItemService } from "@/services/InventoryItemService";

export async function deleteInventoryItem( id : string ) {
  const item = await InventoryItemService.remove( id );

  if ( !item ) {
    return { success : false, message : "Something went wrong." };
  }

  revalidatePath( `./items` );
  revalidatePath( `./inventory/modify-quantity` );

  return { success : true, message : "Deleted Inventory", data : item };
}
