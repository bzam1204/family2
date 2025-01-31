import { TypographyH3 } from "@/components/common/TypographyH3";

import { CreateInventoryItemForm } from "./CreateInventoryItemForm";

interface CreateInventoryItemProps {
  familyId: string
}

export default function CreateInventoryItem({ familyId }: Readonly<CreateInventoryItemProps>) {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start p-4">
      <TypographyH3>Criar Item</TypographyH3>
      <CreateInventoryItemForm familyId={familyId} />
    </div>
  )
}
