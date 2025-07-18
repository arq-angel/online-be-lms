import { responseClient } from "../middleware/responseClient.js";
import { createNewUser } from "../models/user/UserModel.js";
import { createNewSession } from "../models/session/SessionModel.js";
import { hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { userActivationUrlEmail } from "../services/email/emailService.js";

export const insertNewUser = async (req, res, next) => {
  try {
    // to do signup process
    // receive the user data
    // encrypt the password
    const { password } = req.body;
    req.body.password = hashPassword(password);

    // insert user into db
    const user = await createNewUser(req.body);

    if (user?._id) {
      // create an unique user activation link and send to their email
      const session = await createNewSession({
        token: uuidv4(),
        association: user.email,
      });

      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&t=${session.token}`;

        // send this url to their email
        console.log(url);
        const emailId = await userActivationUrlEmail({
          email: user.email,
          url,
          name: user.fName,
        });

        if (emailId) {
          const message =
            "We have sent you an email with activation link. Please check your email and follow the instructions to activate your account.";
          responseClient({ req, res, message });
          return;
        }
      }
    }

    throw new Error("Unable to create an account, try again later.");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "The email already exists for another user, try different email or reset the password";
      error.statusCode = 400;
    }

    next(error);
  }
};
