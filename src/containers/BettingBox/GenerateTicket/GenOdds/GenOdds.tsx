import React from "react";
import classes from "./GenOdds.module.css";

const genOdds: React.FC<{
  value: any;
  name: string;
  click: (() => {}) | (() => void);
  content: string;
}> = (props) => {
  const name = props.name;
  const content = props.content;

  return (
    <div className={classes.genOdds} onClick={props.click}>
      <div className={classes.topOdds}>{name}</div>
      <div className={classes.bottomOdds}>{content}</div>
    </div>
  );
};

export default genOdds;
