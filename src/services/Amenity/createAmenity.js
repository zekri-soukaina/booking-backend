import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

const createAmenity = async (name) => {
  try {
    const amenity = await prisma.amenity.create({
      data: {
        id: uuid(),
        name,
      },
    });
    return amenity;
  } catch (error) {
    throw new Error(`Failed to create amenity ${error.message}`);
  }
};

export default createAmenity;
