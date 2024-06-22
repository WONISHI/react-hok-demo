import React from "react";
import * as Icon from "@ant-design/icons";
import Menuconfig from "../../config";
import type { RouteMune } from "../../config";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { changeTag, setcurrentTag } from "../../store/reduces/tag";


const { Sider } = Layout;
interface CommonAsideProps {
  collapsed: any; // 或者更具体的类型
}
export default function CommonAside({ collapsed }: CommonAsideProps) {
  const iconParse = (name: string) => {
    const IconComponent = (Icon as any)[name] as React.ComponentType<any>;
    return <IconComponent />;
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location=useSelector((state:any)=>state.tag.commonTag)
  const items = Menuconfig.map((item) => {
    if (item.children) {
      return {
        key: item.path,
        icon: iconParse(item.icon),
        label: item.label,
        children: item.children.map((cli:any):any => {
          return {
            key: cli.path,
            icon: iconParse(cli.icon),
            label: cli.label,
          };
        }),
      };
    } else {
      return {
        key: item.path,
        icon: iconParse(item.icon),
        label: item.label,
      };
    }
  });
  const changeMenu = (e: any) => {
    let data: any = {};
    // eslint-disable-next-line
    Menuconfig.map((item: RouteMune) => {
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item;
        if (e.keyPath.length > 1) {
          data = item.children?.find((child) => {
            return child.path === e.key;
          });
        }
      }
    });
    dispatch(
      changeTag({
        path: data.path,
        name: data.name,
        label: data.label,
      })
    );
    dispatch(
      setcurrentTag({
        path: data.path,
        name: data.name,
        label: data.label,
      })
    );
    navigate(e.key);
  };
  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h3 className="menu-title">
          {collapsed ? "后台" : "通用后台管理系统"}
        </h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.path]}
          items={items}
          onClick={changeMenu}
        />
      </Sider>
    </>
  );
}
