import { describe, it, expect, vi, beforeEach } from "vitest";
import deleteAmenityById from "../deleteAmenityById.js";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError.js";

// Mocking PrismaClient
vi.mock("@prisma/client", () => {
  const mPrisma = {
    amenity: {
      deleteMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrisma) };
});

describe("deleteAmenityById function", () => {
  let prismaMock;

  beforeEach(() => {
    // Mocking PrismaClient implementation
    prismaMock = new PrismaClient();
  });

  it("should throw NotFoundError if ID is not provided", async () => {
    await expect(deleteAmenityById()).rejects.toThrow(
      // NotFoundError
      new NotFoundError("amenity", undefined)
    );
  });

  it("should throw NotFoundError if amenity does not exist", async () => {
    const amenityId = "non-existent-id";
    prismaMock.amenity.deleteMany.mockResolvedValueOnce({ count: 0 });

    await expect(deleteAmenityById(amenityId)).rejects.toThrow(
      //   NotFoundError
      new NotFoundError("amenity", amenityId)
    );
    expect(prismaMock.amenity.deleteMany).toHaveBeenCalledWith({
      where: { id: "non-existent-id" },
    });
  });

  it("should return a success message if amenity is successfully deleted", async () => {
    const amenityId = "valid-amenity-id";
    prismaMock.amenity.deleteMany.mockResolvedValueOnce({ count: 1 });

    const result = await deleteAmenityById(amenityId);
    expect(result).toEqual({
      message: `Amenity with Id ${amenityId} deleted successfully`,
    });
    expect(prismaMock.amenity.deleteMany).toHaveBeenCalledWith({
      where: { id: "valid-amenity-id" },
    });
  });

  it("should handle general errors gracefully", async () => {
    const amenityId = "amenity-id";
    const errorMessage = "Database error";
    prismaMock.amenity.deleteMany.mockRejectedValue(new Error(errorMessage));

    await expect(deleteAmenityById(amenityId)).rejects.toThrow(Error);
  });
});
