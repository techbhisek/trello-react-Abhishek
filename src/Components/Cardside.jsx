/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Cardside.css';
const Card = ({ board }) => {
  const [star, setStar] = useState(false);
  let styleback = {};
  if (board.prefs.backgroundImage) {
    styleback = {
      backgroundImage: `url(${board.prefs.backgroundImage})`,
    };
  } else {
    styleback = { backgroundColor: board.prefs.backgroundColor };
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
        style={styleback}
      ></div>
      <h3 className="Board">{board.name}</h3>
    </div>
  );
};

export default Card;
