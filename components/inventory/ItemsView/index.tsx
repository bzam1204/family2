import { InventoryItemService } from "@/services/InventoryItemService";
import { ItemCard } from "@/components/inventory/ItemsView/ItemCard";

interface ItemsViewProps {
  familyId : string;
}

export async function ItemsView( { familyId } : Readonly<ItemsViewProps> ) {
  const items = await InventoryItemService.getAllByFamilyId( familyId );
  const serializedItems = items.map( item => {
    return { ...item, mediaPrice : item.mediaPrice?.toString() ?? "" }
  } )
  return (
      <main className="flex flex-col p-2 gap-2">
        { serializedItems.length > 0
            ? serializedItems.map( item => {
              return <ItemCard key={ item.id } item={ item } />
            } )
            : <p>Dispensa Vazia :-\</p> }
      </main>
  )
}