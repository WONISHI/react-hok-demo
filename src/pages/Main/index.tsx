import React from "react";
import CommonAside from "../../components/CommonAside";
import CommonHeader from "../../components/commonHeader";
import CommonContent from "../../components/CommonContent";
import { useSelector } from "react-redux";
import { Layout } from "antd";
import { RouterAuth } from "../../router/routerAuth";

function Main() {
  const collapsed: any = useSelector((state: any) => state.tab.isCollapse);
  return (
    <RouterAuth>
      <Layout>
        <CommonAside collapsed={collapsed} />
        <Layout>
          <CommonHeader collapsed={collapsed} />
          <CommonContent />
        </Layout>
      </Layout>
    </RouterAuth>
  );
}
export default Main;
