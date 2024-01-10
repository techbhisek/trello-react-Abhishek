/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from 'react';
import get from './get';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Card from './Card';
import './Board.css';
import CreateBoard from './CreateBoard';
import { Link } from 'react-router-dom';
export const Board = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    get(setData);
  }, []);

  if (data.length == 0) {
    return (
      <div id="board-container">
        <h3>Loading...</h3>
      </div>
    );
  }
  if (data.length != 0) {
    return (
      <div id="board-container">
        <div id="recent">
          <h2 className="recent-header">
            <AccessTimeIcon />
            Recent Viewed
          </h2>
          <div className="sub-container">
            {data.slice(0, 3).map((board) => {
              return <Card key={board.id} board={board} />;
            })}
          </div>
        </div>
        <br />
        <br />
        <div>
          <h2 className="recent-header">Your WorkSpace</h2>
          <div className="sub-container">
            {data.map((board) => {
              return (
                <Link
                  key={board.id}
                  to={
                    '/board/' +
                    board.id +
                    `?name=${board.prefs.backgroundImage}&color=${
                      board.prefs.backgroundColor
                        ? board.prefs.backgroundBottomColor.slice(1)
                        : null
                    }`
                  }
                >
                  <Card board={board} />
                </Link>
              );
            })}
            {data.length < 10 && <CreateBoard length={data.length} />}
          </div>
        </div>
      </div>
    );
  }
};
