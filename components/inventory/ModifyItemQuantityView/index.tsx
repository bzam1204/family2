import { Suspense } from "react";
import { InventoryItemsList } from "./InventoryItemsList";

import { TypographyH3 } from "@/components/common/TypographyH3";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface ModifyItemQuantityViewProps {
  familyId: string
}

export function ModifyItemQuantityView({ familyId }: Readonly<ModifyItemQuantityViewProps>) {

  return (
    <div className="w-full flex flex-col justify-start items-center p-4">
      <TypographyH3>Modificar Quantidade</TypographyH3>
      <Suspense fallback={<LoadingSpinner />}>
        {/* @ts-expect-error Server Component */}
        <InventoryItemsList familyId={familyId} />
      </Suspense>
    </div>
  )
}
