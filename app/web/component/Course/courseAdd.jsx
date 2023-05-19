import React from "react";
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  message,
} from "antd";
import dayjs from "dayjs";
import services from "../../framework/request";

const CourseAdd = ({ open, onClose, user, getUser, getCourse }) => {
  const [form] = Form.useForm();
  const teacherList = user.filter((item) => item.identify === "teacher");
  const handleAdd = async () => {
    form.validateFields().then(async (res) => {
      try {
        const param = {
          name: res.name,
          details: res.detail,
          teacher_desc: res.teacher_desc,
          teacher_id: res.teacher_id,
          start_time: res.start_time,
        };
        const res = await services.post("/api/course/add", param);
        if (res.success) {
          message.success("添加成功");
          form.resetFields();
          getUser();
          getCourse();
          onClose();
        } else {
          message.warning("添加失败");
        }
      } catch (error) {
        message.error(error);
      }
    });
  };
  return (
    <Drawer
      destroyOnClose={true}
      width={1200}
      title={"增加课程"}
      open={open}
      onClose={onClose}
      extra={
        <Space>
          <Button onClick={onClose} danger>
            取消
          </Button>
          <Button onClick={handleAdd} type="primary">
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
          label={"课程名"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name={"detail"}
          label={"课程详情"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name={"teacher_id"}
          label={"教师名"}
        >
          <Select
            options={teacherList.map((item) => {
              return { value: item.id, label: item.username };
            })}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name={"teacher_desc"}
          label={"教师描述"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"start_time"}
          label={"开课时间"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CourseAdd;
