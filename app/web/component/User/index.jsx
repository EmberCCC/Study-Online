import { Avatar, List, Radio, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral } from "@dicebear/collection";
import service from "../../framework/request";

const statEnum = {
  正常: "success",
  禁用: "error",
  1: "正常",
  2: "禁用",
};

const User = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("all");
  const [stat, setStat] = useState("all");
  const getUser = async () => {
    try {
      const res = await service.get("/api/user/list");
      setData(res);
    } catch (error) {
      message.warning(error);
    }
  };
  const filterUser = (data) => {
    return data
      .filter((item) => stat === "all" || item.status === stat)
      .filter(
        (item) =>
          type === "all" ||
          (type === "admin"
            ? item.identify === "admin"
            : item.identify !== "admin")
      );
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <div className="text-xl font-semibold mb-8">用户管理</div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-between w-[40%]">
          <div className="font-semibold text-lg">用户类型</div>
          <Radio.Group
            value={type}
            onChange={(event) => {
              setType(event.target.value);
            }}
            buttonStyle="solid"
          >
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value="admin">管理员</Radio.Button>
            <Radio.Button value="user">用户</Radio.Button>
          </Radio.Group>
        </div>
        <div className="flex flex-row justify-between w-[40%]">
          <div className="font-semibold text-lg">账号状态</div>
          <Radio.Group
            value={stat}
            onChange={(event) => setStat(event.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value={1}>正常</Radio.Button>
            <Radio.Button value={2}>禁用</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-lg font-semibold">用户列表</div>
        <List
          dataSource={filterUser(data)}
          renderItem={(item) => {
            const url = createAvatar(botttsNeutral, {
              seed: item.id,
            }).toDataUriSync();
            return (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src={url} />}
                  title={
                    <div className="space-x-4 flex">
                      <div>{item.username}</div>
                      <Tag>{item.identify.toUpperCase()}</Tag>
                    </div>
                  }
                  description={item.email}
                />
                <Tag color={statEnum[statEnum[item.status]]}>
                  {statEnum[item.status]}
                </Tag>
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
};

export default User;
