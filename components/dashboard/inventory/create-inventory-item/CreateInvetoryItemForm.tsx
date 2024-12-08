"use client"

import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"

import {Plus} from "lucide-react";

import {Button} from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {Input} from "@/components/ui/input"
import axiosInstance from "@/lib/axiosInstance";
import {useToast} from "@/hooks/use-toast";
import {InventoryItem} from "@prisma/client";


const inventoryItemSchema = z.object({
  name: z.string().min(2).max(300),
  quantity: z.coerce.number().min(0).default(0),
});

function CreateInvetoryItemForm() {
  const {toast} = useToast();
  const form = useForm<z.infer<typeof inventoryItemSchema>>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: {
      name: "",
      quantity: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof inventoryItemSchema>) {
    try {
      toast({title: "Creating inventory item...", description: "Please wait.",});

      const response = await axiosInstance.post(`/inventory-items`, values);
      const item: InventoryItem = response.data as InventoryItem;

      toast({
        title: `${item.name} Adicionado!`,
        description: "O item foi criado com sucesso.",
      });
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
          render={({field}) => (
            <FormItem>
              <FormLabel>Nome do Item</FormLabel>
              <FormControl>
                <Input placeholder="Leite..." {...field} />
              </FormControl>
              <FormDescription>
                Escreva o nome do item que desejas adicionar.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}

          name="quantity"
          render={({field}) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                Escreva o nome do item que desejas adicionar.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit"><Plus/>Criar Item</Button>
      </form>
    </Form>
  )
}

export default CreateInvetoryItemForm;
