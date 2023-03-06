-- CreateTable
CREATE TABLE "portfolio" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "stock_owned" VARCHAR(50) NOT NULL,
    "shares_owned" DECIMAL(10,2) NOT NULL,
    "buy_price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stocks" (
    "id" SERIAL NOT NULL,
    "stock_name" VARCHAR(50) NOT NULL,
    "share_price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "available_money" DECIMAL(10,2),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
