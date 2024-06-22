import React, { useEffect } from "react";
import dayjs from "dayjs";
import { Modal, Form, Input, Select, DatePicker, InputNumber } from "antd";
interface CommonModalProps {
  type: string;
  isModalOpen: boolean;
  currentRow: any;
  onClose?: (type: string, open: boolean) => void;
  onConfirm?: (type: string, val: any,id?:string) => void;
}
export default function CommonModal({
  type,
  isModalOpen,
  onClose,
  onConfirm,
  currentRow,
}: CommonModalProps) {
  const [form] = Form.useForm();
  const handleCancel = () => {
    onClose?.(type, false);
    form.resetFields();
  };
  const handleOk = () => {
    form.validateFields().then((val) => {
      val.birth = dayjs(val.birtch).format("YYYY-MM-DD");
      onConfirm?.(type, val, currentRow.id);
      form.resetFields();
    });
  };
  useEffect(() => {
    currentRow.birth = dayjs(currentRow.birch);
    form.setFieldsValue(currentRow);
  }, [currentRow]);
  return (
    <>
      <Modal
        title={type === "add" ? "新增用户" : "编辑用户"}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        cancelText="取消"
        okText="确定"
      >
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
          form={form}
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="年龄"
            name="age"
            rules={[
              { required: true, message: "请输入年龄" },
              { type: "number", message: "年龄必须是数字" },
            ]}
          >
            <InputNumber min={1} max={100} placeholder="请输入年龄" />
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            rules={[{ required: true, message: "请输入性别" }]}
          >
            <Select placeholder="请选择性别">
              <Select.Option value={1}>男</Select.Option>
              <Select.Option value={0}>女</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="出生日期"
            name="birth"
            rules={[{ required: true, message: "请选择出生日期" }]}
          >
            <DatePicker placeholder="请选择" format="YYYY/MM/DD" />
          </Form.Item>
          <Form.Item
            label="地址"
            name="addr"
            rules={[{ required: true, message: "请填写地址" }]}
          >
            <Input placeholder="请填写地址" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
