import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const booking = await prisma.booking.create({
    data: {
      id: uuid(),
      userId: userId,
      propertyId: propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,

      // userId: {
      //   connect: { id: userId },
      // },
      // propertyId: {
      //   connect: { id: propertyId },
      // },
    },
  });
  return booking;
};

export default createBooking;
