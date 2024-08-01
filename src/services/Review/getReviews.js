import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getReviews = async () => {
  try {
    const reviews = await prisma.review.findMany();
    return reviews;
  } catch (error) {
    throw new Error(`Failed to fetch reviews ${error.message}`);
  }
};
export default getReviews;

// const getReviews = async (page = 1, perPage = 10) => {
//   try {
//     const reviews = await prisma.review.findMany({
//       skip: (page - 1) * perPage,
//       take: perPage,
//     });
//     return reviews;
//   } catch (error) {
//     throw new Error(`Failed to fetch reviews: ${error.message}`);
//   }
// };
