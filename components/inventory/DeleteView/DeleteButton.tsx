'use client'

import { Trash } from "lucide-react";

import { InventoryItem } from "@prisma/client";

import { Button } from "@/components/ui/button";

import { modal } from "@/lib/utils/modal";

import { useSelectFamilyContext } from "@/hooks/context/useSelectFamilyContext";

import { deleteInventoryItem } from "@/actions/deleteInventoryItem";

interface DeleteButtonProps {
    item: InventoryItem,
}

export function DeleteButton({ item }: Readonly<DeleteButtonProps>) {
    const { selectedFamily } = useSelectFamilyContext();

    return (
        <Button
            onClick={async () => await modal({
                title: "Atenção!",
                content: <p>Queres deletar o(a) <strong>{item.name}</strong> mesmo?</p>,
                onConfirm: () => deleteInventoryItem(item.id, selectedFamily.id)
            })}
            className="flex items-center gap-1">
            <Trash className="w-4 h-4" />
            <span className="hidden md:inline">Delete</span>
        </Button>
    )
}