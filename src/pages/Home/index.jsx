import React, { useEffect, useState } from "react";
import { Col, Row, Card, Image, Table } from "antd";
import * as Icon from "@ant-design/icons";
import { getData } from "../../api/index";
import CommonEcharts from "../../components/commonEcharts";
import "./index.css";

export default function Home() {
  const [tableData, setTableData] = useState([]);
  const [echartData, setechartData] = useState({});
  const columns = [
    {
      title: "课程",
      dataIndex: "name",
    },
    {
      title: "今日购买",
      dataIndex: "todayBuy",
    },
    {
      title: "本月购买",
      dataIndex: "monthBuy",
    },
    {
      title: "总购买",
      dataIndex: "totalBuy",
    },
  ];
  const countData = [
    {
      name: "今日支付订单",
      value: 1234,
      icon: "CheckCircleOutlined",
      color: "#2ec7c9",
    },
    {
      name: "今日收藏订单",
      value: 3421,
      icon: "ClockCircleOutlined",
      color: "#ffb980",
    },
    {
      name: "今日未支付订单",
      value: 1234,
      icon: "CloseCircleOutlined",
      color: "#2ec7c9",
    },
    {
      name: "今日支付订单",
      value: 1234,
      icon: "CheckCircleOutlined",
      color: "#2ec7c9",
    },
    {
      name: "本月收藏订单",
      value: 3421,
      icon: "ClockCircleOutlined",
      color: "#ffb980",
    },
    {
      name: "本月未支付订单",
      value: 1234,
      icon: "CloseCircleOutlined",
      color: "#5ab1ef",
    },
  ];
  useEffect(() => {
    getData().then(({ data }) => {
      const { tableData, orderData, userData, videoData } = data.data;
      setTableData(tableData);
      const order = orderData;
      const xData = order.date;
      const keyArray = Object.keys(order.data[0]);
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: order.data.map((item) => item[key]),
          type: "line",
        });
      });
      setechartData({
        order: {
          xData,
          series,
        },
        user: {
          xData: userData.map((item) => item.date),
          series: [
            {
              name: "新增用户",
              data: userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: userData.map((item) => item.active),
              type: "bar",
            },
          ],
        },
        video: {
          series: {
            data: videoData,
            type: "pie",
          },
        },
      });
    });
  }, []);
  const iconParse = (name) => {
    const IconComponent = Icon[name];
    return <IconComponent />;
  };

  return (
    <div className="home-contents">
      <Row className="home">
        <Col span={8}>
          <Card bordered={true} hoverable={true} className="user">
            <div className="top">
              <Image
                preview={false}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <div className="user-info">
                <span className="account">Admin</span>
                <span>超级管理员</span>
              </div>
            </div>
            <div className="bottom">
              <span>上次登陆时间：2024-5-15</span>
              <span>上次登陆地点：武汉</span>
            </div>
          </Card>
          <Card bordered={true} hoverable={true} className="phone">
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
              rowKey="name"
            />
          </Card>
        </Col>
        <Col span={16}>
          <div className="num-content">
            {countData.map((item, index) => {
              return (
                <Card key={index}>
                  <div className="ion-box" style={{ background: item.color }}>
                    {iconParse(item.icon)}
                  </div>
                  <div className="detail">
                    <span className="font">¥{item.value}</span>
                    <span className="name">{item.name}</span>
                  </div>
                </Card>
              );
            })}
          </div>
          {echartData.order && (
            <CommonEcharts
              chartData={echartData.order}
              style={{ height: "200px" }}
            />
          )}
          <div className="echart-content">
            {echartData.user && (
              <CommonEcharts
                chartData={echartData.user}
                style={{ height: "200px", width: "50%" }}
              />
            )}
            {echartData.user && (
              <CommonEcharts
                chartData={echartData.video} isAxisChart={false}
                style={{ height: "200px", width: "50%" }}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
