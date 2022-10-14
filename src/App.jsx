import { useEffect, useState } from "react";
import "./App.css";
import NotesContainer from "./components/NotesContainer";
import { useWindowSize } from "./hooks/use-window-size";

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
  const [notes, setNotes] = useState(DUMMY_NOTES);
  const { width: windowWidth } = useWindowSize();
  const [notesContainerData, setNotesContainerData] = useState({
    width: 0,
    fittingNotes: 0,
  });

  const newNoteHandler = (note) => {
    setNotes((prevState) => {
      return [
        ...prevState,
        {
          id: prevState.length,
          ...note,
        },
      ];
    });
  };

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
    <>
      <header></header>
      <main>
        <NotesContainer
          notes={notes}
          onNewNote={newNoteHandler}
          containerData={notesContainerData}
        />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
