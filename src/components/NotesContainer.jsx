import { useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "../context/notes-context";
import { useWindowSize } from "../hooks/use-window-size";
import Note from "./Note";
import classes from "./NotesContainer.module.css";

const MOBILE_NOTE_WIDTH = 200;
const MOBILE_NOTE_MARGINS = 8;
const DESKTOP_NOTE_WIDTH = 240;
const DESKTOP_NOTE_MARGINS = 16;

const CalculateContainerWidth = (columns, containerWidth) => {
  let width = "";

  if (columns <= 1) {
    width = "100%";
    return { width, columns: 1 };
  }

  let widthNeeded =
    columns * DESKTOP_NOTE_WIDTH + (columns + 1) * DESKTOP_NOTE_MARGINS;

  if (widthNeeded <= containerWidth) {
    width = widthNeeded + "px";
    return { width, columns };
  }
};

const NotesContainer = ({ container }) => {
  const notesCtx = useContext(NotesContext);
  const { notes: notesData, loadingData } = notesCtx;

  const { width: windowWidth } = useWindowSize();

  const notesRefs = useRef([]);
  const [refCounter, setRefCounter] = useState(0);

  const [notesJSX, setNotesJSX] = useState([]);
  const [containerHeight, setContainerHeight] = useState("");

  const [notesContainerData, setNotesContainerData] = useState({
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
            // ref={(el) => (notesRefs.current[index] = el)}
            ref={(el) => {
              notesRefs.current[index] = el;
              setRefCounter((prev) => prev + 1);
            }}
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

      let x = (DESKTOP_NOTE_WIDTH + DESKTOP_NOTE_MARGINS) * actualColumn;
      let y = 0;

      for (let i = currentRow; i > 0; i--) {
        y +=
          notesRefs.current[index - notesContainerData.columns * i]
            .offsetHeight + DESKTOP_NOTE_MARGINS;
      }

      note.style.transform = `translate(${x}px, ${y}px)`;
      note.style.width =
        notesContainerData.columns === 1
          ? `calc(100% - ${DESKTOP_NOTE_MARGINS * 2}px)`
          : `${DESKTOP_NOTE_WIDTH}px`;
      note.style.margin = `${DESKTOP_NOTE_MARGINS}px`;
      note.style.opacity = `1`;
    });
  };

  const generateContainerHeight = () => {
    const columnHeights = new Array(notesContainerData.columns).fill(
      DESKTOP_NOTE_MARGINS
    );

    notesRefs.current.map((note, index) => {
      const actualColumn = index % notesContainerData.columns;
      columnHeights[actualColumn] += note.offsetHeight + DESKTOP_NOTE_MARGINS;
    });

    setContainerHeight(Math.max(...columnHeights) + "px");
  };

  useEffect(() => {
    if (container && windowWidth) {
      const CONTAINER_WIDTH = container.clientWidth;

      const newColumns = Math.floor(
        CONTAINER_WIDTH / (DESKTOP_NOTE_WIDTH + DESKTOP_NOTE_MARGINS * 2)
      );

      if (newColumns !== notesContainerData.columns) {
        const { width, columns } = CalculateContainerWidth(
          newColumns,
          CONTAINER_WIDTH
        );

        setNotesContainerData({
          width,
          columns,
        });
      }

      if (notesContainerData.columns === 1) {
        generateNotesPositions();
        generateContainerHeight();
      }
    }
  }, [windowWidth]);

  useEffect(() => {
    generateNotesPositions();
    generateContainerHeight();
  }, [notesContainerData]);

  useEffect(() => {
    notesRefs.current = notesRefs.current.slice(0, notesData.length);

    generateNotesJSX();
  }, [notesData]);

  useEffect(() => {
    generateNotesPositions();
    generateContainerHeight();
  }, [refCounter]);

  return (
    <div
      className={classes["notes-container"]}
      style={{ width: notesContainerData.width, height: containerHeight }}
    >
      {notesData !== 0 && notesJSX}
      {}
    </div>
  );
};

export default NotesContainer;
