import React, { useEffect, useRef } from "react";
import classes from "./LastGames.module.css";

import OverallButton from "../OverallButton/OverallButton";
import Title from "../TittleTemplateBox/TittleTemplateBox";
import {GameResponseType} from "../../Backdrop/Backdrop"

interface Prop {
    all: [] | GameResponseType[];
    home: [] | GameResponseType[];
    name: string;

}
const LastGames = (props: Prop) => {
  const [state, setState] = React.useState({
    all: true,
    single: false,
    start: 0,
    end: 8,
    minHeight: 0,
  });

  const reference = useRef<HTMLDivElement>(null);

  useEffect(() => {
      setState(prevState => {
          return {
              ...prevState,
              minHeight: reference.current!.offsetHeight,
            };
      });
  }, []);

  const setStateDefault = (start: number, end: number) => {
    setState((prevState) => {
      return {
        ...prevState,
        start: start,
        end: end,
      };
    });
  };

  const load8less = () => {
    const max = state.all ? props.all.length : props.home.length;

    if (state.end > 8 && state.end !== max) {
      const start = state.start - 8;
      const end = state.end - 8;
      setStateDefault(start, end);
    } else if (state.end === max) {
      const start = state.start - 8;
      let end = state.end - (max % 8);
      if (max % 8 === 0) {
        end = state.end - 8;
      }
      setStateDefault(start, end);
    }
  };

  const load8more = () => {
    const max = state.all ? props.all.length : props.home.length;

    if (state.end + 8 < max) {
      const start = state.start + 8;
      const end = state.end + 8;
      setStateDefault(start, end);
    } else if (state.end !== max) {
      const start = state.start + 8;
      const end = max;
      setStateDefault(start, end);
    }
  };

  const setAll = () => {
    setState((prevState) => {
      return {
        ...prevState,
        all: true,
        single: false,
        start: 0,
        end: 8,
      };
    });
  };

  const setHome = () => {
    setState((prevState) => {
      return {
        ...prevState,
        all: false,
        single: true,
        start: 0,
        end: 8,
      };
    });
  };

  let temp = "";
  let contentForm: "" | JSX.Element | JSX.Element[] = "";
  let contentFormNext: "" | JSX.Element | JSX.Element[] = "";
  let dateTemp = null;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const teamName = props.name;
  let day = "";
  const max = state.all ? props.all.length : props.home.length;

  if (state.all) {
    let arr = props.all;

    if (arr.length > 0) {
      if (arr.length > 8) {
        contentForm = arr
          .slice(state.start, state.end)
          .map((element, index) => {
            dateTemp = new Date(element.gameDate);

            if (element.homeTeam === teamName) {
              if (element.winnerFT === "h") {
                temp = classes.W + " " + classes.s;
              } else if (element.winnerFT === "d") {
                temp = classes.D + " " + classes.s;
              } else {
                temp = classes.L + " " + classes.s;
              }

              day =
                dateTemp.getDate() < 10
                  ? "0" + dateTemp.getDate()
                  : dateTemp.getDate().toString();

              return (
                <div key={index} className={classes.line}>
                  <span className={classes.date}>
                    {day + " " + months[dateTemp.getMonth()]}
                  </span>
                  <span className={classes.teamName + " " + classes.b}>
                    {element.homeTeam}
                  </span>
                  <span className={temp}>
                    {element.result +
                      " (" +
                      element.homeScoreFirstHalf +
                      "-" +
                      element.awayScoreFirstHalf +
                      ")"}
                  </span>
                  <span className={classes.teamName}>{element.awayTeam}</span>
                </div>
              );
            } else {
              if (element.winnerFT === "a") {
                temp = classes.W + " " + classes.s;
              } else if (element.winnerFT === "d") {
                temp = classes.D + " " + classes.s;
              } else {
                temp = classes.L + " " + classes.s;
              }

              day =
                dateTemp.getDate() < 10
                  ? "0" + dateTemp.getDate()
                  : dateTemp.getDate().toString();

              return (
                <div key={index} className={classes.line}>
                  <span className={classes.date}>
                    {day + " " + months[dateTemp.getMonth()]}
                  </span>
                  <span className={classes.teamName}>{element.homeTeam}</span>
                  <span className={temp}>
                    {element.result +
                      " (" +
                      element.homeScoreFirstHalf +
                      "-" +
                      element.awayScoreFirstHalf +
                      ")"}
                  </span>
                  <span className={classes.teamName + " " + classes.b}>
                    {element.awayTeam}
                  </span>
                </div>
              );
            }
          });

        contentFormNext = (
          <div className={classes.nextPrevBox}>
            <div
              style={{ opacity: state.end === max ? "0.2" : "1.0" }}
              className={classes.nextPrev}
              onClick={load8more}
            >
              {"<< Previous"}
            </div>
            <div
              style={{ opacity: state.start === 0 ? "0.2" : "1.0" }}
              className={classes.nextPrev}
              onClick={load8less}
            >
              {"Next >>"}
            </div>
          </div>
        );
      } else {
        contentForm = arr.map((element, index) => {
          dateTemp = new Date(element.gameDate);

          if (element.homeTeam === teamName) {
            if (element.winnerFT === "h") {
              temp = classes.W + " " + classes.s;
            } else if (element.winnerFT === "d") {
              temp = classes.D + " " + classes.s;
            } else {
              temp = classes.L + " " + classes.s;
            }

            day =
              dateTemp.getDate() < 10
                ? "0" + dateTemp.getDate()
                : dateTemp.getDate().toString();

            return (
              <div key={index} className={classes.line}>
                <span className={classes.date}>
                  {day + " " + months[dateTemp.getMonth()]}
                </span>
                <span className={classes.teamName + " " + classes.b}>
                  {element.homeTeam}
                </span>
                <span className={temp}>
                  {element.result +
                    " (" +
                    element.homeScoreFirstHalf +
                    "-" +
                    element.awayScoreFirstHalf +
                    ")"}
                </span>
                <span className={classes.teamName}>{element.awayTeam}</span>
              </div>
            );
          } else {
            if (element.winnerFT === "a") {
              temp = classes.W + " " + classes.s;
            } else if (element.winnerFT === "d") {
              temp = classes.D + " " + classes.s;
            } else {
              temp = classes.L + " " + classes.s;
            }

            day =
              dateTemp.getDate() < 10
                ? "0" + dateTemp.getDate()
                : dateTemp.getDate().toString();

            return (
              <div key={index} className={classes.line}>
                <span className={classes.date}>
                  {day + " " + months[dateTemp.getMonth()]}
                </span>
                <span className={classes.teamName}>{element.homeTeam}</span>
                <span className={temp}>
                  {element.result +
                    " (" +
                    element.homeScoreFirstHalf +
                    "-" +
                    element.awayScoreFirstHalf +
                    ")"}
                </span>
                <span className={classes.teamName + " " + classes.b}>
                  {element.awayTeam}
                </span>
              </div>
            );
          }
        });
      }
    } else {
      contentForm = <div>No matches played.</div>;
    }
  } else {
    let arr = props.home;

    if (arr.length > 0) {
      if (arr.length > 8) {
        contentForm = arr
          .slice(state.start, state.end)
          .map((element, index) => {
            dateTemp = new Date(element.gameDate);

            if (element.winnerFT === "h") {
              temp = classes.W + " " + classes.s;
            } else if (element.winnerFT === "d") {
              temp = classes.D + " " + classes.s;
            } else {
              temp = classes.L + " " + classes.s;
            }

            day =
              dateTemp.getDate() < 10
                ? "0" + dateTemp.getDate()
                : dateTemp.getDate().toString();

            return (
              <div key={index} className={classes.line}>
                <span className={classes.date}>
                  {day + " " + months[dateTemp.getMonth()]}
                </span>
                <span className={classes.teamName + " " + classes.b}>
                  {element.homeTeam}
                </span>
                <span className={temp}>
                  {element.result +
                    " (" +
                    element.homeScoreFirstHalf +
                    "-" +
                    element.awayScoreFirstHalf +
                    ")"}
                </span>
                <span className={classes.teamName}>{element.awayTeam}</span>
              </div>
            );
          });

        contentFormNext = (
          <div className={classes.nextPrevBox}>
            <div
              style={{ opacity: state.end === max ? "0.2" : "1.0" }}
              className={classes.nextPrev}
              onClick={load8more}
            >
              {"<< Previous"}
            </div>
            <div
              style={{ opacity: state.start === 0 ? "0.2" : "1.0" }}
              className={classes.nextPrev}
              onClick={load8less}
            >
              {"Next >>"}
            </div>
          </div>
        );
      } else {
        contentForm = arr.map((element, index) => {
          dateTemp = new Date(element.gameDate);

          if (element.winnerFT === "h") {
            temp = classes.W + " " + classes.s;
          } else if (element.winnerFT === "d") {
            temp = classes.D + " " + classes.s;
          } else {
            temp = classes.L + " " + classes.s;
          }

          day =
            dateTemp.getDate() < 10
              ? "0" + dateTemp.getDate()
              : dateTemp.getDate().toString();

          return (
            <div key={index} className={classes.line}>
              <span className={classes.date}>
                {day + " " + months[dateTemp.getMonth()]}
              </span>
              <span className={classes.teamName + " " + classes.b}>
                {element.homeTeam}
              </span>
              <span className={temp}>
                {element.result +
                  " (" +
                  element.homeScoreFirstHalf +
                  "-" +
                  element.awayScoreFirstHalf +
                  ")"}
              </span>
              <span className={classes.teamName}>{element.awayTeam}</span>
            </div>
          );
        });
      }
    } else {
      contentForm = <div>No matches played.</div>;
    }
  }

  return (
    <div className={classes.lastGamesBox}>
      <Title name="Previous Results" />
      <div className={classes.overallButtons}>
        <OverallButton o={state.all} click={setAll} name="All" />
        <OverallButton o={state.single} click={setHome} name="Home" />
      </div>
      <div
      ref={reference}
        className={classes.lastGamesAllLines}
        style={{ height: state.minHeight ? state.minHeight : "auto" }}
      >
        {contentForm}
      </div>
      {contentFormNext}
    </div>
  );
};

export default LastGames;
