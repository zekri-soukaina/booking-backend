import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getHosttById = async (id) => {
  try {
    const host = await prisma.host.findUnique({
      where: {
        id,
      },
    });
    if (!host) {
      // throw new NotFoundError("host", id);
      return null;
    }
    return host;
  } catch (error) {
    console.error("Error in getHostById ", error);
    throw error;
  }
};

export default getHosttById;
