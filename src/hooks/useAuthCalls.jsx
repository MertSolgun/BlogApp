import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchFail,
  fetchStart,
  registerSuccessfuly,
  loginSuccessfully,
  logoutSuccessfully,
} from "../features/authSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAuthCalls = () => {
  const { axiosPublic, axiosWithToken } = useAxios();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const register = async (registerInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/users/", registerInfo);
      dispatch(registerSuccessfuly(data));
      toastSuccessNotify("Register successful");
      navigate("/");
    } catch (error) {
      toastErrorNotify("Register failed");
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const login = async (loginInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("/auth/login", loginInfo);
      toastSuccessNotify("Login successful");
      dispatch(loginSuccessfully(data));
      navigate("/");
    } catch (error) {
      toastErrorNotify("Login failed");
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosWithToken("/auth/logout");
      dispatch(logoutSuccessfully());
      toastSuccessNotify("Logged Out");
      navigate("/");
    } catch (error) {
      toastErrorNotify("Logged failed");
      dispatch(fetchFail());
      console.log(error);
    }
  };

  return { register, login, logout };
};

export default useAuthCalls;
