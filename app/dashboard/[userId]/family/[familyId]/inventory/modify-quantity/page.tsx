import { ModifyItemQuantityView } from "@/components/inventory/ModifyItemQuantityView";

interface PageProps {
  params: { familyId: string }
}
function page({ params }: Readonly<PageProps>) {
  return (
    <ModifyItemQuantityView familyId={params.familyId} />
  )
}

export default page;
