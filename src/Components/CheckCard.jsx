/* eslint-disable react/prop-types */
import { useState } from 'react';
import { MarkCheckbox, DeleteItem } from '../Api';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { success } from '../Slices/HandleSlice';

import { error } from '../Slices/HandleSlice';

import { useDispatch } from 'react-redux';
import { deleteCheckTask } from '../Slices/CheckTaskSlice';
import { checked, unchecked } from '../Slices/ProgressSlice';
const CheckCard = ({ data, idCheck, idCard }) => {
  const [style, setStyle] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(data.state);
  const dispatch = useDispatch();

  function HandleError(errormessage) {
    dispatch(error({ message: errormessage }));
  }
  function HandleSuccess(data) {
    dispatch(success({ message: data }));
    setTimeout(() => {
      dispatch(success({ message: '' }));
    }, 3000);
  }

  function HandleChangelist(id, idCheck) {
    if (status == 'complete') {
      dispatch(unchecked({ id: idCheck }));
    }

    dispatch(deleteCheckTask({ id, idCheck }));
  }
  return (
    <>
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
                  HandleError,
                  HandleSuccess
                );
                dispatch(checked({ id: idCheck }));
              } else {
                setStyle(() => '');
                setStatus('incomplete');
                MarkCheckbox(
                  data.id,
                  idCard,
                  'incomplete',
                  HandleError,
                  HandleSuccess
                );
                dispatch(unchecked({ id: idCheck }));
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
              DeleteItem(
                data.id,
                idCheck,
                HandleChangelist,
                HandleSuccess
              );
            }}
            id="Del"
          />
        </div>
      </div>
    </>
  );
};

export default CheckCard;
