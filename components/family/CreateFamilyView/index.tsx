'use client'

import { z } from "zod"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { createFamily } from "@/actions/createFamily"
import { TypographyH3 } from "@/components/common/TypographyH3"

const schema = z.object({
    name: z
        .string()
        .min(2, 'A família deve ter, no mínimo, 2 caracteres')
        .max(400, 'O nome da família deve ter, no máximo, 400 caracteres'),
})

export default function CreateFamilyView() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
        }
    })

    async function onSubmit(values: z.infer<typeof schema>) {
        try {
            toast({ title: "Criando Família...", description: "Aguarde.", });

            const family = await createFamily({
                name: values.name,
            })

            toast({
                title: `${family.name} Adicionado!`,
                description: "A família foi criada com sucesso.",
            });
        } catch (error) {
            toast({
                title: "Não foi possível adicionar a família.",
                description: (error as Error).message,
            });
        }
    }

    return (
        <Form {...form}>
            <form className="w-full gap-4 flex flex-col p-4" onSubmit={form.handleSubmit(onSubmit)}>
                <TypographyH3>Criar Família</TypographyH3>

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome da Família</FormLabel>
                            <FormControl>
                                <Input placeholder="Família Buscapé..." {...field} required />
                            </FormControl>
                            <FormDescription>
                                Escreva o nome da nova família.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Criar</Button>
            </form>
        </Form>
    )
}
