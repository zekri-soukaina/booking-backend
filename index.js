import * as Sentry from "@sentry/node";
import "./instrument.js";

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import loginRouter from "./src/routes/login.js";
import usersRouter from "./src/routes/users.js";
import reviewsRouter from "./src/routes/reviews.js";
import amenitiesRouter from "./src/routes/amenities.js";
import propertiesRouter from "./src/routes/properties.js";
import hostsRouter from "./src/routes/hosts.js";
import bookingsRouter from "./src/routes/bookings.js";

import log from "./src/middleware/logMiddleware.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

//  Global middleware
app.use(express.json());
app.use(cors()); // Allows all origins
// app.use(cors({ origin: 'https://yourdomain.com' }));

app.use(log);

app.get("/", function rootHandler(req, res) {
  res.end(
    "Find the Perfect Stay" +
      "Explore unique stays hosted by amazing people around the world."
  );
});

// Routes
app.use("/login", loginRouter);

app.use("/users", usersRouter);
app.use("/reviews", reviewsRouter);
app.use("/amenities", amenitiesRouter);
app.use("/properties", propertiesRouter);
app.use("/hosts", hostsRouter);
app.use("/bookings", bookingsRouter);

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(port, () => {
  console.log(`the server is listening to port ${port}`);
});
