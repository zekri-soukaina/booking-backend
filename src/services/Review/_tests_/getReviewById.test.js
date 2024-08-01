import { describe, it, expect, vi } from "vitest";
import getReviews from "../getReviews";
import { PrismaClient } from "@prisma/client";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    review: {
      findMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("getReviews", () => {
  it("should return all reviews", async () => {
    const mockedReviews = [
      { id: 1, title: "Review 1" },
      { id: 2, title: "Review 2" },
    ];

    PrismaClient().review.findMany.mockResolvedValue(mockedReviews);

    const result = await getReviews();

    expect(result).toEqual(mockedReviews);
    expect(PrismaClient().review.findMany).toHaveBeenCalledWith();
  });

  it("should handle errors gracefully", async () => {
    const error = new Error("Database error");
    PrismaClient().review.findMany.mockRejectedValue(error);

    await expect(getReviews()).rejects.toThrow("Database error");
  });

  // Add more tests as needed
});
