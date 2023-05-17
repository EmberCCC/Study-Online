import { List, Radio } from 'antd'
import React, { useState } from 'react'
import BookDetail from './bookDetail';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const books = [
  {
    title: 'Book 1',
    author: 'Author 1',
    publisher: 'Publisher 1',
    year: 2020,
    isbn: '978-1-123456-78-9',
    price: 19.99,
    category: 'Fiction',
    description: 'Book 1 is a thrilling fiction novel that keeps readers on the edge of their seats.',
    click:Math.floor(Math.random() * (900)) + 100,
    collect:Math.floor(Math.random() * (900)) + 100
  },
  {
    title: 'Book 2',
    author: 'Author 2',
    publisher: 'Publisher 2',
    year: 2018,
    isbn: '978-2-234567-89-0',
    price: 12.99,
    category: 'Mystery',
    description: 'Book 2 is an intriguing mystery novel with unexpected plot twists.',
    click:Math.floor(Math.random() * (900)) + 100,
    collect:Math.floor(Math.random() * (900)) + 100
  },
  {
    title: 'Book 3',
    author: 'Author 3',
    publisher: 'Publisher 3',
    year: 2022,
    isbn: '978-3-345678-90-1',
    price: 24.99,
    category: 'Science Fiction',
    description: 'Book 3 is a captivating science fiction novel set in a futuristic world.',
    click:Math.floor(Math.random() * (900)) + 100,
    collect:Math.floor(Math.random() * (900)) + 100
  }
];


const sort = (data,type) => {
  if(type === 'all') return data
  if(type === 'click') return data.sort((a,b) => b.click - a.click)
  if(type === 'collect') return data.sort((a,b) => b.collect - a.collect)
}

const Book = () => {
  const [rule,setRule] = useState('all')
  const [open,setOpen] = useState(false);
  const [info,setInfo] = useState({})
  const onClose = () => {
    setOpen(false)
  }
  const onOpen = () => {
    setOpen(true)
  }
  return (
    <div>
      <div className='text-xl font-semibold'>图书管理</div>
      <div className='mt-4'>
        <div className='flex flex-row justify-between w-[30%]'>
          <div className='font-semibold text-lg'>图书列表</div>
          <Radio.Group value={rule} onChange={(event) => setRule(event.target.value)} buttonStyle="solid">
            <Radio.Button value="all">综合</Radio.Button>
            <Radio.Button value="click">点击量</Radio.Button>
            <Radio.Button value="collect">收藏量</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div className='mt-4'>
        <List
          dataSource={sort(books,rule)}
          renderItem={(book) => {
            return <List.Item key={book.isbn} onClick={() => {
              setInfo(book);
              onOpen()
            }}>
              <List.Item.Meta
                title={
                  <div>
                    《{book.title}》 - {book.author}
                  </div>
                }
                description={book.isbn}
              />
              <div className='flex space-x-4'>
                <div>点击量：{book.click}</div>
                <div>收藏量：{book.collect}</div>
              </div>
            </List.Item>
          }}
        />
      </div>
      <BookDetail info={info} open={open} onClose={onClose}/>
    </div>
  )
}

export default Book