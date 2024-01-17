import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  logged_in_success: false,
};

export const LoginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    GET_USER_DETAILS: (state, action) => {
      return { ...state, ...action.payload };
    },
    LOGOUT: (state) => {
      return initialState;
    },
  },
});

export const { GET_USER_DETAILS, LOGOUT } = LoginSlice.actions;

export default LoginSlice.reducer;
