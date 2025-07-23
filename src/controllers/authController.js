import { responseClient } from "../middleware/responseClient.js";
import {
  createNewUser,
  getUserByEmail,
  updateUser,
} from "../models/user/UserModel.js";
import {
  createNewSession,
  deleteManySessions,
  deleteSession,
  getSessionWithAssociationAndDeleteSession,
} from "../models/session/SessionModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import {
  passwordResetOTPNotificationEmail,
  useActivatedNotificationEmail,
  userActivationUrlEmail,
  userProfileUpdatedNotificationEmail,
} from "../services/email/emailService.js";
import { getJwts } from "../utils/jwt.js";
import { generateRandomOTP } from "../utils/randomGenerator.js";

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

export const activateUser = async (req, res, next) => {
  try {
    const { sessionId, t } = req.body;

    const session = await deleteSession({
      _id: sessionId,
      token: t,
    });

    if (session?._id) {
      // update user to active
      const user = await updateUser(
        { email: session.association },
        { status: "active" }
      );

      if (user?._id) {
        // send email notification

        useActivatedNotificationEmail({ email: user.email, name: user.fName });

        const message = "Your account has been activated, you may log in now!";
        return responseClient({ req, res, message });
      }
    }

    const message = "Invalid link or token expired!";
    const statusCode = 400;
    responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // get user by email
    const user = await getUserByEmail(email);

    if (user?._id) {
      // compare password
      const isPassMatch = comparePassword(password, user?.password);

      if (isPassMatch) {
        // create jwts
        const jwts = await getJwts(user.email);

        // respond jwts
        responseClient({
          req,
          res,
          message: "Login successfull",
          payload: jwts,
        });
      }
    }

    const message = "Invalid login credentials!";
    const statusCode = 401;
    responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    // get the token
    // udpate refreshJWT to ""
    const { email } = req.userInfo;
    await updateUser({ email }, { refreshJWT: "" });

    // remove the accessJWT from the session table
    await deleteManySessions({ association: email });

    responseClient({ req, res, message: "You are logged out!" });
  } catch (error) {
    next(error);
  }
};

export const generateOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    // get user by email
    const user = typeof email === "string" ? await getUserByEmail(email) : null;

    if (user?._id) {
      // generate otp
      const otp = generateRandomOTP();

      console.log(otp);
      // store in session table
      const session = await createNewSession({
        token: otp,
        association: email,
        default: new Date(Date.now() + 15 * 60 * 1000), // 15 min
        expires: 0,
      });

      if (session?._id) {
        // send otp to user email
        const info = await passwordResetOTPNotificationEmail({
          email,
          name: user.email,
          otp,
        });

        console.log(info);
      }
    }

    responseClient({ req, res, message: "OTP sent to your email" });
  } catch (error) {
    next(error);
  }
};

export const resetNewPassword = async (req, res, next) => {
  try {
    const { email, password, otp } = req.body;

    // check in the session table
    const session = await getSessionWithAssociationAndDeleteSession({
      token: otp,
      association: email,
    });

    if (session?._id) {
      // encrypt the password
      const hashPass = hashPassword(password);

      // update the user table
      const user = await updateUser({ email }, { password: hashPass });

      if (user?._id) {
        // send email notification
        await userProfileUpdatedNotificationEmail({
          name: user.fName,
          email,
        });

        return responseClient({
          req,
          res,
          message:
            "Your password has been updated successfully, you may login now!",
        });
      }
    }

    responseClient({
      req,
      res,
      statusCode: 400,
      message: "Invalid data or token is expired!",
    });
  } catch (error) {
    next(error);
  }
};
