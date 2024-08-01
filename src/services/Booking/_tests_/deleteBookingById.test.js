import { describe, it, expect, vi } from "vitest";
import deleteBookingById from "../deleteBookingById";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mockPrismaClient = {
    booking: {
      deleteMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mockPrismaClient) };
});

describe("deleteBookingById", () => {
  it("should delete the booking when found", async () => {
    const bookingId = "abc123";

    // Mock successful deletion
    PrismaClient().booking.deleteMany.mockResolvedValue({ count: 1 });

    // Call deleteBookingById function
    const result = await deleteBookingById(bookingId);

    // Assert the result
    expect(result).toEqual(bookingId);

    // Assert that PrismaClient().booking.deleteMany was called with the correct arguments
    expect(PrismaClient().booking.deleteMany).toHaveBeenCalledWith({
      where: { id: bookingId },
    });
  });

  it("should throw NotFoundError when no booking is found with the given id", async () => {
    const bookingId = "invalid_id";

    // Mock deletion returning zero count (not found)
    PrismaClient().booking.deleteMany.mockResolvedValue({ count: 0 });

    // Call deleteBookingById function and expect it to throw NotFoundError
    await expect(deleteBookingById(bookingId)).rejects.toThrow(NotFoundError);
  });

  it("should handle errors gracefully", async () => {
    const bookingId = "error_id";
    const errorMessage = "Database error";

    // Mock deletion throwing an error
    PrismaClient().booking.deleteMany.mockRejectedValue(
      new Error(errorMessage)
    );

    // Call deleteBookingById function and expect it to throw an error
    await expect(deleteBookingById(bookingId)).rejects.toThrow(Error);

    // Optionally, assert on the specific error message or log output
  });

  // Add more tests as needed
});
