// updateUserById.js
import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteHostById = async (id) => {
  if (!id) {
    // throw new NotFoundError("Host", id);
    return null;
  }

  try {
    const deleteHost = await prisma.host.deleteMany({
      where: { id },
    });

    // Check if deleteUser.count is undefined or 0
    if (!deleteHost || deleteHost.count === 0) {
      // throw new NotFoundError("Host", id);
      return null;
    }

    return id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteHostById;
