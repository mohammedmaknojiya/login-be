const Jwt = require("jsonwebtoken");

const jwtKey = "auth-login-token";

const getSchData = (req, res) => {
  return res.send({
    schData: ["sample", "sample1", "sample2"],
  });
};

exports.getSchData = getSchData;
