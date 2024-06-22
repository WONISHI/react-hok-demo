import React from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import CommonTag from "../CommonTag";
const { Content } = Layout;
export default function CommonContent() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <CommonTag></CommonTag>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </Content>
    </>
  );
}
