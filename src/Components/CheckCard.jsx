/* eslint-disable react/prop-types */
import { useState } from 'react';
import { MarkCheckbox, DeleteItem } from '../Api';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Error from './Error';
import { useDispatch } from 'react-redux';
import { deleteCheckTask } from '../Slices/CheckTaskSlice';

const CheckCard = ({ data, idCheck, idCard, HandleValue }) => {
  const [style, setStyle] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(data.state);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  function HandleError(error) {
    setError(error);
  }

  function HandleChangelist(id, idCheck) {
    dispatch(deleteCheckTask({ id, idCheck }));
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
              HandleValue(-1);
            }}
            id="Del"
          />
        </div>
      </div>
    </>
  );
};

export default CheckCard;
