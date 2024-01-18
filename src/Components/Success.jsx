// eslint-disable-next-line react/prop-types
import { useSelector } from 'react-redux';
export const Success = () => {
  const success = useSelector((state) => state.Handle.success);
  return (
    <div>
      {success && (
        <h1
          style={{
            zIndex: 9,
            fontSize: '20px',
            fontWeight: '500',
            margin: '100px auto',
            position: 'absolute',
            bottom: '70px',
            padding: '10px',
            right: '30px',
            backgroundColor: 'green',
            color: 'white',
          }}
        >
          {success}
        </h1>
      )}
    </div>
  );
};
