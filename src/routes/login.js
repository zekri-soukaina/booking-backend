// The login route is necessary for authenticating users and issuing tokens.

import { Router } from "express";
import userData from "../data/users.json" assert { type: "json" };
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", (req, res) => {
  const secretKey = process.env.JWT_SECRET || "my-secret-key";
  const { username, password } = req.body;
  const { users } = userData;
  if (!username || !password) {
    res.status(400).send({ message: "missing data!" });
  }
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = jwt.sign({ userId: user.id }, secretKey);
  res.status(200).json({ message: "Successfully logged in!", token });
});

export default router;
