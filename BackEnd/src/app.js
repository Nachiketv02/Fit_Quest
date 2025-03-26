const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db/db");
const userRouter = require("./routes/user.route");
const adminRouter = require("./routes/admin/admin.route");

connectDB();
require("./automation/removeAdminClasses");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://fit-quest-phi.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/fit-quest/users", userRouter);
app.use("/fit-quest/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;