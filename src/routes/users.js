import express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandle.js";

import getUsers from "../services/User/getUsers.js";
import getUserById from "../services/User/getUserById.js";
import createUser from "../services/User/createUser.js";
import updateUserById from "../services/User/updateUserById.js";
import deleteUserById from "../services/User/deleteUserById.js";

// import jwtCheck from "../middleware/advancedAuth.js";
import jwtCheck from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { username, email } = req.query;
    const users = await getUsers(username, email);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong while getting list of users");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  if (!user) {
    console.log("User not found");
    res.status(404).json({ message: `User not found` });
  } else {
    console.log("User found");
    res.status(200).json(user);
  }
}),
  notFoundErrorHandler;

router.post("/", jwtCheck, async (req, res) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !phoneNumber ||
      !profilePicture
    ) {
      res.status(400).send({ message: "missing data!" });
    } else {
      const newUser = await createUser(
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture
      );
      // res.status(201).json(newUser);
      if (!newUser) {
        res.status(404).send({
          message: `User doesnot exist`,
        });
      } else {
        res.status(201).send({
          message: `User successfully created`,
          newUser,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong while creating a user");
  }
});

router.put(
  "/:id",
  jwtCheck,

  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, password, name, email, phoneNumber, profilePicture } =
        req.body;
      const updatedUser = await updateUserById(
        id,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture
      );
      if (!updatedUser) {
        res.status(404).send({
          message: `User with id ${id} not found`,
        });
      } else {
        // res.status(200).json(updatedUser);
        res.status(200).send({
          message: `User with id ${id} successfully updated`,
          updatedUser,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  jwtCheck,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUser = await deleteUserById(id);
      if (!deletedUser) {
        res.status(404).json({
          message: `user with the ${id}, not found.`,
        });
      } else {
        res.status(200).json({
          message: `user with the id: ${deletedUser}, successfully deleted.`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
