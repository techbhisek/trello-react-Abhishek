import { createSlice } from '@reduxjs/toolkit';

let HandleSlice = createSlice({
  name: 'Handle',
  initialState: {
    error: '',
    success: '',
    fetcherror: '',
  },
  reducers: {
    error: (state, action) => {
      state.error = action.payload.message;
    },
    success: (state, action) => {
      state.success = action.payload.message;
    },
    fetcherror: (state, action) => {
      state.fetcherror = action.payload.message;
    },
  },
});

export const { error, success, fetcherror } = HandleSlice.actions;

export default HandleSlice.reducer;
