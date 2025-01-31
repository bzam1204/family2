import { Suspense } from 'react';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { ItemModificationLogService } from "@/services/ItemLogService";
import { ItemLogCard } from "@/components/inventory/RegistryView/ItemLogCard";

interface ItemLogsListProps {
  familyId : string
}

export async function ItemLogsList({ familyId } : Readonly<ItemLogsListProps>) {
  const logs = await ItemModificationLogService.getAllByFamily(familyId);

  return (
      <Suspense fallback={<LoadingSpinner/>}>
        <div className="flex flex-col gap-1 justify-center w-full p-4">
          {logs.length === 0 ? (
              <p className="text-gray-500 text-center">Registro vazio.</p>
          ) : (
              logs.map((log) => (
                  <ItemLogCard key={log.id} log={log}/>
              ))
          )}
        </div>
      </Suspense>
  );
};
