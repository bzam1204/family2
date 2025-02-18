import { Decimal } from "@prisma/client/runtime/library";

export type CreateInventoryItemDto = {
    name: string;
    quantity: number;
    familyId: string;
    mediaPrice?: Decimal | null;
    description?: string | null;
    idealQuantity?: number | null;
    minQuantity?: number | null;
};
