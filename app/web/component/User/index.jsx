import { Avatar, List, Radio, Tag } from 'antd'
import React, { useState } from 'react'
import { createAvatar } from '@dicebear/core';
import { botttsNeutral } from '@dicebear/collection';

const statEnum = {
  '正常':'success',
  '禁用':'error'
}

const data = [
  {
    id:1,
    role:'manage',
    username:'user1',
    email:'xxx@xxx.com',
    statDisplay:'正常',
    stat:'normal'
  },{
    id:2,
    username:'user2',
    role:'user',
    email:'xxx@xxx.com',
    statDisplay:'正常',
    stat:'normal'
  },{
    id:3,
    username:'user3',
    role:'user',
    email:'xxx@xxx.com',
    statDisplay:'禁用',
    stat:'ban'

  },{
    id:4,
    username:'user4',
    role:'user',
    email:'xxx@xxx.com',
    statDisplay:'禁用',
    stat:'ban'
  },{
    id:5,
    username:'user4',
    role:'user',
    email:'xxx@xxx.com',
    statDisplay:'禁用',
    stat:'ban'
  },{
    id:6,
    username:'user4',
    role:'user',
    email:'xxx@xxx.com',
    statDisplay:'禁用',
    stat:'ban'
  },{
    id:7,
    username:'user4',
    role:'user',
    email:'xxx@xxx.com',
    statDisplay:'禁用',
    stat:'ban'
  }
]

const User = () => {
  const [type,setType] = useState('all');
  const [stat,setStat] = useState('all');
  const filterUser = (data) => {
    return  data.filter(item => stat === 'all' || item.stat === stat).filter(item => type === 'all' || item.role === type)
  }
  return (
    <div>
      <div className='text-xl font-semibold mb-8'>用户管理</div>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row justify-between w-[40%]'>
          <div className='font-semibold text-lg'>用户类型</div>
          <Radio.Group value={type} onChange={(event) => {
            setType(event.target.value)
          }} buttonStyle="solid">
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value="manage">管理员</Radio.Button>
            <Radio.Button value="user">用户</Radio.Button>
          </Radio.Group>
        </div>
        <div className='flex flex-row justify-between w-[40%]'>
          <div className='font-semibold text-lg'>账号状态</div>
          <Radio.Group value={stat} onChange={(event) => setStat(event.target.value)} buttonStyle="solid">
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value="normal">正常</Radio.Button>
            <Radio.Button value="ban">禁用</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div className='mt-4'>
        <div className='text-lg font-semibold'>用户列表</div>
        <List
          dataSource={filterUser(data)}
          renderItem={(item) => {
            const url = createAvatar(botttsNeutral,{
              seed:item.id
            }).toDataUriSync();
            return <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={url} />}
                title={<div className='space-x-4 flex'>
                  <div>{item.username}</div>
                  <Tag>{item.role.toUpperCase()}</Tag>
                </div>}
                description={item.email}
              />
              <Tag color={statEnum[item.statDisplay]}>{item.statDisplay}</Tag>
            </List.Item>
          }}
        />
      </div>
    </div>
  )
}

export default User