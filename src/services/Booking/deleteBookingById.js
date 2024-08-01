import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteBookingById = async (id) => {
  if (!id || typeof id != "string") {
    // throw new NotFoundError("Booking", id);
    return null;
  }

  try {
    const deleteBooking = await prisma.booking.deleteMany({
      where: {
        id,
      },
    });
    if (!deleteBooking || deleteBooking.count === 0) {
      // throw new NotFoundError("Booking", id);
      return null;
    }
    return id;
  } catch (error) {
    console.error("error deleting booking", error);
    throw error;
  }
};

export default deleteBookingById;
