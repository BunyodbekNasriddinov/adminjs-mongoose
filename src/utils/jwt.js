import jwt from "jsonwebtoken";

export default {
  sign: (payload) => jwt.sign(payload, "apple"),
  verify: (token) => jwt.verify(token, "apple"),
};
