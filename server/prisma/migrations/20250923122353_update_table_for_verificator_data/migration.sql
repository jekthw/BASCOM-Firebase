/*
  Warnings:

  - You are about to drop the column `birthDate` on the `verificator_data` table. All the data in the column will be lost.
  - You are about to drop the column `father` on the `verificator_data` table. All the data in the column will be lost.
  - You are about to drop the column `mother` on the `verificator_data` table. All the data in the column will be lost.
  - Added the required column `father_name` to the `verificator_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother_name` to the `verificator_data` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "gender" "public"."Gender" NOT NULL DEFAULT 'PREFER_NOT_TO_SAY';

-- AlterTable
ALTER TABLE "public"."verificator_data" DROP COLUMN "birthDate",
DROP COLUMN "father",
DROP COLUMN "mother",
ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "father_name" TEXT NOT NULL,
ADD COLUMN     "graduation_year" TIMESTAMP(3),
ADD COLUMN     "mother_name" TEXT NOT NULL;
