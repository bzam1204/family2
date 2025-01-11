import { AddMemberForm } from "@/components/family/FamilyView/AddMemberForm";

interface PageProps {
    params: { familyId: string }
}

export default function Page({ params }: Readonly<PageProps>) {
    const { familyId } = params;

    return <AddMemberForm familyId={familyId} />
}