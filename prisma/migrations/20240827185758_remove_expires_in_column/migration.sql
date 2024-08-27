/*
  Warnings:

  - You are about to drop the column `expires_at` on the `Sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sessions" DROP COLUMN "expires_at";
