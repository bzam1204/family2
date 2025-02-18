-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "FamilyUser" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
