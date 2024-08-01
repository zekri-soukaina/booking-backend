import { describe, it, expect, vi } from "vitest";
import deleteHostById from "../deleteHostById";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    host: {
      deleteMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("deleteHostById", () => {
  it("should delete host when found", async () => {
    const id = "1";

    // Mock PrismaClient().host.deleteMany to resolve with a mock result
    PrismaClient().host.deleteMany.mockResolvedValue({ count: 1 });

    // Call deleteHostById function
    const result = await deleteHostById(id);

    // Assert the returned id
    expect(result).toBe(id);

    // Assert that PrismaClient().host.deleteMany was called with the correct arguments
    expect(PrismaClient().host.deleteMany).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it("should throw NotFoundError when host not found", async () => {
    const id = "999";

    // Mock PrismaClient().host.deleteMany to resolve with a mock result (count: 0)
    PrismaClient().host.deleteMany.mockResolvedValue({ count: 0 });

    // Call deleteHostById function and expect it to throw NotFoundError
    await expect(deleteHostById(id)).rejects.toThrowError(
      new NotFoundError("Host", id)
    );

    // Assert that PrismaClient().host.deleteMany was called with the correct arguments
    expect(PrismaClient().host.deleteMany).toHaveBeenCalledWith({
      where: { id },
    });
  });

  // Add more tests as needed
});
// import { describe, it, expect, vi } from "vitest";
// import deleteHostById from "../deleteHostById";
// import { PrismaClient } from "@prisma/client";
// import NotFoundError from "../../../errors/NotFoundError";

// // Mock PrismaClient
// vi.mock("@prisma/client", () => {
//   const mPrismaClient = {
//     host: {
//       deleteMany: vi.fn(),
//     },
//   };
//   return { PrismaClient: vi.fn(() => mPrismaClient) };
// });

// describe("deleteHostById", () => {
//   it("should delete host when found", async () => {
//     const id = "1";

//     // Mock PrismaClient().host.deleteMany to resolve with a delete operation result
//     PrismaClient().host.deleteMany.mockResolvedValue({ id });

//     // Call deleteHostById function
//     const result = await deleteHostById(id);

//     // Assert that the result matches the deleted host's id
//     expect(result).toEqual(id);

//     // Assert that PrismaClient().host.deleteMany was called with the correct id
//     expect(PrismaClient().host.deleteMany).toHaveBeenCalledWith({
//       where: { id },
//     });
//   });

//   it("should throw NotFoundError when host not found", async () => {
//     const id = "999";

//     // Mock PrismaClient().host.deleteMany to resolve with null (indicating no host was deleted)
//     PrismaClient().host.deleteMany.mockResolvedValue(null);

//     // Call deleteHostById function and expect it to throw NotFoundError
//     await expect(deleteHostById(id)).rejects.toThrowError(
//       new NotFoundError("Host", id)
//     );

//     // Assert that PrismaClient().host.deleteMany was called with the correct id
//     expect(PrismaClient().host.deleteMany).toHaveBeenCalledWith({
//       where: { id },
//     });
//   });

//   it("should throw NotFoundError for invalid id", async () => {
//     const invalidId = null;

//     // Call deleteHostById function with an invalid id and expect it to throw NotFoundError
//     await expect(deleteHostById(invalidId)).rejects.toThrowError(
//       new NotFoundError("Host", invalidId)
//     );

//     // Assert that PrismaClient().host.deleteMany was not called (since we're checking for invalid id)
//     expect(PrismaClient().host.deleteMany).not.toHaveBeenCalled();
//   });

//   // Add more tests as needed
// });
