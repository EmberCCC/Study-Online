import { Input } from "antd";
import { setCookie } from "../../util/dataTool";
import React, { useEffect, useState } from "react";
import services from "../../framework/request";

const Header = () => {
  const [data, setData] = useState({});
  const getInfo = async () => {
    try {
      const res = await services.get("/api/user/self");
      if (res.success) {
        console.log(res.data);
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div className="flex flex-row text-white justify-between w-full">
      <div className="flex flex-row text-white space-x-4">
        <div className="font-bold text-center">
          MeetStudy &nbsp;&nbsp;在线学习平台
        </div>
        <div className="flex flex-row space-x-4 font-light">
          <div>用户</div>
          <div>名师</div>
          <div>领域</div>
          <div>论坛</div>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-4">
        <Input.Search placeholder="搜索...." />
        <div className="w-fit">Hello,{data.username}</div>
      </div>
    </div>
  );
};

export default Header;
