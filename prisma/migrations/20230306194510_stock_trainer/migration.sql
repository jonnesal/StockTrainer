/*
  Warnings:

  - You are about to drop the column `username` on the `portfolio` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "portfolio" DROP CONSTRAINT "portfolio_username_fkey";

-- AlterTable
ALTER TABLE "portfolio" DROP COLUMN "username",
ADD COLUMN     "user_id" INTEGER;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
