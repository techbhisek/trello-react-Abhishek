/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Card.css';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
const Card = ({ board }) => {
  const [star, setStar] = useState(false);
  let style = {};
  if (board.prefs.backgroundImage) {
    style = {
      backgroundImage: `url(${board.prefs.backgroundImage})`,
    };
  } else {
    style = { backgroundColor: board.prefs.backgroundColor };
  }
  return (
    <div
      onMouseEnter={() => {
        setStar(!star);
      }}
      onMouseLeave={() => {
        setStar(!star);
      }}
      className="board-card"
      style={style}
    >
      <h4>{board.name}</h4>
      {star && <StarOutlineIcon className="star" />}
    </div>
  );
};

export default Card;
