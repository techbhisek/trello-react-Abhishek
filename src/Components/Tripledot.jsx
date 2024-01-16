/* eslint-disable react/prop-types */
import Popover from '@mui/material/Popover';
import './Tripledot.css';
import { archiveList } from '../Api';
import Error from './Error';

import { useState } from 'react';
import { archiveAllCards } from '../Api';

import { archiveAll } from '../Slices/ListofCards';
import { useDispatch } from 'react-redux';

export default function Tripledot({ idList, HandleArchiveList }) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState('');

  function HandleError(error) {
    setError(error);
  }

  function HandleArchive(idList) {
    dispatch(archiveAll({ idList }));
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
