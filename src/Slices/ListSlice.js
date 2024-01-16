import { createSlice } from '@reduxjs/toolkit';

let ListSlice = createSlice({
  name: 'List',
  initialState: {
    List: [],
  },
  reducers: {
    getList: (state, action) => {
      state.List = [...action.payload];
    },
    addList: (state, action) => {
      state.List = [...state.List, action.payload];
    },
  },
});
export const { getList, addList } = ListSlice.actions;

export default ListSlice.reducer;
