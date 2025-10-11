-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."VerificationStatus" ADD VALUE 'WAITING_FOR_ADMIN_VERIFICATION';
ALTER TYPE "public"."VerificationStatus" ADD VALUE 'UPLOAD_DOCUMENT';

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "current_status" SET DEFAULT 'UNEMPLOYED';

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_nis_fkey" FOREIGN KEY ("nis") REFERENCES "public"."verificator_data"("nis") ON DELETE RESTRICT ON UPDATE CASCADE;
