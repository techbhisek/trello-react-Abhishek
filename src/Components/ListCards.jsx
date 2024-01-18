/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './ListCards.css';
import Tripledot from './Tripledot';
import ArchiveIcon from '@mui/icons-material/Archive';
import CardClick from './CardClick';
import { Button } from '@mui/material';
import { Deletecard, fetcherCreater, getCardsData } from '../Api';
import { Success } from './Success';
import { success } from '../Slices/HandleSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCards,
  deleteCards,
  getCards,
} from '../Slices/ListofCards';
import { error } from '../Slices/HandleSlice';

export const ListCards = ({ id, name, HandleArchiveList }) => {
  const [show, setShow] = useState(true);
  const [text, setText] = useState('');
  //const [cards, setCards] = useState([]);
  const [deletecard, setDeletecard] = useState(true);

  let cards = useSelector((state) => state.ListofCards.ListofCards);

  const dispatch = useDispatch();

  const [edit, setEdit] = useState('');
  const [idCard, setIdcard] = useState('');
  const [showedit, setShowedit] = useState(false);
  const [editcard, setEditcard] = useState(false);

  function HandleSuccess(data) {
    dispatch(success({ message: data }));
    setTimeout(() => {
      dispatch(success({ message: '' }));
    }, 3000);
  }

  function HandleError(errormessage) {
    dispatch(error({ message: errormessage }));
  }

  useEffect(() => {
    getCardsData(id, HandleCardsData);
  }, []);

  function HandleData(newCard) {
    // setCards([...cards, ...[newCard]]);

    dispatch(addCards({ id: id, newCard: newCard }));
  }

  function HandleDelete(idCard) {
    dispatch(deleteCards({ idList: id, idCard }));
    setDeletecard(!deletecard);
  }

  function HandleCardsData(data) {
    //  setCards(data);

    data = data.length != 0 ? data : [];
    dispatch(getCards({ id: id, ListofCards: data }));
  }

  // fetcher(id);
  if (Object.keys(cards).length != 0) {
    return (
      <div style={{ overflowX: 'scroll' }} className="card">
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
            HandleArchiveList={HandleArchiveList}
            idList={id}
          />
        </div>
        {cards[id] &&
          cards[id].map((element) => {
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
  }
};
