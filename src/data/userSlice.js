import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload.user;
    },
    getUser: (state) => state.user,
    logout: (state) => {
      state.user = {};
    },
  },
});

export const { saveUser, getUser, logout } = userSlice.actions;
export default userSlice.reducer;
