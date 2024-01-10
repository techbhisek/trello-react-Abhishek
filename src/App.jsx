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
                    <PermanentDrawerLeft state={false} />
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
                    <PermanentDrawerLeft state={true} />
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
