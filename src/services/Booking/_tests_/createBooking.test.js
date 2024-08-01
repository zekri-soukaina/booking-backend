import { describe, it, expect, vi } from "vitest";
import createBooking from "../createBooking";
import { PrismaClient } from "@prisma/client";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mockPrismaClient = {
    booking: {
      create: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mockPrismaClient) };
});

describe("createBooking", () => {
  it("should create a booking", async () => {
    const userId = 1;
    const propertyId = 2;
    const checkinDate = new Date("2024-07-01");
    const checkoutDate = new Date("2024-07-05");
    const numberOfGuests = 2;
    const totalPrice = 500;
    const bookingStatus = "confirmed";

    // Mock successful booking creation
    const mockBooking = {
      id: "abc123", // Replace with an actual UUID if needed
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    };
    PrismaClient().booking.create.mockResolvedValue(mockBooking);

    // Call createBooking function
    const result = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );

    // Assert the result
    expect(result).toEqual(mockBooking);

    // Assert that PrismaClient().booking.create was called with the correct arguments
    expect(PrismaClient().booking.create).toHaveBeenCalledWith({
      data: {
        id: expect.any(String), // Ensure a UUID is generated
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      },
    });
  });

  // Add more tests as needed
});
