export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const dbService = new PrismaClient();

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || user === null) {
    throw new Error("Houve um problema com a autenticação do usuário");
  }

  console.log({ user });

  const dbUser = await dbService.user.findFirst({
    where: {
      kindeId: user.id,
    },
  });

  console.log({ dbUser });

  if (!dbUser) {
    await dbService.user.create({
      data: {
        name: user.given_name ?? "",
        email: user.email as string,
        kindeId: user.id,
        password: "",
      },
    });
  }

  return NextResponse.redirect(`${process.env.KINDE_SITE_URL}/dashboard/${user.id}`);
}
