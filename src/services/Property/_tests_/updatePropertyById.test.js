import { describe, it, expect, vi } from "vitest";
import updatePropertyById from "../updatePropertyById";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    property: {
      updateMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("updatePropertyById", () => {
  it("should update property when found", async () => {
    const id = "1";
    const updatedProperty = {
      title: "updated Property",
      description: "updated description",
      location: "updated location",
      pricePerNight: 120,
      bedroomCount: 3,
      bathRoomCount: 2,
      maxGuestCount: 6,
      hostId: "2",
    };

    // Mock PrismaClient().property.updateMany to resolve with a mock result
    PrismaClient().property.updateMany.mockResolvedValue({ count: 1 });

    // Call updatePropertyById function
    const result = await updatePropertyById(
      id,
      updatedProperty.title,
      updatedProperty.description,
      updatedProperty.location,
      updatedProperty.pricePerNight,
      updatedProperty.bedroomCount,
      updatedProperty.bathRoomCount,
      updatedProperty.maxGuestCount,
      updatedProperty.hostId
    );

    // Assert the returned message
    expect(result).toEqual({ message: `Property with ${id} was updated.` });

    // Assert that PrismaClient().property.updateMany was called with the correct arguments
    expect(PrismaClient().property.updateMany).toHaveBeenCalledWith({
      where: { id },
      data: updatedProperty,
    });
  });

  it("should throw NotFoundError when property not found", async () => {
    const id = "999";

    // Mock PrismaClient().property.updateMany to resolve with a mock result (count: 0)
    PrismaClient().property.updateMany.mockResolvedValue({ count: 0 });

    // Call updatePropertyById function and expect it to throw NotFoundError
    await expect(updatePropertyById(id)).rejects.toThrowError(
      new NotFoundError("property", id)
    );

    // Assert that PrismaClient().property.updateMany was called with the correct arguments
    expect(PrismaClient().property.updateMany).toHaveBeenCalledWith({
      where: { id },
      data: {},
    });
  });

  // Add more tests as needed
});
