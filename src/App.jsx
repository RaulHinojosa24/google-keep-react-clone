import { useContext, useEffect, useState } from "react";
import "./App.css";
import NotesContainer from "./components/NotesContainer";
import { NotesContextProvider, NotesContext } from "./context/notes-context";
import { useWindowSize } from "./hooks/use-window-size";

const NOTE_WIDTH = 240;
const NOTE_MARGINS = 16;

const CalculateContainerWidth = (fittingNotes, windowWidth) => {
  let width = "";

  if (fittingNotes <= 1) {
    width = "100%";
    return { width, fittingNotes: 1 };
  }

  let widthNeeded =
    fittingNotes * NOTE_WIDTH + (fittingNotes + 1) * NOTE_MARGINS;

  if (widthNeeded <= windowWidth) {
    width = widthNeeded + "px";
    return { width, fittingNotes };
  }

  fittingNotes--;

  if (fittingNotes <= 1) {
    width = "100%";
    return { width, fittingNotes: 1 };
  } else {
    widthNeeded = fittingNotes * NOTE_WIDTH + (fittingNotes + 1) * NOTE_MARGINS;
    width = widthNeeded + "px";
    return { width, fittingNotes };
  }
};

function App() {
  const notesCtx = useContext(NotesContext);
  const { width: windowWidth } = useWindowSize();
  const [notesContainerData, setNotesContainerData] = useState({
    width: 0,
    fittingNotes: 0,
  });

  useEffect(() => {
    const newFittingNotes = Math.floor(
      windowWidth / (NOTE_WIDTH + NOTE_MARGINS * 2)
    );

    if (newFittingNotes !== notesContainerData.fittingNotes) {
      const { width, fittingNotes } = CalculateContainerWidth(
        newFittingNotes,
        windowWidth
      );

      setNotesContainerData({
        width,
        fittingNotes,
        noteWidth: NOTE_WIDTH,
        noteMargins: NOTE_MARGINS,
      });
    }
  }, [windowWidth]);

  return (
    <NotesContextProvider>
      <header></header>
      <main>
        {!notesCtx.loadingData || (
          <NotesContainer containerData={notesContainerData} />
        )}
      </main>
      <footer></footer>
    </NotesContextProvider>
  );
}

export default App;
