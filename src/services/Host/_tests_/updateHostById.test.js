import { describe, it, expect, vi } from "vitest";
import updateHostById from "../updateHostById";
import NotFoundError from "../../../errors/NotFoundError"; // Adjust the path as per your project structure
import { PrismaClient } from "@prisma/client";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mockPrismaClient = {
    host: {
      updateMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mockPrismaClient) };
});

describe("updateHostById", () => {
  it("should update the host when the host exists", async () => {
    const id = 1;
    const updatedHost = {
      username: "new_username",
      password: "new_password",
      name: "New Name",
      email: "new@example.com",
      phoneNumber: "1234567890",
      profilePicture: "new_profile.jpg",
      aboutMe: "Updated about me",
    };

    // Mock successful update
    PrismaClient().host.updateMany.mockResolvedValue({ count: 1 });

    // Call updateHostById function
    const result = await updateHostById(
      id,
      updatedHost.username,
      updatedHost.password,
      updatedHost.name,
      updatedHost.email,
      updatedHost.phoneNumber,
      updatedHost.profilePicture,
      updatedHost.aboutMe
    );

    // Assert the result
    expect(result).toEqual({ message: `Host with ${id} was updated.` });

    // Assert that PrismaClient().host.updateMany was called with the correct arguments
    expect(PrismaClient().host.updateMany).toHaveBeenCalledWith({
      where: { id },
      data: updatedHost,
    });
  });

  it("should throw NotFoundError when no host is found with the given id", async () => {
    const id = 999; // Assuming host with id 999 does not exist

    // Mock unsuccessful update (host not found)
    PrismaClient().host.updateMany.mockResolvedValue({ count: 0 });

    // Call updateHostById function and expect it to throw NotFoundError
    await expect(updateHostById(id)).rejects.toThrow(NotFoundError);

    // Assert that PrismaClient().host.updateMany was called with the correct arguments
    expect(PrismaClient().host.updateMany).toHaveBeenCalledWith({
      where: { id },
      data: {},
    });
  });

  it("should handle errors gracefully", async () => {
    const id = 123;
    const updatedHost = {
      username: "new_username",
      password: "new_password",
      name: "New Name",
      email: "new@example.com",
      phoneNumber: "1234567890",
      profilePicture: "new_profile.jpg",
      aboutMe: "Updated about me",
    };

    const error = new Error("Database error");

    // Mock PrismaClient().host.updateMany to throw an error
    PrismaClient().host.updateMany.mockRejectedValue(error);

    // Call updateHostById function and expect it to throw the error
    await expect(
      updateHostById(
        id,
        updatedHost.username,
        updatedHost.password,
        updatedHost.name,
        updatedHost.email,
        updatedHost.phoneNumber,
        updatedHost.profilePicture,
        updatedHost.aboutMe
      )
    ).rejects.toThrow("Database error");

    // Assert that PrismaClient().host.updateMany was called with the correct arguments
    expect(PrismaClient().host.updateMany).toHaveBeenCalledWith({
      where: { id },
      data: updatedHost,
    });
  });

  // Add more tests as needed
});
