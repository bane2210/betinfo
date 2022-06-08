import React, { useState } from "react";
import classes from "./FormBox.module.css";
import OverallButton from "../OverallButton/OverallButton";
import PointsGraph from "../PointsGraph/PointsGraph";
import LastGames from "../LastHomeGames/LastGames";

const FormBox = (props) => {
  const [state, setState] = useState({
    all: true,
    single: false,
  });

  const setAll = () => {
    setState(prevState => {
        return {
            ...prevState,
            all: true,
            single: false,
          };
    });
  };

  const setHome = () => {
    setState(prevState => {
        return {
            ...prevState,
            all: false,
            single: true,
          };
    });
  };

  let contentForm = "";
  const teamName = props.name;
  let brGames = 0;
  let pts = 0;

  if (state.all) {
    let arr = props.all;

    if (arr.length > 0) {
      if (arr.length > 6) {
        brGames = 6;
        contentForm = arr.slice(0, 6).map((element, index) => {
          if (element.homeTeam === teamName) {
            if (element.winnerFT === "h") {
              pts += 3;
              return (
                <span
                  key={index}
                  className={classes.W + " " + classes.standard}
                >
                  W
                </span>
              );
            } else if (element.winnerFT === "d") {
              pts += 1;
              return (
                <span
                  key={index}
                  className={classes.D + " " + classes.standard}
                >
                  D
                </span>
              );
            } else {
              return (
                <span
                  key={index}
                  className={classes.L + " " + classes.standard}
                >
                  L
                </span>
              );
            }
          } else {
            if (element.winnerFT === "a") {
              pts += 3;
              return (
                <span
                  key={index}
                  className={classes.W + " " + classes.standard}
                >
                  W
                </span>
              );
            } else if (element.winnerFT === "d") {
              pts += 1;
              return (
                <span
                  key={index}
                  className={classes.D + " " + classes.standard}
                >
                  D
                </span>
              );
            } else {
              return (
                <span
                  key={index}
                  className={classes.L + " " + classes.standard}
                >
                  L
                </span>
              );
            }
          }
        });
      } else {
        contentForm = arr.map((element, index) => {
          if (element.homeTeam === teamName) {
            if (element.winnerFT === "h") {
              brGames += 1;
              pts += 3;
              return (
                <span
                  key={index}
                  className={classes.W + " " + classes.standard}
                >
                  W
                </span>
              );
            } else if (element.winnerFT === "d") {
              brGames += 1;
              pts += 1;
              return (
                <span
                  key={index}
                  className={classes.D + " " + classes.standard}
                >
                  D
                </span>
              );
            } else {
              brGames += 1;
              return (
                <span
                  key={index}
                  className={classes.L + " " + classes.standard}
                >
                  L
                </span>
              );
            }
          } else {
            if (element.winnerFT === "a") {
              brGames += 1;
              pts += 3;
              return (
                <span
                  key={index}
                  className={classes.W + " " + classes.standard}
                >
                  W
                </span>
              );
            } else if (element.winnerFT === "d") {
              brGames += 1;
              pts += 1;
              return (
                <span
                  key={index}
                  className={classes.D + " " + classes.standard}
                >
                  D
                </span>
              );
            } else {
              brGames += 1;
              return (
                <span
                  key={index}
                  className={classes.L + " " + classes.standard}
                >
                  L
                </span>
              );
            }
          }
        });
      }
    } else {
      contentForm = <div>No matches played.</div>;
      brGames = 0;
      pts = 0;
    }
  } else {
    let arr = props.home;

    if (arr.length > 0) {
      if (arr.length > 6) {
        brGames = 6;
        contentForm = arr.slice(0, 6).map((element, index) => {
          if (element.winnerFT === "h") {
            pts += 3;
            return (
              <span key={index} className={classes.W + " " + classes.standard}>
                W
              </span>
            );
          } else if (element.winnerFT === "d") {
            pts += 1;
            return (
              <span key={index} className={classes.D + " " + classes.standard}>
                D
              </span>
            );
          } else {
            return (
              <span key={index} className={classes.L + " " + classes.standard}>
                L
              </span>
            );
          }
        });
      } else {
        contentForm = arr.map((element, index) => {
          if (element.winnerFT === "h") {
            brGames += 1;
            pts += 3;
            return (
              <span key={index} className={classes.W + " " + classes.standard}>
                W
              </span>
            );
          } else if (element.winnerFT === "d") {
            brGames += 1;
            pts += 1;
            return (
              <span key={index} className={classes.D + " " + classes.standard}>
                D
              </span>
            );
          } else {
            brGames += 1;
            return (
              <span key={index} className={classes.L + " " + classes.standard}>
                L
              </span>
            );
          }
        });
      }
    } else {
      brGames = 0;
      pts = 0;
      contentForm = <div>No matches played.</div>;
    }
  }

  return (
    <div className={classes.formBox}>
      <div className={classes.overallButtons}>
        <OverallButton o={state.all} click={setAll} name="All" />
        <OverallButton o={state.single} click={setHome} name="Home" />
      </div>
      <div className={classes.wdl}>
        Form: {contentForm}
        {brGames > 0 ? <PointsGraph g={brGames} pts={pts} /> : null}
      </div>
      <LastGames all={props.all} home={props.home} name={teamName} />
    </div>
  );
};

export default FormBox;
