/*
  Warnings:

  - Added the required column `confirmPassword` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "confirmPassword" TEXT NOT NULL,
ADD COLUMN     "role" "UserRole" DEFAULT 'USER';
