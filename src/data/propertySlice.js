import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
};

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    deleteProperty: (state, action) => {
      state.properties = state.properties.filter(
        (property) => property._id !== action.payload._id
      );
    },
    getProperties: (state, action) => {
      state.properties = action.payload;
    },
    updateProperty: (state, action) => {
      state.properties = state.properties.map((prop) =>
        prop._id === action.payload._id ? action.payload : prop
      );
    },
  },
});

export const { deleteProperty, getProperties, updateProperty } =
  propertySlice.actions;
export default propertySlice.reducer;
