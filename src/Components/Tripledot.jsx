/* eslint-disable react/prop-types */
import Popover from '@mui/material/Popover';
import './Tripledot.css';

import { useState } from 'react';
import { Key } from '../assets/Key';
import { Token } from '../assets/Token';

export default function Tripledot({ idList, HandleArchive }) {
  const [anchorEl, setAnchorEl] = useState(null);

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
              archiveAllCards(idList, HandleArchive);
              handleClose();
              console.log('clicked');
            }}
            className="sub-heading"
          >
            Archive this list
          </h3>
        </div>
      </Popover>
    </div>
  );
}

function archiveAllCards(id, HandleArchive) {
  fetch(
    `https://api.trello.com/1/lists/${id}/archiveAllCards?key=${Key}&token=${Token}`,
    {
      method: 'POST',
    }
  )
    .then((response) => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(() => {
      return HandleArchive([]);
    })
    .catch((err) => console.error(err));
}
