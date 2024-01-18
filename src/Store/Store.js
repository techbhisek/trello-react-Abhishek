import { configureStore } from '@reduxjs/toolkit';
import Board from '../Slices/BoardSlice';
import List from '../Slices/ListSlice';
import ListofCards from '../Slices/ListofCards';
import CheckList from '../Slices/checkListSlice';
import CheckTask from '../Slices/CheckTaskSlice';
import Progress from '../Slices/ProgressSlice';
import Handle from '../Slices/HandleSlice';

const store = configureStore({
  reducer: {
    Board,
    List,
    ListofCards,
    CheckList,
    CheckTask,
    Progress,
    Handle,
  },
});

export default store;
