// import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookingtById = async (id) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id,
    },
  });
  if (!booking) {
    // throw new NotFoundError("booking", id);
    return null;
  }
  return booking;
};

export default getBookingtById;
