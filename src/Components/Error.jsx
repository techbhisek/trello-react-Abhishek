/* eslint-disable react/prop-types */

const Error = ({ error, HandleError }) => {
  return (
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
      {error}{' '}
      <button
        style={{ margin: '10px' }}
        onClick={() => HandleError('')}
      >
        {' '}
        X
      </button>
      <br />
    </h1>
  );
};

export default Error;
