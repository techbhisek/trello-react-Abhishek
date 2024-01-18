/* eslint-disable react/prop-types */
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Button } from '@mui/material';
import './CheckList.css';
import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCheckList } from '../Slices/checkListSlice';
import { addCheckTask, getCheckTask } from '../Slices/CheckTaskSlice';
import { error } from '../Slices/HandleSlice';
import { success } from '../Slices/HandleSlice';
import {
  getcheckItem,
  deleteChecklist,
  createchecktask,
} from '../Api';
import CheckCard from './CheckCard';
import { checked } from '../Slices/ProgressSlice';

const CheckList = ({ name, idCheck, idCard }) => {
  const [show, setShow] = useState(true);
  const [text, setText] = useState('');
  const value = useSelector((state) => state.Progress.progress);
  const [changelist, setChangelist] = useState(false);

  const dispatch = useDispatch();

  const CheckTask = useSelector((state) => state.CheckTask.CheckTask);

  function HandleChange(idCheck) {
    dispatch(deleteCheckList(idCheck));
  }
  useEffect(() => {
    getcheckItem(idCheck, HandleCheck);
    return () => {
      dispatch(getCheckTask({ id: idCheck, data: [] }));
    };
  }, [idCheck]);

  function HandleCheck(idCheck, { checkItems }) {
    checkItems.map((task) => {
      if (task.state == 'complete') {
        dispatch(checked({ id: idCheck }));
      }
    });
    dispatch(getCheckTask({ id: idCheck, data: checkItems }));
  }

  function HandleSuccess(data) {
    dispatch(success({ message: data }));
    setTimeout(() => {
      dispatch(success({ message: '' }));
    }, 3000);
  }

  function HandleData(task) {
    //setChecklist([...checklist, task]);
    dispatch(addCheckTask({ id: idCheck, data: task }));
  }

  function HandleChangelist() {
    setChangelist(!changelist);
  }

  function HandleError(errormessage) {
    dispatch(error({ message: errormessage }));
  }
  if (Object.keys(CheckTask).length != 0) {
    return (
      <div>
        <div className="checkbox-head">
          <h3>
            <AddTaskIcon /> {name}
          </h3>
          <button
            onClick={() => {
              deleteChecklist(
                idCheck,
                HandleChange,
                HandleError,
                HandleSuccess
              );
            }}
          >
            X
          </button>
        </div>
        <div id="progres">
          {CheckTask[idCheck] && (
            <LinearProgress
              id="progress"
              variant="determinate"
              value={
                CheckTask[idCheck].length > 0
                  ? (value[idCheck] / CheckTask[idCheck].length) * 100
                  : 0
              }
            />
          )}

          <div className="checklist-container">
            {CheckTask[idCheck] &&
              CheckTask[idCheck].map((data) => {
                return (
                  <CheckCard
                    key={data.id}
                    data={data}
                    idCard={idCard}
                    HandleChangelist={HandleChangelist}
                    idCheck={idCheck}
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
