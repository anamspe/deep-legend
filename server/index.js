require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// routes
app.get("/", (req,res) => {
  res.send("Deep Legend backend is up and running!");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server listening at localhost:${PORT}`);
});
