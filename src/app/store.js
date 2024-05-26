import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../data/userSlice";
import propertiesReducer from "../data/propertySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    properties: propertiesReducer,
  },
});
