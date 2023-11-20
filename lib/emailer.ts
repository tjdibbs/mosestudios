import { MailOptions } from "nodemailer/lib/sendmail-transport";

import Handlebars, { compile } from "handlebars";
import { readFileSync } from "node:fs";
import transporter from "@lib/transporter";
import HttpError from "./httpError";

// let register template footer, we are able to include it in all template footer
const footerTemplate = readFileSync("./templates/footer.hbs", "utf8");

// Register the footer and banner template
Handlebars.registerPartial("footer", footerTemplate);

export enum Email {
  REGISTER,
  DELETE,
  CHANGE,
  VERIFY,
  SUPPORT,
  SEND_CODE,
  CONTACT,
  AFFILIATE,
}

export default async function Emailer(
  email: MailOptions["to"],
  type: Email,
  data?: any
) {
  const mailOptions: Partial<MailOptions> = {
    from: "Roshestudios <info@roshestudios.com>",
    to: email,
    sender: "Roshestudios",
  };

  const addHtml = async (template: string) =>
    compile(
      readFileSync("./templates/" + template + ".hbs", { encoding: "utf-8" })
    )(data);

  switch (type) {
    case Email.REGISTER:
      mailOptions.subject = "Roshestudios User Registration";
      mailOptions.html = await addHtml("greetings");
      break;
    case Email.CHANGE:
      mailOptions.subject = "Request For Change Of Password";
      mailOptions.html = await addHtml("password-reset");
      break;
    case Email.SUPPORT:
      mailOptions.subject = `${data.name} Request for a support`;
      mailOptions.html = await addHtml("support");
      break;
    case Email.VERIFY:
      mailOptions.subject = `Email Verification`;
      mailOptions.html = await addHtml("email_verification");
      break;
    case Email.CONTACT:
      mailOptions.subject = "New Request from RosheStudios.com";
      mailOptions.text = `There is a message request from ${data.fullName}, \n\n Email: ${data.email}, \n\n Message: ${data.message} \n\n Brand Name: ${data.brandName}`;
      break;
    case Email.AFFILIATE:
      mailOptions.subject = "New Affiliate Form Submitted";
      mailOptions.text = `There is a new Affiliate Form Submitted by ${data.fullName}, \n\n Email: ${data.email}, \n\n Phone: ${data.phone}, \n\n Address: ${data.address}, \n\n Bank name: ${data.bankName} \n\n Bank Account Name: ${data.bankAccountName} \n\n Bank Account Number: ${data.bankAccountNumber},`;
      break;
    default:
      break;
  }

  try {
    // await transporter.verify();
    return await transporter.sendMail(mailOptions);
  } catch (error: any) {
    console.error({ error });
    throw new HttpError(
      "We are unable to complete your request, please you can send a direct email to tech@Roshestudiosng.com about this error"
    );
  }
}
