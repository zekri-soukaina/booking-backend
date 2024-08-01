import { describe, it, expect, vi, beforeEach } from "vitest";
import createUser from "../createUser.js";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

vi.mock("@prisma/client", () => {
  const PrismaClientMock = {
    user: {
      create: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => PrismaClientMock) };
});

vi.mock("uuid", () => ({
  v4: vi.fn(),
}));

describe("createUser function", () => {
  let prismaMock;
  let userMockData;

  beforeEach(() => {
    userMockData = {
      id: "unique-id",
      username: "testuser",
      password: "password123",
      name: "Test User",
      email: "test@example.com",
      phoneNumber: "1234567890",
      profilePicture: "profile.jpg",
    };

    uuid.mockImplementation(() => "unique-id");

    prismaMock = {
      user: {
        create: vi.fn().mockResolvedValue(userMockData),
      },
    };

    PrismaClient.mockImplementation(() => prismaMock);
  });

  it("should create a new user", async () => {
    const newUser = await createUser(
      userMockData.username,
      userMockData.password,
      userMockData.name,
      userMockData.email,
      userMockData.phoneNumber,
      userMockData.profilePicture
    );

    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        id: "unique-id",
        username: userMockData.username,
        password: userMockData.password,
        name: userMockData.name,
        email: userMockData.email,
        phoneNumber: userMockData.phoneNumber,
        profilePicture: userMockData.profilePicture,
      },
    });
    expect(newUser).toEqual(userMockData);
  });

  it("should create a user with the required fields", async () => {
    const newUser = await createUser(
      userMockData.username,
      userMockData.password,
      userMockData.name,
      userMockData.email,
      userMockData.phoneNumber,
      userMockData.profilePicture
    );

    expect(newUser).toHaveProperty("id");
    expect(newUser).toHaveProperty("username");
    expect(newUser).toHaveProperty("password");
    expect(newUser).toHaveProperty("name");
    expect(newUser).toHaveProperty("email");
    expect(newUser).toHaveProperty("phoneNumber");
    expect(newUser).toHaveProperty("profilePicture");
  });

  it("should create a user with non-empty strings for id, username, password, name, email, and phoneNumber", async () => {
    const newUser = await createUser(
      userMockData.username,
      userMockData.password,
      userMockData.name,
      userMockData.email,
      userMockData.phoneNumber,
      userMockData.profilePicture
    );

    expect(newUser.id).toBeTypeOf("string");
    expect(newUser.id).not.toBe("");
    expect(newUser.username).toBeTypeOf("string");
    expect(newUser.username).not.toBe("");
    expect(newUser.password).toBeTypeOf("string");
    expect(newUser.password).not.toBe("");
    expect(newUser.name).toBeTypeOf("string");
    expect(newUser.name).not.toBe("");
    expect(newUser.email).toBeTypeOf("string");
    expect(newUser.email).not.toBe("");
    expect(newUser.phoneNumber).toBeTypeOf("string");
    expect(newUser.phoneNumber).not.toBe("");
  });
});
