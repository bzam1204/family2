"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Plus } from "lucide-react";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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

import { createInventoryItem } from "@/actions/createInventoryItem";
import { useRouter } from "next/navigation";

const inventoryItemSchema = z.object({
  name: z.string().min(2).max(300),
  quantity: z.coerce.number().min(0).int('Deve ser um número inteiro'),
  description: z.string().optional(),
  familyId: z.string(),
  mediaPrice: z.coerce.number().optional(),
  minQuantity: z.coerce.number().min(0).int('Deve ser um número inteiro').optional().nullable(),
  idealQuantity: z.coerce.number().min(0).int('Deve ser um número inteiro').optional().nullable(),
});

interface CreateInventoryItemFormProps {
  familyId: string
}

export function CreateInventoryItemForm({ familyId }: Readonly<CreateInventoryItemFormProps>) {
  const { toast } = useToast();
  const { push } = useRouter();
  const form = useForm<z.infer<typeof inventoryItemSchema>>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      familyId: familyId,
      mediaPrice: undefined,
      description: undefined,
      minQuantity: undefined,
      idealQuantity: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof inventoryItemSchema>) {
    try {
      toast({ title: "Creating inventory item...", description: "Please wait.", });

      const item = await createInventoryItem({
        name: values.name,
        quantity: values.quantity,
        familyId: values.familyId,
        mediaPrice: values.mediaPrice?.toString() ?? "",
        description: values.description === "" ? null : values.description,
        // @ts-ignore
        minQuantity: values.minQuantity === "" ? null : values.minQuantity,
        // @ts-ignore
        idealQuantity: values.idealQuantity === "" ? null : values.idealQuantity,
      });

      toast({
        title: `${item.name} Adicionado!`,
        description: "O item foi criado com sucesso.",
      });

      push("./items");

    } catch (error) {

      toast({
        title: "Erro",
        description: "Não foi possível adicionar o item.",
      });
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Item</FormLabel>
              <FormControl>
                <Input placeholder="Leite..." {...field} />
              </FormControl>
              <FormDescription>
                Escreva o nome do item que desejas adicionar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Forneça uma descrição do Item
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                Escreva o nome do item que desejas adicionar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idealQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade Ideal</FormLabel>
              <FormControl>
                <Input type="number" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormDescription>
                Para Lista de Compras
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade Mínima</FormLabel>
              <FormControl>
                <Input type="number" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormDescription>
                Para receber alertas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mediaPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Preço Médio
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                Forneça o preço comum desse item
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="familyId"
          render={({ field }) => (
            <FormControl>
              <Input hidden readOnly className="hidden" {...field} />
            </FormControl>
          )}
        />
        <Button type="submit"><Plus />Criar Item</Button>
      </form>
    </Form>
  )
}
