import { revalidatePath } from "next/cache";

import db from "@/lib/db";

import { Family, FamilyUserRole, InventoryItem, User } from "@prisma/client";

import { CreateFamilyDto } from "@/lib/dto/CreateFamilyDto";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface IFamilyService {
  get( id : string ) : Promise<Family>;

  getAll( kindeId : string, includeUser : true ) : Promise<( Family & { user : User } ) []>;

  getAll( kindeId : string, includeUser ? : false ) : Promise<Family []>;

  create( data : CreateFamilyDto ) : Promise<Family>;

  remove( id : string ) : Promise<Family>;

  generateShoppingList( familyId : string ) : Promise<{ name : string, shopQuantity : number }[]>;
}

export const FamilyService : IFamilyService = {
  get : async function ( id ) {
    const family = await db.family.findUnique( { where : { id } } );

    if ( !family ) throw new Error( "Not Found" );

    return family;
  },
  getAll : async ( kindeId, includeUser = false ) => await db.family.findMany( {
    where : {
      isActive : true,
      families : { some : { user : { kindeId } } },
    },
    include : {
      user : includeUser
    }

  } ),
  create : async function ( data ) {
    console.log( { fn : this.create, data } );
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if ( !kindeUser ) throw new Error( "Usuário não existe" );

    const user = await db.user.findFirst( {
      where : {
        kindeId : kindeUser.id,
      },
    } );

    if ( !user ) throw new Error( "Something Went Wrong" );

    const family = await db.family.create( {
      data : {
        name : data.name,
        creatorUserId : user.id,
      },
    } );

    if ( !family ) throw new Error( "Something Went Wrong" );

    await db.familyUser.create( {
      data : {
        role : FamilyUserRole.ADMIN,
        userId : user.id,
        familyId : family.id,
      },
    } );

    revalidatePath( "/dashboard/family" );

    return family;
  },
  remove : async function ( id ) {
    console.log( { id } );
    return await db.family.update( {
      where : {
        id,
      },
      data : {
        isActive : false,
        families : {
          updateMany : {
            where : { familyId : id },
            data : { isActive : false },
          },
        },
        InventoryItem : {
          updateMany : {
            where : { familyId : id },
            data : { isActive : false },
          },
        },
      },
    } );
  },
  generateShoppingList : async function ( familyId ) {
    // const items = await db.inventoryItem.findMany( {
    //   where : {
    //     familyId,
    //     idealQuantity : {
    //       not : null,
    //     },
    //     quantity : {
    //       lt : { idealQuantity : true },
    //       gte : { idealQuantity : true, substract : true },
    //     }
    //   }
    // } );

    const items = await db.$queryRaw<InventoryItem[]>`
        SELECT *
        FROM "InventoryItem"
        WHERE "familyId" = ${ familyId }::uuid
          AND "quantity" < "idealQuantity"
          AND "idealQuantity" IS NOT NULL;
    `;

    console.log( { items } );

    if ( !items ) {
      throw new Error( "Something Went Wrong" );
    }

    return items.map( i => ( {
      name : i.name,
      shopQuantity : i.idealQuantity! - i.quantity,
    } ) );
  }
};
