/* eslint-disable react/prop-types */
import Popover from '@mui/material/Popover';
import './Tripledot.css';
import { archiveList } from '../Api';
import Error from './Error';

import { useState } from 'react';
import { archiveAllCards } from '../Api';

export default function Tripledot({
  idList,
  HandleArchive,
  HandleArchiveList,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState('');

  function HandleError(error) {
    setError(error);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let open = Boolean(anchorEl);
  let id = open ? 'simple-popover' : undefined;

  return (
    <div>
      {error && <Error error={error} HandleError={HandleError} />}
      <h3
        aria-describedby={id}
        onClick={handleClick}
        className="dot"
        style={{
          backgroundColor: 'rgb(241,242,244)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
        }}
      >
        ...
      </h3>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className="poper">
          <h2 className="dot-main-heading">Action List</h2>
          <h3
            onClick={() => {
              archiveAllCards(idList, HandleArchive, HandleError);
              handleClose();
            }}
            className="sub-heading"
          >
            Archive all cards
          </h3>
          <h3
            onClick={() => {
              archiveList(idList, HandleArchiveList, HandleError);
              handleClose();
            }}
            className="sub-heading"
          >
            Archive the List
          </h3>
        </div>
      </Popover>
    </div>
  );
}
