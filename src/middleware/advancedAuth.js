// The jwtCheck middleware, on the other hand, is used to protect routes by verifying tokens

import { auth } from "express-oauth2-jwt-bearer";
import logger from "../utils/log.js";

const jwtCheckAuth = auth({
  audience: "https://my-booking-api.com",
  issuerBaseURL: "https://dev-saa4brqcj1js0gi8.eu.auth0.com/",
  tokenSigningAlg: "RS256",
});

const jwtCheck = (req, res, next) => {
  jwtCheckAuth(req, res, (err) => {
    if (err) {
      logger.error("JWT check failed:", err);
      return res.status(err.status).json({ message: err.message });
    }
    logger.info("JWT check succeeded for user:", req.user);
    next();
  });
};
export default jwtCheck;
