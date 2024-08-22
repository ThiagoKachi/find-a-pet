-- CreateTable
CREATE TABLE "PetImages" (
    "id" UUID NOT NULL,
    "file_key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petId" UUID NOT NULL,

    CONSTRAINT "PetImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PetImages" ADD CONSTRAINT "PetImages_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
