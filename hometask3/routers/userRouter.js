import express from "express";
import validator from "../schema/schema.js";
import { _update, _delete, _create, _autosuggest, _read } from "../controllers/userController.js";
import logger from "../logger/logger.js";

const router = express.Router();

router.use((req, res, next) => {
	logger.info("req.method=" + req.method);
	logger.info("req.url=" + req.url);
	logger.info("req.body=" + JSON.stringify(req.body));
	next();
});
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

router.use((err, req, res, next) => {
	logger.error("req.method=" + req.method);
	logger.error("req.url=" + req.url);
	logger.error("req.body=" + JSON.stringify(req.body));
	logger.error("message=" + err.message);

	logger.error("Error occured! " + err.stack);
	res.status(500).send("Error occured!");
});

export default router;
