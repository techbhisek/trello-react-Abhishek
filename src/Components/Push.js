import { Key } from '../assets/Key';
import { Token } from '../assets/Token';
export default function push(name, navigate) {
  let url = `https://api.trello.com/1/boards/?name=${name}&key=${Key}&token=${Token}`;
  fetch(url, {
    method: 'POST',
  })
    .then((response) => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then((text) => {
      let id = JSON.parse(text);
      navigate(`/board/${id.id}`);
    })
    .catch((err) => console.error(err));
}
