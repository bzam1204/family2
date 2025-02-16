import db from "@/lib/db";

import { CreateInventoryItemDto } from "@/lib/dto/CreateInventoryItemDto";
import { UpdateInventoryItemDto } from "@/lib/dto/UpdateInventoryItemDto";
import { UpdateQuantityInventoryItemDto } from "@/lib/dto/UpdateQuantityInventoryItemDto";

import { InventoryItem } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

interface IInventoryItemService {
  get( id : string ) : Promise<InventoryItem | null>;

  getAll() : Promise<InventoryItem[]>;

  getAllByFamilyId( id : string ) : Promise<InventoryItem[]>;

  create( data : CreateInventoryItemDto ) : Promise<InventoryItem>;

  update( data : UpdateInventoryItemDto) : Promise<InventoryItem>;

  updateQuantity(
      data : UpdateQuantityInventoryItemDto
  ) : Promise<InventoryItem>;

  remove( id : string ) : Promise<InventoryItem>;
}

export const InventoryItemService : IInventoryItemService = {
  get : async ( id ) => {
    return await db.inventoryItem.findUnique( { where : { id } } );
  },
  getAll : async function () {
    return await db.inventoryItem.findMany( {
      where : { isActive : true },
      orderBy : { name : "asc" },
    } );
  },
  getAllByFamilyId : async ( id ) => {
    return await db.inventoryItem.findMany( {
      where : { familyId : id, isActive : true },
    } );
  },
  create : async ( data ) => {
    return await db.inventoryItem.create( { data } );
  },
  update : async function ( data ) {
    const item = await this.get( data.id );

    if ( !item ) throw new Error( "Not found" );

    return await db.inventoryItem.update( {
      data : {
        ...data, mediaPrice : item.mediaPrice ? new Decimal( item.mediaPrice ) : null,
      },
      where : { id : data.id },
    } );
  },
  updateQuantity : async function ( data ) {
    console.log( { fn : this.updateQuantity, data } );

    const itemExists = await this.get( data.id );

    if ( !itemExists ) throw new Error( "Not Found" );

    const [item, log] = await db.$transaction( [
      db.inventoryItem.update( {
        data : {
          quantity : data.quantity,
        },
        where : {
          id : data.id,
        },
      } ),
      db.inventoryItemModificationLog.create( {
        data : {
          itemId : data.id,
          change : data.quantity - itemExists.quantity,
          familyId : data.familyId,
          currentPrice : data.currentPrice
              ? new Decimal( data.currentPrice )
              : null,
        },
      } ),
    ] );

    if ( !item || !log ) throw new Error( "Something went wrong" );

    const mediaPriceUpdate = await db.$queryRaw<{ media : bigint | null }[]>`
        SELECT AVG("currentPrice") AS "media"
        FROM "InventoryItemModificationLog"
        WHERE "itemId" = ${ item.id }::uuid
        AND "currentPrice" > 0;
    `;

    if ( !mediaPriceUpdate ) throw new Error( "Something went wrong" );

    console.log( {
      fn : this.updateQuantity,
      ["!mediaPriceUpdate[0].media"] : !mediaPriceUpdate[0].media
    }, mediaPriceUpdate );
    if ( !mediaPriceUpdate[0].media ) {
      return item;
    }

    const media_item = await db.inventoryItem.update( {
      where : { id : item.id },
      data : { mediaPrice : Number( mediaPriceUpdate[0].media ) },
    } );

    if ( !media_item ) throw new Error( "Something went wrong" );

    console.log( { fn : this.updateQuantity, media_item } );

    return item;
  },
  remove : async ( id ) => {
    return await db.inventoryItem.update( {
      where : { id },
      data : {
        isActive : false,
      },
    } );
  },
};
