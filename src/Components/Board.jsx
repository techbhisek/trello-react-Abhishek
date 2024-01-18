/* eslint-disable react/no-unknown-property */

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Card from './Card';
import './Board.css';
import CreateBoard from './CreateBoard';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

export const Board = () => {
  let data = useSelector((state) => state.Board.Boards);
  const fetcherror = useSelector((state) => state.Handle.fetcherror);

  if (fetcherror) {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ margin: '100px 0px 0px  300px' }}>
          <h1
            style={{
              fontSize: '50px',
              fontWeight: '700',
            }}
          >
            Sorry Not able to fetch Data
          </h1>
        </div>
        <Link style={{ textDecoration: 'none' }} to="/">
          {' '}
          <Button
            style={{ margin: '50px 500px' }}
            variant="contained"
          >
            Try again
          </Button>
        </Link>
      </div>
    );
  }
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
