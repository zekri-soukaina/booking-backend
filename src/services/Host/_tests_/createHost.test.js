import { describe, it, expect, vi } from "vitest";
import createHost from "../createHost";
import { PrismaClient } from "@prisma/client";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    host: {
      create: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("createHost function", () => {
  it("should create a new host", async () => {
    // Mock UUID generation to ensure consistent ID
    vi.mock("uuid", () => ({
      v4: vi.fn(() => "44e1a247-d212-4b7e-806f-9f3c2993e09c"), // Mock UUID here
    }));

    const mockHostData = {
      id: "44e1a247-d212-4b7e-806f-9f3c2993e09c", // Use the same UUID as mock UUID
      username: "testuser",
      password: "testpassword",
      name: "Test User",
      email: "test@example.com",
      phoneNumber: "1234567890",
      profilePicture: "profile.jpg",
      aboutMe: "I am a test host.",
    };

    // Mock PrismaClient().host.create to resolve with a mock host object
    PrismaClient().host.create.mockResolvedValue(mockHostData);

    // Call createHost function
    const createdHost = await createHost(
      mockHostData.username,
      mockHostData.password,
      mockHostData.name,
      mockHostData.email,
      mockHostData.phoneNumber,
      mockHostData.profilePicture,
      mockHostData.aboutMe
    );

    // Assert the returned host object
    expect(createdHost).toEqual(mockHostData);

    // Assert that PrismaClient().host.create was called with the correct arguments
    expect(PrismaClient().host.create).toHaveBeenCalledWith({
      data: {
        id: mockHostData.id,
        username: mockHostData.username,
        password: mockHostData.password,
        name: mockHostData.name,
        email: mockHostData.email,
        phoneNumber: mockHostData.phoneNumber,
        profilePicture: mockHostData.profilePicture,
        aboutMe: mockHostData.aboutMe,
      },
    });
  });

  // Add more tests as needed
});
