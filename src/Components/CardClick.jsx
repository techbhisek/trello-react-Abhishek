/* eslint-disable react/prop-types */
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CheckList from './CheckList';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import './CardClick.css';
import { Key } from '../assets/Key';
import { Token } from '../assets/Token';
const CardClick = ({ name, idCard, setShowedit }) => {
  const [check, setCheckbox] = useState(false);
  const [list, setlist] = useState([]);
  const [text, setText] = useState('Checklist');
  const [change, setChange] = useState(false);

  useEffect(() => {
    getchecklist(idCard, Handlechecklist);
  }, [change]);

  function Handlechecklist(data) {
    setlist(data);
  }

  function HandleChange() {
    setChange(!change);
  }

  function HandleData(info) {
    setlist(() => [...list, info]);
    console.log(list);
  }

  return (
    <div className="body-div">
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
              variant="oo"
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
              Createchecklist(idCard, text, HandleData);
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
            <h3 className="checklist"> Label</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardClick;

function Createchecklist(idCard, name, HandleData) {
  fetch(
    `https://api.trello.com/1/checklists?idCard=${idCard}&key=${Key}&token=${Token}&name=${name}`,
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

function getchecklist(idCard, Handlechecklist) {
  fetch(
    `https://api.trello.com/1/cards/${idCard}/checklists?key=${Key}&token=${Token}`,
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
      return Handlechecklist(text);
    })
    .catch((err) => console.error(err));
}
