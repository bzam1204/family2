import {RegistryView} from "@/components/inventory/RegistryView";

interface PageProps {
  params: { familyId: string };
}

export default function Page({params}: Readonly<PageProps>) {
  return <RegistryView familyId={params.familyId}/>
}