'use client'
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { Family } from "@prisma/client";

interface SelectFamilyContextProps {
    selectedFamily: Family
    handleSelectFamily: (family: Family) => void
}

const SelectFamilyContext = createContext({} as SelectFamilyContextProps);

interface SelectFamilyContextProviderProps {
    children: ReactNode;
    family: Family;
}

export function SelectFamilyContextProvider({ children, family }: Readonly<SelectFamilyContextProviderProps>) {
    const [selectedFamily, setSelectedFamily] = useState(family)

    function handleSelectFamily(family: Family) {
        if (family === selectedFamily) return;

        setSelectedFamily(family);
    }

    const value = useMemo(() => ({
        selectedFamily,
        handleSelectFamily
    }), [selectedFamily]);

    return (
        <SelectFamilyContext.Provider value={value}>
            {children}
        </SelectFamilyContext.Provider>
    )
}

export function useSelectFamilyContext() {
    const { selectedFamily, handleSelectFamily } = useContext(SelectFamilyContext);

    return {
        selectedFamily,
        handleSelectFamily
    }
}
