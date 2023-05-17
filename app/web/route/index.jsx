import React from 'react';
import { Route, Routes } from 'react-router';
import Book from '../component/Book';
import User from '../component/User';
import Class from '../component/Class';
import Layout from '../component/Layout';
import Page404 from '../component/404';


export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route element={<User />} path='/' />
        <Route element={<Book />} path='/book' />
        <Route element={<Class />} path='/class' />
        <Route element={<Page404 />} path='*' />
        {/* <Route element={<Subscribe />} path="/" />
        <Route element={<Account />} path="/account" />
        <Route element={<Install />} path="/install" />
        <Route element={<CreateSubscribe />} path="/create" />
        <Route element={<Page404 />} path="*" /> */}
      </Route>
    </Routes>
  );
}
