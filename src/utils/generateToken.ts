import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET || "";

export default function generateUserToken(userId: number) {
  return jwt.sign(
    { userId },
    secret,
    {
      expiresIn: "30d",
    },
  );
};


