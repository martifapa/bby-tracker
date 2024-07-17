-- CreateTable
CREATE TABLE "Actions" (
    "id" SERIAL NOT NULL,
    "emoji" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "emoji" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);
