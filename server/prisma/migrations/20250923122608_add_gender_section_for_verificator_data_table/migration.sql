/*
  Warnings:

  - Added the required column `gender` to the `verificator_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."verificator_data" ADD COLUMN     "gender" "public"."Gender" NOT NULL;
