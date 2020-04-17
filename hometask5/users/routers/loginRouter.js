import express from "express";
import { _login } from "../controllers/authController.js";
import logger from "../logger/logger.js";

const router = express.Router();

router.post("/", _login);

export default router;
