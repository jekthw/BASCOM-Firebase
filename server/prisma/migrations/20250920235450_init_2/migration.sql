-- CreateEnum
CREATE TYPE "public"."VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."CareerLevel" AS ENUM ('FRESH_GRAD', 'PROFESSIONAL', 'SENIOR', 'EXECUTIVE');

-- CreateEnum
CREATE TYPE "public"."CurrentStatus" AS ENUM ('WORKING', 'STUDYING', 'ENTREPRENEUR', 'UNEMPLOYED');

-- CreateEnum
CREATE TYPE "public"."PrivacyLevel" AS ENUM ('PUBLIC', 'CONNECTIONS', 'PRIVATE');

-- CreateEnum
CREATE TYPE "public"."ConnectionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."AccountRole" AS ENUM ('USER', 'VERIFIED_USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateTable
CREATE TABLE "public"."unitTest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "unitTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "nis" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" VARCHAR(20),
    "bio" TEXT,
    "profile_picture_url" TEXT,
    "angkatan" TEXT NOT NULL,
    "verification_status" "public"."VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "verification_data" JSONB,
    "career_level" "public"."CareerLevel" NOT NULL DEFAULT 'FRESH_GRAD',
    "current_status" "public"."CurrentStatus" NOT NULL DEFAULT 'WORKING',
    "is_mentor" BOOLEAN NOT NULL DEFAULT false,
    "privacy_level" "public"."PrivacyLevel" NOT NULL DEFAULT 'PUBLIC',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "public"."AccountRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OAuthAccount" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "OAuthAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verification_requests" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "docType" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "status" "public"."VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewed_by" INTEGER,
    "reviewedAt" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."work_experiences" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company_name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "description" TEXT,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."educations" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "institution_name" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "start_year" INTEGER NOT NULL,
    "end_year" INTEGER,
    "gpa" DECIMAL(3,2),
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."skills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_skills" (
    "user_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "level" "public"."SkillLevel" NOT NULL DEFAULT 'BEGINNER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_skills_pkey" PRIMARY KEY ("user_id","skill_id")
);

-- CreateTable
CREATE TABLE "public"."connections" (
    "id" SERIAL NOT NULL,
    "requester_id" INTEGER NOT NULL,
    "requested_id" INTEGER NOT NULL,
    "status" "public"."ConnectionStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_nis_key" ON "public"."users"("nis");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_nis_idx" ON "public"."users"("nis");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "public"."users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccount_provider_providerId_key" ON "public"."OAuthAccount"("provider", "providerId");

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_key" ON "public"."skills"("name");

-- CreateIndex
CREATE UNIQUE INDEX "connections_requester_id_requested_id_key" ON "public"."connections"("requester_id", "requested_id");

-- AddForeignKey
ALTER TABLE "public"."OAuthAccount" ADD CONSTRAINT "OAuthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."verification_requests" ADD CONSTRAINT "verification_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."work_experiences" ADD CONSTRAINT "work_experiences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."educations" ADD CONSTRAINT "educations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_skills" ADD CONSTRAINT "user_skills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_skills" ADD CONSTRAINT "user_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."connections" ADD CONSTRAINT "connections_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."connections" ADD CONSTRAINT "connections_requested_id_fkey" FOREIGN KEY ("requested_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
