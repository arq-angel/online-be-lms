import {
  userAccountActivatedNotificaionEmail,
  userActivationUrlEmailTemplate,
} from "./emailTemplate.js";
import { emailTransporter } from "./transport.js";

export const userActivationUrlEmail = async (obj) => {
  const transporter = emailTransporter();
  const info = await transporter.sendMail(userActivationUrlEmailTemplate(obj));

  return info.messageId;
};

export const useActivatedNotificationEmail = async (obj) => {
  const transporter = emailTransporter();
  const info = await transporter.sendMail(
    userAccountActivatedNotificaionEmail(obj)
  );

  return info.messageId;
};
