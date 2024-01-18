import { createSlice } from '@reduxjs/toolkit';

const checkListSlice = createSlice({
  name: 'checkList',
  initialState: {
    checkList: [],
  },
  reducers: {
    getCheckList: (state, action) => {
      state.checkList = [...action.payload];
    },
    addCheckList: (state, action) => {
      state.checkList = [...state.checkList, action.payload];
    },
    deleteCheckList: (state, action) => {
      state.checkList = state.checkList.filter(
        (check) => check.id != action.payload
      );
    },
  },
});

export const { getCheckList, addCheckList, deleteCheckList } =
  checkListSlice.actions;

export default checkListSlice.reducer;
