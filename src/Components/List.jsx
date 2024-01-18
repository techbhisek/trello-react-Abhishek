import { useEffect, useState } from 'react';
import './List.css';
import { ListCards } from './ListCards';
import { TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CreateList, GetListInBoard } from '../Api';
import { useDispatch, useSelector } from 'react-redux';
import { addList, getList } from '../Slices/ListSlice';
import { error, success } from '../Slices/HandleSlice';

export const List = () => {
  const dispatch = useDispatch();

  const List = useSelector((state) => state.List.List);

  const [search, setSearch] = useState('');
  const [shower, setShower] = useState(false);
  const [archive, setArchive] = useState(false);

  function HandleSuccess(data) {
    dispatch(success({ message: data }));
    setTimeout(() => {
      dispatch(success({ message: '' }));
    }, 3000);
  }

  let { id } = useParams();

  let back = useSelector((state) => state.Board.Boards);
  useEffect(() => {
    GetListInBoard(id, HandleGetData);
  }, [id, archive]);

  function HandleGetData(data) {
    dispatch(getList(data));
    // setList(data);
  }

  function HandleData(newData) {
    dispatch(addList(newData));
    // setList([...List, ...[newData]]);
  }

  function HandleArchiveList() {
    setArchive(!archive);
  }
  function HandleError(errormessage) {
    dispatch(error({ message: errormessage }));
  }
  if (back.length != 0) {
    let backer = back.filter((e) => e.id == id)[0];

    let styleback = {};
    if (backer.length != 0) {
      if (backer?.prefs?.backgroundImage) {
        styleback = {
          backgroundImage: `url(${backer.prefs.backgroundImage})`,
        };
      } else {
        styleback = { backgroundColor: backer.prefs.backgroundColor };
      }
    } else {
      styleback = { backgroundColor: 'blue' };
    }

    return (
      <div style={styleback} className="cont">
        <h1 className="list-header">{backer.name}</h1>
        <div id="contain">
          {List.map((element) => {
            return (
              <ListCards
                HandleArchiveList={HandleArchiveList}
                key={element.id}
                id={element.id}
                name={element.name}
              />
            );
          })}

          {!shower && (
            <div
              onClick={() => {
                setShower(true);
              }}
              className="whiter"
            >
              + Add Another List
            </div>
          )}
          {shower && (
            <div className="add-block">
              Add new card
              <TextField
                autoFocus
                id="outlined-basic"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                label="Outlined"
                variant="outlined"
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '80%',
                }}
              >
                <Button
                  onClick={() => {
                    if (search) {
                      setSearch('');
                      CreateList(
                        search,
                        id,
                        HandleData,
                        HandleError,
                        HandleSuccess
                      );
                      setShower(false);
                    }
                  }}
                  variant="contained"
                >
                  add-task
                </Button>
                <Button
                  onClick={() => {
                    setShower(false);
                  }}
                  variant="out"
                >
                  X
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};
