import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateAmenityById = async (id, name) => {
  const updateAmenity = await prisma.amenity.updateMany({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  if (!updateAmenity || updateAmenity.count === 0) {
    // throw new NotFoundError("amenity", id);
    return null;
  }
  return { message: `Amenity with ${id} was updated.` };

  // return id;
};

export default updateAmenityById;
