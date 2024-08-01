import { describe, it, expect, vi, beforeEach } from "vitest";
import deleteUserById from "../deleteUserById.js";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../../errors/NotFoundError.js";

vi.mock("@prisma/client", () => {
  const mPrisma = {
    user: {
      deleteMany: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrisma) };
});

describe("deleteUserById function", () => {
  let prismaMock;

  beforeEach(() => {
    prismaMock = new PrismaClient();
  });

  it("should throw NotFoundError if id is not provided", async () => {
    await expect(deleteUserById()).rejects.toThrow(NotFoundError);
  });

  it("should throw NotFoundError if user does not exist", async () => {
    prismaMock.user.deleteMany.mockResolvedValueOnce({ count: 0 });

    await expect(deleteUserById("non-existing-id")).rejects.toThrow(
      NotFoundError
    );
    expect(prismaMock.user.deleteMany).toHaveBeenCalledWith({
      where: { id: "non-existing-id" },
    });
  });

  it("should return the user id if user is successfully deleted", async () => {
    prismaMock.user.deleteMany.mockResolvedValueOnce({ count: 1 });

    const result = await deleteUserById("existing-id");
    expect(result).toBe("existing-id");
    expect(prismaMock.user.deleteMany).toHaveBeenCalledWith({
      where: { id: "existing-id" },
    });
  });
});
