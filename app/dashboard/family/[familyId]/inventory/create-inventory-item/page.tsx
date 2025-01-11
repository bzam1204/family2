import LoadingSpinner from "@/components/common/LoadingSpinner";
import CreateInventoryItem from "@/components/inventory/CreateItemView/CreateInventoryItem";
import { Suspense } from "react";

interface PageProps {
  params: { familyId: string }
}
export default function Page({ params }: Readonly<PageProps>) {
  return (
    <Suspense fallback={<LoadingSpinner />} >
      <CreateInventoryItem familyId={params.familyId} />
    </Suspense>
  )
}
