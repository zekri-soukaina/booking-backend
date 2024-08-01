import { describe, it, expect, vi } from "vitest";
import getBookings from "../getBookings"; // Adjust the path as per your project structure
import { PrismaClient } from "@prisma/client";

// Mock PrismaClient and its methods
vi.mock("@prisma/client", () => {
  const mockPrismaClient = {
    booking: {
      findMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mockPrismaClient) };
});

describe("getBookings", () => {
  it("should return bookings when found for a valid userId", async () => {
    const userId = "abc123";
    const mockBookings = [
      { id: "booking1", userId: "abc123", checkinDate: "2024-06-21" },
      { id: "booking2", userId: "abc123", checkinDate: "2024-06-22" },
    ];

    // Mock successful findMany
    PrismaClient().booking.findMany.mockResolvedValue(mockBookings);

    const result = await getBookings(userId);
    expect(result).toEqual(mockBookings);
    expect(PrismaClient().booking.findMany).toHaveBeenCalledWith({
      where: { userId: { contains: userId } },
    });
  });

  it("should return an empty array when no bookings are found for a valid userId", async () => {
    const userId = "xyz789";

    // Mock findMany where no bookings are found
    PrismaClient().booking.findMany.mockResolvedValue([]);

    const result = await getBookings(userId);
    expect(result).toEqual([]);
    expect(PrismaClient().booking.findMany).toHaveBeenCalledWith({
      where: { userId: { contains: userId } },
    });
  });

  it("should handle errors gracefully", async () => {
    const userId = "invalidUserId";

    // Mock findMany to simulate an error
    PrismaClient().booking.findMany.mockRejectedValue(
      new Error("Database error")
    );

    await expect(getBookings(userId)).rejects.toThrow(Error);
  });
});
