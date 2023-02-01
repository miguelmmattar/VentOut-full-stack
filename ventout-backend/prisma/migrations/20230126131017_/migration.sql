-- DropForeignKey
ALTER TABLE "MyEmotions" DROP CONSTRAINT "MyEmotions_reportId_fkey";

-- DropForeignKey
ALTER TABLE "MyMoods" DROP CONSTRAINT "MyMoods_userId_fkey";

-- DropForeignKey
ALTER TABLE "MyReports" DROP CONSTRAINT "MyReports_userId_fkey";

-- DropForeignKey
ALTER TABLE "MySymptoms" DROP CONSTRAINT "MySymptoms_reportId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyMoods" ADD CONSTRAINT "MyMoods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyReports" ADD CONSTRAINT "MyReports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyEmotions" ADD CONSTRAINT "MyEmotions_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "MyReports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MySymptoms" ADD CONSTRAINT "MySymptoms_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "MyReports"("id") ON DELETE CASCADE ON UPDATE CASCADE;
