const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    destination: { type: String, required: true },
    number_of_travellers: { type: Number, required: true },
    budget_cost: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = { PostModel };
