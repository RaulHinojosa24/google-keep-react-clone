import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";

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
