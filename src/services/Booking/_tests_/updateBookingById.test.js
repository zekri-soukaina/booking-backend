import { describe, it, expect, vi } from "vitest";
import updateBookingById from "../updateBookingById"; // Adjust the path as per your project structure
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError"; // Adjust the path as per your project structure

// Mock PrismaClient and its methods
vi.mock("@prisma/client", () => {
  const mockPrismaClient = {
    booking: {
      updateMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mockPrismaClient) };
});

describe("updateBookingById", () => {
  it("should update the booking when found", async () => {
    const id = "abc123";
    const updatedBooking = {
      userId: "user1",
      propertyId: "property1",
      checkinDate: new Date("2024-06-21"),
      checkoutDate: new Date("2024-06-25"),
      numberOfGuests: 2,
      totalPrice: 500,
      bookingStatus: "confirmed",
    };

    // Mock successful updateMany
    PrismaClient().booking.updateMany.mockResolvedValue({ count: 1 });

    const result = await updateBookingById(
      id,
      updatedBooking.userId,
      updatedBooking.propertyId,
      updatedBooking.checkinDate,
      updatedBooking.checkoutDate,
      updatedBooking.numberOfGuests,
      updatedBooking.totalPrice,
      updatedBooking.bookingStatus
    );
    expect(result).toEqual({ message: `Booking with ${id} was updated.` });
    expect(PrismaClient().booking.updateMany).toHaveBeenCalledWith({
      where: { id },
      data: updatedBooking,
      // data: {
      //   checkinDate: updatedBooking.checkinDate,
      //   checkoutDate: updatedBooking.checkoutDate,
      //   numberOfGuests: updatedBooking.numberOfGuests,
      //   totalPrice: updatedBooking.totalPrice,
      //   bookingStatus: updatedBooking.bookingStatus,
      //   userId: { connect: { id: updatedBooking.userId } },
      //   propertyId: { connect: { id: updatedBooking.propertyId } },
      // },
    });
  });

  it("should throw NotFoundError when no booking is found with the given id", async () => {
    const id = "invalid_id";
    const updatedBooking = {
      userId: "user1",
      propertyId: "property1",
      checkinDate: new Date("2024-06-21"),
      checkoutDate: new Date("2024-06-25"),
      numberOfGuests: 2,
      totalPrice: 500,
      bookingStatus: "confirmed",
    };

    // Mock updateMany where no booking is found
    PrismaClient().booking.updateMany.mockResolvedValue({ count: 0 });

    await expect(updateBookingById(id, updatedBooking)).rejects.toThrow(
      NotFoundError
    );
  });

  it("should handle errors gracefully", async () => {
    const id = "abc123";
    const updatedBooking = {
      userId: "user1",
      propertyId: "property1",
      checkinDate: new Date("2024-06-21"),
      checkoutDate: new Date("2024-06-25"),
      numberOfGuests: 2,
      totalPrice: 500,
      bookingStatus: "confirmed",
    };

    // Mock updateMany to simulate an error
    PrismaClient().booking.updateMany.mockRejectedValue(
      new Error("Database error")
    );

    await expect(updateBookingById(id, updatedBooking)).rejects.toThrow(Error);
  });
});
