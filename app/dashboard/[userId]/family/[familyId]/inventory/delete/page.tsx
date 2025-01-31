import LoadingSpinner from "@/components/common/LoadingSpinner"
import { DeleteInventoryItem } from "@/components/inventory/DeleteView/DeleteInventoryItem"
import { Suspense } from "react"

interface PageProps {
  params: { familyId: string }
}

export default function Page({ params }: Readonly<PageProps>) {
  return (
    <Suspense fallback={<LoadingSpinner />} >
      {/* @ts-expect-error Server Components*/}
      <DeleteInventoryItem familyId={params.familyId} />
    </Suspense>
  )
}
