import { describe, it, expect, vi } from "vitest";
import createProperty from "../createProperty";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    property: {
      create: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

vi.mock("uuid", () => {
  return {
    v4: vi.fn(),
  };
});

describe("createPropert function", () => {
  it("should create a property", async () => {
    const title = "Sample Property";
    const description = "This is a sample property description.";
    const location = "Sample City";
    const pricePerNight = 100;
    const bedroomCount = 2;
    const bathRoomCount = 1;
    const maxGuestCount = 4;
    const hostId = "host123";
    const PropertyId = "property-123";

    uuid.mockReturnValue(PropertyId);

    const mockProperty = {
      id: PropertyId, // Replace with the expected ID generated by uuid()
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      // hostId: { connect: { id: hostId } },
    };

    // Mock PrismaClient().property.create to resolve with mockProperty
    PrismaClient().property.create.mockResolvedValue(mockProperty);

    // Call createProperty function
    const result = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId
    );

    // Assert that the result matches the mockProperty
    expect(result).toEqual(mockProperty);

    // Assert that PrismaClient().property.create was called with correct data
    expect(PrismaClient().property.create).toHaveBeenCalledWith({
      data: {
        id: PropertyId,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId,
      },
    });
  });

  // Add more tests as needed
});
