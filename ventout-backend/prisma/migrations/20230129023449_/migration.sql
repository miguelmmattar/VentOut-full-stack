/*
  Warnings:

  - You are about to drop the column `closedAt` on the `Session` table. All the data in the column will be lost.
  - Added the required column `text` to the `MyReports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MyReports" ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "closedAt";
