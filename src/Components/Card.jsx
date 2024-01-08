/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Card.css';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
const Card = ({ board }) => {
  const [star, setStar] = useState(false);
  let { backgroundImage } = board.prefs;
  if (board.prefs.backgroundImageScaled) {
    backgroundImage = board.prefs.backgroundImageScaled[2].url;
  }
  return (
    <div
      onMouseOver={() => {
        setStar(!star);
      }}
      onMouseLeave={() => {
        setStar(!star);
      }}
      className="board-card"
      style={{
        ...board.prefs,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'auto',
        backgroundPosition: 'center',
      }}
    >
      <h4>{board.name}</h4>
      {star && <StarOutlineIcon className="star" />}
    </div>
  );
};

export default Card;
