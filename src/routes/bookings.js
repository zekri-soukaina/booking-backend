import express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandle.js";

// import jwtCheck from "../middleware/advancedAuth.js";
import jwtCheck from "../middleware/auth.js";

import getBookings from "../services/Booking/getBookings.js";
import createBooking from "../services/Booking/createBooking.js";
import getBookingtById from "../services/Booking/getBookingById.js";
import updateBookingById from "../services/Booking/updateBookingById.js";
import deleteBookingById from "../services/Booking/deleteBookingById.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const bookings = await getBookings(userId);
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("something went wrong while getting list of Bookings.");
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const booking = await getBookingtById(id);
      if (!booking) {
        res.status(404).json({ message: "booking not found" });
      } else {
        res.status(200).json(booking);
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", jwtCheck, async (req, res) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    if (
      !userId ||
      !propertyId ||
      !checkinDate ||
      !checkoutDate ||
      !numberOfGuests ||
      !totalPrice ||
      !bookingStatus
    ) {
      res.status(400).send({ message: "missing data" });
    } else {
      const newBooking = await createBooking(
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus
      );
      if (!newBooking) {
        res.status(404).send({ message: " Booking does not exist" });
      } else {
        res.status(201).send({
          message: `Booking was successfully created`,
          newBooking,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong while creating an Booking.");
  }
});

router.put(
  "/:id",
  jwtCheck,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      } = req.body;
      const updateBooking = await updateBookingById(
        id,
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus
      );

      if (!updateBooking) {
        res.status(404).send({
          message: `Booking with id ${id} not found.`,
        });
      } else {
        res.status(200).send({
          message: `Booking with id ${id} successfully updated.`,
          updateBooking,
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
      const deleteBooking = await deleteBookingById(id);
      if (!deleteBooking) {
        res.status(404).json({
          message: `Booking with id ${id}, not found.`,
        });
      } else {
        res.status(200).json({
          message: `Booking with id ${deleteBooking} successfully deleted.`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
