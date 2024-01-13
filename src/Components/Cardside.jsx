/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Cardside.css';
const Card = ({ board }) => {
  const [star, setStar] = useState(false);
  let { backgroundImage } = board.prefs;
  if (board.prefs.backgroundImageScaled) {
    backgroundImage = board.prefs.backgroundImageScaled[2].url;
  }

  let { id } = useParams();
  let style = {};

  if (id == board.id) {
    style = {
      backgroundColor: 'rgba(255, 255, 255, 0.252)',
    };
  }

  return (
    <div style={style} className="board-container">
      <div
        onMouseOver={() => {
          setStar(!star);
        }}
        onMouseLeave={() => {
          setStar(!star);
        }}
        className="board-cards"
        style={{
          ...board.prefs,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'auto',
          backgroundPosition: 'center',
        }}
      ></div>
      <h3 className="Board">{board.name}</h3>
    </div>
  );
};

export default Card;
