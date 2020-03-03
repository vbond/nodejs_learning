import express from "express";
import validator from "../schema/schema.js";
import controller from "../controllers/userController.js";


const router = express.Router();

//read
router.get("/user/:id", controller.read);

//autosuggest
router.get("/users/:login/:limit", controller.autosuggest);

//create
router.post("/user", validator, controller.create);

//delete
router.delete("/user/:id", controller.delete);

//update
router.put("/user/:id", validator, controller.update);

module.exports = router;
