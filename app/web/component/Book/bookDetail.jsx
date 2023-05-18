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

const BookDetail = ({ info, open, onClose, getBook }) => {
  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const { name, author, id, type, desc, word_count, profile } = info;

  const { publish_time, click, collect } = JSON.parse(profile ?? "{}");
  const handleEdit = () => {
    if (edit) {
      form
        .validateFields()
        .then(async (data) => {
          const param = {
            id: id,
            name: data.name,
            author: data.author,
            desc: data.desc,
            type: data.type,
            word_count: data.word_count,
            profile: JSON.stringify({
              click: click,
              collect: collect,
              publish_time: dayjs(data.publish_time).format("x"),
            }),
          };
          const res = await services.put("/api/book/update", param);
          if (res.success) {
            message.success(res.message);
          } else {
            message.warning(res.message);
            form.resetFields();
          }
        })
        .catch((err) => message.error(err))
        .finally(() => {
          getBook();
          setEdit(false);
          onClose();
        });
    } else {
      setEdit(true);
    }
  };
  const handleDel = async () => {
    if (edit) {
      form.resetFields();
      setEdit(false);
    } else {
      try {
        const res = await services.delete(`/api/book/delete/${id}`);
        if (res.success) {
          message.success(res.message);
        } else {
          message.warning(res.message);
        }
      } catch (error) {
        message.error(error);
      } finally {
        form.resetFields();
        getBook();
        onClose();
      }
    }
  };
  return (
    <Drawer
      destroyOnClose={true}
      width={1200}
      title={name}
      open={open}
      onClose={() => {
        onClose();
        setEdit(false);
      }}
      extra={
        <Space>
          <Button onClick={handleDel} danger>
            {edit ? "取消" : "删除"}
          </Button>
          <Button onClick={handleEdit} type="primary">
            {edit ? "保存" : "编辑"}
          </Button>
        </Space>
      }
    >
      <Form preserve={false} form={form} disabled={!edit} layout="vertical">
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={id}
          name={"id"}
          label={"书号"}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          initialValue={name}
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
          initialValue={author}
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
          initialValue={dayjs(Number(publish_time))}
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
        <Form.Item
          initialValue={word_count}
          name={"word_count"}
          label={"总字数"}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          initialValue={type}
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
        <Form.Item initialValue={desc} name={"desc"} label={"内容介绍"}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default BookDetail;
