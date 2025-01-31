import { SerializedInventoryItem } from "@/lib/types/SerializedInventoryItem";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatToDecimal } from "@/lib/utils/formatToDecimal";
import Image from "next/image";

interface ItemCardProps {
  item : SerializedInventoryItem
}

export function ItemCard( { item } : Readonly<ItemCardProps> ) {
  return (
      <Card className="flex items-center gap-2 w-full h-32 md:h-24">
        <div className="flex-1 h-full max-w-24 rounded-tl-lg rounded-bl-lg relative">
          <Image className="rounded-tl-lg rounded-bl-lg" src="https://i0.wp.com/mikeyarce.com/wp-content/uploads/2021/09/woocommerce-placeholder.png?ssl=1"
                 alt={ "test image" } fill objectFit="cover" />
        </div>
        <CardHeader className="flex-1 px-2">
          <CardTitle>{ item.name }</CardTitle>
          <CardDescription>{ !!item.description ? item.description : "Indescritível..." }</CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex-1 flex-col">
          <p className="font-bold text-gray-700">Preço Médio</p>
          <p>R$ { formatToDecimal( item.mediaPrice?.toString() ?? "" ) }</p>
        </CardContent>
        <CardFooter className="p-0 flex-1 flex-col">
          <p className="font-bold text-gray-700">Quantidade</p>
          <p>{ item.quantity }</p>
        </CardFooter>
      </Card>
  )
}