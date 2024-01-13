/* eslint-disable react/prop-types */
import Popover from '@mui/material/Popover';
import './CreateBoard.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { push } from '../Api';
import { useNavigate } from 'react-router-dom';
import { ChangeData } from '../App';

export default function CreateBoard({ length }) {
  const [text, setText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [link, setLink] = useState(undefined);
  const createboard = useContext(ChangeData);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  let open = Boolean(anchorEl);
  let id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <div
        aria-describedby={id}
        onClick={handleClick}
        className="board-card"
        style={{
          backgroundColor: 'rgb(241,242,244)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
        }}
      >
        <h4>Create new Board</h4>
        <h5>{10 - length} are remaining</h5>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className="main-board-created">
          <h3>Create Board</h3>
          <div className="board-backgrounder">
            <img src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" />
          </div>
          <div className="input-bar">
            Name:{' '}
            <input
              autoFocus
              placeholder="Name"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              type="text"
            />
          </div>

          <Button
            variant="contained"
            disabled={text.length == 0}
            onClick={() => {
              setText('');
              push(text, navigate, createboard);
              open = Boolean(anchorEl);
            }}
          >
            <Link
              style={{ textDecoration: 'none', color: 'White' }}
              to={link}
            >
              {' '}
              CREATE{' '}
            </Link>
          </Button>
        </div>
      </Popover>
    </div>
  );
}
