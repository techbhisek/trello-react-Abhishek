import { useEffect, useState } from 'react';
import { Key } from '../assets/Key';
import { Token } from '../assets/Token';
import './List.css';
import { ListCards } from './ListCards';
import { TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

export const List = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [shower, setShower] = useState(false);
  let { id } = useParams();
  useEffect(() => {
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
      .then((text) => setData(JSON.parse(text)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="cont">
      <div className="contain">
        {data.map((element) => {
          return (
            <ListCards
              key={element.id}
              setData={setData}
              data={data}
              name={element.name}
            />
          );
        })}
      </div>
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
                let arr = data;
                setSearch('');
                arr.push(search);
                setData(arr);
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
  );
};
