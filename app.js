const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const bodypraser = require("body-parser");
const helmet = require("helmet");
const routes = require("./src/routes/routing");
const errorMiddleware = require("./src/middleware/error");
dotenv.config();  
app.use(cookieparser());
app.use(bodypraser.json());
app.use(bodypraser.urlencoded({ extended: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use((req, res, next) => {
  console.log("requested url is: ", req.url, " and the method is ", req.method);
  next();
});
app.use("/", routes);
app.use(errorMiddleware);
module.exports = app;


