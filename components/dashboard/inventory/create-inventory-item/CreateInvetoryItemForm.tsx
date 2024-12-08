"use client"

import {useActionState, useRef} from "react";

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

import {createInventoryItemFormSubmit} from "@/app/services/actions/CreateInventoryItemFormSubmit";

const inventoryItemSchema = z.object({
  name: z.string().min(2).max(300),
  quantity: z.coerce.number().min(0).default(0),
});

function CreateInvetoryItemForm() {
  const [state, formAction] = useActionState(createInventoryItemFormSubmit, {message: ""})
  const form = useForm<z.infer<typeof inventoryItemSchema>>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: {
      name: "",
      quantity: 0,
    }
  });
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Form {...form}>
      <form action={formAction} onSubmit={form.handleSubmit(() => formRef.current?.submit())} ref={formRef}
            className="space-y-8">
        {state.message && <p className="text-red-700">{state.message}</p>}
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
