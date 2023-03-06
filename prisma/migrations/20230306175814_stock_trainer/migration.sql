/*
  Warnings:

  - Made the column `available_money` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "available_money" SET NOT NULL;
