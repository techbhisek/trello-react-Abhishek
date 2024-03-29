/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './ListCards.css';
import Tripledot from './Tripledot';
import ArchiveIcon from '@mui/icons-material/Archive';
import CardClick from './CardClick';
import { Button } from '@mui/material';
import { Deletecard, fetcherCreater, getCardsData } from '../Api';
import Error from './Error';
import { Success } from './Success';

export const ListCards = ({ id, name, HandleArchiveList }) => {
  const [show, setShow] = useState(true);
  const [text, setText] = useState('');
  const [cards, setCards] = useState([]);
  const [deletecard, setDeletecard] = useState(true);

  const [edit, setEdit] = useState('');
  const [idCard, setIdcard] = useState('');
  const [showedit, setShowedit] = useState(false);
  const [archive, SetArchive] = useState(false);
  const [editcard, setEditcard] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function HandleSuccess(data) {
    setSuccess(data);
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  }

  function HandleError(error) {
    setError(error);
  }

  useEffect(() => {
    getCardsData(id, HandleCardsData);
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

  function HandleCardsData(data) {
    setCards(data);
  }
  // fetcher(id);

  return (
    <div style={{ overflowX: 'scroll' }} className="card">
      {error && <Error error={error} HandleError={HandleError} />}{' '}
      {success && <Success success={success} />}
      {showedit && (
        <CardClick
          name={edit}
          idCard={idCard}
          setShowedit={setShowedit}
        />
      )}
      <div className="name">
        <h3>{name}</h3>{' '}
        <Tripledot
          HandleArchive={HandleArchive}
          HandleArchiveList={HandleArchiveList}
          idList={id}
        />
      </div>
      {cards.map((element) => {
        return (
          <div className="task" key={element.id}>
            <p
              className="card-text"
              onMouseEnter={() => {
                setEditcard(!editcard);
              }}
              onMouseLeave={() => {
                setEditcard(!editcard);
              }}
              draggable="true"
              onClick={() => {
                setShowedit(true);
                setEdit(element.name);
                setIdcard(element.id);
              }}
              key={element.id}
            >
              {element.name}{' '}
            </p>
            {true && (
              <ArchiveIcon
                id="delete"
                onClick={() => {
                  Deletecard(
                    element.id,
                    HandleDelete,
                    HandleError,
                    HandleSuccess
                  );
                }}
              />
            )}
          </div>
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '70%',
            }}
          >
            <Button
              disabled={text.length == 0}
              style={{ width: '100px' }}
              id="button-add"
              onClick={() => {
                fetcherCreater(
                  id,
                  text,
                  HandleData,
                  HandleError,
                  HandleSuccess
                );
                setText('');
                setShow(true);
              }}
              variant="contained"
            >
              {' '}
              Add +{' '}
            </Button>

            <Button
              style={{ width: '50px' }}
              variant="outlined"
              onClick={() => setShow(true)}
            >
              X
            </Button>
          </div>
        </div>
      )}
      {show && (
        <Button
          variant="outlined"
          onClick={() => {
            setShow(false);
          }}
          type="text"
        >
          {' '}
          Add +{' '}
        </Button>
      )}
    </div>
  );
};
