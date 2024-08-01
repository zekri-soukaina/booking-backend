import { describe, it, expect, vi } from "vitest";
import createAmenity from "../createAmenity.js";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

// Mock PrismaClient and amenity.create
vi.mock("@prisma/client", () => {
  const mockPrismaClient = {
    amenity: {
      create: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mockPrismaClient) };
});

describe("createAmenity", () => {
  it("should create an amenity", async () => {
    const mockName = "Test Amenity";
    const mockId = uuid();

    // Mock successful amenity creation
    const mockAmenity = {
      id: mockId,
      name: mockName,
    };
    PrismaClient().amenity.create.mockResolvedValueOnce(mockAmenity);

    // Call createAmenity function
    const result = await createAmenity(mockName);

    // Assert the result
    expect(result).toEqual(mockAmenity);

    // Assert that PrismaClient().amenity.create was called with the correct arguments
    expect(PrismaClient().amenity.create).toHaveBeenCalledWith({
      data: {
        id: expect.any(String), // Ensure a UUID is generated
        name: mockName,
      },
    });
  });

  it("should throw an error when create fails", async () => {
    const errorMessage = "Database error";

    // Mock failing amenity creation
    PrismaClient().amenity.create.mockRejectedValueOnce(
      new Error(errorMessage)
    );

    // Assert that createAmenity function throws the expected error
    await expect(createAmenity("Failed Amenity")).rejects.toThrow(
      `Failed to create amenity ${errorMessage}`
    );

    // Assert that PrismaClient().amenity.create was called with the correct arguments
    expect(PrismaClient().amenity.create).toHaveBeenCalledWith({
      data: {
        id: expect.any(String), // Ensure a UUID is generated
        name: "Failed Amenity",
      },
    });
  });

  // Add more tests as needed
});
