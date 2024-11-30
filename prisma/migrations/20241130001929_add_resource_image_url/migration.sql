/*
  Warnings:

  - Added the required column `imageUrl` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Suggestion" ALTER COLUMN "status" DROP NOT NULL;
