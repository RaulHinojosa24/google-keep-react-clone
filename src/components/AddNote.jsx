import { useRef, useState } from "react";
import classes from "./AddNote.module.css";

const AddNote = () => {
  const [isFormActive, setIsFormActive] = useState(false);
  const [descriptionContent, setDescriptionContent] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(descriptionRef.current.innerHTML);
  };

  const formFocusHandler = () => {
    setIsFormActive(true);
  };
  const formBlurHandler = () => {
    setIsFormActive(false);
  };
  const descriptionChangeHandler = (event) => {
    let content = event.target.value;
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    // setDescriptionContent(content);
  };

  return (
    <div
      className={classes["add-note-container"]}
      onFocus={formFocusHandler}
      onBlur={formBlurHandler}
    >
      <form action="#" onSubmit={submitHandler} className={classes.form}>
        <div className={classes["description"]}>
          {descriptionContent}
          <textarea
            className={classes["content"]}
            onInput={descriptionChangeHandler}
            placeholder="Añade una nota..."
            rows="1"
          ></textarea>
        </div>
        <button type="submit">Add note</button>
      </form>
    </div>
  );
};

export default AddNote;
