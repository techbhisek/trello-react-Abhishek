import { createSlice } from '@reduxjs/toolkit';

const CheckTaskSlice = createSlice({
  name: 'CheckTask',
  initialState: {
    CheckTask: {},
  },
  reducers: {
    getCheckTask: (state, action) => {
      state.CheckTask = {
        ...state.CheckTask,
        [action.payload.id]: [...action.payload.data],
      };
      console.log(state.CheckTask);
    },
    addCheckTask: (state, action) => {
      console.log(
        action.payload.id + '=>' + JSON.stringify(action.payload.data)
      );
      state.CheckTask = {
        ...state.CheckTask,
        [action.payload.id]: [
          ...state.CheckTask[action.payload.id],
          action.payload.data,
        ],
      };
    },
    deleteCheckTask: (state, action) => {
      let data = state.CheckTask[action.payload.idCheck].filter(
        (task) => task.id != action.payload.id
      );

      state.CheckTask = {
        ...state.CheckTask,
        [action.payload.idCheck]: data,
      };
    },
  },
});

export const { getCheckTask, addCheckTask, deleteCheckTask } =
  CheckTaskSlice.actions;

export default CheckTaskSlice.reducer;
