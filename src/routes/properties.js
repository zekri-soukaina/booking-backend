import express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandle.js";

// import jwtCheck from "../middleware/advancedAuth.js";
import jwtCheck from "../middleware/auth.js";

import getProperties from "../services/Property/getProperties.js";
import createProperty from "../services/Property/createProperty.js";
import getPropertytById from "../services/Property/getPropertyById.js";
import updatePropertyById from "../services/Property/updatePropertyById.js";
import deletePropertyById from "../services/Property/deletePropertyById.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { location, pricePerNight } = req.query;
    const properties = await getProperties(location, pricePerNight);
    res.status(200).json(properties);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("something went wrong while getting list of properties");
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const property = await getPropertytById(id);
      if (!property) {
        res.status(404).json({ message: "Property not found" });
      } else {
        res.status(200).json(property);
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
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
    } = req.body;
    if (
      !title ||
      !description ||
      !location ||
      !pricePerNight ||
      !bedroomCount ||
      !bathRoomCount ||
      !maxGuestCount ||
      !hostId
    ) {
      res.status(400).send({ message: "missing data!" });
    } else {
      const newProperty = await createProperty(
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId
      );
      if (!newProperty) {
        res.status(404).send({ message: "property does not exist" });
      } else {
        res.status(201).send({
          message: `Property successfully created`,
          newProperty,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong while creating an property");
  }
});

router.put(
  "/:id",
  jwtCheck,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId,
      } = req.body;

      const updateproperty = await updatePropertyById(
        id,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId
      );
      if (!updateproperty) {
        res.status(404).send({
          message: `property with ${id} not found`,
        });
      } else {
        res.status(200).send({
          message: `Property with id ${id} successfully updated`,
          updateproperty,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Somthing went wrong while updating the property",
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
      const deleteProperty = await deletePropertyById(id);
      if (!deleteProperty) {
        res.status(404).json({
          message: `Property with id ${id},  not found.`,
        });
      } else {
        res.status(200).json({
          message: `Property with id ${deleteProperty} successfully deleted.`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  // notFoundErrorHandler
);

export default router;
