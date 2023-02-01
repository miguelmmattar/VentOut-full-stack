/*
  Warnings:

  - You are about to drop the column `emtionId` on the `MyEmotions` table. All the data in the column will be lost.
  - Added the required column `emotionId` to the `MyEmotions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MyEmotions" DROP CONSTRAINT "MyEmotions_emtionId_fkey";

-- AlterTable
ALTER TABLE "MyEmotions" DROP COLUMN "emtionId",
ADD COLUMN     "emotionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MyEmotions" ADD CONSTRAINT "MyEmotions_emotionId_fkey" FOREIGN KEY ("emotionId") REFERENCES "Emotions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
