'use server';

import { revalidatePath } from "next/cache";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FamilyService } from "@/services/FamilyService";

export const deleteFamilyAction = async ( familyId : string ) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if ( !user ) throw new Error( 'Unauthorized' );

    const family = await FamilyService.remove( familyId );
    revalidatePath( `/dashboard/${ user.id }/family/my-families` );

    return { success : true, message : 'Family deleted successfully' };
  } catch ( error ) {
    console.error( 'Delete family error:', error );
    return {
      success : false,
      message : error instanceof Error ? error.message : 'Failed to delete family'
    };
  }
};