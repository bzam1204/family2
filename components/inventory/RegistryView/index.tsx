import {TypographyH3} from "@/components/common/TypographyH3";
import {Suspense} from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ItemLogsList } from "@/components/inventory/RegistryView/ItemLogsList";

interface RegistryViewProps {
  familyId: string;
}

export function RegistryView({familyId}: Readonly<RegistryViewProps>) {
  return (
    <main>
      <main className="w-full flex flex-col justify-start items-center p-4">
        <TypographyH3>Registro do Inventário</TypographyH3>
        <Suspense fallback={<LoadingSpinner/>}>
          {/* @ts-expect-error Server Component */}
          <ItemLogsList familyId={familyId}/>
        </Suspense>
      </main>
    </main>
  )
}
