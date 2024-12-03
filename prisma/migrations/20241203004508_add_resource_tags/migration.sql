/*
  Warnings:

  - The primary key for the `Resource` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `url` on the `Resource` table. All the data in the column will be lost.
  - The `id` column on the `Resource` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `link` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_pkey",
DROP COLUMN "url",
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Resource_pkey" PRIMARY KEY ("id");
