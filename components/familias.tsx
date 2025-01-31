import dbService from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

export async function FamiliasList() {

    const user = await getKindeServerSession().getUser()

    const families = await dbService.family.findMany({
        where: {
            families: {
                every: {
                    user: {
                        kindeId: user.id
                    }
                }
            }
        }
    })

    return (
        <>
            {families.map(f => (
                <DropdownMenuItem
                    key={f.name}
                    className="gap-2 p-2"
                >
                    {f.name}
                </DropdownMenuItem>
            ))}

        </>
    )
}