/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Key } from '../assets/Key';
import { Token } from '../assets/Token';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const CheckCard = ({
  data,
  idCheck,
  idCard,
  HandleValue,
  HandleChangelist,
}) => {
  const [style, setStyle] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(data.state);

  return (
    <>
      {' '}
      <div className="check-box" key={data.id}>
        <div className="check">
          <input
            defaultChecked={status == 'complete' ? true : false}
            className="checkbox"
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setStyle(() => 'overline');
                MarkCheckbox(data.id, idCard, 'complete');
                console.log(style);
                HandleValue(1);
              } else {
                setStyle(() => '');
                HandleValue(-1);
                MarkCheckbox(data.id, idCard, 'incomplete');
              }
            }}
            color="success"
          />{' '}
          <p id={style}>{data.name}</p>
        </div>
        <div>
          {' '}
          <RemoveCircleIcon
            onClick={() => {
              DeleteItem(data.id, idCheck, HandleChangelist);
              console.log('ok');
            }}
            id="Del"
          />
        </div>
      </div>
    </>
  );
};

export default CheckCard;

function DeleteItem(id, idCheck, HandleChangelist) {
  console.log(id, idCheck);
  fetch(
    `https://api.trello.com/1/checklists/${idCheck}/checkItems/${id}?key=${Key}&token=${Token}`,
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
      HandleChangelist();
    })
    .catch((err) => console.error(err));
}

function MarkCheckbox(id, idCard, state) {
  fetch(
    `https://api.trello.com/1/cards/${idCard}/checkItem/${id}?key=${Key}&token=${Token}&state=${state}`,
    {
      method: 'PUT',
    }
  )
    .then((response) => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then((text) => console.log(text))
    .catch((err) => console.error(err));
}
