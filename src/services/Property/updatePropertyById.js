import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updatePropertyById = async (
  id,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId
) => {
  const updateProperty = await prisma.property.updateMany({
    where: {
      id,
    },
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId: hostId,
      // ? {
      //     connect: { id: hostId },
      //   }
      // : undefined,
    },
  });
  if (!updateProperty || updateProperty.count === 0) {
    // throw new NotFoundError("property", id);
    return null;
  }

  return { message: `Property with ${id} was updated.` };
  // return id;
};

export default updatePropertyById;
