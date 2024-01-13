/* eslint-disable react/prop-types */
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CheckList from './CheckList';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import './CardClick.css';
import Error from './Error';
import { getchecklist, Createchecklist } from '../Api';
const CardClick = ({ name, idCard, setShowedit }) => {
  const [check, setCheckbox] = useState(false);
  const [list, setlist] = useState([]);
  const [text, setText] = useState('Checklist');
  const [change, setChange] = useState(false);

  useEffect(() => {
    getchecklist(idCard, Handlechecklist, HandleError);
  }, [change]);

  function Handlechecklist(data) {
    setlist(data);
  }

  function HandleChange() {
    setChange(!change);
  }

  function HandleData(info) {
    setlist(() => [...list, info]);
  }
  const [error, setError] = useState('');

  function HandleError(error) {
    setError(error);
  }

  return (
    <div className="body-div">
      {error && <Error error={error} HandleError={HandleError} />}
      {check && (
        <div className="create">
          <div className="Checkpop">
            <div className="Empty"></div>
            <h3>Add CheckList</h3>
            <Button
              id="cross"
              onClick={() => {
                setCheckbox(!check);
              }}
              variant="new"
            >
              X
            </Button>
          </div>
          <div>
            {' '}
            Title <br />
            <br />{' '}
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <Button
            onClick={() => {
              setText('');
              setCheckbox(!check);
              Createchecklist(idCard, text, HandleData, HandleError);
            }}
            variant="contained"
          >
            Add{' '}
          </Button>
        </div>
      )}
      <div className="edit">
        <div className="box-heading">
          <h1 className="card-name">
            <LaptopWindowsIcon />
            <p id="name">{name}</p>
          </h1>
          <Button
            variant="nn"
            onClick={() => {
              setShowedit(false);
            }}
          >
            X
          </Button>
        </div>
        <div className="div-container">
          <div className="Left">
            {list.map((name) => (
              <CheckList
                HandleChange={HandleChange}
                name={name.name}
                idCheck={name.id}
                idCard={idCard}
                key={name.id}
              />
            ))}
          </div>
          <div className="Right">
            Add to card
            <h3
              onClick={() => {
                setCheckbox(!check);
              }}
              className="checklist"
            >
              {' '}
              <AddTaskIcon />
              checkList
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardClick;
