import React, { useState, useEffect } from "react";
import classes from "./singleGame.module.css";
import wrong from "../../../../../assets/images/wrong.png";
import correct from "../../../../../assets/images/correct_250.png";
import Flag from "../../../../../components/CountryLogo/CountryLogo";
import { useDispatch } from "react-redux";
import { backdropAction } from "../../../../../store/createSlice";
import ReactGA from "react-ga";

type Prop = {
  key: React.Key | null | undefined;
  element: any;
  index: number;
};

interface BackdropType {
    date: string;
    time: string;
    home: string;
    away: string;
    country: string;
    competition: string;
    simpleDate: any;
  }

const SingleGame: React.FC<Prop> = (props) => {
  const [state, setState] = useState({ open: false });
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.open) {
      setState({
        ...state,
        open: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openBackdrop = (backdropOBJ: BackdropType) => {

    ReactGA.event({
      category: "Games",
      action: "Clicked",
      label: `${backdropOBJ.home} vs ${backdropOBJ.away}`,
    });

    const yPos = document.getElementById("body")!.getBoundingClientRect().top;

    dispatch(
      backdropAction({ backdropOBJ: backdropOBJ, yPos: yPos, backVis: 1 })
    );

    // props.backdropSet(backdropOBJ, yPos);
    /*window.location.hash = "game";*/
  };

  const openClose = () => {
    if (state.open) {
      setState({
        open: false,
      });
    } else {
      setState({
        open: true,
      });
    }
  };

  let element = props.element;
  let content: "" | JSX.Element = "";
  let final: "" | JSX.Element = "";
  let style = "rgba(0,0,0,50%)";
  let time = "";
  let explanation: "" | JSX.Element = "";
  let fullDetails: "" | JSX.Element = "";

  let result: "" | JSX.Element = "";

  const currentDay = new Date(element.colDate + "T" + element.colTime);
  const hours =
    currentDay.getHours() < 10
      ? "0" + currentDay.getHours()
      : currentDay.getHours();
  const minutes =
    currentDay.getMinutes() < 10
      ? "0" + currentDay.getMinutes()
      : currentDay.getMinutes();

  time = hours + ":" + minutes;

  if (parseInt(props.element.resultCount) !== -1) {
    if (parseInt(props.element.resultCount) === 1) {
      final = (
        <div className={classes.final}>
          <img className={classes.correct} src={correct} alt="correct" />
        </div>
      );
      style = "green";
      result = (
        <div className={classes.countryComp + " " + classes.greenRes}>
          {" "}
          Result: {props.element.result}{" "}
        </div>
      );
    } else if (parseInt(props.element.resultCount) === 0) {
      final = (
        <div className={classes.final}>
          <img className={classes.wrong} src={wrong} alt="wrong" />
        </div>
      );
      style = "#c10f0f";
      result = (
        <div className={classes.countryComp + " " + classes.redRes}>
          {" "}
          Result: {props.element.result}{" "}
        </div>
      );
    }
  }

  if (state.open) {
    const currentDay = new Date(element.colDate + "T" + element.colTime);

    const hours =
      currentDay.getHours() < 10
        ? "0" + currentDay.getHours()
        : currentDay.getHours();
    const minutes =
      currentDay.getMinutes() < 10
        ? "0" + currentDay.getMinutes()
        : currentDay.getMinutes();

    let backdropOBJ = {
      date: currentDay.toString(),
      time: hours + ":" + minutes,
      home: element.homeTeam,
      away: element.awayTeam,
      country: element.country,
      competition: element.competition,
      simpleDate: element.date,
    };

    fullDetails = (
      <div
        className={classes.FullDetails}
        onClick={() => openBackdrop(backdropOBJ)}
      >
        Click for full details!
      </div>
    );

    explanation = element.explanation.split("****").map((element: any, index: React.Key | null | undefined) => {
      if (element !== "") {
        return (
          <div key={index} className={classes.explanationLine}>
            {element}
          </div>
        );
      } else return null;
    });
  }

  content = (
    <div key={props.index} className={classes.tipsLineContainer}>
      <div
        className={classes.tipsLine}
        onClick={openClose}
        style={{ border: "1px solid " + style }}
      >
        {final}
        <div className={classes.tip}>
          <div className={classes.flagContainer}>
            <Flag co={element.country} />
          </div>
          <div className={classes.GamesLineTop}>
            <div className={classes.teamNames}>
              {element.homeTeam + " vs " + element.awayTeam}
            </div>
            <div className={classes.tipInner}>{element.tip}</div>
          </div>
        </div>

        <div className={classes.GamesLine}>
          <div className={classes.chance}>
            <div className={classes.kickOfMob}>Kick-off: {time}</div>
            Chance:{" "}
            <span className={classes.chanceBr}>
              {" "}
              {element.chance > 94 ? 94 + "%" : element.chance + "%"}{" "}
            </span>
          </div>
          <div className={classes.GamesLineBottom}>
            <div className={classes.kickOf}>Kick-off: {time}</div>
            <div className={classes.countryComp}>
              {element.country + " - " + element.competition}
            </div>
            {result}
            <div className={classes.explanationTxt}>
              <span style={{ marginRight: "5px" }}> Explanation </span>{" "}
              {state.open ? (
                <i
                  style={{ fontSize: "11px" }}
                  className="fa fa-arrow-down"
                  aria-hidden="true"
                ></i>
              ) : (
                <i
                  style={{ fontSize: "11px" }}
                  className="fa fa-arrow-right"
                  aria-hidden="true"
                ></i>
              )}
            </div>
          </div>
        </div>

        <div className={classes.GamesLine}>
          {state.open ? (
            <div className={classes.explanation}>
              {explanation}
              {fullDetails}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={classes.dottedLine} />
    </div>
  );

  return content;
};

export default SingleGame;
