import { useContext, useEffect, useRef } from "react";
import "./App.css";
import NotesContainer from "./components/NotesContainer";
import { NotesContext } from "./context/notes-context";

function App() {
  const notesCtx = useContext(NotesContext);
  const notesDisplay = useRef();

  useEffect(() => {
    notesCtx.loadNotesData();
  }, []);

  return (
    <>
      <header></header>
      <main>
        <div className="notes-display" ref={notesDisplay}>
          {!notesCtx.loadingData && (
            <NotesContainer container={notesDisplay.current} />
          )}
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
