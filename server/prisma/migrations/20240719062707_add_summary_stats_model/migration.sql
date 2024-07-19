-- CreateTable
CREATE TABLE "SummaryStats" (
    "id" SERIAL NOT NULL,
    "emoji" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "show" BOOLEAN NOT NULL,

    CONSTRAINT "SummaryStats_pkey" PRIMARY KEY ("id")
);
