import { Token } from '../assets/Token';
import { Key } from '../assets/Key';
const get = (setHandler) => {
  let id = '659827efbb4261b7392f75bd';
  let url = `https://api.trello.com/1/members/${id}/boards?key=${Key}&token=${Token}`;
  fetch(url, {
    method: 'GET',
  })
    .then((response) => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then((text) => {
      return setHandler(JSON.parse(text));
    })
    .catch((err) => console.error(err));
};

export default get;
