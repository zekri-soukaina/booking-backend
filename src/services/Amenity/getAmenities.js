import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAmenities = async () => {
  const amenities = await prisma.amenity.findMany();
  return amenities;
};
export default getAmenities;
