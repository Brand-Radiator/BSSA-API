const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRouter = require("./routes/user.routes");
const leadsRouter = require("./routes/msg.routes");
const adminRouter = require("./routes/adminUpload.routes");
app.use(cookieParser());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(leadsRouter);
app.use(adminRouter);

app.use("/", (req, res) => {
  res.send("Welcome to the Server");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  try {
    connectDB();
  } catch (error) {
    console.log("Error while connecting to server", error);
  }

  console.log(`listening on ${port}`);
});
