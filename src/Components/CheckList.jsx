/* eslint-disable react/prop-types */
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Button } from '@mui/material';
import './CheckList.css';
import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Token } from '../assets/Token';
import { Key } from '../assets/Key';
import CheckCard from './CheckCard';
const CheckList = ({ name, idCheck, idCard, HandleChange }) => {
  const [show, setShow] = useState(true);
  const [checklist, setChecklist] = useState([]);
  const [text, setText] = useState('');
  const [value, setValue] = useState(0);
  const [changelist, setChangelist] = useState(false);

  useEffect(() => {
    getcheckItem(idCheck, HandleCheck);
  }, [changelist]);

  function HandleCheck({ checkItems }) {
    setChecklist(checkItems);
  }

  function HandleValue(data) {
    setValue((value) => value + data);
  }

  function HandleData(task) {
    setChecklist([...checklist, task]);
  }

  function HandleChangelist() {
    setChangelist(!changelist);
  }
  return (
    <div>
      <div className="checkbox-head">
        <h3>
          <AddTaskIcon /> {name}
        </h3>
        <button
          onClick={() => {
            deleteChecklist(idCheck, HandleChange);
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
                  createchecktask(idCheck, text, HandleData);
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
function getcheckItem(idCheck, HandleCheck) {
  fetch(
    `https://api.trello.com/1/checklists/${idCheck}?key=${Key}&token=${Token}`,
    {
      method: 'GET',
    }
  )
    .then((response) => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.json();
    })
    .then((text) => {
      HandleCheck(text);
    })
    .catch((err) => console.error(err));
}

function deleteChecklist(idCheck, HandleChange) {
  fetch(
    `https://api.trello.com/1/checklists/${idCheck}?key=${Key}&token=${Token}`,
    {
      method: 'DELETE',
    }
  )
    .then((response) => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(() => {
      HandleChange();
    })
    .catch((err) => console.error(err));
}

function createchecktask(idCheck, name, HandleData) {
  fetch(
    `https://api.trello.com/1/checklists/${idCheck}/checkItems?name=${name}&key=${Key}&token=${Token}`,
    {
      method: 'POST',
    }
  )
    .then((response) => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.json();
    })
    .then((text) => {
      HandleData(text);
    })
    .catch((err) => console.error(err));
}
