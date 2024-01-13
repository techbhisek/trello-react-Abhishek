import { useEffect, useState, useContext } from 'react';
import './List.css';
import { ListCards } from './ListCards';
import { TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CreateList, GetListInBoard } from '../Api';
import { BoardsData } from '../App';
import Error from './Error';
import { Success } from './Success';

export const List = () => {
  const [List, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [shower, setShower] = useState(false);
  const [archive, setArchive] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function HandleSuccess(data) {
    setSuccess(data);
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  }

  let { id } = useParams();

  let back = useContext(BoardsData);

  useEffect(() => {
    GetListInBoard(id, HandleGetData);
  }, [id, archive]);

  function HandleGetData(data) {
    setList(data);
  }

  function HandleData(newData) {
    setList([...List, ...[newData]]);
  }

  function HandleArchiveList() {
    setArchive(!archive);
    console.log(archive);
  }
  function HandleError(error) {
    setError(error);
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
        {error && <Error error={error} HandleError={HandleError} />}
        {success && <Success success={success} />}
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
