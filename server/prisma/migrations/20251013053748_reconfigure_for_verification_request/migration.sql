-- AlterTable
ALTER TABLE "public"."verification_requests" ALTER COLUMN "docType" DROP NOT NULL,
ALTER COLUMN "file_url" DROP NOT NULL;
