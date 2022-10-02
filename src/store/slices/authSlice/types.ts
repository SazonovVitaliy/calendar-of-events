import { IUser } from "../../../models/IUser";

export interface IAuth {
  isAuth: boolean;
  user: IUser;
  error: string;
}
