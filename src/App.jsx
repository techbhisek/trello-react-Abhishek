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

export const BoardsData = createContext([]);
export const ChangeData = createContext([]);
import { Board } from './Components/Board';
import { List } from './Components/List';
import { useDispatch } from 'react-redux';
import { getdata } from './Slices/BoardSlice';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    get(HandleData);
  }, []);
  function HandleData(array) {
    dispatch(getdata(array));
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
