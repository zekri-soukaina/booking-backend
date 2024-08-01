import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

  // const existingUser = await prisma.user.findUnique({
  //   where: {
  //     username: user.username,
  //   },
  // });
  // if (existingUser) {
  //   return existingUser;
  // }

  const user = prisma.user.create({
    data: {
      id: uuid(),
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });
  if (!user) {
    return null;
  }
  return user;
};

export default createUser;
