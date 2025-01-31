'use client'

import { useState, useEffect } from "react";

import { useToast } from "@/hooks/use-toast";

import useDebounce from "@/hooks/useDebounce";

import { useSelectFamilyContext } from "./context/useSelectFamilyContext";

import { updateQuantityInventoryItem } from "@/actions/updateQuantityInventoryItem";

import { SerializedInventoryItem } from "@/lib/types/SerializedInventoryItem";
import { currentPriceSchema } from "@/lib/schemas/currentPriceSchema";
import { formatToDecimal } from "@/lib/utils/formatToDecimal";

interface IUseModifyQuantity {
  quantity : number;
  addQuantity : () => void;
  currentPrice : string;
  removeQuantity : () => void;
  handleSetCurrentPrice : ( price : string ) => void;
}

export function useModifyQuantity( item : SerializedInventoryItem ) : {
  error : { message : string } | null;
  quantity : number;
  addQuantity : () => void;
  currentPrice : string;
  removeQuantity : () => void;
  handleSetCurrentPrice : ( price : string ) => void
} {
  const { toast } = useToast();
  const { selectedFamily } = useSelectFamilyContext();

  const [quantity, setQuantity] = useState<number>( item.quantity );
  const [currentPrice, setCurrentPrice] = useState<string>( formatToDecimal( item.mediaPrice?.toString() ?? "" ) );
  const [error, setError] = useState<{ message : string } | null>( null )

  const debouncedQuantity = useDebounce( quantity, 500 );

  const updateQuantity = async ( change : number ) => {
    try {
      toast( { title : "Atualizando item de estoque...", description : "Aguarde." } );

      await updateQuantityInventoryItem( {
        id : item.id,
        quantity : item.quantity + change,
        familyId : selectedFamily.id,
        currentPrice : currentPrice
      } )

      toast( { title : "Item de estoque atualizado!", description : "O item foi atualizado com sucesso.", } );
    } catch ( error ) {
      toast( { title : "Erro", description : "Não foi possível atualizar o item de estoque." } );
    }
  }

  useEffect( () => {
    if ( debouncedQuantity === item.quantity ) return;

    ( async () => await updateQuantity( debouncedQuantity - item.quantity ) )();
  }, [debouncedQuantity] );

  return {
    error,
    quantity,
    currentPrice,
    addQuantity : () => {
      setQuantity( prev => prev + 1 );
    },
    removeQuantity : () => {
      setQuantity( prev => prev - 1 );
    },
    handleSetCurrentPrice : ( price : string ) => {
      const value = price.replace( ",", "." );
      const validation = currentPriceSchema.safeParse( value );

      if ( !validation.success && price !== "" ) {
        setError( { message : "O preço deve ser um número!" } );
        toast( { title : "Erro", description : "O preço deve ser assim: '2,99' ou '2' !", variant : "destructive" } );

        return;
      }

      error && setError( null );
      setCurrentPrice( formatToDecimal( price ) );
    },
  };
}
