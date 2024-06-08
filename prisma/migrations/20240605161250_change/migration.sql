/*
  Warnings:

  - Added the required column `email` to the `adoptionRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `adoptionRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adoptionRequests" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;
