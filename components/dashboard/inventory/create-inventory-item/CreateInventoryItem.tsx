import CreateInvetoryItemForm from "@/components/dashboard/inventory/create-inventory-item/CreateInvetoryItemForm";
import {PropsWithChildren} from "react";

export default function CreateInventoryItem() {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start p-4">
      <TypographyH3>Criar Item</TypographyH3>
      <CreateInvetoryItemForm/>
    </div>
  )
}

function TypographyH3({children}: Readonly<PropsWithChildren>) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  )
}

