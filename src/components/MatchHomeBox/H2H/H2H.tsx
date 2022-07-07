import React, { useState } from "react";
import classes from "./H2H.module.css";
import Title from "../TittleTemplateBox/TittleTemplateBox";
import { GameResponseType } from "../../Backdrop/Backdrop";

interface Prop {
  object: GameResponseType[];
  name: string;
}

const H2H = (props: Prop) => {
  const [state, setState] = useState({
    start: 0,
    end: 6,
  });

  const setStateDefault = (start: number, end: number) => {
    setState((prevState) => {
      return {
        ...prevState,
        start: start,
        end: end,
      };
    });
  };

  const load6less = () => {
    const max = props.object.length;

    if (state.end > 6 && state.end !== max) {
      const start = state.start - 6;
      const end = state.end - 6;
      setStateDefault(start, end);
    } else if (state.end === max) {
      const start = state.start - 6;
      let end = state.end - (max % 6);
      if (max % 6 === 0) {
        end = state.end - 6;
      }
      setStateDefault(start, end);
    }
  };

  const load6more = () => {
    const max = props.object.length;

    if (state.end + 6 < max) {
      const start = state.start + 6;
      const end = state.end + 6;
      setStateDefault(start, end);
    } else if (state.end !== max) {
      const start = state.start + 6;
      const end = max;
      setStateDefault(start, end);
    }
  };

  let temp = "";
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
  let day = "";
  let contentForm: "" | JSX.Element | JSX.Element[] = "";
  let contentFormNext: "" | JSX.Element | JSX.Element[] = "";
  const teamName = props.name;
  let homeTeamClass = "";
  let awayTeamClass = "";
  let seasonTemp = "";
  let seasonTempArr = [];
  const max = props.object !== null ? props.object.length : 0;

  if (props.object !== null) {
    // Ako je odigrano vise od 8 H2H meceva
    if (props.object.length > 6) {
      contentForm = props.object
        .slice(state.start, state.end)
        .map((element, index) => {
          let temp = new DOMParser().parseFromString(
            element.awayTeam,
            "text/html"
          ).body.textContent;

          if (temp) {
            element.awayTeam = temp;
          } else {
            element.awayTeam = "";
          }

          temp = new DOMParser().parseFromString(element.homeTeam, "text/html")
            .body.textContent;

          if (temp) {
            element.homeTeam = temp;
          } else {
            element.homeTeam = "";
          }

          dateTemp = new Date(element.gameDate);
          day =
            dateTemp.getDate() < 10
              ? "0" + dateTemp.getDate()
              : dateTemp.getDate().toString();

          if (element.season.includes("/")) {
            seasonTempArr = element.season.split("/");
            seasonTemp =
              seasonTempArr[0].slice(2, seasonTempArr[0].length) +
              "/" +
              seasonTempArr[1].slice(2, seasonTempArr[1].length);
          } else {
            seasonTemp = element.season;
          }

          homeTeamClass = classes.teamName;
          awayTeamClass = classes.teamName;

          if (element.homeTeam === teamName) {
            homeTeamClass = classes.teamName + " " + classes.b;

            if (element.winnerFT === "h") {
              temp = classes.W + " " + classes.s;
            } else if (element.winnerFT === "d") {
              temp = classes.D + " " + classes.s;
            } else {
              temp = classes.L + " " + classes.s;
            }
          } else {
            awayTeamClass = classes.teamName + " " + classes.b;

            if (element.winnerFT === "a") {
              temp = classes.W + " " + classes.s;
            } else if (element.winnerFT === "d") {
              temp = classes.D + " " + classes.s;
            } else {
              temp = classes.L + " " + classes.s;
            }
          }

          return (
            <div key={index} className={classes.line}>
              <span className={classes.season}>{seasonTemp}</span>
              <span className={classes.date}>
                {day + " " + months[dateTemp.getMonth()]}
              </span>
              <span className={homeTeamClass}>{element.homeTeam}</span>
              <span className={temp}>
                {element.result +
                  " (" +
                  element.homeScoreFirstHalf +
                  "-" +
                  element.awayScoreFirstHalf +
                  ")"}
              </span>
              <span className={awayTeamClass}>{element.awayTeam}</span>
            </div>
          );
        });

      contentFormNext = (
        <div className={classes.nextPrevBox}>
          <div
            style={{ opacity: state.end === max ? "0.2" : "1.0" }}
            className={classes.nextPrev}
            onClick={load6more}
          >
            {"<< Previous"}
          </div>
          <div
            style={{ opacity: state.start === 0 ? "0.2" : "1.0" }}
            className={classes.nextPrev}
            onClick={load6less}
          >
            {"Next >>"}
          </div>
        </div>
      );
    } else {
      contentForm = props.object.map((element, index) => {
        dateTemp = new Date(element.gameDate);
        day =
          dateTemp.getDate() < 10
            ? "0" + dateTemp.getDate()
            : dateTemp.getDate().toString();

        if (element.season.includes("/")) {
          seasonTempArr = element.season.split("/");
          seasonTemp =
            seasonTempArr[0].slice(2, seasonTempArr[0].length) +
            "/" +
            seasonTempArr[1].slice(2, seasonTempArr[1].length);
        } else {
          seasonTemp = element.season;
        }

        homeTeamClass = classes.teamName;
        awayTeamClass = classes.teamName;

        if (element.homeTeam === teamName) {
          homeTeamClass = classes.teamName + " " + classes.b;

          if (element.winnerFT === "h") {
            temp = classes.W + " " + classes.s;
          } else if (element.winnerFT === "d") {
            temp = classes.D + " " + classes.s;
          } else {
            temp = classes.L + " " + classes.s;
          }
        } else {
          awayTeamClass = classes.teamName + " " + classes.b;

          if (element.winnerFT === "a") {
            temp = classes.W + " " + classes.s;
          } else if (element.winnerFT === "d") {
            temp = classes.D + " " + classes.s;
          } else {
            temp = classes.L + " " + classes.s;
          }
        }

        return (
          <div key={index} className={classes.line}>
            <span className={classes.season}>{seasonTemp}</span>
            <span className={classes.date}>
              {day + " " + months[dateTemp.getMonth()]}
            </span>
            <span className={homeTeamClass}>{element.homeTeam}</span>
            <span className={temp}>
              {element.result +
                " (" +
                element.homeScoreFirstHalf +
                "-" +
                element.awayScoreFirstHalf +
                ")"}
            </span>
            <span className={awayTeamClass}>{element.awayTeam}</span>
          </div>
        );
      });
    }
  } else {
    contentForm = (
      <div className={classes.noH2H}>There are no available games.</div>
    );
  }

  return (
    <div className={classes.h2h}>
      <Title name="Head 2 Head" />
      {contentForm}
      {contentFormNext}
    </div>
  );
};

export default H2H;
