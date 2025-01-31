import Link from "next/link";

import db from "@/lib/db";

interface FamilyViewProps {
    familyId: string
}

export async function FamilyView({ familyId }: Readonly<FamilyViewProps>) {
    const family = await db.family.findUnique({
        where: { id: familyId },
        include: { families: { include: { user: true } } }
    })

    if (!family) {
        return (
            <h1>Nada Encontrado</h1>
        )
    }

    return (
        <main>
            <h1>{family.name}</h1>
            {family.families.map(member => <div key={member.id}>{member.user.name} | {member.role}</div>)}
            <Link href={`./${familyId}/add-member`}>Adicionar Membro</Link>
        </main>
    )
}
