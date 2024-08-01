import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();
const createReview = async (userId, propertyId, rating, comment) => {
  const review = await prisma.review.create({
    data: {
      id: uuid(),
      user: {
        connect: { id: userId },
      },
      property: {
        connect: { id: propertyId },
      },
      rating,
      comment,
    },
  });
  return review;
};

export default createReview;
