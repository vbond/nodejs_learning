import express from "express";
import validator from "../schema/schema.js";
import { _update, _delete, _create, _autosuggest, _read } from "../controllers/userController.js";
import { _checkToken } from "../controllers/authController.js";
import logger from "../logger/logger.js";

const router = express.Router();

router.use((req, res, next) => {
	logger.info("req.method=" + req.method);
	logger.info("req.url=" + req.url);
	logger.info("req.body=" + JSON.stringify(req.body));
	next();
}, 
_checkToken
);
//read
router.get("/:id", _read);

//autosuggest
router.get("/:login/:limit", _autosuggest);

//create
router.post("/", validator, _create);

//delete
router.delete("/:id", _delete);

//update
router.put("/:id", validator, _update);

export default router;
