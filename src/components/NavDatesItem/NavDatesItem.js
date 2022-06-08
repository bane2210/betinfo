import React from "react";
import classes from "./NavDatesItem.module.css";

const navDatesItem = (props) => {

  return (
    <div
      className={
        parseInt(props.pos) === parseInt(props.position)
          ? classes.activ
          : classes.Items
      }
      onClick={() => props.change(props.date, props.pos)}
    >
      {props.name}
    </div>
  );
};

export default navDatesItem;
