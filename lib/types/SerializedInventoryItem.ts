import { InventoryItem } from "@prisma/client";

export type SerializedInventoryItem = Omit<InventoryItem, "mediaPrice"> & { mediaPrice : string | null };