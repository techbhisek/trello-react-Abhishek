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
import { useSelector, useDispatch } from 'react-redux';
import { addCheckList, getCheckList } from '../Slices/checkListSlice';
const CardClick = ({ name, idCard, setShowedit }) => {
  const [check, setCheckbox] = useState(false);
  const [text, setText] = useState('Checklist');

  const List = useSelector((state) => state.CheckList.checkList);
  const dispatch = useDispatch();

  useEffect(() => {
    getchecklist(idCard, Handlechecklist, HandleError);
  }, [idCard]);

  function Handlechecklist(data) {
    //setlist(data);

    dispatch(getCheckList(data));
  }

  function HandleData(info) {
    // setlist(() => [...list, info]);
    dispatch(addCheckList(info));
  }
  const [error, setError] = useState('');

  function HandleError(error) {
    setError(error);
  }

  return (
    <div style={{ zIndex: '5' }} className="body-div">
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
              autoFocus
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
            {List.map((name) => (
              <CheckList
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
