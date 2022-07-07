import React from "react";
import classes from "./SortBy.module.css";

type Prop<T, U> = {
  key: T;
  current: number;
  name: T;
  br: number;
  click: U;
};

const sortBy = (props: Prop<string, () => void>) => {
  let style = classes.element;

  if (props.current === props.br) {
    style = classes.element + " " + classes.Active;
  }

  return (
    <div className={style} onClick={props.click}>
      {props.name}
    </div>
  );
};

export default sortBy;
