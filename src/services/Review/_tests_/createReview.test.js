import { describe, it, expect, vi } from "vitest";
import createReview from "../createReview";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

// Mock PrismaClient and UUID
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    review: {
      create: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

vi.mock("uuid", () => {
  return {
    v4: vi.fn(),
  };
});

describe("createReview", () => {
  it("should create a review and return it", async () => {
    const userId = "user-123";
    const propertyId = "property-123";
    const rating = 5;
    const comment = "Great place!";
    const reviewId = "review-123";

    uuid.mockReturnValue(reviewId);

    const mockedReview = {
      id: reviewId,
      userId,
      propertyId,
      rating,
      comment,
    };

    PrismaClient().review.create.mockResolvedValue(mockedReview);

    const result = await createReview(userId, propertyId, rating, comment);

    expect(result).toEqual(mockedReview);
    expect(PrismaClient().review.create).toHaveBeenCalledWith({
      data: {
        id: reviewId,
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
  });

  // Add more tests as needed
});
