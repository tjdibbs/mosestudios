export enum STATUS {
  OK = 200,
  CREATED = 201,
  ACCEPTED,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const serverErrors: { [x: number]: string } = {
  500: "INTERNAL_SERVER_ERROR",
  404: "NOT_FOUND",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  400: "BAD_REQUEST",
};

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
export const SECRET_KEY = process.env.SECRET_KEY as string;

console.log({ BASE_URL });

export enum Urls {
  login = "/auth/login",
  register = "/auth/register",
  validateEmail = "/auth/validate-email",
  forgotPassword = "/auth/forgot-password",
  resetPassword = "/auth/reset-password",
  sendCode = "/auth/one-time-password",
}

export const config = {
  baseUrl: BASE_URL,
  urls: Urls,
};

export const appealingMessage =
  "It us, we are working on it... Please check back after 20mins";
