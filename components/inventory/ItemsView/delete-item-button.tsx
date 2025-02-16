'use client';

import { useTransition } from "react";
import { useModal } from "@/hooks/context/useModalContext";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { deleteInventoryItem } from "@/actions/deleteInventoryItem";

export function DeleteItemButton( { itemId } : { itemId : string } ) {
  const [isPending, startTransition] = useTransition();
  const { modal } = useModal();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await modal( {
        title : "Delete Item",
        content : "Are you sure you want to delete this item? This action cannot be undone.",
        onConfirm : () => {
          startTransition( () => {
            deleteInventoryItem( itemId )
                .then( ( result ) => {
                  if ( !result.success ) {
                    throw new Error( result.message );
                  }
                } )
                .catch( ( error ) => {
                  console.error( "Erro ao deletar item do inventário:", error );
                } );
          } );
        }
      } );
    } catch ( error ) {
      toast( {
        title : error instanceof Error ? error.message : "Erro ao deletar",
      } )
    }
  };

  return (
      <Button
          size="sm"
          variant="destructive"
          onClick={ handleDelete }
          disabled={ isPending }
          className="h-8 w-8 p-0"
      >
        { isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
            <Trash className="h-4 w-4" />
        ) }
      </Button>
  );
}