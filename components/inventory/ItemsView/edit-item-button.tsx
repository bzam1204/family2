'use client';

import { useTransition } from "react";
import { useModal } from "@/hooks/context/useModalContext";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { editInventoryItem } from "@/actions/editInventoryItem";
import { EditItemForm } from "@/components/inventory/ItemsView/form-edit-item";
import { SerializedInventoryItem } from "@/lib/types/SerializedInventoryItem";

export function EditItemButton( { item } : { item : SerializedInventoryItem } ) {
  const [isPending, startTransition] = useTransition();
  const { modal } = useModal();
  const { toast } = useToast();

  const handleEdit = async () => {
    try {
      await modal( {
        buttonless : true,
        title : "Alterar Item",
        content : ( <EditItemForm item={ item } /> ),
        onConfirm : () => {
          startTransition( () => {
            editInventoryItem( item )
                .then( ( result ) => {
                  if ( !result.success ) {
                    throw new Error( result.message );
                  }
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
          variant="secondary"
          onClick={ handleEdit }
          disabled={ isPending }
          className="h-8 w-8 p-0"
      >
        { isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
            <Pencil className="h-4 w-4" />
        ) }
      </Button>
  );
}