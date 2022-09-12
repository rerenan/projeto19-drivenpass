import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";

export default function generateUserToken() {
  return jwt.sign(
    { },
    secret,
    {
      expiresIn: "30d",
    },
  );
};


