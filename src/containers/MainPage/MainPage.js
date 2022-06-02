import React, { useState, useEffect } from "react";
import Axios from "axios";
import Spinner from "../../components/Spinner/Spinner";
import LeagueList from "../../components/LeagueList/LeagueList";
import NavDates from "../../components/NavDates/NavDates";
import classes from "./MainPage.module.css";
import BettingBox from "../BettingBox/BettingBox";
import Aux from "../../components/AuxAux/AuxAux";
import Marketing from "../../components/Marketing/Marketing";

const MainPage = (props) => {
  const [state, setState] = useState({
    games: [],
    dateSet: "",
    dateSetAllways: "",
    firstTime: true,
    loadSpinner: true,
    positionButton: 3,
  });

  useEffect(() => {
    if (state.dateSet !== "") {
      const url =
        "/api_stats/load_betinfo_schedule.php?date=%27" +
        state.dateSet +
        "%27";

      Axios.get(url).then((response) => {
        setState((prevState) => {
          return {
            ...prevState,
            games: response.data,
            dateSet: "",
            dateSetAllways: state.dateSet,
            firstTime: false,
            loadSpinner: false,
          };
        });
      });
    }
  });

  useEffect(() => {
        // 2020-03-09
        if (state.firstTime) {
          const todayDate = new Date();
          const m = parseInt(todayDate.getMonth()) + 1;
          const todayDay =
            todayDate.getDate() < 10
              ? "0" + todayDate.getDate()
              : todayDate.getDate();
          const todayMonth = m < 10 ? "0" + m : m;
          const todayYear =
            todayDate.getFullYear() < 10
              ? "0" + todayDate.getFullYear()
              : todayDate.getFullYear();
    
          const finalDate = todayYear + "-" + todayMonth + "-" + todayDay;
    
          const url =
            "/api_stats/load_betinfo_schedule.php?date=%27" + finalDate + "%27";
    
          Axios.get(url).then((response) => {
            setState({
              games: response.data,
              dateSet: "",
              dateSetAllways: finalDate,
              firstTime: false,
              loadSpinner: false,
            });
          });
        }
  }, []);


  const changeUrl = (finalDate, pos) => {
    if (finalDate !== state.firstTime) {
      setState({
        dateSet: finalDate,
        firstTime: false,
        loadSpinner: true,
        positionButton: pos,
      });
    }
  };

  window.scrollTo(0, 0);

  //let props = useParams();

  // console.log(props);

  let content = <Spinner />;

  if (!state.loadSpinner) {
    content = (
      <Aux>
        <BettingBox date={state.dateSetAllways} />
        {props.m === "" ? null : (
          <div key="4444" className={classes.mark}>
            <Marketing m={props.m} />
          </div>
        )}
        <LeagueList dateSet={state.dateSetAllways} games={state.games} />
      </Aux>
    );
  }
  // Ubacivanje middle banners pomocu {props.m}
  return (
    <div className={classes.Aux} id="mainPage">
      <NavDates change={changeUrl} position={state.positionButton} />
      {content}
    </div>
  );
};

export default MainPage;
