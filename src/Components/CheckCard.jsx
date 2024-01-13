/* eslint-disable react/prop-types */
import { useState } from 'react';
import { MarkCheckbox, DeleteItem } from '../Api';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Error from './Error';

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
  const [error, setError] = useState('');

  function HandleError(error) {
    setError(error);
  }

  return (
    <>
      {error && <Error error={error} HandleError={HandleError} />}{' '}
      <div className="check-box" key={data.id}>
        <div className="check">
          <input
            autoFocus
            defaultChecked={data.state == 'complete' ? true : false}
            className="checkbox"
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setStyle(() => 'overline');
                setStatus('complete');
                MarkCheckbox(
                  data.id,
                  idCard,
                  'complete',
                  HandleError
                );
                HandleValue(1);
              } else {
                setStyle(() => '');
                setStatus('incomplete');
                MarkCheckbox(
                  data.id,
                  idCard,
                  'incomplete',
                  HandleError
                );
                HandleValue(-1);
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
            }}
            id="Del"
          />
        </div>
      </div>
    </>
  );
};

export default CheckCard;
