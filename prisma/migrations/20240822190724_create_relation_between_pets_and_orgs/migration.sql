/*
  Warnings:

  - Added the required column `orgId` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pets" ADD COLUMN     "orgId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
