'use client'

import { useSelectFamilyContext } from "@/hooks/context/useSelectFamilyContext"

export function FamilyName() {
    const { selectedFamily } = useSelectFamilyContext();

    return (
        <h1>{selectedFamily.name}</h1>
    )
}