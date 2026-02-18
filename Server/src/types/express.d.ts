import { IUser } from "../models/user.model"; // adjust path

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}