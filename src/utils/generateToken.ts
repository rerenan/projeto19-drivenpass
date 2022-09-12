import jwt from "jsonwebtoken";

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


