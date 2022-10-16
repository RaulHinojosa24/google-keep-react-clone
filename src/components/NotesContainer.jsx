import { useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "../context/notes-context";
import Note from "./Note";
import classes from "./NotesContainer.module.css";

const NotesContainer = (props) => {
  const notesCtx = useContext(NotesContext);
  const { notes: notesData } = notesCtx;
  const [notes, setNotes] = useState([]);
  const notesRefs = useRef([]);

  const {
    width: containerWidth,
    fittingNotes: columns,
    noteWidth,
    noteMargins,
  } = props.containerData;

  const generateNotesWithPositions = () => {
    let currentRow = 0;

    const mappedNotes = notesData.map((note, index) => {
      const actualColumn = index % columns;
      if (index !== 0 && actualColumn === 0) currentRow++;

      let x = (noteWidth + noteMargins) * actualColumn;
      let y = 0;

      for (let i = currentRow; i > 0; i--) {
        y += notesRefs.current[index - columns * i].offsetHeight + noteMargins;
      }

      const style = {
        transform: `translate(${x}px, ${y}px)`,
      };

      return (
        <Note
          {...note}
          key={note.id}
          ref={(el) => (notesRefs.current[index] = el)}
          style={style}
        ></Note>
      );
    });

    return mappedNotes;
  };

  useEffect(() => {
    setNotes(generateNotesWithPositions());
  }, [notesData, columns, noteWidth, noteMargins]);

  return (
    <div
      className={classes["notes-container"]}
      style={{ width: containerWidth /*height: containerHeight*/ }}
    >
      {notes}
    </div>
  );
};

export default NotesContainer;
