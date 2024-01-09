/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from 'react';
import get from './get';
import Cardside from './Cardside';
import './Board.css';
import { Link } from 'react-router-dom';
export const Navclick = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    get(setData);
  }, []);

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
