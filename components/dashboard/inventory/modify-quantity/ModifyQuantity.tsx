import {PropsWithChildren} from "react";
import InventoryItemsList from "@/components/dashboard/inventory/modify-quantity/InventoryItemsList";

export default function ModifyQuantity() {

  return (
    <div className="w-full h-full flex flex-col justify-start items-start p-4">
      <TypographyH3>Modificar Quantidade</TypographyH3>
      <InventoryItemsList/>
    </div>
  )
}

export function TypographyH3({children}: Readonly<PropsWithChildren>) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  )
}
