import jwt from "jsonwebtoken";
import _ from "lodash";
import { Users } from "@models/index";

const secretKey = process.env.SECRET_KEY as string;

// Function to create a token
export function create(payload: object, expiresIn: string) {
  return jwt.sign(payload, secretKey, { expiresIn });
}

// Function to verify and renew the token if expired
export async function verifyAndRenew(token: string) {
  try {
    const decodedToken = jwt.verify(token, secretKey) as jwt.JwtPayload;

    if (decodedToken.tokenType != "refreshToken")
      return { error: "Invalid Token" };

    const user = await Users.findById(decodedToken.user._id, {
      email: 1,
      name: 1,
      package: 1,
    });

    console.log({ user });

    if (user) {
      const newToken = create({ user, tokenType: "accessToken" }, "1h");
      return {
        renewed: true,
        accessToken: newToken,
      };
    }

    return { renewed: false };
  } catch (error) {
    return {
      error: "Invalid Token",
    };
  }
}

export function verify(token: string) {
  try {
    const decodedToken = jwt.verify(token, secretKey) as jwt.JwtPayload;

    if (decodedToken.tokenType != "accessToken") {
      return { error: "Invalid or expired token" };
    }

    return { payload: _.omit(decodedToken, ["exp", "iat"]) };
  } catch (error) {
    return { error: "Invalid or expired token" };
  }
}
