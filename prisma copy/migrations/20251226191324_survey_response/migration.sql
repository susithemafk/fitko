-- CreateTable
CREATE TABLE "SurveyResponse" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "privateOrPublic" TEXT[],
    "legpress" INTEGER NOT NULL DEFAULT 0,
    "stairs" INTEGER NOT NULL DEFAULT 0,
    "benchpress" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SurveyResponse_pkey" PRIMARY KEY ("id")
);
