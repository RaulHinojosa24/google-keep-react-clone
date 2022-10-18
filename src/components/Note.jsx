import classes from "./Note.module.css";
import React from "react";

const Note = React.forwardRef((props, ref) => {
  const { id, title, description, style } = props;

  return (
    <div className={classes.note} ref={ref} style={style}>
      <p className={classes.title}>{title}</p>
      <p className={classes.description}>{description}</p>
    </div>
  );
});

export default Note;
