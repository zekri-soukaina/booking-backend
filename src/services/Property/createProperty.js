import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId
) => {
  const prisma = new PrismaClient();
  // try {
  const property = await prisma.property.create({
    data: {
      id: uuid(),
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId: hostId,
      // hostId: {
      //   connect: { id: hostId },
      // },
    },
  });
  if (!property) {
    return null;
  }
  return property;
  // } catch (error) {
  //   throw new Error(`Faild to create property ${error.message}`);
  // }
};

export default createProperty;
