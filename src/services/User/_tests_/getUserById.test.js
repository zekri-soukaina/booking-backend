import { describe, it, expect, vi } from "vitest";
import getUserById from "../getUserById";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError"; // Assuming the path is correct

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    user: {
      findUnique: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("getUserById", () => {
  it("should return user when found", async () => {
    const mockUser = { id: 1, username: "john_doe", email: "john@example.com" };
    PrismaClient().user.findUnique.mockResolvedValue(mockUser);

    const result = await getUserById(1);

    expect(result).toEqual(mockUser);
    expect(PrismaClient().user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it("should throw NotFoundError when user not found", async () => {
    PrismaClient().user.findUnique.mockResolvedValue(null);

    try {
      await getUserById(999);
      throw new Error("Expected getUserById to throw NotFoundError");
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toBe("user with id 999 was not found!"); // Adjusted to match received message
    }

    expect(PrismaClient().user.findUnique).toHaveBeenCalledWith({
      where: { id: 999 },
    });
  });

  it("should handle errors gracefully", async () => {
    const error = new Error("Database error");
    PrismaClient().user.findUnique.mockRejectedValue(error);

    await expect(getUserById(1)).rejects.toThrowError("Database error");
  });

  // Add more tests as needed
});
// import { describe, it, expect, vi, beforeEach } from "vitest";
// import getUserById from "../getUserById.js";
// import NotFoundError from "../../../errors/NotFoundError";
// import { PrismaClient } from "@prisma/client";

// // Mock the PrismaClient constructor
// vi.mock("@prisma/client", () => {
//   return {
//     PrismaClient: vi.fn().mockImplementation(() => {
//       return {
//         user: {
//           findUnique: vi.fn(),
//         },
//       };
//     }),
//   };
// });

// const mockedPrisma = new PrismaClient();

// describe("getUserById", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it("should return user when found", async () => {
//     const user = { id: 1, name: "John Doe" };
//     mockedPrisma.user.findUnique.mockResolvedValue(user);

//     const result = await getUserById(1, mockedPrisma);

//     expect(result).toEqual(user);
//     expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
//       where: {
//         id: 1,
//       },
//     });
//   });

//   it("should throw NotFoundError when user not found", async () => {
//     mockedPrisma.user.findUnique.mockResolvedValue(null);

//     await expect(getUserById(1, mockedPrisma)).rejects.toThrow(NotFoundError);
//     await expect(getUserById(1, mockedPrisma)).rejects.toThrow("user");
//     await expect(getUserById(1, mockedPrisma)).rejects.toThrow("1");

//     expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
//       where: {
//         id: 1,
//       },
//     });
//   });
// });

// import { describe, it, expect, vi } from "vitest";
// import getUserById from "../getUserById";
// import { PrismaClient } from "@prisma/client";
// import NotFoundError from "../../../errors/NotFoundError.js"; // Adjust the path as per your project structure

// // Mock PrismaClient
// vi.mock("@prisma/client", () => {
//   const mPrismaClient = {
//     user: {
//       findUnique: vi.fn(),
//     },
//   };
//   return { PrismaClient: vi.fn(() => mPrismaClient) };
// });

// describe("getUserById", () => {
//   it("should return user when found", async () => {
//     const mockUser = { id: 1, username: "john_doe", email: "john@example.com" };
//     PrismaClient().user.findUnique.mockResolvedValue(mockUser);

//     const result = await getUserById(1);

//     expect(result).toEqual(mockUser);
//     expect(PrismaClient().user.findUnique).toHaveBeenCalledWith({
//       where: { id: 1 },
//     });
//   });

//   it("should throw NotFoundError when user not found", async () => {
//     PrismaClient().user.findUnique.mockResolvedValue(null);

//     await expect(getUserById(999)).rejects.toThrowError(NotFoundError);

//     expect(PrismaClient().user.findUnique).toHaveBeenCalledWith({
//       where: { id: 999 },
//     });
//     expect(NotFoundError).toHaveBeenCalledWith("user", 999);
//   });

//   it("should handle errors gracefully", async () => {
//     const error = new Error("Database error");
//     PrismaClient().user.findUnique.mockRejectedValue(error);

//     await expect(getUserById(1)).rejects.toThrowError("Database error");
//   });

//   // Add more tests as needed
// });
