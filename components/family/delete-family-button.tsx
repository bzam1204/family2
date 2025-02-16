'use client';

import { useTransition } from "react";
import { useModal } from "@/hooks/context/useModalContext";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { deleteFamilyAction } from "@/actions/deleteFamilyAction";
import { useToast } from "@/hooks/use-toast";

export function DeleteFamilyButton( { familyId } : { familyId : string } ) {
  const [isPending, startTransition] = useTransition();
  const { modal } = useModal();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await modal( {
        title : "Delete Family",
        content : "Are you sure you want to delete this family? This action cannot be undone.",
        onConfirm : async () => {
          startTransition( () => {
            deleteFamilyAction( familyId )
                .then( result => {
                  if ( !result.success ) {
                    throw new Error( result.message );
                  }
                  toast( { title : "Família deletada com sucesso" } );
                } )
                .catch( error => {
                  console.error( "Erro ao deletar família:", error );
                  toast( { title : "Erro ao deletar família", description : error.message, variant : "destructive" } );
                } );
          } );
        }
      } );
    } catch ( error ) {
      toast( { title : error instanceof Error ? error.message : "Failed to delete family." } );
    }
  };

  return (
      <Button
          variant="destructive"
          size="sm"
          onClick={ handleDelete }
          disabled={ isPending }
      >
        { isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
            <Trash className="h-4 w-4" />
        ) }
      </Button>
  );
}