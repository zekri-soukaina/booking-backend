import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteAmenityById = async (id) => {
  if (!id) {
    // throw new NotFoundError("amenity", id);
    return null;
  }

  try {
    const deleteAmenity = await prisma.amenity.deleteMany({
      where: {
        id,
      },
    });
    if (!deleteAmenity || deleteAmenity.count === 0) {
      // throw new NotFoundError("amenity", id);
      return null;
    }
    // return id;
    return { message: `Amenity with Id ${id} deleted successfully` };
  } catch (error) {
    console.error(`Error deleting amenity with ID ${id}`, error);
    throw error;
  }
};

export default deleteAmenityById;
