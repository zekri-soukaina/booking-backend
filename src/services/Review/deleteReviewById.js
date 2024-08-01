import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteReviewById = async (id) => {
  if (!id) {
    // throw new NotFoundError("review", id);
    return null;
  }
  try {
    const deleteReview = await prisma.review.deleteMany({
      where: { id },
    });
    if (!deleteReview || deleteReview.count === 0) {
      // throw new NotFoundError("review", id);
      return null;
    }
    return id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteReviewById;
