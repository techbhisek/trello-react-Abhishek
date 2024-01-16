/* eslint-disable react/prop-types */
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Button } from '@mui/material';
import './CheckList.css';
import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import Error from './Error';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCheckList } from '../Slices/checkListSlice';
import { addCheckTask, getCheckTask } from '../Slices/CheckTaskSlice';
import {
  getcheckItem,
  deleteChecklist,
  createchecktask,
} from '../Api';
import CheckCard from './CheckCard';
const CheckList = ({ name, idCheck, idCard }) => {
  const [show, setShow] = useState(true);
  const [text, setText] = useState('');
  const [value, setValue] = useState(0);
  const [changelist, setChangelist] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const CheckTask = useSelector((state) => state.CheckTask.CheckTask);

  function HandleChange(idCheck) {
    dispatch(deleteCheckList(idCheck));
  }
  useEffect(() => {
    getcheckItem(idCheck, HandleCheck);
  }, [idCheck]);

  function HandleCheck(idCheck, { checkItems }) {
    console.log(checkItems);

    dispatch(getCheckTask({ id: idCheck, data: checkItems }));
  }

  function HandleValue(data) {
    setValue((value) => value + data);
  }

  function HandleData(task) {
    //setChecklist([...checklist, task]);
    dispatch(addCheckTask({ id: idCheck, data: task }));
  }

  function HandleChangelist() {
    setChangelist(!changelist);
  }

  function HandleError(error) {
    setError(error);
  }
  if (Object.keys(CheckTask).length != 0) {
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
              CheckTask.length > 0
                ? (value / CheckTask.length) * 100
                : 0
            }
          />

          <div className="checklist-container">
            {CheckTask &&
              CheckTask[idCheck].map((data) => {
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
                autoFocus
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
  }
};

export default CheckList;
