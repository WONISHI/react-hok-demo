import React, { useEffect, useState } from "react";
import { Button, Input, Form, Table, message, Popconfirm } from "antd";
import {
  getUserList,
  createUser,
  updateUser,
  deleteUser,
} from "../../api/index";
import CommonModal from "../../components/commonModal";
import "./index.css";

export default function User() {
  const [listData, setlistData] = useState({});
  const [tableData, settableDdata] = useState();
  const [modeType, setmodeType] = useState("");
  const [isModalOpen, setisModalOpen] = useState(false);
  const [currentRow, setcurrentRow] = useState({});
  const defaultModel = (type: string, open: boolean, row?: any) => {
    setmodeType(type);
    setisModalOpen(open);
    if (type === "edit" && open) {
      let currentRowData: any = JSON.parse(JSON.stringify(row));
      setcurrentRow(currentRowData);
    }
  };
  const onConfirm = (type: string, val: any, id?: string) => {
    if (type === "add") {
      createUser(val)
        .then(({ data }) => {
          message.success(data.data.message);
          getUserlist();
          defaultModel(type, false);
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      updateUser({ ...val, id })
        .then(({ data }) => {
          message.success(data.data.message);
          getUserlist();
          defaultModel(type, false);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  const handlerFinish = (val: any) => {
    setlistData({name:val.keyword})
  };
  const handlerDelete = (row: any) => {
    deleteUser({ id: row.id }).then(({ data }) => {
      message.success(data.message);
      getUserlist();
    });
  };
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
    },
    {
      title: "性别",
      dataIndex: "sex",
      render: (val: number) => {
        return val ? "女" : "男";
      },
    },
    {
      title: "出生日期",
      dataIndex: "birtch",
    },
    {
      title: "地址",
      dataIndex: "addr",
    },
    {
      title: "操作",
      render: (row: any) => {
        return (
          <div className="flex-btn">
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => defaultModel("edit", true, row)}
            >
              编辑
            </Button>
            <Popconfirm
              placement="top"
              title="提升"
              description="此操作将删除该用户，是否继续"
              okText="确认"
              cancelText="取消"
              onConfirm={() => handlerDelete(row)}
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const getUserlist = () => {
    getUserList(listData).then(({ data }) => {
      settableDdata(data.list);
    });
  };
  useEffect(() => {
    getUserlist();
    // eslint-disable-next-line
  }, [listData]);
  return (
    <div className="user-content">
      <div className="search-contnet">
        <Button type="primary" onClick={() => defaultModel("add", true)}>
          +新增
        </Button>
        <div className="search-btn">
          <Form layout="inline" onFinish={handlerFinish}>
            <Form.Item name="keyword">
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                搜索
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="table-content">
        <Table columns={columns} dataSource={tableData} rowKey="id" />
      </div>
      <CommonModal
        type={modeType}
        isModalOpen={isModalOpen}
        onClose={defaultModel}
        onConfirm={onConfirm}
        currentRow={currentRow}
      ></CommonModal>
    </div>
  );
}
