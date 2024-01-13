import axios from 'axios';
import { Key } from './assets/Key';
import { Token } from './assets/Token';

export const get = (setHandler, HandleError) => {
  let id = '659827efbb4261b7392f75bd';
  let url = `https://api.trello.com/1/members/${id}/boards?key=${Key}&token=${Token}`;
  axios
    .get(url)
    .then(({ data }) => {
      setHandler(data);
    })
    .catch(({ message }) => {
      HandleError(message);
    });
};

export const push = (name, navigate, createboard) => {
  let url = `https://api.trello.com/1/boards/?name=${name}&key=${Key}&token=${Token}`;

  axios
    .post(url)
    .then(({ data }) => {
      createboard(data);
      return data;
    })
    .then((data) => {
      navigate(`/board/${data.id}`);
    })
    .catch(({ message }) => {
      console.log(message + ' Not able to create new Board');
    });
};

export const Createchecklist = (
  idCard,
  name,
  HandleData,
  HandleError
) => {
  const url = `https://api.trello.com/1/checklists?idCard=${idCard}&key=${Key}&token=${Token}&name=${name}`;
  axios
    .post(url)
    .then(({ data }) => {
      HandleData(data);
    })
    .catch(({ message }) => {
      HandleError(message + ' Not able to create new Checklist');
    });
};

export const getchecklist = (
  idCard,
  Handlechecklist,
  HandleError
) => {
  const url = `https://api.trello.com/1/cards/${idCard}/checklists?key=${Key}&token=${Token}`;
  axios
    .get(url)
    .then(({ data }) => {
      Handlechecklist(data);
    })
    .catch(({ message }) => {
      HandleError(message + ' Not able fetch checklist');
    });
};

export const DeleteItem = (id, idCheck, HandleChangelist) => {
  const url = `https://api.trello.com/1/checklists/${idCheck}/checkItems/${id}?key=${Key}&token=${Token}`;

  axios
    .delete(url)
    .then(({ data }) => {
      HandleChangelist(data);
    })
    .catch(({ message }) => {
      console.log(message + ' unable to Delete Item');
    });
};

export const MarkCheckbox = (id, idCard, state, HandleError) => {
  const url = `https://api.trello.com/1/cards/${idCard}/checkItem/${id}?key=${Key}&token=${Token}&state=${state}`;

  axios
    .put(url)
    .then(() => {
      console.log('successful');
    })
    .catch(({ message }) => {
      HandleError(message + ' unable to update ');
    });
};

export const getcheckItem = (idCheck, HandleCheck) => {
  const url = `https://api.trello.com/1/checklists/${idCheck}?key=${Key}&token=${Token}`;

  axios
    .get(url)
    .then(({ data }) => {
      HandleCheck(data);
    })
    .catch(({ message }) => {
      console.log(message + ' unable to fetch checkitem');
    });
};

export const deleteChecklist = (
  idCheck,
  HandleChange,
  HandleError
) => {
  const url = `https://api.trello.com/1/checklists/${idCheck}?key=${Key}&token=${Token}`;

  axios
    .delete(url)
    .then(() => {
      HandleChange();
    })
    .catch(({ message }) => {
      HandleError(message + ' unable to delete checklist');
    });
};

export const createchecktask = (
  idCheck,
  name,
  HandleData,
  HandleError
) => {
  const url = `https://api.trello.com/1/checklists/${idCheck}/checkItems?name=${name}&key=${Key}&token=${Token}`;

  axios
    .post(url)
    .then(({ data }) => {
      HandleData(data);
    })
    .catch(({ message }) => {
      HandleError(message + ' unable to create check task');
    });
};

export const CreateList = (
  name,
  idBoard,
  HandleData,
  HandleError,
  HandleSuccess
) => {
  const url = `https://api.trello.com/1/lists?name=${name}&idBoard=${idBoard}&key=${Key}&token=${Token}`;

  axios
    .post(url)
    .then(({ data }) => {
      HandleData(data);
      HandleSuccess('successfully created the list');
    })
    .catch(({ message }) => {
      console.log(message);
      HandleError(message + ' unable to create list');
    });
};

export const fetcherCreater = (
  id,
  text,
  HandleData,
  HandleError,
  HandleSuccess
) => {
  const data = {
    idList: id,
    name: text,
    key: Key,
    token: Token,
  };
  const url = 'https://api.trello.com/1/cards';
  axios
    .post(url, data)
    .then(({ data }) => {
      HandleData(data);
      HandleSuccess('Successfully created the card');
    })
    .catch(({ message }) => {
      HandleError(message + ' unable to fetch data');
    });
};

export const Deletecard = (
  id,
  HandleDelete,
  HandleError,
  HandleSuccess
) => {
  const url = `https://api.trello.com/1/cards/${id}?key=${Key}&token=${Token}`;

  axios
    .delete(url)
    .then(() => {
      HandleDelete();
      HandleSuccess('Successfully deleted the card');
    })
    .catch(({ message }) => {
      HandleError(message + ' unable to Archive card');
    });
};

export const archiveAllCards = (id, HandleArchive, HandleError) => {
  const url = `https://api.trello.com/1/lists/${id}/archiveAllCards?key=${Key}&token=${Token}`;

  axios
    .post(url)
    .then(() => {
      HandleArchive([]);
    })
    .catch(({ message }) => {
      HandleError(message + ' unable to archive all cards');
    });
};

export const archiveList = (
  listId,
  HandleArchiveList,
  HandleError
) => {
  axios
    .put(
      `https://api.trello.com/1/lists/${listId}/closed?key=${Key}&token=${Token}&value=true`
    )
    .then(() => {
      HandleArchiveList();
    })
    .catch(({ message }) => {
      HandleError(message + ' unable to archive list');
    });
};

export function GetListInBoard(id, HandleData) {
  const url = `https://api.trello.com/1/boards/${id}/lists?key=${Key}&token=${Token}`;
  axios
    .get(url)
    .then(({ data }) => {
      HandleData(data);
    })
    .catch(({ message }) => {
      console.log(message + ' unable to fetch list in boards');
    });
}

export const getCardsData = (id, HandleData) => {
  const url = ` https://api.trello.com/1/lists/${id}/cards?key=${Key}&token=${Token}`;

  axios
    .get(url)
    .then(({ data }) => {
      HandleData(data);
    })
    .catch(({ message }) => {
      console.log(message + ' unable to fetch cardsData');
    });
};
