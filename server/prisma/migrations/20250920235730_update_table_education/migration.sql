-- DropIndex
DROP INDEX "public"."users_nis_idx";

-- AlterTable
ALTER TABLE "public"."educations" ADD COLUMN     "deleted_at" TIMESTAMP(3);
