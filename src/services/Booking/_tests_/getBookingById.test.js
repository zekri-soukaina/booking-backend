import { describe, it, expect, vi } from "vitest";
import getBookingById from "../getBookingById";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mockPrismaClient = {
    booking: {
      findUnique: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mockPrismaClient) };
});

describe("getBookingById", () => {
  it("should return the booking when found", async () => {
    const bookingId = "abc123";
    const mockBooking = { id: bookingId, propertyId: "xyz789" }; // Mock the booking object

    // Mock successful findUnique
    PrismaClient().booking.findUnique.mockResolvedValue(mockBooking);

    const result = await getBookingById(bookingId);
    expect(result).toEqual(mockBooking);
    expect(PrismaClient().booking.findUnique).toHaveBeenCalledWith({
      where: { id: bookingId },
    });
  });

  it("should throw NotFoundError when no booking is found with the given id", async () => {
    const bookingId = "invalid_id";

    // Mock findUnique where no booking is found
    PrismaClient().booking.findUnique.mockResolvedValue(null);

    await expect(getBookingById(bookingId)).rejects.toThrow(NotFoundError);
  });

  // Add more test cases for error handling scenarios if needed
});
