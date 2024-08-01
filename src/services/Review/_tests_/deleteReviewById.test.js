import { describe, it, expect, vi } from "vitest";
import deleteReviewById from "../deleteReviewById";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    review: {
      deleteMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("deleteReviewById", () => {
  it("should delete the review and return the review id", async () => {
    const id = "review-123";

    PrismaClient().review.deleteMany.mockResolvedValue({ count: 1 });

    const result = await deleteReviewById(id);

    expect(result).toBe(id);
    expect(PrismaClient().review.deleteMany).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it("should throw NotFoundError if no review is deleted", async () => {
    const id = "review-123";

    PrismaClient().review.deleteMany.mockResolvedValue({ count: 0 });

    await expect(deleteReviewById(id)).rejects.toThrow(
      new NotFoundError("review", id)
    );
  });

  it("should throw NotFoundError if id is not provided", async () => {
    await expect(deleteReviewById()).rejects.toThrow(
      new NotFoundError("review", undefined)
    );
  });

  // Add more tests as needed
});
