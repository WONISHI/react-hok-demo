import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme, Image, Dropdown } from "antd";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { collapseMenu } from "../../store/reduces/tab";
import "./index.css";
const { Header } = Layout;
interface CommonHeaderProps {
  collapsed: any; // 或者更具体的类型
}

export default function CommonHeader({ collapsed }: CommonHeaderProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const logout = () => {
    localStorage.removeItem('cookie')
    navigate('/login')
  };
  const setCollapsed = () => {
    dispatch(collapseMenu());
  };
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={() => logout()}>
          退出
        </a>
      ),
    },
  ];
  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed()}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Dropdown menu={{ items }}>
          <Image
            width={200}
            preview={false}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Dropdown>
      </Header>
    </>
  );
}
