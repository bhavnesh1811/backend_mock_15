const express = require("express");
require("dotenv").config();
const { connection } = require("./Configs/db");
const { PostRouter } = require("./Routes/Post.Route");
const cors=require("cors");

const server = express();
server.use(express.json());

server.use(cors({
  origin:"*"
}))

server.get("/", (req, res) => {
  res.status(200).send("Api is working Fine");
});

server.use("/posts", PostRouter);

server.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Not Connected to DB");
  }
  console.log(`Server is running on port ${process.env.PORT}`);
});
