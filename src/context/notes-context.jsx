import React, { useState } from "react";

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
];

export const NotesContext = React.createContext({
  notes: [],
  onNewNote: () => {},
});

export const NotesContextProvider = (props) => {
  const [notes, setNotes] = useState(DUMMY_NOTES);

  const newNoteHandler = (note) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        {
          ...note,
          id: prevNotes.length,
        },
      ];
    });
  };

  return (
    <NotesContext.Provider
      value={{
        notes: notes,
        onNewNote: newNoteHandler,
      }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};
