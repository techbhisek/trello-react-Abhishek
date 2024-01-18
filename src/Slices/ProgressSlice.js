import { createSlice } from '@reduxjs/toolkit';

let ProgressSlice = createSlice({
  name: 'Progress',
  initialState: {
    progress: {},
  },
  reducers: {
    add: (state, action) => {
      state.progress = {
        ...state.progress,
        [action.payload.id]: 0,
      };
    },
    checked: (state, action) => {
      let value = state.progress[action.payload.id] + 1;
      state.progress = {
        ...state.progress,
        [action.payload.id]: value,
      };
    },
    unchecked: (state, action) => {
      let value = state.progress[action.payload.id] - 1;
      state.progress = {
        ...state.progress,
        [action.payload.id]: value,
      };
    },
    reset: (state) => {
      state.progress = {};
    },
  },
});

export const { checked, unchecked, add, reset } =
  ProgressSlice.actions;

export default ProgressSlice.reducer;
