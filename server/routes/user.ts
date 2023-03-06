import { prisma } from '../../prisma/db'

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event);
    const createUser = await prisma.user.create({
        data: {
            username,
            password
        }
    })
    .catch((error) => {
        console.error(error);
    });
    return createUser;
});