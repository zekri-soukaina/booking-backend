import { describe, it, expect, vi, beforeEach } from "vitest";
import getAmenityById from "../getAmenityById.js";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError.js";

// Mocking PrismaClient
vi.mock("@prisma/client", () => {
  const mPrisma = {
    amenity: {
      findUnique: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrisma) };
});

describe("getAmenityById function", () => {
  let prismaMock;

  beforeEach(() => {
    prismaMock = new PrismaClient();
  });

  it("should return an amenity when a valid ID is provided", async () => {
    const mockAmenity = { id: "valid-amenity-id", name: "Swimming Pool" };
    prismaMock.amenity.findUnique.mockResolvedValueOnce(mockAmenity);

    const result = await getAmenityById("valid-amenity-id");
    expect(result).toEqual(mockAmenity);
    expect(prismaMock.amenity.findUnique).toHaveBeenCalledWith({
      where: { id: "valid-amenity-id" },
    });
  });

  it("should throw NotFoundError if amenity with given ID does not exist", async () => {
    prismaMock.amenity.findUnique.mockResolvedValueOnce(null); // Simulate no amenity found

    await expect(getAmenityById("non-existent-id")).rejects.toThrow(
      NotFoundError
    );
    expect(prismaMock.amenity.findUnique).toHaveBeenCalledWith({
      where: { id: "non-existent-id" },
    });
  });

  it("should handle general errors gracefully", async () => {
    const errorMessage = "Database error";
    prismaMock.amenity.findUnique.mockRejectedValueOnce(
      new Error(errorMessage)
    );

    await expect(getAmenityById("amenity-id")).rejects.toThrow(Error);
  });
});
