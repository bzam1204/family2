/*
  Warnings:

  - The primary key for the `InventoryItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `quantity` on the `InventoryItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,familyId]` on the table `InventoryItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `familyId` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `InventoryItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FamilyUserRole" AS ENUM ('HEAD', 'ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_pkey",
DROP COLUMN "quantity",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "familyId" UUID NOT NULL,
ADD COLUMN     "mediaPrice" DECIMAL(65,30),
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "creatorUserId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyUser" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "familyId" UUID NOT NULL,
    "role" "FamilyUserRole" NOT NULL DEFAULT 'MEMBER',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FamilyUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItemModificationLog" (
    "id" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "familyId" UUID NOT NULL,
    "change" INTEGER NOT NULL,
    "currentPrice" DECIMAL(65,30),
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryItemModificationLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyUser_familyId_userId_key" ON "FamilyUser"("familyId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_id_familyId_key" ON "InventoryItem"("id", "familyId");

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_creatorUserId_fkey" FOREIGN KEY ("creatorUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyUser" ADD CONSTRAINT "FamilyUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyUser" ADD CONSTRAINT "FamilyUser_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItemModificationLog" ADD CONSTRAINT "InventoryItemModificationLog_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItemModificationLog" ADD CONSTRAINT "InventoryItemModificationLog_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
