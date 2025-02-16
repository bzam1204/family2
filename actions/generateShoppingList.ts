'use server';

import { FamilyService } from "@/services/FamilyService";

export async function generateShoppingList( familyId : string ) {
  const list = await FamilyService.generateShoppingList( familyId );

  if ( !list || list.length === 0 ) {
    throw new Error( 'No lists found' );
  }

  return list;
}