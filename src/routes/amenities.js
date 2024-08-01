import express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandle.js";

// import jwtCheck from "../middleware/advancedAuth.js";
import jwtCheck from "../middleware/auth.js";

import getAmenities from "../services/Amenity/getAmenities.js";
import createAmenity from "../services/Amenity/createAmenity.js";
import getAmenityById from "../services/Amenity/getAmenityById.js";
import updateAmenityById from "../services/Amenity/updateAmenityById.js";
import deleteAmenityById from "../services/Amenity/deleteAmenityById.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const amenities = await getAmenities();
    res.status(200).json(amenities);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("something went wrong while getting list of Amenities.");
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const amenity = await getAmenityById(id);
      if (!amenity) {
        res.status(404).json({ message: " amenity not found" });
      } else {
        res.status(200).json(amenity);
      }
    } catch (error) {
      next(error);
    }
  }
  // notFoundErrorHandler
);

router.post("/", jwtCheck, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).send({ message: "missing data!" });
    } else {
      const newAmenity = await createAmenity(name);
      if (!newAmenity) {
        res.status(404).send({ message: " Amenity  does not exist" });
      } else {
        res.status(201).send({
          message: `Amenity successfully created`,
          newAmenity,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong while creating an amenity.");
  }
});

router.put(
  "/:id",
  jwtCheck,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updateAmenity = await updateAmenityById(id, name);
      if (!updateAmenity) {
        res.status(404).send({ message: `amenity with id ${id} not found` });
      } else {
        res.status(200).send({
          message: `amenity with id ${id} successfully updated.`,
          updateAmenity,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Somthing went wrong while updating the amenity",
      });
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
      const deleteAmenity = await deleteAmenityById(id);
      if (!deleteAmenity) {
        res.status(404).json({
          message: `Amenity with id ${id} not found.`,
        });
      } else {
        res.status(200).json({
          message: `Amenity with id ${deleteAmenity} successfully deleted.`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  // notFoundErrorHandler
);

export default router;
