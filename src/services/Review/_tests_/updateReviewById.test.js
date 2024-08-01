import { describe, it, expect, vi } from "vitest";
import updateReviewById from "../updateReviewById";
import NotFoundError from "../../../errors/NotFoundError";
import { PrismaClient } from "@prisma/client";

vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    review: {
      updateMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("updateReviewById", () => {
  it("should update review when found", async () => {
    const id = 1;
    const updatedReview = {
      userId: "updated userId",
      propertyId: "updated propertyId",
      rating: 5,
      comment: "Updated Review",
    };

    PrismaClient().review.updateMany.mockResolvedValue({ count: 1 });

    const result = await updateReviewById(
      id,

      updatedReview.userId,
      updatedReview.propertyId,
      updatedReview.rating,
      updatedReview.comment
    );

    expect(result).toEqual({ message: `Review with ${id} was updated.` });
    expect(PrismaClient().review.updateMany).toHaveBeenCalledWith({
      where: { id },
      data: updatedReview,
    });
  });

  it("should throw NotFoundError when review not found", async () => {
    const id = 999;

    const mockUpdateResult = { count: 0 };

    PrismaClient().review.updateMany.mockResolvedValue(mockUpdateResult);

    try {
      await updateReviewById(id);
      // If the updateReviewById does not throw an error, fail the test
      throw new Error("Expected updateReviewById to throw NotFoundError");
    } catch (error) {
      expect(error.message).toContain(`review with id ${id} was not found`);
    }
  });

  it("should handle errors gracefully", async () => {
    const id = 1;
    const updatedReview = {
      userId: "updated userId",
      propertyId: "updated propertyId",
      rating: 5,
      comment: "Updated Review",
    };
    const error = new Error("Database error");

    PrismaClient().review.updateMany.mockRejectedValue(error);

    await expect(updateReviewById(id, updatedReview)).rejects.toThrowError(
      /Failed to update review/
    );
  });

  // Add more tests as needed
});
