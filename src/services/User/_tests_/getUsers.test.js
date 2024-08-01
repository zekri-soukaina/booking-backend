import { describe, it, expect, vi } from "vitest";
import getUsers from "../getUsers";
import { PrismaClient } from "@prisma/client";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    user: {
      findMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("getUsers", () => {
  it("should return all users when no filters are provided", async () => {
    const mockedUsers = [
      { id: 1, username: "john_doe", email: "john@example.com" },
      { id: 2, username: "jane_doe", email: "jane@example.com" },
    ];

    PrismaClient().user.findMany.mockResolvedValue(mockedUsers);

    const result = await getUsers();

    expect(result).toEqual(mockedUsers);
    expect(PrismaClient().user.findMany).toHaveBeenCalledWith({
      where: {},
    });
  });

  it("should return users filtered by username and email", async () => {
    const mockedUsers = [
      { id: 1, username: "john_doe", email: "john@example.com" },
      { id: 2, username: "jane_doe", email: "jane@example.com" },
    ];

    PrismaClient().user.findMany.mockResolvedValue(mockedUsers);

    const username = "doe";
    const email = "example.com";

    const result = await getUsers(username, email);

    expect(result).toEqual(mockedUsers);
    expect(PrismaClient().user.findMany).toHaveBeenCalledWith({
      where: {
        username: {
          equals: username,
        },
        email: {
          contains: email,
        },
      },
    });
  });

  it("should handle errors gracefully", async () => {
    const error = new Error("Database error");
    PrismaClient().user.findMany.mockRejectedValue(error);

    await expect(getUsers()).rejects.toThrow("Database error");
  });

  // Add more tests as needed
});
