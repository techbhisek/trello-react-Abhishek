/* eslint-disable react/prop-types */
import { useState } from 'react';
import './ListCards.css';

export const ListCards = ({ data1, setData, name }) => {
  const [show, setShow] = useState(true);
  const [text, setText] = useState('');
  const [arr, setArr] = useState([]);
  const [edit, setEdit] = useState('');
  const [showedit, setShowedit] = useState(false);

  return (
    <div className="card">
      {showedit && (
        <div className="edit">
          <h1>{edit}</h1>
          <button
            onClick={() => {
              setShowedit(false);
            }}
          >
            X
          </button>
        </div>
      )}

      <div className="name">
        <h3>{name}</h3>{' '}
        <button
          onClick={() => {
            let ar = data1.filter((ele) => ele != name);
            setData(ar);
          }}
        >
          X
        </button>
      </div>
      {arr.map((element) => {
        return (
          <p
            className="task"
            draggable="true"
            onDoubleClick={() => {
              setShowedit(true);
              setEdit(element);
            }}
            key={element}
          >
            {element}
          </p>
        );
      })}
      {!show && (
        <div>
          <textarea
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          />{' '}
          <button
            style={{ backgroundColor: 'blue' }}
            onClick={() => {
              let data = arr;
              data.push(text);
              setText('');
              setArr(data);
              setShow(true);
            }}
            type="text"
          >
            {' '}
            Add +{' '}
          </button>
        </div>
      )}

      {show && (
        <button
          onClick={() => {
            setShow(false);
          }}
          type="text"
        >
          {' '}
          Add +{' '}
        </button>
      )}
    </div>
  );
};
