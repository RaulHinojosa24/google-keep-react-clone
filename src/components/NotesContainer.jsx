import { useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "../context/notes-context";
import { useWindowSize } from "../hooks/use-window-size";
import Note from "./Note";
import classes from "./NotesContainer.module.css";

const NOTE_WIDTH = 240;
const NOTE_MARGINS = 16;

const CalculateContainerWidth = (columns, containerWidth) => {
  let width = "";

  if (columns <= 1) {
    width = "100%";
    return { width, columns: 1 };
  }

  let widthNeeded = columns * NOTE_WIDTH + (columns + 1) * NOTE_MARGINS;

  if (widthNeeded <= containerWidth) {
    width = widthNeeded + "px";
    return { width, columns };
  }
};

const NotesContainer = ({ container: { current: container } }) => {
  const notesCtx = useContext(NotesContext);
  const { notes: notesData, loadingData } = notesCtx;

  const { width: windowWidth } = useWindowSize();

  const [notesJSX, setNotesJSX] = useState([]);
  const notesRefs = useRef([]);

  const [notesContainerData, setNotesContainerData] = useState({
    allSet: false,
    width: null,
    columns: null,
  });

  const generateNotesJSX = () => {
    setNotesJSX(
      notesData.map((note, index) => {
        return (
          <Note
            {...note}
            key={note.id}
            ref={(el) => (notesRefs.current[index] = el)}
          ></Note>
        );
      })
    );
  };

  const generateNotesPositions = () => {
    let currentRow = 0;

    notesRefs.current.map((note, index) => {
      const actualColumn = index % notesContainerData.columns;
      if (index !== 0 && actualColumn === 0) currentRow++;

      let x = (NOTE_WIDTH + NOTE_MARGINS) * actualColumn;
      let y = 0;

      for (let i = currentRow; i > 0; i--) {
        y +=
          notesRefs.current[index - notesContainerData.columns * i]
            .offsetHeight + NOTE_MARGINS;
      }

      note.style.transform = `translate(${x}px, ${y}px)`;
      note.style.width =
        notesContainerData.columns === 1
          ? `calc(100% - ${NOTE_MARGINS * 2}px)`
          : `${NOTE_WIDTH}px`;
      note.style.margin = `${NOTE_MARGINS}px`;
    });
  };

  useEffect(() => {
    if (container && windowWidth) {
      const CONTAINER_WIDTH = container.clientWidth;

      const newColumns = Math.floor(
        CONTAINER_WIDTH / (NOTE_WIDTH + NOTE_MARGINS * 2)
      );

      if (newColumns !== notesContainerData.columns) {
        const { width, columns } = CalculateContainerWidth(
          newColumns,
          CONTAINER_WIDTH
        );

        setNotesContainerData({
          allSet: true,
          width,
          columns,
        });
      }

      if (notesContainerData.columns === 1) {
        generateNotesPositions();
      }
    }
  }, [windowWidth]);

  useEffect(() => {
    if (notesContainerData.allSet) {
      generateNotesPositions();
    }
  }, [notesContainerData]);

  useEffect(() => {
    generateNotesJSX();
    generateNotesPositions();
  }, [notesData]);

  return (
    <div
      className={classes["notes-container"]}
      style={{ width: notesContainerData.width /*height: containerHeight*/ }}
    >
      {notesJSX}
    </div>
  );
};

export default NotesContainer;
