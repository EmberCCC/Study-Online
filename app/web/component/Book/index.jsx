import { Button, List, Radio, message } from "antd";
import React, { useEffect, useState } from "react";
import BookDetail from "./bookDetail";
import services from "../../framework/request";
import BookAdd from "./bookAdd";

const sort = (data, type) => {
  if (type === "all") return data;
  if (type === "click")
    return data.sort(
      (a, b) => JSON.parse(b.profile).click - JSON.parse(a.profile).click
    );
  if (type === "collect")
    return data.sort(
      (a, b) => JSON.parse(b.profile).collect - JSON.parse(a.profile).collect
    );
};

const Book = () => {
  const [rule, setRule] = useState("all");
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [info, setInfo] = useState({});
  const [data, setData] = useState([]);
  const getBook = async () => {
    try {
      const res = await services.get("/api/book/list");
      setData(res);
    } catch (error) {
      message.warning(error);
    }
  };
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    getBook();
  }, []);
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="text-xl font-semibold">图书管理</div>
        <Button type="primary" onClick={() => setOpenAdd(true)}>
          添加图书
        </Button>
      </div>
      <div className="mt-4">
        <div className="flex flex-row justify-between w-[30%]">
          <div className="font-semibold text-lg">图书列表</div>
          <Radio.Group
            value={rule}
            onChange={(event) => setRule(event.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="all">综合</Radio.Button>
            <Radio.Button value="click">点击量</Radio.Button>
            <Radio.Button value="collect">收藏量</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div className="mt-4">
        <List
          dataSource={sort(data, rule)}
          renderItem={(book) => {
            return (
              <List.Item
                style={{ cursor: "pointer" }}
                key={book.id}
                onClick={() => {
                  setInfo(book);
                  onOpen();
                }}
              >
                <List.Item.Meta
                  title={
                    <div>
                      《{book.name}》 - {book.author}
                    </div>
                  }
                  description={book.desc}
                />
                <div className="flex space-x-4">
                  <div>点击量：{JSON.parse(book.profile)?.click}</div>
                  <div>收藏量：{JSON.parse(book.profile)?.collect}</div>
                </div>
              </List.Item>
            );
          }}
        />
      </div>
      <BookDetail info={info} open={open} onClose={onClose} getBook={getBook} />
      <BookAdd
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        getBook={getBook}
      />
    </div>
  );
};

export default Book;
