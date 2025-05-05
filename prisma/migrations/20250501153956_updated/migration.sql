/*
  Warnings:

  - You are about to drop the column `voteCount` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Election` table. All the data in the column will be lost.
  - You are about to drop the column `isEnded` on the `Election` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Election` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "voteCount";

-- AlterTable
ALTER TABLE "Election" DROP COLUMN "endTime",
DROP COLUMN "isEnded",
DROP COLUMN "startTime",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
