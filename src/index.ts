import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import todo from "./routes/todos_routes";
import * as dotenv from "dotenv";
import { logMiddleware } from "./middlewares/logMiddleware";

dotenv.config();
const mongoURI = process.env.MONGO_URI;

const app = express();
app.use(bodyParser.json(), logMiddleware);

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoURI!)
  .then((connection) => {
    console.log("Connected to the server successfully");
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", todo);
