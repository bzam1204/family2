import { Suspense } from 'react';

import LoadingSpinner from '@/components/common/LoadingSpinner';

import db from '@/lib/db';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import ModifyQuantityCard from './ModifyQuantityCard';

interface InventoryItemsListProps {
  familyId: string
}

export async function InventoryItemsList({ familyId }: Readonly<InventoryItemsListProps>) {
  const user = await getKindeServerSession().getUser();

  const items = await db.inventoryItem.findMany({
    where: {
      familyId,
      family: { families: { some: { user: { kindeId: user.id } } } }
    }
  })

  const logs = await db.inventoryItemModificationLog.findMany({
    where: {
      familyId: familyId
    },
    include: {
      InventoryItem: true
    }
  })

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="flex flex-col gap-1 justify-center w-full p-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">No inventory items available to modify.</p>
        ) : (
          items.map((item) => (
            <ModifyQuantityCard key={item.id} item={item} />
          ))
        )}
        {logs.map(log => (<div key={log.id}>nome:{log.InventoryItem.name} | preço:{log.currentPrice?.toString()} | data:{log.changedAt.toString()} | diff:{log.change.toString()}</div>))}
      </div>
    </Suspense>
  );
};
