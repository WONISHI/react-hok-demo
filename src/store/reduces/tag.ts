import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    routes: [
      {
        path: "/home",
        name: "home",
        label: "首页",
      },
    ],
    commonTag: {},
  },
  reducers: {
    changeTag: (state, { payload: val }) => {
      if (val.name !== "home") {
        let res = state.routes.every((item) => item.name !== val.name);
        if (res) {
          state.routes.push(val);
        }
      }
    },
    setcurrentTag: (state, { payload: val }) => {
      state.commonTag = val;
    },
    closeTag: (state, { payload: val }) => {
      state.routes = state.routes.filter(
        (item: any) => item.name !== val.name
      );
    },
  },
});
export const { changeTag, closeTag, setcurrentTag } = tagSlice.actions;
export default tagSlice.reducer;
