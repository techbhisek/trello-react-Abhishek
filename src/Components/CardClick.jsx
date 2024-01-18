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
import { add } from '../Slices/ProgressSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addCheckList, getCheckList } from '../Slices/checkListSlice';
import { reset } from '../Slices/ProgressSlice';
import { error, success } from '../Slices/HandleSlice';

const CardClick = ({ name, idCard, setShowedit }) => {
  const [check, setCheckbox] = useState(false);
  const [text, setText] = useState('Checklist');

  const List = useSelector((state) => state.CheckList.checkList);
  const dispatch = useDispatch();

  useEffect(() => {
    getchecklist(idCard, Handlechecklist, HandleError);
    return () => {
      dispatch(getCheckList([]));
      dispatch(reset());
    };
  }, []);

  function Handlechecklist(data) {
    data.map((checklist) => {
      dispatch(add({ id: checklist.id }));
    });

    dispatch(getCheckList(data));
  }

  function HandleData(info) {
    // setlist(() => [...list, info]);
    dispatch(addCheckList(info));
  }

  function HandleError(errormessage) {
    dispatch(error({ message: errormessage }));
  }
  function HandleSuccess(data) {
    dispatch(success({ message: data }));
    setTimeout(() => {
      dispatch(success({ message: '' }));
    }, 3000);
  }

  //if (List.length != 0) {
  return (
    <div style={{ zIndex: '5' }} className="body-div">
      <Error HandleError={HandleError} />
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
              Createchecklist(
                idCard,
                text,
                HandleData,
                HandleError,
                HandleSuccess
              );
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
            {List.map((name) => {
              return (
                <CheckList
                  name={name.name}
                  idCheck={name.id}
                  idCard={idCard}
                  key={name.id}
                />
              );
            })}
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
  // }
};

export default CardClick;
