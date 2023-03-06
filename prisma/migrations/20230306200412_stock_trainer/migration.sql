/*
  Warnings:

  - You are about to alter the column `shares_owned` on the `portfolio` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(10,1)`.
  - You are about to alter the column `buy_price` on the `portfolio` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(10,1)`.
  - You are about to alter the column `share_price` on the `stocks` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(10,1)`.
  - You are about to alter the column `username` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `available_money` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(10,1)`.

*/
-- AlterTable
ALTER TABLE "portfolio" ALTER COLUMN "shares_owned" SET DATA TYPE DECIMAL(10,1),
ALTER COLUMN "buy_price" SET DATA TYPE DECIMAL(10,1);

-- AlterTable
ALTER TABLE "stocks" ALTER COLUMN "share_price" SET DATA TYPE DECIMAL(10,1);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "username" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "available_money" SET DATA TYPE DECIMAL(10,1);
