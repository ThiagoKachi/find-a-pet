/*
  Warnings:

  - A unique constraint covering the columns `[file_key]` on the table `PetImages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PetImages_file_key_key" ON "PetImages"("file_key");
