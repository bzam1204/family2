import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
    return withAuth(request, {
        isReturnToCurrentPage: true,
    });
}

export const config = {
    matcher: [
        "/dashboard/",
        "/dashboard/inventory",
        "/dashboard/inventory/delete",
        "/dashboard/inventory/modify-quantity",
        "/dashboard/inventory/create-inventory-item",
    ],
};
