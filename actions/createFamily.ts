"use server";

import { z } from "zod";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { FamilyUserRole } from "@prisma/client";

import dbService from "@/lib/db";
import { FamilyService } from "@/services/FamilyService";
import { CreateFamilyDto } from "@/lib/dto/CreateFamilyDto";

const schema = z.object({
    name: z
        .string()
        .min(2, "A família deve ter, no mínimo, 2 caracteres")
        .max(400, "O nome da família deve ter, no máximo, 400 caracteres"),
});

export async function createFamily(familyData: { name: string }) {
    const result = schema.safeParse(familyData);

    if (!result.success) {
        let error: string = "";
        result.error.issues.forEach((i) => (error = error + ` ${i.message};`));

        throw new Error(error);
    }

    const data: CreateFamilyDto = {
        name: result.data.name,
    };
    console.log(data);
    const family = await FamilyService.create(data);

    return family;
}
