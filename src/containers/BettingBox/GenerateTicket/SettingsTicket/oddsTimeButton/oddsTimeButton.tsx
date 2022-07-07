import React from "react";
import classes from "./oddsTimeButton.module.css";

import correct from "../../../../../assets/images/correct_250.png";

const oddsTimeButton: React.FC<{
  key: React.Key | null | undefined;
  yesNo: boolean;
  name: string;
  oddsTimeClick: () => void;
  type: number;
}> = (props) => {
  let style = classes.container;
  let name = props.name;

  if (props.type === 2) {
    name = "Next " + props.name + "h";
  }

  if (props.yesNo) {
    style = classes.container + " " + classes.Active;
  }

  let yesNo: string | JSX.Element = "";

  if (props.yesNo) {
    yesNo = (
      <div className={classes.final}>
        <img className={classes.correct} src={correct} alt="correct" />
      </div>
    );
  }

  return (
    <div className={style} onClick={props.oddsTimeClick}>
      <div className={classes.content}>{name}</div>
      {yesNo}
    </div>
  );
};

export default oddsTimeButton;
