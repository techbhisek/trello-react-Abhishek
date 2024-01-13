// eslint-disable-next-line react/prop-types
export const Success = ({ success }) => (
  <h1
    style={{
      fontSize: '20px',
      fontWeight: '500',
      margin: '100px auto',
      position: 'absolute',
      bottom: '50px',
      padding: '10px',
      right: '30px',
      backgroundColor: 'green',
      color: 'white',
    }}
  >
    {success}
  </h1>
);
