// import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateBookingById = async (
  id,
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const updateBooking = await prisma.booking.updateMany({
    where: {
      id,
    },
    data: {
      userId: userId,
      propertyId: propertyId,
      // userId: userId
      //   ? {
      //       connect: { id: userId },
      //     }
      //   : undefined,
      // propertyId: propertyId
      //   ? {
      //       connect: { id: propertyId },
      //     }
      //   : undefined,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });
  if (!updateBooking || updateBooking.count === 0) {
    // throw new NotFoundError("Booking", id);
    return null;
  }
  // return id;
  return { message: `Booking with ${id} was updated.` };
};

export default updateBookingById;
