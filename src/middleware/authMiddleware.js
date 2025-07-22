import { responseClient } from "../middleware/responseClient.js";
import {
  createAccessJWT,
  verifyAccessJWT,
  verifyRefreshJWT,
} from "../utils/jwt.js";
import { getSession } from "../models/session/SessionModel.js";
import { getUserByEmail, getOneUser } from "../models/user/UserModel.js";

export const userAuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "";

  // get accessJWT
  if (authorization) {
    const token = authorization.split(" ")[1];

    // check if valid
    const decoded = verifyAccessJWT(token);

    if (decoded.email) {
      // check if exist in session table
      const tokenSession = await getSession(token);

      if (tokenSession?._id) {
        // get user by email
        const user = await getUserByEmail(decoded.email);

        if (user?._id && user.status === "active") {
          // return the user
          req.userInfo = user;
          return next();
        }
      }
    }

    message = decoded === "jwt expired" ? decoded : "Unauthorized";
  }
  responseClient({ req, res, message, statusCode: 401 });
};

export const renewAccessJWTMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";

  // get accessJWT
  if (authorization) {
    const token = authorization.split(" ")[1];

    // check if valid
    const decoded = await verifyRefreshJWT(token);

    if (decoded?.email) {
      // check if exist in session table
      const user = await getOneUser({
        email: decoded.email,
        refreshJWT: token,
      });

      if (user?._id) {
        // create new accessJWT
        const token = await createAccessJWT(decoded.email);
        // return accessJWT
        return responseClient({
          req,
          res,
          message: "Here is the accessJWT",
          payload: token,
        });
      }
    }
  }
  responseClient({ req, res, message, statusCode: 401 });
};
