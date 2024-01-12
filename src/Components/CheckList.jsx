/* eslint-disable react/prop-types */
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Button } from '@mui/material';
import './CheckList.css';
import { useReducer } from 'react';
import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import Error from './Error';
import {
  getcheckItem,
  deleteChecklist,
  createchecktask,
} from '../Api';
import CheckCard from './CheckCard';
const CheckList = ({ name, idCheck, idCard, HandleChange }) => {
  const [show, setShow] = useState(true);
  const [checklist, Checklist] = useReducer(HandleCheckItems, []);
  const [text, setText] = useState('');
  const [value, setValue] = useReducer(HandleProgress, 0);
  const [error, setError] = useState('');

  useEffect(() => {
    getcheckItem(idCheck, HandleCheck);
  }, []);

  function HandleProgress(value, action) {
    switch (action.type) {
      case 'complete':
        return value + 1;

      case 'incomplete':
        return value - 1;

      case 'set':
        return action.value;
    }
  }

  function HandleCheckItems(checklist, action) {
    switch (action.type) {
      case 'get':
        return [...action.payload.checkItems];
      case 'push':
        return [...checklist, action.payload.task];
      case 'delete': {
        let data = checklist.filter(
          (task) => task.id != action.payload.idCard
        );
        return data;
      }
    }
  }

  function HandleCheck({ checkItems }) {
    Checklist({ type: 'get', payload: { checkItems } });
  }

  function HandleValue(data) {
    setValue({ type: data });
  }

  function HandleData(task) {
    Checklist({ type: 'push', payload: { task } });
  }

  function HandleChangelist(idCard) {
    Checklist({ type: 'delete', payload: { idCard } });
    setValue({ type: 'incomplete' });
  }

  function HandleError(error) {
    setError(error);
  }

  return (
    <div>
      {error && <Error error={error} HandleError={HandleError} />}
      <div className="checkbox-head">
        <h3>
          <AddTaskIcon /> {name}
        </h3>
        <button
          onClick={() => {
            deleteChecklist(idCheck, HandleChange, HandleError);
          }}
        >
          X
        </button>
      </div>

      <div id="progres">
        <LinearProgress
          id="progress"
          variant="determinate"
          value={
            checklist.length > 0
              ? (value / checklist.length) * 100
              : 0
          }
        />
        {console.log(value)}

        <div className="checklist-container">
          {checklist.map((data) => {
            return (
              <CheckCard
                key={data.id}
                data={data}
                idCard={idCard}
                HandleChangelist={HandleChangelist}
                idCheck={idCheck}
                HandleValue={HandleValue}
              />
            );
          })}
        </div>

        {show && (
          <Button
            onClick={() => {
              setShow(!show);
            }}
            variant="outlined"
          >
            Add an Item
          </Button>
        )}

        {!show && (
          <div className="checktext-div">
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              className="checktext"
              placeholder="enter text"
            />

            <div className="button-container">
              {' '}
              <Button
                onClick={() => {
                  setShow(!show);
                  createchecktask(
                    idCheck,
                    text,
                    HandleData,
                    HandleError
                  );
                  setText('');
                }}
                variant="contained"
              >
                Add
              </Button>
              <Button
                onClick={() => {
                  setShow(!show);
                }}
                variant="outlin"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckList;
