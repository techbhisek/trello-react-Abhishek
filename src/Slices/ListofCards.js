import { createSlice } from '@reduxjs/toolkit';

let ListofCards = createSlice({
  name: 'ListofCards',
  initialState: {
    ListofCards: {},
  },
  reducers: {
    getCards: (state, action) => {
      state.ListofCards = {
        ...state.ListofCards,
        [action.payload.id]: action.payload.ListofCards,
      };
    },
    addCards: (state, action) => {
      state.ListofCards = {
        ...state.ListofCards,
        [action.payload.id]: [
          ...state.ListofCards[action.payload.id],
          action.payload.newCard,
        ],
      };
    },
    deleteCards: (state, action) => {
      let data = state.ListofCards[action.payload.idList].filter(
        (card) => card.id != action.payload.idCard
      );
      state.ListofCards = {
        ...state.ListofCards,
        [action.payload.idList]: data,
      };
    },
    archiveAll: (state, action) => {
      state.ListofCards = {
        ...state.ListofCards,
        [action.payload.idList]: [],
      };
    },
  },
});

export const { getCards, addCards, deleteCards, archiveAll } =
  ListofCards.actions;
export default ListofCards.reducer;
