import NotFoundError from "../../errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateHostById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const updateHost = await prisma.host.updateMany({
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
      aboutMe,
    },
  });
  if (!updateHost || updateHost.count === 0) {
    // throw new NotFoundError("host", id);
    return null;
  }

  return { message: `Host with ${id} was updated.` };
  // return id;
};

export default updateHostById;
