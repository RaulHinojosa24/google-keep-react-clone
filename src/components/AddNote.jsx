import { useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "../context/notes-context";
import useResizableTextarea from "../hooks/use-resizable-textarea";
import classes from "./AddNote.module.css";

const AddNote = () => {
  const [isFormActive, setIsFormActive] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const titleRef = useRef();
  const descriptionRef = useRef();
  useResizableTextarea(descriptionRef.current, description);

  const notesCtx = useContext(NotesContext);

  const submitHandler = (event) => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value.split("\n");
    console.log(description);

    const anyContent = [title, ...description].some(
      (text) => text.trim() !== ""
    );

    console.log(description);
    if (anyContent) {
      notesCtx.addNote({
        title,
        description,
      });
    }

    setTitle("");
    setDescription("");
    event?.target.blur();
  };

  const formFocusHandler = (event) => {
    setIsFormActive(true);
  };
  const formBlurHandler = (event) => {
    const currentTarget = event.currentTarget;

    requestAnimationFrame(() => {
      if (!currentTarget.contains(document.activeElement)) {
        submitHandler();
        setIsFormActive(false);
      }
    });
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  useEffect(() => {}, [description]);

  return (
    <div className={classes["add-note-container"]}>
      <div
        className={classes["add-note-body"]}
        onFocus={formFocusHandler}
        onBlur={formBlurHandler}
        tabIndex="0"
      >
        <div className={classes.inputs}>
          <input
            className={classes.title}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            ref={titleRef}
            type="text"
            name="title"
            placeholder="Title"
            style={!isFormActive ? { display: "none" } : {}}
          />
          <textarea
            className={classes.description}
            onChange={descriptionChangeHandler}
            value={description}
            ref={descriptionRef}
            rows="1"
            placeholder="Take a note..."
          ></textarea>
        </div>
        <div
          className={classes.actions}
          style={!isFormActive ? { display: "none" } : {}}
        >
          <div className={classes.toolbar}>
            <button className={classes.action}>1</button>
            <button className={classes.action}>2</button>
            <button className={classes.action}>3</button>
          </div>
          <button className={classes.close} onClick={submitHandler}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
