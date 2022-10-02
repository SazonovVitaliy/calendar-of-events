import Event from "../pages/Event";
import Login from "../pages/Login";
import { EVENT_ROUTE, LOGIN_ROUTE } from "./../utils/const";

export interface IRoute {
  path: string;
  Element: React.ComponentType;
}

export const publicRoutes: IRoute[] = [
  {
    path: LOGIN_ROUTE,
    Element: Login,
  },
];
export const privateRoutes: IRoute[] = [
  {
    path: EVENT_ROUTE,
    Element: Event,
  },
];
