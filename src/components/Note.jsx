import classes from "./Note.module.css";
import React from "react";

const Note = React.forwardRef((props, ref) => {
  const { id, title, description, style } = props;

  const hasTitle = title.trim() !== "";
  const descriptionLength = description.reduce((sum, now) => {
    return sum + now.length;
  }, 0);

  const titleStyle = {
    marginBottom: hasTitle ? ".5rem" : "0",
  };

  const descriptionStyle = {
    fontSize: !hasTitle && descriptionLength <= 20 ? "1.1rem" : "",
    WebkitLineClamp: Math.floor(Math.random() * 5) + 8,
  };

  return (
    <div className={classes.note} ref={ref} style={style}>
      <div className={classes.title} style={titleStyle}>
        {title}
      </div>
      <div className={classes.description} style={descriptionStyle}>
        {description.map((line, index) => (
          <p key={index}>{line || " "}</p>
        ))}
      </div>
    </div>
  );
});

export default Note;
