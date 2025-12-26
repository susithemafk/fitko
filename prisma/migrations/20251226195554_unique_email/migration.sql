/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `SurveyResponse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SurveyResponse_email_key" ON "SurveyResponse"("email");
