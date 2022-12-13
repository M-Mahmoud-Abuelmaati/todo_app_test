import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

const Todos = mongoose.model("Todos", TodoSchema);

export default Todos;
