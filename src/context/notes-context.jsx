import React, { useEffect, useReducer } from "react";
import { useWindowSize } from "../hooks/use-window-size";

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
      return {
        ...prevState,
        notes: DUMMY_NOTES,
        loadingData: false,
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
  noteWidth: 240,
  noteMargin: 16,
});

export const NotesContextProvider = (props) => {
  const [notesState, dispatchNotes] = useReducer(notesReducer, {
    notes: [],
    loadingData: true,
    noteWidth: 240,
    noteMargin: 16,
  });

  useEffect(() => {
    dispatchNotes({ type: "LOAD_NOTES_DATA" });
  }, []);

  return (
    <NotesContext.Provider value={notesState}>
      {props.children}
    </NotesContext.Provider>
  );
};
