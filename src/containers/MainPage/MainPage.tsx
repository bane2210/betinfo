import React, { useState, useEffect } from "react";
import Axios from "axios";
import Spinner from "../../components/Spinner/Spinner";
import LeagueList from "../../components/LeagueList/LeagueList";
import NavDates from "../../components/NavDates/NavDates";
import classes from "./MainPage.module.css";
import BettingBox from "../BettingBox/BettingBox";
import Aux from "../../components/AuxAux/AuxAux";
import Marketing from "../../components/Marketing/Marketing";
import { useDispatch, useSelector } from "react-redux";
import { restoreDateAction } from "../../store/createSlice";
import { RootState } from "../../store/store";

interface LocalState {
  games: any[];
  dateSet: string;
  dateSetAllways: string;
  firstTime: boolean;
  loadSpinner: boolean;
  positionButton: number;
}

export let callAxios: (s: string, v: string) => void;

const MainPage: React.FC<{ m: string; h: string; f: string }> = (props) => {
  const stateBase = useSelector((state: RootState) => {
    return state.globalState;
  });
  const dispatch = useDispatch();
  const localState: LocalState = {
    games: [],
    dateSet: "",
    dateSetAllways: "",
    firstTime: true,
    loadSpinner: true,
    positionButton: 3,
  };

  const [state, setState] = useState(localState);

  useEffect(() => {
    if (state.dateSet !== "") {
      const url =
        "/api_stats/load_betinfo_schedule.php?date=%27" + state.dateSet + "%27";

      dispatch(
        restoreDateAction({
          date: state.dateSet,
          position: state.positionButton,
        })
      );

      Axios.get(url).then(
        (response) => {
          if (response.data.length > 0) {
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
          }
        },
        (isRejected) => {
          return isRejected;
        }
      );
    }
  });

  useEffect(() => {
    // 2020-03-09
    if (state.firstTime) {
      let finalDate = "";
      if (stateBase.restoreDate !== "") {
        finalDate = stateBase.restoreDate;
      } else {
        const todayDate = new Date();
        const m = todayDate.getMonth() + 1;
        const todayDay =
          todayDate.getDate() < 10
            ? "0" + todayDate.getDate()
            : todayDate.getDate();
        const todayMonth = m < 10 ? "0" + m : m;
        const todayYear =
          todayDate.getFullYear() < 10
            ? "0" + todayDate.getFullYear()
            : todayDate.getFullYear();

        finalDate = todayYear + "-" + todayMonth + "-" + todayDay;

        dispatch(
          restoreDateAction({
            date: finalDate,
            position: state.positionButton,
          })
        );
      }

      const url =
        "/api_stats/load_betinfo_schedule.php?date=%27" + finalDate + "%27";
      callAxios(url, finalDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  callAxios = (url: string, finalDate: string) => {
    Axios.get(url).then((response) => {
      if (response.data.length > 0) {
        setState({
          games: response.data,
          dateSet: "",
          dateSetAllways: finalDate,
          firstTime: false,
          loadSpinner: false,
          positionButton: stateBase.datePosition,
        });
      }
    });
  };

  const changeUrl = (finalDate: string, pos: string) => {
    // if (finalDate !== state.firstTime) {
    setState((prevState) => {
      return {
        ...prevState,
        dateSet: finalDate,
        firstTime: false,
        loadSpinner: true,
        positionButton: +pos,
      };
    });
    //  }
  };

  //window.scrollTo(0, 0);

  //let props = useParams();

  // console.log(props);

  let content = <Spinner />;

  if (!state.loadSpinner) {
    content = (
      <Aux>
        <BettingBox date={state.dateSetAllways} />
        {props.m === "" ? null : (
          <div key="4444" className={classes.mark}>
            <Marketing m={props.m} type="" />
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
