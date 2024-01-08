import get from './Components/get';
import './App.css';
import Header from './Components/Header';

import PermanentDrawerLeft from './Components/Sidenavbar';
import {
  Routes,
  Route,
  HashRouter as Router,
} from 'react-router-dom';

import { Board } from './Components/Board';
import { List } from './Components/List';
function App() {
  get();
  return (
    <>
      <div>
        <Header />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <div id="main">
                  <PermanentDrawerLeft />
                  <Board />
                </div>
              }
            />
            <Route
              path="/board/:id"
              element={
                <div id="main">
                  <PermanentDrawerLeft />
                  <List />
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
