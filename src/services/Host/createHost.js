import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const host = await prisma.host.create({
    data: {
      id: uuid(),
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });
  if (!host) {
    return null;
  }
  return host;
};

export default createHost;
