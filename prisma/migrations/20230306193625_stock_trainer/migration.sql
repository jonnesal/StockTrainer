/*
  Warnings:

  - You are about to drop the column `user_id` on the `portfolio` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "portfolio" DROP CONSTRAINT "portfolio_user_id_fkey";

-- AlterTable
ALTER TABLE "portfolio" DROP COLUMN "user_id",
ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("username");

-- AddForeignKey
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_username_fkey" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION;
