import React from "react";
import { Descriptions, Drawer } from "antd";

const BookDetail = ({ info, open, onClose }) => {
  const {
    title,
    author,
    publisher,
    year,
    isbn,
    price,
    category,
    description,
    click,
    collect,
  } = info;
  return (
    <Drawer width={1200} title={title} open={open} onClose={onClose}>
      <Descriptions title="图书详情" bordered>
        <Descriptions.Item label="书号">{isbn}</Descriptions.Item>
        <Descriptions.Item label="书名">{title}</Descriptions.Item>
        <Descriptions.Item label="作者">{author}</Descriptions.Item>
        <Descriptions.Item label="出版社">{publisher}</Descriptions.Item>
        <Descriptions.Item label="出版日期" span={2}>
          {year}
        </Descriptions.Item>
        <Descriptions.Item label="价格">$ {price}</Descriptions.Item>
        <Descriptions.Item label="类别" span={2}>
          {category}
        </Descriptions.Item>
        <Descriptions.Item label="内容介绍" span={3}>
          {description}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default BookDetail;
