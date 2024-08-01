// import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAmenityById = async (id) => {
  const amenity = await prisma.amenity.findUnique({
    where: {
      id,
    },
  });
  if (!amenity) {
    // throw new NotFoundError("amenity", id);
    return null;
  }
  return amenity;
};

export default getAmenityById;
