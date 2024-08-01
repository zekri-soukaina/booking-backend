import { describe, it, expect, vi, beforeEach } from "vitest";
import getAmenities from "../getAmenities.js";
import { PrismaClient } from "@prisma/client";

// Mocking PrismaClient
vi.mock("@prisma/client", () => {
  const mPrisma = {
    amenity: {
      findMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrisma) };
});

describe("getAmenities function", () => {
  let prismaMock;

  beforeEach(() => {
    prismaMock = new PrismaClient();
  });

  it("should return an array of amenities when there are amenities in the database", async () => {
    const mockAmenities = [
      { id: "1", name: "Swimming Pool" },
      { id: "2", name: "Gym" },
    ];
    prismaMock.amenity.findMany.mockResolvedValueOnce(mockAmenities);

    const result = await getAmenities();
    expect(result).toEqual(mockAmenities);
    expect(prismaMock.amenity.findMany).toHaveBeenCalled();
  });

  it("should return an empty array if no amenities are found in the database", async () => {
    prismaMock.amenity.findMany.mockResolvedValueOnce([]);

    const result = await getAmenities();
    expect(result).toEqual([]);
    expect(prismaMock.amenity.findMany).toHaveBeenCalled();
  });

  it("should handle general errors gracefully", async () => {
    const errorMessage = "Database error";
    prismaMock.amenity.findMany.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getAmenities()).rejects.toThrow(Error);
  });
});
