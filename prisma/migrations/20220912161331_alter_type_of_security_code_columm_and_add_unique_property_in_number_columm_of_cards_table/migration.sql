/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `cards` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "securityCode" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "cards_number_key" ON "cards"("number");
