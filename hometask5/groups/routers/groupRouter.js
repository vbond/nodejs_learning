import express from "express";
import { _update, _delete, _create, _read, _readAll } from "../controllers/groupController.js";
import validator from "../schema/schema.js";

const router = express.Router();

//read
router.get("/:id", _read);
router.get("/get/all", _readAll);

//create
router.post("/", validator, _create);

//delete
router.delete("/:id", _delete);

//update
router.put("/:id", validator, _update);

export default router;
