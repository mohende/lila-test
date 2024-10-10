-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('open', 'closed', 'cancelled');

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "status" "SaleStatus" NOT NULL DEFAULT 'open';
