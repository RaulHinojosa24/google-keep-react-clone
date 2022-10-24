import classes from "./Note.module.css";
import React from "react";

const Note = React.forwardRef((props, ref) => {
  const { id, title, description, style } = props;

  return (
    <div className={classes.note} ref={ref} style={style}>
      <div className={classes.title}>{title}</div>
      <div className={classes.description}>
        {description.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
});

export default Note;
