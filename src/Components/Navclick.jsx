/* eslint-disable react/no-unknown-property */

import { useSelector } from 'react-redux';
import Cardside from './Cardside';
import './Board.css';
import { Link } from 'react-router-dom';

export const Navclick = () => {
  let data = useSelector((state) => state.Board.Boards);

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
