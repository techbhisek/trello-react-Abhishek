/* eslint-disable react/no-unknown-property */
import { useContext } from 'react';

import Cardside from './Cardside';
import './Board.css';
import { Link } from 'react-router-dom';
import { BoardsData } from '../App';
export const Navclick = () => {
  let data = useContext(BoardsData);

  if (data.length != 0) {
    return (
      <>
        <h2 className="">My boards</h2>

        {data.map((board) => {
          return (
            <Link key={board.id} to={'/board/' + board.id}>
              <Cardside board={board} />
            </Link>
          );
        })}
      </>
    );
  }
};
