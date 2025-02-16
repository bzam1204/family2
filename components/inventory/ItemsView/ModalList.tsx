'use client';

import { Button } from "@/components/ui/button";
import { generateShoppingList } from "@/actions/generateShoppingList";
import { useModal } from "@/hooks/context/useModalContext";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export function ModalList( { familyId } : { familyId : string } ) {
  const [isPending, startTransition] = useTransition()
  const { modal } = useModal();
  const { toast } = useToast();

  async function handleShoppingList() {
    try {
      const list = await generateShoppingList( familyId );
      console.log( { fn : ModalList, list } )
      await modal( {
        title : "Lista de Compras",
        content : ( <div className="flex flex-col gap-1 p-2 rounded">
          { list.map( item =>
              <p>{ item.name }: { item.shopQuantity }</p> ) }
        </div> ),
        onConfirm : () => alert( 'hello' )
      } )
    } catch ( e ) {
      toast( {
        title : "Error",
        description : ( e as Error ).message,
      } )
      console.error( e );
    }
  }

  return (
      <div className="flex justify-end w-full">
        <Button onClick={ () => startTransition( () => {
          handleShoppingList()
        } ) }>
          { isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Gerar Lista de Compras" }
        </Button>
      </div>
  )
}