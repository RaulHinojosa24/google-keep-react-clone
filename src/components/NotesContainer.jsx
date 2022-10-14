import { useEffect, useRef, useState } from "react";
import Note from "./Note";
import classes from "./NotesContainer.module.css";

const NotesContainer = (props) => {
  const [notes, setNotes] = useState([]);
  const notesRefs = useRef([]);

  const {
    width: containerWidth,
    fittingNotes: columns,
    noteWidth,
    noteMargins,
  } = props.containerData;

  useEffect(() => {
    // const mappedNotes = props.notes.map((note, index) => {
    //   let x = "0px";
    //   let y = "0px";
    //   const actualColumn = index % columns;

    //   return (
    //     <Note
    //       {...note}
    //       key={note.id}
    //       ref={(el) => (notesRefs.current[index] = el)}
    //     ></Note>
    //   );
    // });
    let currentRow = 0;

    const mappedNotes = props.notes.map((note, index) => {
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

    setNotes(mappedNotes);
  }, [props.notes, columns, noteWidth, noteMargins]);

  return (
    <div
      className={classes["notes-container"]}
      style={{ width: containerWidth }}
    >
      {notes}
    </div>
  );
};

export default NotesContainer;
