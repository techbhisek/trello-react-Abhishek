import './App.css';
import Header from './Components/Header';
import { get } from './Api';
import { createContext, useEffect, useState } from 'react';

import Sidenavbar from './Components/Sidenavbar';
import {
  Routes,
  Route,
  HashRouter as Router,
} from 'react-router-dom';

export const BoardsData = createContext([]);
import { Board } from './Components/Board';
import { List } from './Components/List';
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    get(HandleData);
  }, []);
  function HandleData(array) {
    setData(array);
  }
  return (
    <>
      <BoardsData.Provider value={data}>
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
      </BoardsData.Provider>
    </>
  );
}

export default App;
