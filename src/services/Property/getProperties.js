import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProperties = async (location, pricePerNight) => {
  const filters = {};
  if (location) {
    filters.location = {
      contains: location.toLowerCase(),
    };
  }
  if (pricePerNight) {
    filters.pricePerNight = {
      equals: parseFloat(pricePerNight),
    };
  }
  try {
    const properties = await prisma.property.findMany({
      where: filters,
    });
    return properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};
export default getProperties;
