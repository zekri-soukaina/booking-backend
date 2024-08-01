import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateReviewById = async (id, userId, propertyId, rating, comment) => {
  try {
    const updateReview = await prisma.review.updateMany({
      where: {
        id,
      },
      data: {
        userId: userId,
        // user: userId
        //   ? {
        //       connect: { id: userId },
        //     }
        //   : undefined,
        propertyId: propertyId,
        rating,
        comment,
      },
    });
    if (!updateReview || updateReview.count === 0) {
      // throw new NotFoundError("review", id);
      return null;
    }

    return { message: `Review with ${id} was updated.` };
    // return id ;
  } catch (error) {
    throw new Error(`Failed to update review ${error.message}`);
  }
};

export default updateReviewById;
