import { createSlice } from '@reduxjs/toolkit';

let BoardsSlice = createSlice({
  name: 'Boards',
  initialState: {
    Boards: [],
  },
  reducers: {
    getdata: (state, action) => {
      state.Boards = [...action.payload];
    },
    update: (state, action) => {
      state.Boards = [...state.Boards, action.payload];
    },
  },
});

export const { getdata, update } = BoardsSlice.actions;

export default BoardsSlice.reducer;
