import { describe, it, expect, vi } from "vitest";
import getProperties from "../getProperties";
import { PrismaClient } from "@prisma/client";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    property: {
      findMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("getProperties", () => {
  it("should return properties filtered by location and pricePerNight", async () => {
    const location = "Sample City";
    const pricePerNight = 100;

    const mockedProperties = [
      {
        id: "1",
        title: "Property 1",
        location: "Sample City",
        pricePerNight: 100,
      },
      {
        id: "2",
        title: "Property 2",
        location: "Sample City",
        pricePerNight: 120,
      },
    ];

    // Mock PrismaClient().property.findMany to resolve with mockedProperties
    PrismaClient().property.findMany.mockResolvedValue(mockedProperties);

    // Call getProperties function
    const result = await getProperties(location, pricePerNight);

    // Assert that the result matches mockedProperties
    expect(result).toEqual(mockedProperties);

    // Assert that PrismaClient().property.findMany was called with correct filters
    expect(PrismaClient().property.findMany).toHaveBeenCalledWith({
      where: {
        location: { contains: location.toLowerCase() },
        pricePerNight: { equals: pricePerNight },
      },
    });
  });

  // Add more tests as needed
});
