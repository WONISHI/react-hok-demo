import React from "react";
import { Form, Input, Card, Button, message } from "antd";
import { getMenu } from "../../api/index";
import { useNavigate, Navigate } from "react-router-dom";
import "./index.css";

export default function Login() {
  const navigate = useNavigate();
  if (localStorage.getItem("cookie")) {
    return <Navigate to="/home" replace />;
  }
  const submit = (val: any) => {
    if (!val.password || !val.username) {
      return message.open({
        type: "error",
        content: "请输入账号和密码",
      });
    }
    getMenu(val).then(({ data }) => {
      navigate("/home");
      localStorage.setItem("cookie", data.data.token);
    });
  };

  return (
    <div className="login-content">
      <Card style={{ width: "400px" }}>
        <Form onFinish={submit}>
          <Form.Item label="账号" name="username">
            <Input placeholder="请输入账号"></Input>
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password placeholder="请输入密码"></Input.Password>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
