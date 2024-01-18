/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { error } from '../Slices/HandleSlice';
const Error = () => {
  const errormsg = useSelector((state) => {
    return state.Handle.error;
  });

  const dispatch = useDispatch();
  return (
    <div>
      {errormsg && (
        <h1
          style={{
            fontSize: '20px',
            fontWeight: '500',
            margin: '100px auto',
            position: 'absolute',
            bottom: '50px',
            padding: '10px',
            right: '20px',
            backgroundColor: 'red',
            color: 'white',
          }}
        >
          {errormsg}{' '}
          <button
            style={{ margin: '10px' }}
            onClick={() => dispatch(error({ message: '' }))}
          >
            {' '}
            X
          </button>
          <br />
        </h1>
      )}
    </div>
  );
};

export default Error;
