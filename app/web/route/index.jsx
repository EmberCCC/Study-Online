import React from "react";
import { Route, Routes } from "react-router";
import Book from "../component/Book";
import User from "../component/User";
import Class from "../component/Class";
import Layout from "../component/Layout";
import Page404 from "../component/404";
import Login from "../component/Login/login";

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />} path="/console">
        <Route element={<User />} path="/console" />
        <Route element={<Book />} path="/console/book" />
        <Route element={<Class />} path="/console/class" />
        <Route element={<Page404 />} path="*" />
      </Route>
      <Route element={<Login />} path="/login" />
    </Routes>
  );
}
