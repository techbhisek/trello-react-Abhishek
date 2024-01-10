import { useEffect, useState } from 'react';
import { Key } from '../assets/Key';
import { Token } from '../assets/Token';
import './List.css';
import { ListCards } from './ListCards';
import { TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import get from './get';

export const List = () => {
  const [List, setList] = useState([]);
  const [back, setBack] = useState([]);
  const [search, setSearch] = useState('');
  const [shower, setShower] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    get(setBack);

    fetch(
      `https://api.trello.com/1/boards/${id}/lists?key=${Key}&token=${Token}`,
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
      .then((text) => setList(JSON.parse(text)))
      .catch((err) => console.error(err));
  }, [id]);

  function HandleData(newData) {
    setList([...List, ...[newData]]);
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
        <h1 className="list-header">{backer.name}</h1>
        <div id="contain">
          {List.map((element) => {
            return (
              <ListCards
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
                    CreateList(search, id, HandleData);
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

function CreateList(name, idBoard, HandleData) {
  fetch(
    `https://api.trello.com/1/lists?name=${name}&idBoard=${idBoard}&key=${Key}&token=${Token}`,
    {
      method: 'POST',
    }
  )
    .then((response) => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then((text) => {
      return HandleData(JSON.parse(text));
    })
    .catch((err) => console.error(err));
}
