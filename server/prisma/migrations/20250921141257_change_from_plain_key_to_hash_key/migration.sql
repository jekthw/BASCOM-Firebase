/*
  Warnings:

  - You are about to drop the column `key` on the `api_keys` table. All the data in the column will be lost.
  - Added the required column `key_hash` to the `api_keys` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."api_keys_key_idx";

-- DropIndex
DROP INDEX "public"."api_keys_key_key";

-- AlterTable
ALTER TABLE "public"."api_keys" DROP COLUMN "key",
ADD COLUMN     "key_hash" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "api_keys_key_hash_idx" ON "public"."api_keys"("key_hash");
