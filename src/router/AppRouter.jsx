import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NewBlog from "../pages/NewBlog";
import MyBlog from "../pages/MyBlog";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BlogDetail from "../pages/BlogDetail";
import PrivateRouter from "./PrivateRouter";
import NotFound from "../pages/NotFound";
const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/blogs/:id" element={<BlogDetail />}></Route>
        <Route element={<PrivateRouter />}>
          <Route path="/newblog/" element={<NewBlog />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/myblog/" element={<MyBlog />} />
        </Route>
        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
