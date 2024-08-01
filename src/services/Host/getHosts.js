import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getHosts = async (name) => {
  const hosts = await prisma.host.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
  return hosts;
};
export default getHosts;
