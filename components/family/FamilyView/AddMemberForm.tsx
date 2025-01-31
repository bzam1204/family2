'use client'

import { addFamilyMember } from "@/actions/addFamilyMember";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddMemberSchema = z.object({
    email: z
        .string()
        .email("Informe um email válido")
        .trim(),
    familyId: z.string(),
})

interface AddMemberFormProps {
    familyId: string
}

export function AddMemberForm({ familyId }: Readonly<AddMemberFormProps>) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof AddMemberSchema>>({
        resolver: zodResolver(AddMemberSchema),
        defaultValues: {
            email: '',
            familyId: familyId
        }
    })

    async function onSubmit(values: z.infer<typeof AddMemberSchema>) {
        try {
            toast({
                title: 'Adicionando membro'
            })
            
            const member = await addFamilyMember(values);

            toast({
                title: `Membro adicionado`,
                description: `${member.name} foi adicionado na família`
            })
        } catch (error) {
            toast({
                title: 'Algo deu erado',
                description: (error as Error).message
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email do Membro</FormLabel>
                            <FormControl>
                                <Input placeholder="ex@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                Insira o email do membro que desejas adicionar à família.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button>Adicionar Membro</Button>
            </form>
        </Form>
    )

}