import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import groupRouter from "./routers/groupRouter.js";

dotenv.config();

const app = express();
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use('/group', groupRouter);

process
.on('unhandledRejection', (reason, p) => {
	console.error('Unhandled Rejection at Promise:', p, 'reason:', reason);
})
.on('uncaughtException', (err) => {
	console.error('Uncaught Exception thrown', err);
	process.exit(1);
});

app.listen(process.env.PORT, () => {
	console.info("Hometask5 group app listening on port 3002!");
});
