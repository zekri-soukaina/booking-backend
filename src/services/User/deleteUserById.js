// updateUserById.js
import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUserById = async (id) => {
  if (!id) {
    // throw new NotFoundError("user", id);
    return null;
  }

  try {
    const deleteUser = await prisma.user.deleteMany({
      where: { id },
    });

    // Check if deleteUser.count is undefined or 0
    if (!deleteUser || deleteUser.count === 0) {
      // throw new NotFoundError("user", id);
      return null;
    }

    return id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteUserById;
