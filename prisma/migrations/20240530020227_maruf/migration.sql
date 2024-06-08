/*
  Warnings:

  - You are about to drop the column `adoptionRequirements` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `medicalHistory` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `species` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `temperament` on the `pets` table. All the data in the column will be lost.
  - Added the required column `currentLocation` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthStatus` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "adoptionRequirements",
DROP COLUMN "location",
DROP COLUMN "medicalHistory",
DROP COLUMN "size",
DROP COLUMN "species",
DROP COLUMN "temperament",
ADD COLUMN     "currentLocation" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "healthStatus" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL;
