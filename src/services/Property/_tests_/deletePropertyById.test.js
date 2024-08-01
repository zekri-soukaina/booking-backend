import { describe, it, expect, vi } from "vitest";
import deletePropertyById from "../deletePropertyById";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    property: {
      deleteMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("deletePropertyById", () => {
  it("should delete property when found", async () => {
    const id = "1";

    // Mock PrismaClient().property.deleteMany to resolve with a delete operation result
    PrismaClient().property.deleteMany.mockResolvedValue({ count: 1 });

    // Call deletePropertyById function
    const result = await deletePropertyById(id);

    // Assert that the result matches the deleted property's id
    expect(result).toEqual(id);

    // Assert that PrismaClient().property.deleteMany was called with the correct id
    expect(PrismaClient().property.deleteMany).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it("should throw NotFoundError when property not found", async () => {
    const id = "999";

    // Mock PrismaClient().property.deleteMany to resolve with delete operation result count 0 (indicating no property was deleted)
    PrismaClient().property.deleteMany.mockResolvedValue({ count: 0 });

    // Call deletePropertyById function and expect it to throw NotFoundError
    await expect(deletePropertyById(id)).rejects.toThrowError(
      new NotFoundError("property", id)
    );

    // Assert that PrismaClient().property.deleteMany was called with the correct id
    expect(PrismaClient().property.deleteMany).toHaveBeenCalledWith({
      where: { id },
    });
  });

  //   it("should throw NotFoundError for invalid id", async () => {
  //     const invalidId = null;

  //     // Call deletePropertyById function with an invalid id and expect it to throw NotFoundError
  //     await expect(deletePropertyById(invalidId)).rejects.toThrowError(
  //       new NotFoundError("Property", invalidId)
  //     );

  //     // Assert that PrismaClient().property.deleteMany was not called (since we're checking for invalid id)
  //     expect(PrismaClient().property.deleteMany).not.toHaveBeenCalled();
  //   });

  // Add more tests as needed
});
