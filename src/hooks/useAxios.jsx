import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const useAxios = () => {
  const { token } = useSelector((state) => state.auth.user);

  const axiosPublic = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
  });

  const axiosWithToken = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: { Authorization: `Token ${token}` },
  });

  return { axiosPublic, axiosWithToken };
};

export default useAxios;
