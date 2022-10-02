import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Row, Menu } from "antd";
import { LOGIN_ROUTE } from "./../utils/const";
import { useAppSelector } from "../hooks/redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store/slices/authSlice/authSlice";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { isAuth, user } = useAppSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const { logout } = authActions;

  const handleLogout = () => {
    dispatch(logout(false));
  };

  return (
    <Layout.Header>
      <Row justify="end">
        {isAuth ? (
          <>
            <div style={{ color: "white", marginRight: "10px" }}>
              {user.username}
            </div>
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item onClick={handleLogout} key={1}>
                Выйти
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <>
            <Menu
              className="menu"
              theme="dark"
              mode="vertical"
              selectable={false}
            >
              <Menu.Item onClick={() => navigate(LOGIN_ROUTE)} key={1}>
                Логин
              </Menu.Item>
            </Menu>
          </>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
