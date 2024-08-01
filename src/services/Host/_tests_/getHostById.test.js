import { describe, it, expect, vi } from "vitest";
import getHostById from "../getHostById";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    host: {
      findUnique: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("getHostById", () => {
  it("should return the host when found", async () => {
    const mockHost = {
      id: "12345",
      username: "testuser",
      password: "testpassword",
      name: "Test User",
      email: "test@example.com",
      phoneNumber: "1234567890",
      profilePicture: "profile.jpg",
      aboutMe: "I am a test host.",
    };

    // Mock PrismaClient().host.findUnique to resolve with a mock host object
    PrismaClient().host.findUnique.mockResolvedValue(mockHost);

    // Call getHostById function
    const returnedHost = await getHostById(mockHost.id);

    // Assert the returned host object
    expect(returnedHost).toEqual(mockHost);

    // Assert that PrismaClient().host.findUnique was called with the correct arguments
    expect(PrismaClient().host.findUnique).toHaveBeenCalledWith({
      where: {
        id: mockHost.id,
      },
    });
  });

  it("should throw NotFoundError when host not found", async () => {
    const invalidHostId = "999";

    // Mock PrismaClient().host.findUnique to resolve with null (host not found)
    PrismaClient().host.findUnique.mockResolvedValue(null);

    // Call getHostById function and expect it to throw NotFoundError
    await expect(getHostById(invalidHostId)).rejects.toThrowError(
      new NotFoundError("host", invalidHostId)
    );

    // Assert that PrismaClient().host.findUnique was called with the correct arguments
    expect(PrismaClient().host.findUnique).toHaveBeenCalledWith({
      where: {
        id: invalidHostId,
      },
    });
  });

  // Add more tests as needed
});
