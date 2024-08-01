import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUserById = async (id) => {
  console.log("id in getUserByID:", id);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    // throw new NotFoundError("user", id);
    return null;
  }
  return user;
};

export default getUserById;
