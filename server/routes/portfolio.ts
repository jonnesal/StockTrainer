import { prisma } from '../../prisma/db'

export default defineEventHandler(async (event) => {
  const { shares_owned, buy_price, stock_owned} = await readBody(event);
  const createPortfolio = await prisma.portfolio.create({
    data: {
      stock_owned,
      shares_owned,
      buy_price,
    }
  })
    .catch((error) => {
      console.error(error);
    });
  return createPortfolio;
});
