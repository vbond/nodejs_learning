import express from "express";
import validator from "../schema/schema.js";
import { _update, _delete, _create, _autosuggest, _read } from "../controllers/userController.js";


const router = express.Router();

//read
router.get("/user/:id", _read);

//autosuggest
router.get("/users/:login/:limit", _autosuggest);

//create
router.post("/user", validator, _create);

//delete
router.delete("/user/:id", _delete);

//update
router.put("/user/:id", validator, _update);

export default router;
