export type CreateInventoryItemDto = {
    name: string;
    quantity: number;
    familyId: string;
    mediaPrice?: number | null;
    description?: string | null;
};
