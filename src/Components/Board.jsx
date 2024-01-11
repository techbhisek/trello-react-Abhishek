/* eslint-disable react/no-unknown-property */
import { useContext } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Card from './Card';
import './Board.css';
import CreateBoard from './CreateBoard';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';
import { BoardsData } from '../App';
export const Board = () => {
  let data = useContext(BoardsData);
  if (data.length == 0) {
    return <Loader />;
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
                <Link key={board.id} to={'/board/' + board.id}>
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
