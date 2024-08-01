import { describe, it, expect, vi } from "vitest";
import getReviews from "../getReviews";
import { PrismaClient } from "@prisma/client";

vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    review: {
      findMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("getReviews", () => {
  it("should return reviews", async () => {
    const mockedReviews = [
      { id: 1, title: "Review 1", content: "Lorem ipsum" },
      { id: 2, title: "Review 2", content: "Dolor sit amet" },
    ];

    PrismaClient().review.findMany.mockResolvedValue(mockedReviews);

    const result = await getReviews();

    expect(result).toEqual(mockedReviews);
    expect(PrismaClient().review.findMany).toHaveBeenCalledWith();
  });

  it("should handle errors gracefully", async () => {
    const error = new Error("Database error");
    PrismaClient().review.findMany.mockRejectedValue(error);

    await expect(getReviews()).rejects.toThrowError("Failed to fetch reviews");
  });

  // Add more tests as needed
});
