import { useContext, useRef } from "react";
import "./App.css";
import NotesContainer from "./components/NotesContainer";
import { NotesContextProvider, NotesContext } from "./context/notes-context";

function App() {
  const notesCtx = useContext(NotesContext);
  const notesDisplay = useRef();

  return (
    <NotesContextProvider>
      <header></header>
      <main>
        <div className="notes-display" ref={notesDisplay}>
          {(!notesCtx.loadingData && notesDisplay) || (
            <NotesContainer container={notesDisplay} />
          )}
        </div>
      </main>
      <footer></footer>
    </NotesContextProvider>
  );
}

export default App;
