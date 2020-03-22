import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter.js";
import loginRouter from "./routers/loginRouter.js";
import logger from "./logger/logger.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

const whitelist = ['http://example1.com', 'http://example2.com'];
const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
};
app.use(cors(corsOptions));

app.use('/user', userRouter);
app.use('/login', loginRouter);

process
.on('unhandledRejection', (reason, p) => {
	logger.error('Unhandled Rejection at Promise');
})
.on('uncaughtException', (err) => {
	logger.error('Uncaught Exception thrown');
	process.exit(1);
});

app.listen(3000, () => {
	logger.info("Hometask4 app listening on port 3000!");
});
