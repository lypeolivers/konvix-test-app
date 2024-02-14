import React from "react";

import { Form, Input, Button, Checkbox, Flex } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      const res = await api.post("login", values);
      localStorage.setItem("token", res.data.token);

      window.location.replace("/");

      return res.data;
    } catch (error: any) {
      console.log("error:", error.message);
    }
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleLogin}
      >
        <Title>Sistema de Vendas</Title>
        <Form.Item
          name="des_email"
          rules={[
            {
              required: true,
              message: "E-mail obrigatório!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
          />
        </Form.Item>
        <Form.Item
          name="des_senha"
          rules={[
            {
              required: true,
              message: "Senha obrigatório!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
