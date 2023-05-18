import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Descriptions,
  Drawer,
  Form,
  Input,
  InputNumber,
  Space,
  message,
} from "antd";
import dayjs from "dayjs";
import services from "../../framework/request";

const BookAdd = ({ open, onClose, getBook }) => {
  const [form] = Form.useForm();

  const handAdd = () => {
    form
      .validateFields()
      .then(async (data) => {
        const param = {
          name: data.name,
          author: data.author,
          desc: data.desc,
          type: data.type,
          word_count: data.word_count,
          profile: JSON.stringify({
            publish_time: dayjs(data.publish_time).format("x"),
            click: 0,
            collect: 0,
          }),
        };
        const res = await services.post("/api/book/add", param);
        if (res.success) {
          message.success(res.message);
        } else {
          message.warning(res.message);
          form.resetFields();
        }
        getBook();
        onClose();
      })
      .catch((err) => message.error(err));
  };
  return (
    <Drawer
      destroyOnClose={true}
      width={1200}
      title={"添加图书"}
      open={open}
      onClose={onClose}
      extra={
        <Space>
          <Button onClick={onClose} danger>
            取消
          </Button>
          <Button onClick={handAdd} type="primary">
            添加
          </Button>
        </Space>
      }
    >
      <Form preserve={false} form={form} layout="vertical">
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name={"name"}
          label={"书名"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name={"author"}
          label={"作者"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"publish_time"}
          label={"出版日期"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item name={"word_count"} label={"总字数"}>
          <InputNumber />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name={"type"}
          label={"类别"}
        >
          <Input />
        </Form.Item>
        <Form.Item name={"desc"} label={"内容介绍"}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default BookAdd;
