/*
  Warnings:

  - You are about to drop the column `amount` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `Sale` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shopifyOrderId]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerName` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopifyOrderId` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "amount",
DROP COLUMN "productName",
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "shopifyOrderId" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sale_shopifyOrderId_key" ON "Sale"("shopifyOrderId");
