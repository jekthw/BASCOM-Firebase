/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `api_keys` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "api_keys_name_key" ON "public"."api_keys"("name");
