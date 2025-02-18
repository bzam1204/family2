"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useToast } from "@/hooks/use-toast";
import { editInventoryItem } from "@/actions/editInventoryItem";
import { formatToDecimal } from "@/lib/utils/formatToDecimal";
import { SerializedInventoryItem } from "@/lib/types/SerializedInventoryItem";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

const inventoryItemSchema = z.object( {
  name : z.string().min( 2 ).max( 300 ),
  itemId : z.string(),
  quantity : z.coerce.number().min( 0 ).int( 'Deve ser um número inteiro' ),
  mediaPrice : z.string().optional().nullable(),
  description : z.string().optional().nullable(),
  minQuantity : z.coerce.number().min( 0 ).int( 'Deve ser um número inteiro' ).optional().nullable(),
  idealQuantity : z.coerce.number().min( 0 ).int( 'Deve ser um número inteiro' ).optional().nullable(),
} );

interface EditItemFormProps {
  item : SerializedInventoryItem
}

export function EditItemForm( { item } : Readonly<EditItemFormProps> ) {
  const { toast } = useToast();

  console.log( { item } )
  const form = useForm<z.infer<typeof inventoryItemSchema>>( {
    resolver : zodResolver( inventoryItemSchema ),
    defaultValues : {
      name : item.name,
      itemId : item.id,
      quantity : item.quantity,
      mediaPrice : formatToDecimal( item.mediaPrice?.toString() ?? '0.00' ),
      description : item.description ?? '',
      minQuantity : item.minQuantity,
      idealQuantity : item.idealQuantity,
    },
  } )

  async function onSubmit( values : z.infer<typeof inventoryItemSchema> ) {
    toast( { title : "Salvando alterações...", description : "Por favor, espere.", } );

    const response = await editInventoryItem( {
      id : item.id,
      name : values.name,
      quantity : values.quantity,
      mediaPrice : values.mediaPrice === "" ? null : values.mediaPrice,
      description : values.description === "" ? null : values.description,
      // @ts-ignore
      minQuantity : values.minQuantity === "" ? null : values.minQuantity,
      // @ts-ignore
      idealQuantity : values.idealQuantity === "" ? null : values.idealQuantity,
    } );

    if ( !response.success ) {
      toast( {
        title : "Erro",
        description : "Não foi possível editar o item.",
      } );

      return
    }

    toast( {
      title : `Alterações do item${ response?.data?.name } Salvas!`,
      description : "Sucesso!",
    } );
  }

  return (
      <Form { ...form }>
        <form className=" flex flex-col gap-1 max-h-96  overflow-y-scroll px-1" onSubmit={ form.handleSubmit( onSubmit ) }>
          <FormField
              control={ form.control }
              name="name"
              render={ ( { field } ) => (
                  <FormItem>
                    <FormLabel>Nome do Item</FormLabel>
                    <FormControl>
                      <Input { ...field } />
                    </FormControl>
                    <FormDescription>
                      Escreva o nome do item que desejas adicionar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
              ) }
          />
          <FormField
              control={ form.control }
              name="description"
              render={ ( { field } ) => (
                  <FormItem className="m-0">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input { ...field } value={ field.value ?? '' } />
                    </FormControl>
                    <FormDescription>
                      Forneça uma descrição do Item
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
              ) }
          />
          <FormField
              control={ form.control }
              name="quantity"
              render={ ( { field } ) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input type="number" { ...field } />
                    </FormControl>
                    <FormDescription>
                      Escreva o nome do item que desejas adicionar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
              ) }
          /> <FormField
            control={ form.control }
            name="idealQuantity"
            render={ ( { field } ) => (
                <FormItem>
                  <FormLabel>Quantidade Ideal</FormLabel>
                  <FormControl>
                    <Input type="number" { ...field } value={ field.value ?? '' } />
                  </FormControl>
                  <FormDescription>
                    Para Lista de Compras
                  </FormDescription>
                  <FormMessage />
                </FormItem>
            ) }
        />
          <FormField
              control={ form.control }
              name="minQuantity"
              render={ ( { field } ) => (
                  <FormItem>
                    <FormLabel>Quantidade Mínima</FormLabel>
                    <FormControl>
                      <Input type="number" { ...field } value={ field.value ?? '' } />
                    </FormControl>
                    <FormDescription>
                      Para receber alertas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
              ) }
          />
          <FormField
              control={ form.control }
              name="mediaPrice"
              render={ ( { field } ) => (
                  <FormItem>
                    <FormLabel>
                      Preço Médio
                    </FormLabel>
                    <FormControl>
                      <Input { ...field } value={ field.value ?? '' } />
                    </FormControl>
                    <FormDescription>
                      Forneça o preço comum desse item
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
              ) }
          />
          <FormField
              control={ form.control }
              name="itemId"
              render={ ( { field } ) => (
                  <FormControl>
                    <Input hidden readOnly className="hidden" { ...field } />
                  </FormControl>
              ) }
          />
          <Button type="submit"><Pen />Salvar Alterações</Button>
        </form>
      </Form>
  )
}
