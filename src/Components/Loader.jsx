import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './Loader.css';

export const Loader = () => {
  let data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div id="board-container">
      <div id="recent">
        <h2 className="recent-head">
          <AccessTimeIcon />
          Recent Viewed
        </h2>
        <div className="sub-container">
          {data.slice(0, 3).map((board) => {
            return (
              <div key={board} className="blinker">
                {' '}
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <br />
      <div>
        <h2 className="recent-head">Your WorkSpace</h2>
        <div className="sub-container">
          {data.map((board) => {
            return (
              <div key={board} className="blinker">
                {' '}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
