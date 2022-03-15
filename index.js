const mongoose = require("mongoose");
const express = require("express");
const Jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

const jwtKey = "auth-login-token";

const auth_routes = require("./routes/auth_routes");
const sch_routes = require("./routes/sch_routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  return next();
});

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"]; //key name can be any
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        return res.status(401).send({ message: "please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    return res.status(403).send({ message: "please add token with header" });
  }
};

app.use("/auth", auth_routes);

app.use("/sch", verifyToken, sch_routes);

const port = process.env.PORT || 3001;

mongoose
  .connect("mongodb://localhost:27017/login-db")
  .then(() => {
    console.log("Connected to Database");
    // console.log(process.env.JWT_KEY);
    app.listen(port, () => console.log("callback function while listening"));
  })
  .catch((err) => console.log("Unable to make connection"));
