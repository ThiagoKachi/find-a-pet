-- CreateTable
CREATE TABLE "Pets" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "species" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "description" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);
