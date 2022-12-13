import mongoose from "mongoose";
import Todos from "../models/todos";
import * as dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGO_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoURI!)
  .then((connection) => {
    console.log("Connected to the server successfully");
  })
  .catch((error) => {
    console.log(error);
  });

const seedTodos = [
  {
    name: "Buy Coffee",
    body: "lorem ipsum dolor sit amet",
    checked: false,
  },
  {
    name: "Play Pedal Today",
    body: "lorem ipsum dolor sit amet",
    checked: false,
  },
  {
    name: "Finish Tasks...",
    body: "lorem ipsum dolor sit amet",
    checked: false,
  },
];

const seedDB = async () => {
  await Todos.deleteMany({});
  await Todos.insertMany(seedTodos);
};

seedDB().then(() => {
  mongoose.connection.close();
});
