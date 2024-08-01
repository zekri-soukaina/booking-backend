import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookings = async (userId) => {
  const bookings = await prisma.booking.findMany({
    where: {
      userId: {
        contains: userId,
      },
    },
  });
  return bookings;
};
export default getBookings;
