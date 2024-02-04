import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    _id: "",
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    image: "",
    bio: "",
    token: "",
  },
  loading: false,
  error: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    registerSuccessfuly: (state, { payload }) => {
      const {
        username,
        token,
        password,
        email,
        firstName,
        lastName,
        image,
        bio,
      } = payload;
      state.user.username = username;
      state.user.password = password;
      state.user.email = email;
      state.user.firstName = firstName;
      state.user.lastName = lastName;
      state.user.image = image;
      state.user.bio = bio;
      state.user.token = token;
    },
    loginSuccessfully: (state, { payload }) => {
      state.loading = false;
      state._id = payload.user._id;
      state.user.firstName = payload.user.firstName;
      state.user.lastName = payload.user.lastName;
      state.user.bio = payload.user.bio;
      state.user.email = payload.user.email;
      state.user.token = payload.token;
      state.user.image = payload.user.image;
    },
    logoutSuccessfully: (state) => {
      state.user.email = "";
      state.user.token = "";
      state.user.image = "";
    },
  },
});

export const {
  fetchStart,
  loginSuccessfully,
  fetchFail,
  registerSuccessfuly,
  logoutSuccessfully,
} = authSlice.actions;

export default authSlice.reducer;
