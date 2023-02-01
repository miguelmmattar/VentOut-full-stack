/*
  Warnings:

  - You are about to drop the column `Type` on the `Symptoms` table. All the data in the column will be lost.
  - Added the required column `type` to the `Symptoms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Symptoms" DROP COLUMN "Type",
ADD COLUMN     "type" "SymptomType" NOT NULL;
