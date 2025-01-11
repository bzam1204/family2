import { Decimal } from "@prisma/client/runtime/library";

export type UpdateInventoryItemDto = {
    id: string;
    name?: string;
    quantity?: number;
    mediaPrice?: Decimal | null;
    description?: string | null;
};
