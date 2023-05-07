-- CreateEnum
CREATE TYPE "PetSexEnum" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "PetFurEnum" AS ENUM ('SHORT', 'MEDIA', 'LONG');

-- CreateEnum
CREATE TYPE "PetTypeEnum" AS ENUM ('CAT', 'DOG');

-- CreateEnum
CREATE TYPE "PetTemperamentEnum" AS ENUM ('QUIET', 'FEARFUL', 'SKITTISH', 'HYPERACTIVE');

-- CreateEnum
CREATE TYPE "ServiceTypeEnum" AS ENUM ('PETSHOP', 'PETWALKER', 'PETSITTER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "imagePath" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cep" TEXT,
    "address" TEXT,
    "district" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "sex" "PetSexEnum" NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "type" "PetTypeEnum" NOT NULL,
    "fur" "PetFurEnum" NOT NULL,
    "temperament" "PetTemperamentEnum" NOT NULL,
    "neutered" BOOLEAN NOT NULL,
    "imagePath" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "time" INTEGER NOT NULL,
    "serviceType" "ServiceTypeEnum" NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professional" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "availableTimeId" INTEGER NOT NULL,

    CONSTRAINT "Professional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableTime" (
    "id" SERIAL NOT NULL,
    "sunday" INTEGER[],
    "monday" INTEGER[],
    "tuesday" INTEGER[],
    "wednesday" INTEGER[],
    "thursday" INTEGER[],
    "friday" INTEGER[],
    "saturday" INTEGER[],
    "exceptionsDate" TIMESTAMP(3)[],

    CONSTRAINT "AvailableTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scheduling" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "performed" BOOLEAN NOT NULL DEFAULT false,
    "petId" INTEGER NOT NULL,
    "professionalId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "Scheduling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfessionalToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Client_userId_key" ON "Client"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Professional_userId_key" ON "Professional"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Professional_availableTimeId_key" ON "Professional"("availableTimeId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessionalToService_AB_unique" ON "_ProfessionalToService"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessionalToService_B_index" ON "_ProfessionalToService"("B");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professional" ADD CONSTRAINT "Professional_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professional" ADD CONSTRAINT "Professional_availableTimeId_fkey" FOREIGN KEY ("availableTimeId") REFERENCES "AvailableTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheduling" ADD CONSTRAINT "Scheduling_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheduling" ADD CONSTRAINT "Scheduling_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheduling" ADD CONSTRAINT "Scheduling_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionalToService" ADD CONSTRAINT "_ProfessionalToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Professional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionalToService" ADD CONSTRAINT "_ProfessionalToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
