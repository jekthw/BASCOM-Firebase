/*
  Warnings:

  - You are about to drop the `VerificatorData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."VerificatorData";

-- CreateTable
CREATE TABLE "public"."verificator_data" (
    "id" SERIAL NOT NULL,
    "nis" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mother" TEXT NOT NULL,
    "father" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "angkatan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verificator_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verificator_data_nis_key" ON "public"."verificator_data"("nis");

-- CreateIndex
CREATE INDEX "verificator_data_nis_name_idx" ON "public"."verificator_data"("nis", "name");
