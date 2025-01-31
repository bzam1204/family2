import db from "@/lib/db";
import { InventoryItem, InventoryItemModificationLog } from "@prisma/client";

interface IItemModificationLogService {
  getAllByFamily(
      id : string
  ) : Promise<
      ({ InventoryItem : InventoryItem } & InventoryItemModificationLog)[]
  >;
}

export const ItemModificationLogService : IItemModificationLogService = {
  getAllByFamily: async (id) => {
    return await db.inventoryItemModificationLog.findMany({
      where: { familyId: id, isActive: true },
      include: { InventoryItem: true },
      orderBy: { changedAt: "desc" }
    });
  },
};
