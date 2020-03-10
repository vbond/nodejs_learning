import express from "express";
import bodyParser from "body-parser";
import router from "./routers/userRouter.js";
import logger from "./logger/logger.js";


const app = express();
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use('/', router);

process
.on('unhandledRejection', (reason, p) => {
	logger.error('Unhandled Rejection at Promise');
})
.on('uncaughtException', (err) => {
	logger.error('Uncaught Exception thrown');
	process.exit(1);
});

app.listen(3000, () => {
	logger.info("Hometask3 app listening on port 3000!");
});
