-- CreateEnum
CREATE TYPE "cardType" AS ENUM ('credit', 'debit', 'both');

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "number" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "securityCode" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,
    "type" "cardType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
