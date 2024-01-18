import './App.css';
import Header from './Components/Header';
import { get } from './Api';
import { createContext, useEffect } from 'react';

import Sidenavbar from './Components/Sidenavbar';
import {
  Routes,
  Route,
  HashRouter as Router,
} from 'react-router-dom';
import Error from './Components/Error';

export const BoardsData = createContext([]);
export const ChangeData = createContext([]);
import { Board } from './Components/Board';
import { List } from './Components/List';
import { useDispatch } from 'react-redux';
import { getdata } from './Slices/BoardSlice';
import { Success } from './Components/Success';
import { fetcherror } from './Slices/HandleSlice';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    get(HandleData, HandleError);
  }, []);

  function HandleData(array) {
    dispatch(getdata(array));
  }

  function HandleError(errormessage) {
    dispatch(fetcherror({ message: errormessage }));
  }
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Error />
                  <Success />
                  <Header />
                  <div id="main">
                    <Sidenavbar state={false} />
                    <Board />
                  </div>
                </div>
              }
            />
            <Route
              path="/board/:id"
              element={
                <div>
                  <Error />
                  <Success />
                  <Header />
                  <div id="main">
                    <Sidenavbar state={true} />
                    <List />
                  </div>
                </div>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
