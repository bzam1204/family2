import db from "@/lib/db";

import { CreateInventoryItemDto } from "@/lib/dto/CreateInventoryItemDto";
import { UpdateInventoryItemDto } from "@/lib/dto/UpdateInventoryItemDto";
import { UpdateQuantityInventoryItemDto } from "@/lib/dto/UpdateQuantityInventoryItemDto";

import { InventoryItem } from "@prisma/client";

interface IInventoryItemService {
    get(id: string): Promise<InventoryItem | null>;
    getAll(): Promise<InventoryItem[]>;
    create(data: CreateInventoryItemDto): Promise<InventoryItem>;
    update(data: UpdateInventoryItemDto): Promise<InventoryItem>;
    updateQuantity(
        data: UpdateQuantityInventoryItemDto
    ): Promise<InventoryItem>;
    remove(id: string): Promise<InventoryItem>;
}

export const InventoryItemService: IInventoryItemService = {
    get: async (id) => await db.inventoryItem.findUnique({ where: { id } }),
    getAll: async function () {
        return db.inventoryItem.findMany({
            orderBy: {
                name: "asc",
            },
        });
    },
    create: async (data) => await db.inventoryItem.create({ data }),
    update: async function (data) {
        const item = await this.get(data.id);

        if (!item) throw new Error("Not found");

        return db.inventoryItem.update({
            data,
            where: {
                id: data.id,
            },
        });
    },
    updateQuantity: async function (data) {
        console.log({ fn: this.updateQuantity, data });
        const itemExists = await this.get(data.id);

        if (!itemExists) throw new Error("Not Found");

        const [item, log] = await db.$transaction([
            db.inventoryItem.update({
                data: {
                    quantity: data.quantity,
                },
                where: {
                    id: data.id,
                },
            }),
            db.inventoryItemModificationLog.create({
                data: {
                    itemId: data.id,
                    change: data.quantity - itemExists.quantity,
                    familyId: data.familyId,
                    currentPrice: data.currentPrice,
                },
            }),
        ]);

        if (!item || !log) throw new Error("Something went wrong");

        return item;
    },
    remove: async (id) => db.inventoryItem.delete({ where: { id } }),
};
