// import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPropertytById = async (id) => {
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
  });
  if (!property) {
    // throw new NotFoundError("property", id);
    return null;
  }
  return property;
};

export default getPropertytById;
