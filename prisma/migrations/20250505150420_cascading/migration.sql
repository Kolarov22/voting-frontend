-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_electionId_fkey";

-- DropForeignKey
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_electionId_fkey";

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voter" ADD CONSTRAINT "Voter_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election"("id") ON DELETE CASCADE ON UPDATE CASCADE;
