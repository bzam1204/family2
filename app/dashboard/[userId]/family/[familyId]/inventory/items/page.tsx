import { ItemsView } from "@/components/inventory/ItemsView";

interface PageProps {
  params : { familyId : string };
}

export default function Page( { params } : Readonly<PageProps> ) {
  const { familyId } = params;

  {/* @ts-expect-error Server Component */}
    return <ItemsView familyId={ familyId } />;
  }