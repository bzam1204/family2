import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Family, User } from "@prisma/client";
import { DeleteFamilyButton } from "@/components/family/delete-family-button";
import { FamilyService } from "@/services/FamilyService";

export default async function MyFamiliesPage( {
                                                params,
                                              } : {
  params : { userId : string };
} ) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Authorization check
  if ( !user || user.id !== params.userId ) {
    return <div>Unauthorized access</div>;
  }

  const families = await FamilyService.getAll( user.id, true )

  return (
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Minhas Famílias</h1>
          <Button asChild>
            <Link href={ `/dashboard/${ params.userId }/family/create` }>
              Criar nova família
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Famílias</CardTitle>
          </CardHeader>
          <CardContent>
            { families.length === 0 ? (
                <div className="text-center py-4">Sou sozinho ainda...: (</div>
            ) : (
                <div className="space-y-4">
                  { families.map( ( family ) => (
                      <FamilyCard key={ family.id } family={ family } />
                  ) ) }
                </div>
            ) }
          </CardContent>
        </Card>
      </div>
  );
}

function FamilyCard( { family } : { family : Family & { user : User } } ) {
  return (
      <Card className="hover:bg-accent transition-colors">
        <CardContent className="pt-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{ family.name }</h3>
              <p className="text-sm text-muted-foreground">
                Criada em: { new Date( family.createdAt ).toLocaleDateString() }
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={ `/dashboard/${ family.user.kindeId }/family/${ family.id }` }>
                  Ver
                </Link>
              </Button>
              <DeleteFamilyButton familyId={ family.id } />
            </div>
          </div>
        </CardContent>
      </Card>
  );
}
