import { describe, it, expect, vi } from "vitest";
import updateUserById from "../updateUserById";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError";

// Mock PrismaClient
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    user: {
      updateMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("updateUserById", () => {
  it("should update the user details and return the user id", async () => {
    const id = "123";
    const username = "new_username";
    const password = "new_password";
    const name = "New Name";
    const email = "new_email@example.com";
    const phoneNumber = "1234567890";
    const profilePicture = "new_profile_picture_url";

    PrismaClient().user.updateMany.mockResolvedValue({ count: 1 });

    const result = await updateUserById(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );

    expect(result).toBe(id);
    expect(PrismaClient().user.updateMany).toHaveBeenCalledWith({
      where: { id },
      data: { username, password, name, email, phoneNumber, profilePicture },
    });
  });

  it("should throw NotFoundError if no user is updated", async () => {
    const id = "123";

    PrismaClient().user.updateMany.mockResolvedValue({ count: 0 });

    await expect(updateUserById(id)).rejects.toThrow(
      new NotFoundError("user", id)
    );
  });

  // Add more tests as needed
});
