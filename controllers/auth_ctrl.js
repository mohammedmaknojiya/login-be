const Jwt = require("jsonwebtoken");

const { User } = require("../models/auth_model");

const jwtKey = "auth-login-token";

const addUser = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = new User({
      ...userData,
    });
    const result = await newUser.save();

    Jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        return res.send({
          message: "something went wrong. please try again after sometime",
        });
      } else {
        return res.status(201).json({ data: result, authToken: token });
      }
    });
  } catch (err) {
    return res.send({ message: "unable to signup" });
  }
};

const getUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email && password) {
      const userData = await User.findOne({ email, password }).select(
        "-password"
      );
      if (userData) {
        Jwt.sign({ userData }, jwtKey, { expiresIn: "1h" }, (err, token) => {
          if (err) {
            return res.send({
              message: "something went wrong. please try again after sometime",
            });
          } else {
            return res.status(200).json({ data: userData, authToken: token });
          }
        });
      } else {
        return res.status(404).send({ message: "unable to find user" });
      }
    } else {
      return res
        .status(404)
        .send({ message: "please enter correct credential" });
    }
  } catch (err) {
    return res.send({ message: "something went wrong." });
  }
};

exports.addUser = addUser;
exports.getUser = getUser;
