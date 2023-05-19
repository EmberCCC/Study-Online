import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import services from "../../framework/request";
import dayjs from "dayjs";
import CourseDetail from "./courseDetail";
import CourseAdd from "./courseAdd";

const Course = () => {
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [openA, setOpenA] = useState(false);
  const column = [
    {
      title: "课程名字",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "开课时间",
      dataIndex: "start_time",
      key: "start_time",
      render: (text, record, index) => dayjs(Number(text)).format("YYYY-MM-DD"),
    },
    {
      title: "课程教师",
      dataIndex: "teacher_id",
      key: "teacher_id",
      render: (text, record, index) =>
        user.filter((item) => item.id === text)[0].username,
    },
  ];
  useEffect(() => {
    getCourse();
  }, []);
  const getUser = async () => {
    try {
      const res = await services.get("/api/user/list");
      setUser(res);
    } catch (error) {
      message.error(error);
    }
  };
  const getCourse = async () => {
    try {
      await getUser();
      const res = await services.get("/api/course/list");
      setData(res);
      console.log(res);
    } catch (error) {
      message.error(error);
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="text-xl font-semibold">课程管理</div>
        <Button type="primary" onClick={() => setOpenA(true)}>
          添加课程
        </Button>
      </div>
      <div className="mt-4">
        <Table
          onRow={(record) => {
            return {
              onClick: (event) => {
                setInfo(record), setOpen(true);
              }, // 点击行
            };
          }}
          rowKey="id"
          columns={column}
          dataSource={data}
        />
      </div>
      <CourseDetail
        open={open}
        onClose={() => setOpen(false)}
        info={info}
        user={user}
        getUser={getUser}
        getCourse={getCourse}
      />
      <CourseAdd
        open={openA}
        onClose={() => setOpenA(false)}
        user={user}
        getUser={getUser}
        getCourse={getCourse}
      />
    </div>
  );
};

export default Course;
