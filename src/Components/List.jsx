import { useEffect, useState, useContext } from 'react';
import './List.css';
import { ListCards } from './ListCards';
import { TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CreateList, GetListInBoard } from '../Api';
import { BoardsData } from '../App';
import Error from './Error';

export const List = () => {
  const [List, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [shower, setShower] = useState(false);
  const [archive, setArchive] = useState(false);
  const [error, setError] = useState('');

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

    let style;
    let { backgroundImage } = backer.prefs;
    if (backer.length != 0) {
      style = {
        ...backer.prefs,
        backgroundImage: `url(${backgroundImage})`,

        backgroundPosition: 'center',
      };
    }
    return (
      <div style={style} className="cont">
        {error && <Error error={error} HandleError={HandleError} />}
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
                id="outlined-basic"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                label="Outlined"
                variant="outlined"
              />
              <Button
                onClick={() => {
                  if (search) {
                    setSearch('');
                    CreateList(search, id, HandleData, HandleError);
                    setShower(false);
                  }
                }}
                variant="contained"
              >
                add-task
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
};
