/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './ListCards.css';
import { Key } from '../assets/Key';
import { Token } from '../assets/Token';
import Tripledot from './Tripledot';
import ArchiveIcon from '@mui/icons-material/Archive';
import CardClick from './CardClick';
import { Button } from '@mui/material';

export const ListCards = ({ id, name }) => {
  const [show, setShow] = useState(true);
  const [text, setText] = useState('');
  const [cards, setCards] = useState([]);
  const [deletecard, setDeletecard] = useState(true);

  const [edit, setEdit] = useState('');
  const [idCard, setIdcard] = useState('');
  const [showedit, setShowedit] = useState(false);
  const [archive, SetArchive] = useState(false);
  const [editcard, setEditcard] = useState(false);

  useEffect(() => {
    FetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [archive, deletecard]);

  function HandleArchive(state) {
    SetArchive([...state]);
  }

  function HandleData(newCard) {
    setCards([...cards, ...[newCard]]);
  }

  function HandleDelete() {
    setDeletecard(!deletecard);
  }
  // fetcher(id);
  function FetchData() {
    fetch(
      ` https://api.trello.com/1/lists/${id}/cards?key=${Key}&token=${Token}`,
      {
        method: 'GET',
      }
    )
      .then((response) => {
        console.log(
          `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
      })
      .then((text) => {
        setCards(JSON.parse(text));
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="card">
      {showedit && (
        <CardClick
          name={edit}
          idCard={idCard}
          setShowedit={setShowedit}
        />
      )}

      <div className="name">
        <h3>{name}</h3>{' '}
        <Tripledot HandleArchive={HandleArchive} idList={id} />
      </div>

      {cards.map((element) => {
        return (
          <>
            <p
              onMouseEnter={() => {
                setEditcard(!editcard);
              }}
              onMouseLeave={() => {
                setEditcard(!editcard);
              }}
              className="task"
              draggable="true"
              onDoubleClick={() => {
                setShowedit(true);
                setEdit(element.name);
                setIdcard(element.id);
              }}
              key={element.id}
            >
              {element.name}{' '}
              {true && (
                <ArchiveIcon
                  style={{ zIndex: '2' }}
                  id="delete"
                  onClick={() => {
                    Deletecard(element.id, HandleDelete);
                  }}
                />
              )}
            </p>
          </>
        );
      })}

      {!show && (
        <div className="Addcard">
          <textarea
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          />{' '}
          <Button
            id="button-add"
            onClick={() => {
              fetcherCreater(id, text, HandleData);
              setText('');
              setShow(true);
            }}
            variant="contained"
          >
            {' '}
            Add +{' '}
          </Button>
        </div>
      )}

      {show && (
        <button
          onClick={() => {
            setShow(false);
          }}
          type="text"
        >
          {' '}
          Add +{' '}
        </button>
      )}
    </div>
  );
};

function fetcherCreater(id, text, HandleData) {
  const data = {
    idList: id,
    name: text,
    key: Key,
    token: Token,
  };

  fetch('https://api.trello.com/1/cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then((text) => {
      HandleData(JSON.parse(text));
    })
    .catch((err) => console.error(err));
}

function Deletecard(id, HandleDelete) {
  fetch(
    `https://api.trello.com/1/cards/${id}?key=${Key}&token=${Token}`,
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
      HandleDelete();
    })
    .catch((err) => console.error(err));
}
