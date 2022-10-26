import { useContext, useEffect, useRef } from "react";
import "./App.css";
import AddNote from "./components/AddNote";
import NotesContainer from "./components/NotesContainer";
import { NotesContext } from "./context/notes-context";
import Navbar from "./UI/Navbar";

function App() {
  const notesCtx = useContext(NotesContext);
  const notesDisplay = useRef();

  useEffect(() => {
    notesCtx.loadNotesData();
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div ref={notesDisplay} style={{ minWidth: "344px" }}>
          <AddNote />
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
