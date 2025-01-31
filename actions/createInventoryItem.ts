"use server";

import { revalidatePath } from "next/cache";

import { CreateInventoryItemDto } from "@/lib/dto/CreateInventoryItemDto";

import { InventoryItemService } from "@/services/InventoryItemService";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function createInventoryItem( values : CreateInventoryItemDto ) {
  const item = await InventoryItemService.create( values );
  const user = await getKindeServerSession().getUser()

  if ( !item ) throw new Error( "Algo deu errado" );

  revalidatePath( `./items` );

  return item;
}
