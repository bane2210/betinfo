import React from "react";
import classes from "./CompetitionsButton.module.css";

import correct from "../../../../../../assets/images/correct_250.png";

interface Prop {
    key: React.Key | null | undefined;
    click: () => void;
    name: string;
    value: any;
}
const oddsTimeButton: React.FunctionComponent<Prop> = (props) => {
  let style = classes.container;
  let name = props.name;

  if (props.value) {
    style = classes.container + " " + classes.Active;
  }

  let yesNo: string | JSX.Element = "";

  if (props.value) {
    yesNo = (
      <div className={classes.final}>
        <img className={classes.correct} src={correct} alt="correct" />
      </div>
    );
  }

  return (
    <div className={style} onClick={props.click}>
      <div className={classes.content}>{name}</div>
      {yesNo}
    </div>
  );
};

export default oddsTimeButton;
