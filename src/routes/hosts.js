import express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandle.js";

// import jwtCheck from "../middleware/advancedAuth.js";
import jwtCheck from "../middleware/auth.js";

import getHosts from "../services/Host/getHosts.js";
import createHost from "../services/Host/createHost.js";
import getHosttById from "../services/Host/getHostById.js";
import updateHostById from "../services/Host/updateHostById.js";
import deleteHostById from "../services/Host/deleteHostById.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const hosts = await getHosts(name);
    res.status(200).json(hosts);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong while getting list of hosts");
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHosttById(id);
      if (!host) {
        res.status(404).json({ message: "host not found" });
      } else {
        res.status(200).json(host);
      }
    } catch (error) {
      next(error);
    }
  }
  // notFoundErrorHandler
);

router.post("/", jwtCheck, async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !phoneNumber ||
      !profilePicture ||
      !aboutMe
    ) {
      res.status(400).send({ message: "missing data!" });
    } else {
      const newHost = await createHost(
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
      );
      if (!newHost) {
        res.status(404).send({ message: "host does not exist!" });
      } else {
        res.status(201).send({
          message: `Host was successfully created`,
          newHost,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong while creating an host.");
  }
});

router.put(
  "/:id",
  jwtCheck,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      const updateHost = await updateHostById(
        id,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
      );

      if (!updateHost) {
        res.status(404).send({
          message: `Host with id ${id}, not found.`,
        });
      } else {
        res.status(200).send({
          message: `Host with id ${id} successfully updated.`,
          updateHost,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  // notFoundErrorHandler
);

router.delete(
  "/:id",
  jwtCheck,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteHost = await deleteHostById(id);
      if (!deleteHost) {
        res.status(404).json({
          message: `Host with id ${id}, not found.`,
        });
      } else {
        res.status(200).json({
          message: `Host with id ${deleteHost} successfully deleted.`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  // notFoundErrorHandler
);

export default router;
