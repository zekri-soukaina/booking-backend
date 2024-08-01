import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (username, email) => {
  const filters = {};
  if (username) {
    filters.username = {
      equals: username,
    };
  }
  if (email) {
    filters.email = {
      contains: email,
    };
  }
  try {
    const users = await prisma.user.findMany({
      where: filters,
      //     where: {
      //       username: {
      //         contains: username,
      //       },
      //       email: {
      //         contains: email,
      //       },
      //     },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export default getUsers;
