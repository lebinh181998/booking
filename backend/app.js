const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user");
const Room = require("./model/room");
const Hotel = require("./model/hotel");
const Transaction = require("./model/transaction");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const userRouter = require("./router/user");
const hotelRouter = require("./router/hotel");
const adminRouter = require("./router/admin");
app.use(userRouter);
app.use(hotelRouter);
app.use(adminRouter);

mongoose
  .connect(
    "mongodb+srv://binhlfx23210:0z0z0z@cluster0.iewp9yb.mongodb.net/booking?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
    console.log("connected");
  })
  .catch((err) => console.log(err));
