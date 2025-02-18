'use client';

import { Button } from "@/components/ui/button";
import { generateShoppingList } from "@/actions/generateShoppingList";
import { useModal } from "@/hooks/context/useModalContext";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { ListCheck, Loader2, Plus } from "lucide-react";
import { copyTextToClipboard } from "@/lib/utils";
import Link from "next/link";

export function ModalList({ familyId }: Readonly<{ familyId: string }>) {
  const [isPending, startTransition] = useTransition()
  const { modal } = useModal();
  const { toast } = useToast();

  async function handleShoppingList() {
    try {
      const list = await generateShoppingList(familyId);
      console.log({ fn: ModalList, list })
      await modal({
        title: "Lista de Compras",
        content: (<div className="flex flex-col gap-1 p-2 rounded">
          {list.map(item =>
            <p key={item.name + item.shopQuantity}>{item.name}: {item.shopQuantity}</p>)}
        </div>),
        actionLabel: 'Copiar',
        onConfirm: () => copyTextToClipboard((
          (): string => {
            let text: string = '';

            list.forEach((p, index) => {
              text = text + '\n' + (index + 1) + ' - ' + p.name + ' : ' + p.shopQuantity
            });

            return text;
          })()
        )
      })
    } catch (e) {
      toast({
        title: "Error",
        description: (e as Error).message,
      })
      console.error(e);
    }
  }

  return (
    <div className="flex justify-end w-full gap-2">
      <Link href='./create-inventory-item'>
        <Button>
          <Plus />  Novo
        </Button>
      </Link>
      <Button onClick={() => startTransition(() => {
        handleShoppingList()
      })}>
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ListCheck />}Lista de Compras
      </Button>
    </div>
  )
}