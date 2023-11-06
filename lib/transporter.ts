import nodemailer from "nodemailer";
import keys from "key.json";

const user = process.env.MAIL_USER;
const host = process.env.MAIL_HOST;

// Setting Up For Mailing
export default nodemailer.createTransport({
  host,
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user,
    serviceClient: keys.client_id,
    privateKey: keys.private_key,
  },
});
