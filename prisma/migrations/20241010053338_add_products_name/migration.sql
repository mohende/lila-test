-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "productsName" TEXT[] DEFAULT ARRAY[]::TEXT[];
