import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUserById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const updateUser = await prisma.user.updateMany({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });
  if (!updateUser || updateUser.count === 0) {
    // throw new NotFoundError("user", id);
    return null;
  }
  return id;
};

export default updateUserById;
