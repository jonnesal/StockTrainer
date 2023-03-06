/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_username_key";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");
