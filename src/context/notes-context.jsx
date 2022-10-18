import React, { useReducer } from "react";

const DUMMY_NOTES = [
  {
    id: 0,
    title: "Title",
    description:
      "Ipsum commodo velit reprehenderit minim minim irure enim laboris tempor ex veniam fugiat pariatur elit.",
  },
  {
    id: 1,
    title: "Testing bla bla",
    description:
      "Labore mollit ut laboris laboris aliquip nostrud non ex velit minim do labore. Et adipisicing anim aliqua tempor fugiat. Sunt ullamco pariatur laboris id cupidatat veniam pariatur ut sint sint. Cillum sunt fugiat magna id consectetur sunt duis commodo sint laborum cillum culpa.",
  },
  {
    id: 2,
    title: "Title",
    description:
      "Ipsum commodo velit reprehenderit minim minim irure enim laboris tempor ex veniam fugiat pariatur elit.",
  },
  {
    id: 3,
    title: "Testing bla bla",
    description:
      "Labore mollit ut laboris laboris aliquip nostrud non ex velit minim do labore. Et adipisicing anim aliqua tempor fugiat. Sunt ullamco pariatur laboris id cupidatat veniam pariatur ut sint sint. Cillum sunt fugiat magna id consectetur sunt duis commodo sint laborum cillum culpa.",
  },
  {
    id: 4,
    title: "Title",
    description:
      "Ipsum commodo velit reprehenderit minim minim irure enim laboris tempor ex veniam fugiat pariatur elit.",
  },
  {
    id: 5,
    title: "Testing bla bla",
    description:
      "Labore mollit ut laboris laboris aliquip nostrud non ex velit minim do labore. Et adipisicing anim aliqua tempor fugiat. Sunt ullamco pariatur laboris id cupidatat veniam pariatur ut sint sint. Cillum sunt fugiat magna id consectetur sunt duis commodo sint laborum cillum culpa.",
  },
  {
    id: 6,
    title: "Title",
    description:
      "Ipsum commodo velit reprehenderit minim minim irure enim laboris tempor ex veniam fugiat pariatur elit.",
  },
  {
    id: 7,
    title: "Testing bla bla",
    description:
      "Labore mollit ut laboris laboris aliquip nostrud non ex velit minim do labore. Et adipisicing anim aliqua tempor fugiat. Sunt ullamco pariatur laboris id cupidatat veniam pariatur ut sint sint. Cillum sunt fugiat magna id consectetur sunt duis commodo sint laborum cillum culpa.",
  },
  {
    id: 8,
    title: "Title",
    description:
      "Ipsum commodo velit reprehenderit minim minim irure enim laboris tempor ex veniam fugiat pariatur elit.",
  },
  {
    id: 9,
    title: "Testing bla bla",
    description:
      "Labore mollit ut laboris laboris aliquip nostrud non ex velit minim do labore. Et adipisicing anim aliqua tempor fugiat. Sunt ullamco pariatur laboris id cupidatat veniam pariatur ut sint sint. Cillum sunt fugiat magna id consectetur sunt duis commodo sint laborum cillum culpa.",
  },
  {
    id: 10,
    title: "Title",
    description:
      "Ipsum commodo velit reprehenderit minim minim irure enim laboris tempor ex veniam fugiat pariatur elit.",
  },
  {
    id: 11,
    title: "Testing bla bla",
    description:
      "Labore mollit ut laboris laboris aliquip nostrud non ex velit minim do labore. Et adipisicing anim aliqua tempor fugiat. Sunt ullamco pariatur laboris id cupidatat veniam pariatur ut sint sint. Cillum sunt fugiat magna id consectetur sunt duis commodo sint laborum cillum culpa.",
  },
  {
    id: 12,
    title: "Title",
    description:
      "Ipsum commodo velit reprehenderit minim minim irure enim laboris tempor ex veniam fugiat pariatur elit.",
  },
  {
    id: 13,
    title: "Testing bla bla",
    description:
      "Labore mollit ut laboris laboris aliquip nostrud non ex velit minim do labore. Et adipisicing anim aliqua tempor fugiat. Sunt ullamco pariatur laboris id cupidatat veniam pariatur ut sint sint. Cillum sunt fugiat magna id consectetur sunt duis commodo sint laborum cillum culpa.",
  },
];

const notesReducer = (prevState, action) => {
  switch (action.type) {
    case "LOAD_NOTES_DATA":
      let localStorageData = localStorage.getItem("NOTES_DATA");
      let notes = localStorageData ? JSON.parse(localStorageData) : DUMMY_NOTES;

      return {
        ...prevState,
        notes: notes,
      };
    case "SET_LOADING":
      return {
        ...prevState,
        loadingData: action.payload,
      };
    default:
      return {
        prevState,
      };
  }
};

export const NotesContext = React.createContext({
  notes: [],
  loadingData: true,
  loadNotesData: () => {},
});

export const NotesContextProvider = ({ children }) => {
  const [notesState, dispatchNotes] = useReducer(notesReducer, {
    notes: [],
    loadingData: true,
  });

  const loadNotesData = () => {
    dispatchNotes({ type: "SET_LOADING", payload: true });
    dispatchNotes({ type: "LOAD_NOTES_DATA" });
    dispatchNotes({ type: "SET_LOADING", payload: false });
  };

  return (
    <NotesContext.Provider value={{ ...notesState, loadNotesData }}>
      {children}
    </NotesContext.Provider>
  );
};
