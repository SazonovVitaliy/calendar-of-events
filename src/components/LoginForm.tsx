import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { FC } from "react";
import { rules } from "../utils/rules";
import { useDispatch } from "react-redux";
import { authActions } from "../store/slices/authSlice/authSlice";
import { IUser } from "../models/IUser";
import { useAppSelector } from "../hooks/redux";
import UserService from "../api/UserService";

const LoginForm: FC = () => {
  const [user, setUser] = useState<IUser>({ username: "", password: "" });
  const { error } = useAppSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const { login } = authActions;

  const submit = async () => {
    const response = await UserService.getUsers();
    const mockUser = await response.data.find(
      (u) => u.username === user.username && u.password === user.password
    );
    if (mockUser !== undefined) {
      dispatch(login(user));
    } else {
      alert(error);
    }
  };

  return (
    <Form onFinish={submit}>
      <Form.Item
        label="Имя пользователя"
        name="username"
        rules={[rules.required("Пожалуйста введите имя пользователя!")]}
      >
        <Input
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[rules.required("Пожалуйста введите пароль!")]}
      >
        <Input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type={"password"}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
