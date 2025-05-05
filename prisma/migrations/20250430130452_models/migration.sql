-- CreateTable
CREATE TABLE "Election" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isEnded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Election_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "voteCount" INTEGER NOT NULL DEFAULT 0,
    "electionId" TEXT NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voter" (
    "id" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "hasVoted" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" TIMESTAMP(3),
    "electionId" TEXT NOT NULL,

    CONSTRAINT "Voter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voter_wallet_key" ON "Voter"("wallet");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voter" ADD CONSTRAINT "Voter_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
