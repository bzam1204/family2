import React from 'react';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import db from '@/lib/db';

import { DeleteInventoryItemCard } from './DeleteInventoryItemCard';

interface DeleteInventoryItemProps {
  familyId: string
}

export async function DeleteInventoryItem({ familyId }: Readonly<DeleteInventoryItemProps>) {
  const user = await getKindeServerSession().getUser();
  const items = await db.inventoryItem.findMany({
    where: {
      familyId,
      family: { families: { some: { user: { kindeId: user.id } } } }
    }
  })

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Delete Inventory Items</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">Nenhum item disponível no momento.</p>
      ) : (
        <ul className="flex flex-col gap-2 justify-center w-full p-4">
          {items.map(item => (
            <DeleteInventoryItemCard key={item.id} item={item} familyId={familyId} />
          ))}
        </ul>
      )}
    </div>
  );
};
