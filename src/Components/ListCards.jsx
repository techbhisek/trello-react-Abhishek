/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './ListCards.css';
import { Key } from '../assets/Key';
import { Token } from '../assets/Token';
import Tripledot from './Tripledot';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ListCards = ({ id, name }) => {
  const [show, setShow] = useState(true);
  const [text, setText] = useState('');
  const [cards, setCards] = useState([]);
  const [deletecard, setDeletecard] = useState([]);

  const [edit, setEdit] = useState('');
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
        <div className="edit">
          <h1>{edit}</h1>
          <button
            onClick={() => {
              setShowedit(false);
            }}
          >
            X
          </button>
        </div>
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
              }}
              key={element.id}
            >
              {element.name}{' '}
              {editcard && (
                <DeleteIcon
                  onClick={() => {
                    Deletecard(element.id, setDeletecard);
                  }}
                />
              )}
            </p>
          </>
        );
      })}

      {!show && (
        <div>
          <textarea
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          />{' '}
          <button
            style={{ backgroundColor: 'blue' }}
            onClick={() => {
              fetcherCreater(id, text, HandleData);
              setText('');
              setShow(true);
            }}
            type="text"
          >
            {' '}
            Add +{' '}
          </button>
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

function Deletecard(id, setDeletecard) {
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
      setDeletecard(...[]);
    })
    .catch((err) => console.error(err));
}
