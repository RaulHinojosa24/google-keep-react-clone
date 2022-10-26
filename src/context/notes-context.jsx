import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";

const DUMMY_NOTES = [
  {
    id: 0,
    title: "Title",
    description: [
      "Ipsum commodo velit reprehenderit minim minim irure enim laboris tempor ex veniam fugiat pariatur elit.",
    ],
  },
  {
    id: 1,
    title: "Testing bla bla",
    description: [
      "Labore mollit ut laboris laboris aliquip nostrud non ex velit minim do labore. Et adipisicing anim aliqua tempor fugiat. Sunt ullamco pariatur laboris id cupidatat veniam pariatur ut sint sint. Cillum sunt fugiat magna id consectetur sunt duis commodo sint laborum cillum culpa.",
    ],
  },
  {
    id: 2,
    title: "Title",
    description: [
      "Ipsum commodo velit reprehenderit minim minim irure enim laboris tempor ex veniam fugiat pariatur elit.",
    ],
  },
  {
    id: 3,
    title: "Testing bla bla",
    description: [
      "Labore mollit ut laboris laboris aliquip nostrud non ex velit minim do labore. Et adipisicing anim aliqua tempor fugiat. Sunt ullamco pariatur laboris id cupidatat veniam pariatur ut sint sint. Cillum sunt fugiat magna id consectetur sunt duis commodo sint laborum cillum culpa.",
    ],
  },
  {
    id: 4,
    title: "Title",
    description: [
      "Ipsum commodo velit reprehenderit minim minim irure enim laboris tempor ex veniam fugiat pariatur elit.",
    ],
  },
  {
    id: 5,
    title: "Testing bla bla",
    description: [
      "Labore mollit ut laboris laboris aliquip nostrud non ex velit minim do labore. Et adipisicing anim aliqua tempor fugiat. Sunt ullamco pariatur laboris id cupidatat veniam pariatur ut sint sint. Cillum sunt fugiat magna id consectetur sunt duis commodo sint laborum cillum culpa.",
    ],
  },
  {
    id: 6,
    title: "Title",
    description: [
      "Ipsum commodo velit reprehenderit minim minim irure enim laboris tempor ex veniam fugiat pariatur elit.",
    ],
  },
  {
    id: 7,
    title: "Testing bla bla",
    description: [
      "Labore mollit ut laboris laboris aliquip nostrud non ex velit minim do labore. Et adipisicing anim aliqua tempor fugiat. Sunt ullamco pariatur laboris id cupidatat veniam pariatur ut sint sint. Cillum sunt fugiat magna id consectetur sunt duis commodo sint laborum cillum culpa.",
    ],
  },
  {
    id: 8,
    title: "Title",
    description: [
      "Ipsum commodo velit reprehenderit minim minim irure enim laboris tempor ex veniam fugiat pariatur elit.",
    ],
  },
  {
    id: 9,
    title: "Testing bla bla",
    description: [
      "Labore mollit ut laboris laboris aliquip nostrud non ex velit minim do labore. Et adipisicing anim aliqua tempor fugiat. Sunt ullamco pariatur laboris id cupidatat veniam pariatur ut sint sint. Cillum sunt fugiat magna id consectetur sunt duis commodo sint laborum cillum culpa.",
    ],
  },
  {
    id: 10,
    title: "Title",
    description: [
      "Ipsum commodo velit reprehenderit minim minim irure enim laboris tempor ex veniam fugiat pariatur elit.",
    ],
  },
  {
    id: 11,
    title: "Testing bla bla",
    description: [
      "Labore mollit ut laboris laboris aliquip nostrud non ex velit minim do labore. Et adipisicing anim aliqua tempor fugiat. Sunt ullamco pariatur laboris id cupidatat veniam pariatur ut sint sint. Cillum sunt fugiat magna id consectetur sunt duis commodo sint laborum cillum culpa.",
    ],
  },
  {
    id: 12,
    title: "Title",
    description: [
      "Ipsum commodo velit reprehenderit minim minim irure enim laboris tempor ex veniam fugiat pariatur elit.",
    ],
  },
  {
    id: 13,
    title: "Testing bla bla",
    description: [
      "Labore mollit ut laboris laboris aliquip nostrud non ex velit minim do labore. Et adipisicing anim aliqua tempor fugiat. Sunt ullamco pariatur laboris id cupidatat veniam pariatur ut sint sint. Cillum sunt fugiat magna id consectetur sunt duis commodo sint laborum cillum culpa.",
    ],
  },
];

const notesReducer = (prevState, action) => {
  const actionType = action.type;

  if (actionType === "LOAD_NOTES_DATA") {
    const localStorageData = localStorage.getItem("NOTES_DATA");
    const notes = localStorageData ? JSON.parse(localStorageData) : [];

    return {
      ...prevState,
      notes: notes,
      loadingData: false,
    };
  }
  if (actionType === "SET_LOADING") {
    return {
      ...prevState,
      loadingData: true,
    };
  }
  if (actionType === "ADD_NOTE") {
    const note = {
      id: uuid(),
      ...action.payload,
    };

    const localStorageData = localStorage.getItem("NOTES_DATA");
    const notes = localStorageData ? JSON.parse(localStorageData) : [];
    const newNotes = [note, ...notes];
    localStorage.setItem("NOTES_DATA", JSON.stringify(newNotes));

    return {
      ...prevState,
      notes: newNotes,
    };
  }
  return prevState;
};

export const NotesContext = React.createContext({
  notes: [],
  loadingData: true,
  loadNotesData: () => {},
  addNote: () => {},
});

export const NotesContextProvider = ({ children }) => {
  const [notesState, dispatchNotes] = useReducer(notesReducer, {
    notes: [],
    loadingData: true,
  });

  const loadNotesData = () => {
    dispatchNotes({ type: "SET_LOADING" });
    dispatchNotes({ type: "LOAD_NOTES_DATA" });
  };

  const addNote = (note) => {
    dispatchNotes({ type: "ADD_NOTE", payload: note });
  };

  return (
    <NotesContext.Provider value={{ ...notesState, loadNotesData, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};
