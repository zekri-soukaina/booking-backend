import { describe, it, expect, vi } from "vitest";
import getPropertyById from "../getPropertyById";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    property: {
      findUnique: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("getPropertyById", () => {
  it("should return property when found", async () => {
    const id = "1";
    const mockProperty = { id: "1", name: "Test Property" };

    // Mock PrismaClient().property.findUnique to resolve with a mock property object
    PrismaClient().property.findUnique.mockResolvedValue(mockProperty);

    // Call getPropertyById function
    const result = await getPropertyById(id);

    // Assert that the result matches the mockProperty
    expect(result).toEqual(mockProperty);

    // Assert that PrismaClient().property.findUnique was called with the correct id
    expect(PrismaClient().property.findUnique).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it("should throw NotFoundError when property not found", async () => {
    const id = "999";

    // Mock PrismaClient().property.findUnique to resolve with null (indicating property not found)
    PrismaClient().property.findUnique.mockResolvedValue(null);

    // Call getPropertyById function and expect it to throw NotFoundError
    await expect(getPropertyById(id)).rejects.toThrowError(
      new NotFoundError("property", id)
    );

    // Assert that PrismaClient().property.findUnique was called with the correct id
    expect(PrismaClient().property.findUnique).toHaveBeenCalledWith({
      where: { id },
    });
  });

  // Add more tests as needed
});
