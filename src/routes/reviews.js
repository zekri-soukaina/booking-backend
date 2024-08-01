import express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandle.js";

// import jwtCheck from "../middleware/advancedAuth.js";
import jwtCheck from "../middleware/auth.js";

import getReviews from "../services/Review/getReviews.js";
import getReviewById from "../services/Review/getReviewById.js";
import createReview from "../services/Review/createReview.js";
import updateReviewById from "../services/Review/updateReviewById.js";
import deleteReviewById from "../services/Review/deleteReviewById.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong while getting list of reviews");
  }
});

router.get(
  "/:id",
  async (req, res) => {
    const { id } = req.params;
    const review = await getReviewById(id);
    if (!review) {
      res.status(404).json({ message: "Review not found" });
    } else {
      res.status(200).json(review);
    }
  }
  // notFoundErrorHandler
);

router.post("/", jwtCheck, async (req, res) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    if (!userId || !propertyId || !rating || !comment) {
      res.status(400).send({ message: "missing data!" });
    } else {
      const newReview = await createReview(userId, propertyId, rating, comment);

      if (!newReview) {
        res.status(404).send({
          message: `Review doesnot exist`,
        });
      } else {
        res.status(201).send({
          message: `Review successfully created`,
          newReview,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong while creating a review");
  }
});

router.put(
  "/:id",
  jwtCheck,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId, propertyId, rating, comment } = req.body;
      const updatedReview = await updateReviewById(
        id,
        userId,
        propertyId,
        rating,
        comment
      );
      if (!updatedReview) {
        res.status(404).send({ message: `review with id ${id} not found` });
      } else {
        res.status(200).send({
          message: `Review with id ${id} successfully updated`,
          updatedReview,
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
      const deletedReviewId = await deleteReviewById(id);
      if (!deletedReviewId) {
        res.status(404).json({
          message: `Review with the id ${id}, not found.`,
        });
      } else {
        res.status(200).json({
          message: `Review with the id ${deletedReviewId} successfully deleted.`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  // notFoundErrorHandler
);

export default router;
