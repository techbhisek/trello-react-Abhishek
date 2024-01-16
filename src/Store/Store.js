import { configureStore } from '@reduxjs/toolkit';
import Boardreducer from '../Slices/BoardSlice';
import ListReducer from '../Slices/ListSlice';
import ListofCards from '../Slices/ListofCards';
import CheckList from '../Slices/checkListSlice';
import CheckTask from '../Slices/CheckTaskSlice';

const store = configureStore({
  reducer: {
    Board: Boardreducer,
    List: ListReducer,
    ListofCards,
    CheckList,
    CheckTask,
  },
});

export default store;
