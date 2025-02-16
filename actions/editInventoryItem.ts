'use server';

import { InventoryItemService } from "@/services/InventoryItemService";
import { UpdateInventoryItemDto } from "@/lib/dto/UpdateInventoryItemDto";
import { InventoryItem } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function editInventoryItem( item : UpdateInventoryItemDto ) : Promise<{
  success : boolean,
  message? : string,
  data? : InventoryItem
}> {
  const updatedItem = await InventoryItemService.update( item );

  if ( !updatedItem ) {
    return {
      success : false,
      message : `Something went wrong ${ item.id }`,
    }
  }

  revalidatePath( './items' );

  return {
    success : true,
    data : updatedItem,
  };
}