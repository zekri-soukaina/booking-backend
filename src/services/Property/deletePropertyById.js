import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deletePropertyById = async (id) => {
  if (!id) {
    // throw new NotFoundError("Property", id);
    return null;
  }

  try {
    const deleteProperty = await prisma.property.deleteMany({
      where: {
        id,
      },
    });
    if (!deleteProperty || deleteProperty.count === 0) {
      // throw new NotFoundError("property", id);
      return null;
    }
    return id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deletePropertyById;
