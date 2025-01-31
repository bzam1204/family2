import { Suspense } from 'react';

import LoadingSpinner from '@/components/common/LoadingSpinner';

import ModifyQuantityCard from './ModifyQuantityCard';
import { InventoryItemService } from '@/services/InventoryItemService';

interface InventoryItemsListProps {
  familyId : string
}

export async function InventoryItemsList({ familyId } : Readonly<InventoryItemsListProps>) {
  const items = await InventoryItemService.getAllByFamilyId(familyId);
  const serializedItems = items.map(item => {
    return { ...item, mediaPrice: item.mediaPrice?.toString() ?? null }
  })

  return (
      <Suspense fallback={<LoadingSpinner/>}>
        <div className="flex flex-col gap-1 justify-center w-full p-4">
          {serializedItems.length === 0 ? (
              <p className="text-gray-500 text-center">No inventory items available to modify.</p>
          ) : (
              serializedItems.map((item) => (
                  <ModifyQuantityCard key={item.id} item={item}/>
              ))
          )}
        </div>
      </Suspense>
  );
}
