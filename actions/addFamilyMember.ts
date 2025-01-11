"use server";

import db from "@/lib/db";
import { FamilyUserRole } from "@prisma/client";

export async function addFamilyMember(values: {
    email: string;
    familyId: string;
}) {
    console.log(values);

    const user = await db.user.findFirst({
        where: { email: values.email },
    });

    if (!user) throw new Error("Usuário Não Registrado");

    const isAlreadyMember = await db.familyUser.findFirst({
        where: {
            familyId: values.familyId,
            user: { email: values.email },
        },
    });

    if (isAlreadyMember) throw new Error("Já é membro");

    const member = await db.familyUser.create({
        data: {
            role: FamilyUserRole.MEMBER,
            userId: user.id,
            familyId: values.familyId,
        },
    });

    if (!member) throw new Error("Algo Deu Errado");

    return { ...member, name: user.name };
}
