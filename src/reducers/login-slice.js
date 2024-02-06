import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  logged_in_success: false,
  show_component: "", // new, existing , "",
  email: "",
};

export const LoginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    GET_USER_DETAILS: (state, action) => {
      // console.log("login-status", action.payload);
      return { ...state, ...action.payload };
    },
    LOGOUT: (state) => {
      return initialState;
    },
    login_SET_USER_STATUS: (state, { payload }) => {
      console.log("login-status", payload);
      return { ...state, show_component: payload.show_component, email: payload.email };
    },
  },
});

export const { GET_USER_DETAILS, LOGOUT, login_SET_USER_STATUS } = LoginSlice.actions;

export default LoginSlice.reducer;
