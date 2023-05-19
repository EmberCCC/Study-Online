import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Modal,
  Select,
  Space,
  message,
} from "antd";
import dayjs from "dayjs";
import services from "../../framework/request";

const CourseDetail = ({ info, open, onClose, user, getUser, getCourse }) => {
  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const { name, start_time, id, teacher_desc, teacher_id } = info;
  const teacherList = user.filter((item) => item.identify === "teacher");
  const handleEdit = () => {
    if (edit) {
      form
        .validateFields()
        .then(async (data) => {
          const param = {
            id: data.id,
            name: data.name,
            start_time: dayjs(data.start_time),
            teacher_desc: data.teacher_desc,
            teacher_id: data.teacher_id,
            detail: data.detail,
            profile: "{}",
          };
          console.log(param);
          const res = await services.put("/api/course/update", param);
          if (res.success) {
            message.success(res.message);
          } else {
            message.warning(res.message);
            form.resetFields();
          }
        })
        .catch((err) => message.error(err))
        .finally(async () => {
          await getUser();
          getCourse();
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
      Modal.confirm({
        title: "删除课程",
        content: "你确定删除该课程吗，操作无法取消",
        okText: "确定",
        cancelText: "取消",
        okType: "danger",
        onOk: async () => {
          try {
            const res = await services.delete(`/api/course/delete/${id}`);
            if (res.success) {
              message.success(res.message);
            } else {
              message.warning(res.message);
            }
          } catch (error) {
            message.error(error);
          } finally {
            form.resetFields();
            await getUser();
            getCourse();
            onClose();
          }
        },
      });
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
          label={"课程ID"}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={name}
          name={"name"}
          label={"课程名"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={name}
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
          initialValue={teacher_id}
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
          initialValue={teacher_desc}
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
          initialValue={dayjs(Number(start_time))}
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

export default CourseDetail;
