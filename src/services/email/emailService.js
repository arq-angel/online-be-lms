import { userActivationUrlEmailTemplate } from "./emailTemplate.js";
import { emailTransporter } from "./transport.js";

export const userActivationUrlEmail = async (obj) => {
  const transporter = emailTransporter();
  const info = await transporter.sendMail(userActivationUrlEmailTemplate(obj));

  return info.messageId;
};
