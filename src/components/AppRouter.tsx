import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router";
import { EVENT_ROUTE, LOGIN_ROUTE } from "./../utils/const";
import { useAppSelector } from "../hooks/redux";

export const AppRouter = () => {
  const { isAuth } = useAppSelector((state) => state.authReducer);

  return isAuth ? (
    <Routes>
      {privateRoutes.map(({ path, Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
      <Route path="*" element={<Navigate to={EVENT_ROUTE} />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
      <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
    </Routes>
  );
};
