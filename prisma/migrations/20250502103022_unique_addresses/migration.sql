/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Election` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Election_address_key" ON "Election"("address");
