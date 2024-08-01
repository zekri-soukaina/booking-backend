import { describe, it, expect, vi, beforeEach } from "vitest";
import updateAmenityById from "../updateAmenityById.js";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError.js";

// Mocking PrismaClient
vi.mock("@prisma/client", () => {
  const mPrisma = {
    amenity: {
      updateMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrisma) };
});

describe("updateAmenityById function", () => {
  let prismaMock;

  beforeEach(() => {
    prismaMock = new PrismaClient();
  });

  it("should update an amenity's name and return the id on successful update", async () => {
    const amenityId = "existing-amenity-id";
    const updatedName = "New Amenity Name";
    prismaMock.amenity.updateMany.mockResolvedValueOnce({ count: 1 });

    const result = await updateAmenityById(amenityId, updatedName);
    expect(result).toBe(amenityId);
    expect(prismaMock.amenity.updateMany).toHaveBeenCalledWith({
      where: { id: amenityId },
      data: { name: updatedName },
    });
  });

  it("should throw NotFoundError if amenity with given id does not exist", async () => {
    const amenityId = "non-existent-amenity-id";
    const updatedName = "New Amenity Name";

    // Mocking updateMany to resolve with { count: 0 }
    prismaMock.amenity.updateMany.mockResolvedValueOnce({ count: 0 });

    await expect(updateAmenityById(amenityId, updatedName)).rejects.toThrow(
      NotFoundError
    );
    expect(prismaMock.amenity.updateMany).toHaveBeenCalledWith({
      where: { id: amenityId },
      data: { name: updatedName },
    });
  });

  it("should handle general errors gracefully", async () => {
    const errorMessage = "Database error";
    prismaMock.amenity.updateMany.mockRejectedValueOnce(
      new Error(errorMessage)
    );

    await expect(updateAmenityById("amenity-id", "New Name")).rejects.toThrow(
      Error
    );
  });
});
