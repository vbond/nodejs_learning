import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter.js";
import loginRouter from "./routers/loginRouter.js";
import logger from "./logger/logger.js";
import cors from "cors";
import { corsOptions } from "./controllers/authController.js";

const app = express();
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(cors(corsOptions));

app.use('/user', userRouter);
app.use('/login', loginRouter);

app.use((err, req, res, next) => {
	logger.error("req.method=" + req.method);
	logger.error("req.url=" + req.url);
	logger.error("req.body=" + JSON.stringify(req.body));
	logger.error("message=" + err.message);

	logger.error("Error occured! " + err.stack);
	res.status(500).send("Error occured!");
});

process
.on('unhandledRejection', (reason, p) => {
	logger.error('Unhandled Rejection at Promise:', p, 'reason:', reason);
})
.on('uncaughtException', (err) => {
	logger.error('Uncaught Exception thrown', err);
	process.exit(1);
});

app.listen(3000, () => {
	logger.info("Hometask4 app listening on port 3000!");
});
