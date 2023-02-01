-- CreateEnum
CREATE TYPE "SymptomType" AS ENUM ('PHYSICAL', 'EMOTIONAL');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Moods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MyMoods" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "moodId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MyMoods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MyReports" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MyReports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emotions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Emotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MyEmotions" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "emtionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MyEmotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Symptoms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Type" "SymptomType" NOT NULL,
    "spotId" INTEGER NOT NULL,

    CONSTRAINT "Symptoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MySymptoms" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "symptomId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MySymptoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spots" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Spots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyMoods" ADD CONSTRAINT "MyMoods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyMoods" ADD CONSTRAINT "MyMoods_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "Moods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyReports" ADD CONSTRAINT "MyReports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyEmotions" ADD CONSTRAINT "MyEmotions_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "MyReports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyEmotions" ADD CONSTRAINT "MyEmotions_emtionId_fkey" FOREIGN KEY ("emtionId") REFERENCES "Emotions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Symptoms" ADD CONSTRAINT "Symptoms_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MySymptoms" ADD CONSTRAINT "MySymptoms_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "MyReports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MySymptoms" ADD CONSTRAINT "MySymptoms_symptomId_fkey" FOREIGN KEY ("symptomId") REFERENCES "Symptoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
