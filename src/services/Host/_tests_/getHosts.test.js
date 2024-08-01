import { describe, it, expect, vi } from "vitest";
import getHosts from "../getHosts";
import { PrismaClient } from "@prisma/client";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mockPrismaClient = {
    host: {
      findMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mockPrismaClient) };
});

describe("getHosts", () => {
  it("should return hosts whose name contains the specified string", async () => {
    const searchName = "test";

    const mockedHosts = [
      { id: 1, name: "Test Host 1", email: "test1@example.com" },
      { id: 2, name: "Test Host 2", email: "test2@example.com" },
    ];

    // Mock PrismaClient().host.findMany to resolve with mock hosts
    PrismaClient().host.findMany.mockResolvedValue(mockedHosts);

    // Call getHosts function
    const returnedHosts = await getHosts(searchName);

    // Assert the returned hosts
    expect(returnedHosts).toEqual(mockedHosts);

    // Assert that PrismaClient().host.findMany was called with the correct arguments
    expect(PrismaClient().host.findMany).toHaveBeenCalledWith({
      where: {
        name: {
          contains: searchName,
        },
      },
    });
  });

  it("should return an empty array when no hosts match the search criteria", async () => {
    const searchName = "nonexistent";

    // Mock PrismaClient().host.findMany to resolve with an empty array
    PrismaClient().host.findMany.mockResolvedValue([]);

    // Call getHosts function
    const returnedHosts = await getHosts(searchName);

    // Assert the returned hosts
    expect(returnedHosts).toEqual([]);

    // Assert that PrismaClient().host.findMany was called with the correct arguments
    expect(PrismaClient().host.findMany).toHaveBeenCalledWith({
      where: {
        name: {
          contains: searchName,
        },
      },
    });
  });

  it("should handle errors gracefully", async () => {
    const error = new Error("Database error");
    PrismaClient().host.findMany.mockRejectedValue(error);

    // Call getHosts function and expect it to throw an error
    await expect(getHosts()).rejects.toThrow("Database error");
  });

  // Add more tests as needed
});
