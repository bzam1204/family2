"use server";

import { z } from "zod";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { FamilyUserRole } from "@prisma/client";

import dbService from "@/lib/db";

const schema = z.object({
    name: z
        .string()
        .min(2, 'A família deve ter, no mínimo, 2 caracteres')
        .max(400, 'O nome da família deve ter, no máximo, 400 caracteres'),
})

export async function createFamily(familyData: { name: string }) {

    const result = schema.safeParse(familyData);

    if(!result.success) {
        let error: string = '';
        result.error.issues.forEach(i => error = error + ` ${i.message};`)

        throw new Error(error)
    }

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const dbUser = await dbService.user.findFirst({
        where: {
            kindeId: user.id,
        },
    });

    if (!dbUser) {
        throw new Error("Usuário não existe");
    }

    const family = await dbService.family.create({
        data: {
            name: result.data.name,
            creatorUserId: dbUser.id,   
        },
    });

    await dbService.familyUser.create({
        data: {
            role: FamilyUserRole.ADMIN,
            userId: dbUser.id,
            familyId: family.id,
        },
    });

    return family;
}
