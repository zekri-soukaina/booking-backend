import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getReviewById = async (id) => {
  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });
  if (!review) {
    // throw new NotFoundError("review", id);
    return null;
  }
  return review;
};

export default getReviewById;
