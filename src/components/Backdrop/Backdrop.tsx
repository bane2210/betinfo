import { useEffect, useState } from "react";
import classes from "./Backdrop.module.css";
import Spinner from "../Spinner/Spinner";
import axios from "axios";
import MatchTitle from "../MatchHomeBox/MatchTitle/MatchTitle";
import MatchHomeBox from "../MatchHomeBox/MatchHomeBox";
import MatchAwayBox from "../MatchAwayBox/MatchAwayBox";
import Table from "../Table/Table";
import BackdropClose from "./BackdropClose";
import SingleBettingBox from "./SingleBettingBox/SingleBettingBox";
import { useDispatch } from "react-redux";
import { closeBackdrop } from "../../store/createSlice";

interface Props {
  date: string;
  t: string;
  h: string;
  a: string;
  country: string;
  comp: string;
  simpleDate: string;
  yPos: number;
}

type ResponseType = {
  main: GameResponseType[] | [];
  H2H: GameResponseType[] | [];
  table: string;
};

export type GameResponseType = {
  awayScoreFirstHalf: number;
  awayScoreFullTime: number;
  awayScoreSecondHalf: number;
  awayTeam: string;
  competition_id: number;
  country_id: number;
  gameDate: string;
  goalsFT: number;
  goalsHT: number;
  homeScoreFirstHalf: number;
  homeScoreFullTime: number;
  homeScoreSecondHalf: number;
  homeTeam: string;
  result: string;
  season: string;
  winnerFH: string;
  winnerFT: string;
  winnerSH: string;
};

export type MainOBject = {
  teamName: string;
  gamesCount: number;
  cc_sibh: number;
  cc_0_5_SH: number;
  over_0_5_SH: number;
  over_1_5_SH: number;
  over_2_5_SH: number;
  cc_0_5: number;
  cc_1_5: number;
  cc_0_5_FH: number;
  sinSH: number;
  more_FH: number;
  more_SH: number;
  win2: number;
  draw2: number;
  lose2: number;
  BTTS_SH: number;
  gspm: number;
  gcpm: number;
  bts: number;
  win: number;
  draw: number;
  lose: number;
  win3: number;
  draw3: number;
  lose3: number;
  btts3: number;
  sinFH: number;
  btsFH: number;
  cleanS: number;
  soem: number;
  stgoem: number;
  sibh: number;
  gibh: number;
  leadHT: number;
  loseHT: number;
  drawHT: number;
  over_1_5: number;
  over_2_5: number;
  over_3_5: number;
  over_4_5: number;
  over_5_5: number;
  under_1_5: number;
  under_2_5: number;
  over_0_5_HT: number;
  over_1_5_HT: number;
  over_2_5_HT: number;
  win_BTTS: number;
  draw_BTTS: number;
  lose_BTTS: number;
  home_home: number;
  home_draw: number;
  home_away: number;
  draw_home: number;
  draw_draw: number;
  draw_away: number;
  away_home: number;
  away_draw: number;
  away_away: number;
  cc_sibhSER: number;
  cc_0_5_SHSER: number;
  over_0_5_SHSER: number;
  over_1_5_SHSER: number;
  over_2_5_SHSER: number;
  cc_0_5SER: number;
  cc_1_5SER: number;
  cc_0_5_FHSER: number;
  sinSHSER: number;
  more_FHSER: number;
  more_SHSER: number;
  win2SER: number;
  draw2SER: number;
  lose2SER: number;
  BTTS_SHSER: number;
  btsSER: number;
  winSER: number;
  drawSER: number;
  loseSER: number;
  win3SER: number;
  draw3SER: number;
  lose3SER: number;
  btts3SER: number;
  sinFHSER: number;
  btsFHSER: number;
  cleanSSER: number;
  soemSER: number;
  stgoemSER: number;
  sibhSER: number;
  gibhSER: number;
  leadHTSER: number;
  loseHTSER: number;
  drawHTSER: number;
  over_1_5SER: number;
  over_2_5SER: number;
  over_3_5SER: number;
  over_4_5SER: number;
  over_5_5SER: number;
  under_1_5SER: number;
  under_2_5SER: number;
  over_0_5_HTSER: number;
  over_1_5_HTSER: number;
  over_2_5_HTSER: number;
  win_BTTSSER: number;
  draw_BTTSSER: number;
  lose_BTTSSER: number;
  home_homeSER: number;
  home_drawSER: number;
  home_awaySER: number;
  draw_homeSER: number;
  draw_drawSER: number;
  draw_awaySER: number;
  away_homeSER: number;
  away_drawSER: number;
  away_awaySER: number;
};

interface MainObjectFinal extends Partial<MainOBject> {
  result: string;
  isSet: number;
}

type StateType = {
  homeOBJHome: MainOBject;
  homeOBJAll: MainOBject;
  awayOBJAway: MainOBject;
  awayOBJAll: MainOBject;
  homeOBJHome_games: GameResponseType[];
  homeOBJAll_games: GameResponseType[];
  awayOBJAway_games: GameResponseType[];
  awayOBJAll_games: GameResponseType[];
  homeOBJHome_list: any;
  homeOBJAll_list: any;
  awayOBJAway_list: any;
  awayOBJAll_list: any;
  h2h: GameResponseType[];
  final_results: any;
  table: string;
  spinner: boolean;
};

const Backdrop = (props: Props) => {
  let state: StateType | undefined;
  let setState: React.Dispatch<React.SetStateAction<StateType | undefined>>;
  [state, setState] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    // http://betinfo.cc/api_stats/singleMatch.php?country=DENMARK&comp=2.%20DIVISION&home=Middelfart%20G%20&%20BK&away=Hellerup%20IK
    const url =
      "/api_stats/singleMatch.php?country=" +
      encodeURIComponent(props.country) +
      "&comp=" +
      encodeURIComponent(props.comp) +
      "&home=" +
      encodeURIComponent(props.h) +
      "&away=" +
      encodeURIComponent(props.a);
    axios.get(url).then((response) => {
      if ('H2H' in response.data) {
        setTimeout(() => {
          console.log(response.data);
          complexStats(response.data);
        }, 250);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goback = () => {
    // window.scrollTo(0, 0 - props.yPos);

    
    dispatch(
      closeBackdrop({
        backdropOBJ: {
          date: "",
          time: "",
          home: "",
          away: "",
          country: "",
          competition: "",
          simpleDate: "",
        },
        backVis: 0,
      })
    );

    /*

    document.getElementById("backdrop").style.display = "none";
    document.getElementById("body").style.display = "block";
    */
    // document.getElementById("body").style.display = "block";

    /*  window.location.href = window.location.href.substr(0, window.location.href.indexOf('#'));*/
  };

  const finalResultsFun = (final_results: any, element: GameResponseType) => {
    // Tips results based on HOME TEAM

    final_results.isSet += 1;

    final_results.result =
      element.homeScoreFullTime +
      " - " +
      element.awayScoreFullTime +
      " (" +
      element.homeScoreFirstHalf +
      " - " +
      element.awayScoreFirstHalf +
      ")";

    // Conceded in both halfs
    if (element.awayScoreFirstHalf > 0 && element.awayScoreSecondHalf > 0) {
      final_results.cc_sibh += 1;
    }

    // Over 0.5, 1.5, 2.5 Goals Second Half
    let secHalfGoals =
      element.homeScoreSecondHalf + element.awayScoreSecondHalf;
    if (secHalfGoals > 0) {
      final_results.over_0_5_SH += 1;

      if (secHalfGoals > 1) {
        final_results.over_1_5_SH += 1;
      }

      if (secHalfGoals > 2) {
        final_results.over_2_5_SH += 1;
      }
    }

    // conceded 0.5, 0.5FH i 1.5
    if (element.awayScoreFullTime > 0) {
      final_results.cc_0_5 += 1;
      if (element.awayScoreFirstHalf > 0) {
        final_results.cc_0_5_FH += 1;
      }

      if (element.awayScoreFullTime > 1) {
        final_results.cc_1_5 += 1;
      }
    }

    // conceded goal second half
    if (element.awayScoreSecondHalf > 0) {
      final_results.cc_0_5_SH += 1;
    }

    // More goals first half / second half
    if (
      element.homeScoreFirstHalf + element.awayScoreFirstHalf >
      element.homeScoreSecondHalf + element.awayScoreSecondHalf
    ) {
      final_results.more_FH += 1;
    } else if (
      element.homeScoreFirstHalf + element.awayScoreFirstHalf <
      element.homeScoreSecondHalf + element.awayScoreSecondHalf
    ) {
      final_results.more_SH += 1;
    }

    // Team scored Second Half
    if (element.homeScoreSecondHalf > 0) {
      final_results.sinSH += 1;
    }

    // Win, Draw, Lose
    let allGoals = element.homeScoreFullTime + element.awayScoreFullTime;

    if (element.winnerFT === "h") {
      final_results.win += 1;

      if (allGoals > 1) {
        final_results.win2 += 1;
      }

      if (allGoals > 2) {
        final_results.win3 += 1;
      }
    } else if (element.winnerFT === "d") {
      final_results.draw += 1;

      if (allGoals > 1) {
        final_results.draw2 += 1;
      }

      if (allGoals > 2) {
        final_results.draw3 += 1;
      }
    } else {
      final_results.lose += 1;

      if (allGoals > 1) {
        final_results.lose2 += 1;
      }

      if (allGoals > 2) {
        final_results.lose3 += 1;
      }
    }

    // GG3+
    if (element.homeScoreFullTime && element.awayScoreFullTime) {
      if (allGoals > 2) {
        final_results.btts3 += 1;
      }
    }

    // gg second half
    if (element.homeScoreSecondHalf && element.awayScoreSecondHalf) {
      final_results.BTTS_SH += 1;
    }

    // Team scored in First Half
    if (element.homeScoreFirstHalf > 0) {
      final_results.sinFH += 1;
    }

    // both scored - GG
    if (element.homeScoreFullTime && element.awayScoreFullTime) {
      final_results.bts += 1;

      // gg first half
      if (element.homeScoreFirstHalf && element.awayScoreFirstHalf) {
        final_results.btsFH += 1;
      }

      // 1&gg, x&gg, 2&gg
      if (element.winnerFT === "h") {
        final_results.win_BTTS += 1;
      } else if (element.winnerFT === "d") {
        final_results.draw_BTTS += 1;
      } else {
        final_results.lose_BTTS += 1;
      }
    }

    // clean sheets
    if (element.awayScoreFullTime === 0) {
      final_results.cleanS += 1;
    }

    // Scored on every match
    if (element.homeScoreFullTime > 0) {
      final_results.soem += 1;
    }

    // Scored two goals on every match
    if (element.homeScoreFullTime > 1) {
      final_results.stgoem += 1;
    }

    // Team scored in both halves
    if (element.homeScoreFirstHalf && element.homeScoreSecondHalf) {
      final_results.sibh += 1;
    }

    // Goal in both halves
    if (
      (element.homeScoreFirstHalf || element.awayScoreFirstHalf) &&
      (element.homeScoreSecondHalf || element.awayScoreSecondHalf)
    ) {
      final_results.gibh += 1;
    }

    // Lead/lose/draw at half-time ...
    if (element.winnerFH === "h") {
      final_results.leadHT += 1;
    } else if (element.winnerFH === "d") {
      final_results.drawHT += 1;
    } else {
      final_results.loseHT += 1;
    }

    // Over x goals
    allGoals = element.homeScoreFullTime + element.awayScoreFullTime;
    if (allGoals > 1) {
      final_results.over_1_5 += 1;
    }

    if (allGoals > 2) {
      final_results.over_2_5 += 1;
    }

    if (allGoals > 3) {
      final_results.over_3_5 += 1;
    }

    if (allGoals > 4) {
      final_results.over_4_5 += 1;
    }

    if (allGoals > 5) {
      final_results.over_5_5 += 1;
    }

    // Under goals
    if (allGoals < 3) {
      final_results.under_2_5 += 1;
    }

    if (allGoals < 2) {
      final_results.under_1_5 += 1;
    }

    // Over x goals at half-time
    allGoals = element.homeScoreFirstHalf + element.awayScoreFirstHalf;
    if (allGoals > 0) {
      final_results.over_0_5_HT += 1;
    }

    if (allGoals > 1) {
      final_results.over_1_5_HT += 1;
    }

    if (allGoals > 2) {
      final_results.over_2_5_HT += 1;
    }

    // half-time/Full Time
    if (element.winnerFH === "h") {
      if (element.winnerFT === "h") {
        final_results.home_home += 1;
      } else if (element.winnerFT === "d") {
        final_results.home_draw += 1;
      } else {
        final_results.home_away += 1;
      }
    } else if (element.winnerFH === "d") {
      if (element.winnerFT === "h") {
        final_results.draw_home += 1;
      } else if (element.winnerFT === "d") {
        final_results.draw_draw += 1;
      } else {
        final_results.draw_away += 1;
      }
    } else {
      if (element.winnerFT === "h") {
        final_results.away_home += 1;
      } else if (element.winnerFT === "d") {
        final_results.away_draw += 1;
      } else {
        final_results.away_away += 1;
      }
    }

    return final_results;
  };

  const complexStats = (response: ResponseType) => {
    const homeTeam = props.h;
    const awayTeam = props.a;

    let homeOBJHome: MainOBject = {
      teamName: homeTeam,
      gamesCount: 0,
      cc_sibh: 0,
      cc_0_5_SH: 0,
      over_0_5_SH: 0,
      over_1_5_SH: 0,
      over_2_5_SH: 0,
      cc_0_5: 0,
      cc_1_5: 0,
      cc_0_5_FH: 0,
      sinSH: 0,
      more_FH: 0,
      more_SH: 0,
      win2: 0,
      draw2: 0,
      lose2: 0,
      BTTS_SH: 0,
      gspm: 0,
      gcpm: 0,
      bts: 0,
      win: 0,
      draw: 0,
      lose: 0,
      win3: 0,
      draw3: 0,
      lose3: 0,
      btts3: 0,
      sinFH: 0,
      btsFH: 0,
      cleanS: 0,
      soem: 0,
      stgoem: 0,
      sibh: 0,
      gibh: 0,
      leadHT: 0,
      loseHT: 0,
      drawHT: 0,
      over_1_5: 0,
      over_2_5: 0,
      over_3_5: 0,
      over_4_5: 0,
      over_5_5: 0,
      under_1_5: 0,
      under_2_5: 0,
      over_0_5_HT: 0,
      over_1_5_HT: 0,
      over_2_5_HT: 0,
      win_BTTS: 0,
      draw_BTTS: 0,
      lose_BTTS: 0,
      home_home: 0,
      home_draw: 0,
      home_away: 0,
      draw_home: 0,
      draw_draw: 0,
      draw_away: 0,
      away_home: 0,
      away_draw: 0,
      away_away: 0,
      cc_sibhSER: 0,
      cc_0_5_SHSER: 0,
      over_0_5_SHSER: 0,
      over_1_5_SHSER: 0,
      over_2_5_SHSER: 0,
      cc_0_5SER: 0,
      cc_1_5SER: 0,
      cc_0_5_FHSER: 0,
      sinSHSER: 0,
      more_FHSER: 0,
      more_SHSER: 0,
      win2SER: 0,
      draw2SER: 0,
      lose2SER: 0,
      BTTS_SHSER: 0,
      btsSER: 0,
      winSER: 0,
      drawSER: 0,
      loseSER: 0,
      win3SER: 0,
      draw3SER: 0,
      lose3SER: 0,
      btts3SER: 0,
      sinFHSER: 0,
      btsFHSER: 0,
      cleanSSER: 0,
      soemSER: 0,
      stgoemSER: 0,
      sibhSER: 0,
      gibhSER: 0,
      leadHTSER: 0,
      loseHTSER: 0,
      drawHTSER: 0,
      over_1_5SER: 0,
      over_2_5SER: 0,
      over_3_5SER: 0,
      over_4_5SER: 0,
      over_5_5SER: 0,
      under_1_5SER: 0,
      under_2_5SER: 0,
      over_0_5_HTSER: 0,
      over_1_5_HTSER: 0,
      over_2_5_HTSER: 0,
      win_BTTSSER: 0,
      draw_BTTSSER: 0,
      lose_BTTSSER: 0,
      home_homeSER: 0,
      home_drawSER: 0,
      home_awaySER: 0,
      draw_homeSER: 0,
      draw_drawSER: 0,
      draw_awaySER: 0,
      away_homeSER: 0,
      away_drawSER: 0,
      away_awaySER: 0,
    };

    let homeOBJAll: MainOBject = {
      teamName: homeTeam,
      gamesCount: 0,
      cc_sibh: 0,
      cc_0_5_SH: 0,
      over_0_5_SH: 0,
      over_1_5_SH: 0,
      over_2_5_SH: 0,
      cc_0_5: 0,
      cc_1_5: 0,
      cc_0_5_FH: 0,
      sinSH: 0,
      more_FH: 0,
      more_SH: 0,
      win2: 0,
      draw2: 0,
      lose2: 0,
      BTTS_SH: 0,
      gspm: 0,
      gcpm: 0,
      bts: 0,
      win: 0,
      draw: 0,
      lose: 0,
      win3: 0,
      draw3: 0,
      lose3: 0,
      btts3: 0,
      sinFH: 0,
      btsFH: 0,
      cleanS: 0,
      soem: 0,
      stgoem: 0,
      sibh: 0,
      gibh: 0,
      leadHT: 0,
      loseHT: 0,
      drawHT: 0,
      over_1_5: 0,
      over_2_5: 0,
      over_3_5: 0,
      over_4_5: 0,
      over_5_5: 0,
      under_1_5: 0,
      under_2_5: 0,
      over_0_5_HT: 0,
      over_1_5_HT: 0,
      over_2_5_HT: 0,
      win_BTTS: 0,
      draw_BTTS: 0,
      lose_BTTS: 0,
      home_home: 0,
      home_draw: 0,
      home_away: 0,
      draw_home: 0,
      draw_draw: 0,
      draw_away: 0,
      away_home: 0,
      away_draw: 0,
      away_away: 0,
      cc_sibhSER: 0,
      cc_0_5_SHSER: 0,
      over_0_5_SHSER: 0,
      over_1_5_SHSER: 0,
      over_2_5_SHSER: 0,
      cc_0_5SER: 0,
      cc_1_5SER: 0,
      cc_0_5_FHSER: 0,
      sinSHSER: 0,
      more_FHSER: 0,
      more_SHSER: 0,
      win2SER: 0,
      draw2SER: 0,
      lose2SER: 0,
      BTTS_SHSER: 0,
      btsSER: 0,
      winSER: 0,
      drawSER: 0,
      loseSER: 0,
      win3SER: 0,
      draw3SER: 0,
      lose3SER: 0,
      btts3SER: 0,
      sinFHSER: 0,
      btsFHSER: 0,
      cleanSSER: 0,
      soemSER: 0,
      stgoemSER: 0,
      sibhSER: 0,
      gibhSER: 0,
      leadHTSER: 0,
      loseHTSER: 0,
      drawHTSER: 0,
      over_1_5SER: 0,
      over_2_5SER: 0,
      over_3_5SER: 0,
      over_4_5SER: 0,
      over_5_5SER: 0,
      under_1_5SER: 0,
      under_2_5SER: 0,
      over_0_5_HTSER: 0,
      over_1_5_HTSER: 0,
      over_2_5_HTSER: 0,
      win_BTTSSER: 0,
      draw_BTTSSER: 0,
      lose_BTTSSER: 0,
      home_homeSER: 0,
      home_drawSER: 0,
      home_awaySER: 0,
      draw_homeSER: 0,
      draw_drawSER: 0,
      draw_awaySER: 0,
      away_homeSER: 0,
      away_drawSER: 0,
      away_awaySER: 0,
    };

    let awayOBJAway: MainOBject = {
      teamName: awayTeam,
      gamesCount: 0,
      cc_sibh: 0,
      cc_0_5_SH: 0,
      over_0_5_SH: 0,
      over_1_5_SH: 0,
      over_2_5_SH: 0,
      cc_0_5: 0,
      cc_1_5: 0,
      cc_0_5_FH: 0,
      sinSH: 0,
      more_FH: 0,
      more_SH: 0,
      win2: 0,
      draw2: 0,
      lose2: 0,
      BTTS_SH: 0,
      gspm: 0,
      gcpm: 0,
      bts: 0,
      win: 0,
      draw: 0,
      lose: 0,
      win3: 0,
      draw3: 0,
      lose3: 0,
      btts3: 0,
      sinFH: 0,
      btsFH: 0,
      cleanS: 0,
      soem: 0,
      stgoem: 0,
      sibh: 0,
      gibh: 0,
      leadHT: 0,
      loseHT: 0,
      drawHT: 0,
      over_1_5: 0,
      over_2_5: 0,
      over_3_5: 0,
      over_4_5: 0,
      over_5_5: 0,
      under_1_5: 0,
      under_2_5: 0,
      over_0_5_HT: 0,
      over_1_5_HT: 0,
      over_2_5_HT: 0,
      win_BTTS: 0,
      draw_BTTS: 0,
      lose_BTTS: 0,
      home_home: 0,
      home_draw: 0,
      home_away: 0,
      draw_home: 0,
      draw_draw: 0,
      draw_away: 0,
      away_home: 0,
      away_draw: 0,
      away_away: 0,
      cc_sibhSER: 0,
      cc_0_5_SHSER: 0,
      over_0_5_SHSER: 0,
      over_1_5_SHSER: 0,
      over_2_5_SHSER: 0,
      cc_0_5SER: 0,
      cc_1_5SER: 0,
      cc_0_5_FHSER: 0,
      sinSHSER: 0,
      more_FHSER: 0,
      more_SHSER: 0,
      win2SER: 0,
      draw2SER: 0,
      lose2SER: 0,
      BTTS_SHSER: 0,
      btsSER: 0,
      winSER: 0,
      drawSER: 0,
      loseSER: 0,
      win3SER: 0,
      draw3SER: 0,
      lose3SER: 0,
      btts3SER: 0,
      sinFHSER: 0,
      btsFHSER: 0,
      cleanSSER: 0,
      soemSER: 0,
      stgoemSER: 0,
      sibhSER: 0,
      gibhSER: 0,
      leadHTSER: 0,
      loseHTSER: 0,
      drawHTSER: 0,
      over_1_5SER: 0,
      over_2_5SER: 0,
      over_3_5SER: 0,
      over_4_5SER: 0,
      over_5_5SER: 0,
      under_1_5SER: 0,
      under_2_5SER: 0,
      over_0_5_HTSER: 0,
      over_1_5_HTSER: 0,
      over_2_5_HTSER: 0,
      win_BTTSSER: 0,
      draw_BTTSSER: 0,
      lose_BTTSSER: 0,
      home_homeSER: 0,
      home_drawSER: 0,
      home_awaySER: 0,
      draw_homeSER: 0,
      draw_drawSER: 0,
      draw_awaySER: 0,
      away_homeSER: 0,
      away_drawSER: 0,
      away_awaySER: 0,
    };

    let awayOBJAll: MainOBject = {
      teamName: awayTeam,
      gamesCount: 0,
      cc_sibh: 0,
      cc_0_5_SH: 0,
      over_0_5_SH: 0,
      over_1_5_SH: 0,
      over_2_5_SH: 0,
      cc_0_5: 0,
      cc_1_5: 0,
      cc_0_5_FH: 0,
      sinSH: 0,
      more_FH: 0,
      more_SH: 0,
      win2: 0,
      draw2: 0,
      lose2: 0,
      BTTS_SH: 0,
      gspm: 0,
      gcpm: 0,
      bts: 0,
      win: 0,
      draw: 0,
      lose: 0,
      win3: 0,
      draw3: 0,
      lose3: 0,
      btts3: 0,
      sinFH: 0,
      btsFH: 0,
      cleanS: 0,
      soem: 0,
      stgoem: 0,
      sibh: 0,
      gibh: 0,
      leadHT: 0,
      loseHT: 0,
      drawHT: 0,
      over_1_5: 0,
      over_2_5: 0,
      over_3_5: 0,
      over_4_5: 0,
      over_5_5: 0,
      under_1_5: 0,
      under_2_5: 0,
      over_0_5_HT: 0,
      over_1_5_HT: 0,
      over_2_5_HT: 0,
      win_BTTS: 0,
      draw_BTTS: 0,
      lose_BTTS: 0,
      home_home: 0,
      home_draw: 0,
      home_away: 0,
      draw_home: 0,
      draw_draw: 0,
      draw_away: 0,
      away_home: 0,
      away_draw: 0,
      away_away: 0,
      cc_sibhSER: 0,
      cc_0_5_SHSER: 0,
      over_0_5_SHSER: 0,
      over_1_5_SHSER: 0,
      over_2_5_SHSER: 0,
      cc_0_5SER: 0,
      cc_1_5SER: 0,
      cc_0_5_FHSER: 0,
      sinSHSER: 0,
      more_FHSER: 0,
      more_SHSER: 0,
      win2SER: 0,
      draw2SER: 0,
      lose2SER: 0,
      BTTS_SHSER: 0,
      btsSER: 0,
      winSER: 0,
      drawSER: 0,
      loseSER: 0,
      win3SER: 0,
      draw3SER: 0,
      lose3SER: 0,
      btts3SER: 0,
      sinFHSER: 0,
      btsFHSER: 0,
      cleanSSER: 0,
      soemSER: 0,
      stgoemSER: 0,
      sibhSER: 0,
      gibhSER: 0,
      leadHTSER: 0,
      loseHTSER: 0,
      drawHTSER: 0,
      over_1_5SER: 0,
      over_2_5SER: 0,
      over_3_5SER: 0,
      over_4_5SER: 0,
      over_5_5SER: 0,
      under_1_5SER: 0,
      under_2_5SER: 0,
      over_0_5_HTSER: 0,
      over_1_5_HTSER: 0,
      over_2_5_HTSER: 0,
      win_BTTSSER: 0,
      draw_BTTSSER: 0,
      lose_BTTSSER: 0,
      home_homeSER: 0,
      home_drawSER: 0,
      home_awaySER: 0,
      draw_homeSER: 0,
      draw_drawSER: 0,
      draw_awaySER: 0,
      away_homeSER: 0,
      away_drawSER: 0,
      away_awaySER: 0,
    };

    let final_results: MainObjectFinal = {
      teamName: homeTeam,
      result: "",
      isSet: 0,
      cc_sibh: 0,
      cc_0_5_SH: 0,
      over_0_5_SH: 0,
      over_1_5_SH: 0,
      over_2_5_SH: 0,
      cc_0_5: 0,
      cc_1_5: 0,
      cc_0_5_FH: 0,
      sinSH: 0,
      more_FH: 0,
      more_SH: 0,
      win2: 0,
      draw2: 0,
      lose2: 0,
      BTTS_SH: 0,
      gspm: 0,
      gcpm: 0,
      bts: 0,
      win: 0,
      draw: 0,
      lose: 0,
      win3: 0,
      draw3: 0,
      lose3: 0,
      btts3: 0,
      sinFH: 0,
      btsFH: 0,
      cleanS: 0,
      soem: 0,
      stgoem: 0,
      sibh: 0,
      gibh: 0,
      leadHT: 0,
      loseHT: 0,
      drawHT: 0,
      over_1_5: 0,
      over_2_5: 0,
      over_3_5: 0,
      over_4_5: 0,
      over_5_5: 0,
      under_1_5: 0,
      under_2_5: 0,
      over_0_5_HT: 0,
      over_1_5_HT: 0,
      over_2_5_HT: 0,
      win_BTTS: 0,
      draw_BTTS: 0,
      lose_BTTS: 0,
      home_home: 0,
      home_draw: 0,
      home_away: 0,
      draw_home: 0,
      draw_draw: 0,
      draw_away: 0,
      away_home: 0,
      away_draw: 0,
      away_away: 0,
    };

    let json_result = response.main;

    let hth_result = response.H2H;
    let table = response.table;

    let HOHome_win2: any[] = [];
    let HOAll_win2: any[] = [];
    let AOAway_win2: any[] = [];
    let AOAll_win2: any[] = [];

    let HOHome_over_0_5_SH: any[] = [];
    let HOAll_over_0_5_SH: any[] = [];
    let AOAway_over_0_5_SH: any[] = [];
    let AOAll_over_0_5_SH: any[] = [];

    let HOHome_over_1_5_SH: any[] = [];
    let HOAll_over_1_5_SH: any[] = [];
    let AOAway_over_1_5_SH: any[] = [];
    let AOAll_over_1_5_SH: any[] = [];

    let HOHome_over_2_5_SH: any[] = [];
    let HOAll_over_2_5_SH: any[] = [];
    let AOAway_over_2_5_SH: any[] = [];
    let AOAll_over_2_5_SH: any[] = [];

    let HOHome_draw2: any[] = [];
    let HOAll_draw2: any[] = [];
    let AOAway_draw2: any[] = [];
    let AOAll_draw2: any[] = [];

    let HOHome_lose2: any[] = [];
    let HOAll_lose2: any[] = [];
    let AOAway_lose2: any[] = [];
    let AOAll_lose2: any[] = [];

    let HOHome_more_SH: any[] = [];
    let HOAll_more_SH: any[] = [];
    let AOAway_more_SH: any[] = [];
    let AOAll_more_SH: any[] = [];

    let HOHome_more_FH: any[] = [];
    let HOAll_more_FH: any[] = [];
    let AOAway_more_FH: any[] = [];
    let AOAll_more_FH: any[] = [];

    let HOHome_sinSH: any[] = [];
    let HOAll_sinSH: any[] = [];
    let AOAway_sinSH: any[] = [];
    let AOAll_sinSH: any[] = [];

    let HOHome_BTTS_SH: any[] = [];
    let HOAll_BTTS_SH: any[] = [];
    let AOAway_BTTS_SH: any[] = [];
    let AOAll_BTTS_SH: any[] = [];

    let HOHome_gspm: any[] = [];
    let HOAll_gspm: any[] = [];
    let AOAway_gspm: any[] = [];
    let AOAll_gspm: any[] = [];

    let HOHome_gcpm: any[] = [];
    let HOAll_gcpm: any[] = [];
    let AOAway_gcpm: any[] = [];
    let AOAll_gcpm: any[] = [];

    let HOHome_bts: any[] = [];
    let HOAll_bts: any[] = [];
    let AOAway_bts: any[] = [];
    let AOAll_bts: any[] = [];

    let HOHome_win: any[] = [];
    let HOAll_win: any[] = [];
    let AOAway_win: any[] = [];
    let AOAll_win: any[] = [];

    let HOHome_draw: any[] = [];
    let HOAll_draw: any[] = [];
    let AOAway_draw: any[] = [];
    let AOAll_draw: any[] = [];

    let HOHome_lose: any[] = [];
    let HOAll_lose: any[] = [];
    let AOAway_lose: any[] = [];
    let AOAll_lose: any[] = [];

    let HOHome_win3: any[] = [];
    let HOAll_win3: any[] = [];
    let AOAway_win3: any[] = [];
    let AOAll_win3: any[] = [];

    let HOHome_draw3: any[] = [];
    let HOAll_draw3: any[] = [];
    let AOAway_draw3: any[] = [];
    let AOAll_draw3: any[] = [];

    let HOHome_lose3: any[] = [];
    let HOAll_lose3: any[] = [];
    let AOAway_lose3: any[] = [];
    let AOAll_lose3: any[] = [];

    let HOHome_btts3: any[] = [];
    let HOAll_btts3: any[] = [];
    let AOAway_btts3: any[] = [];
    let AOAll_btts3: any[] = [];

    let HOHome_sinFH: any[] = [];
    let HOAll_sinFH: any[] = [];
    let AOAway_sinFH: any[] = [];
    let AOAll_sinFH: any[] = [];

    let HOHome_btsFH: any[] = [];
    let HOAll_btsFH: any[] = [];
    let AOAway_btsFH: any[] = [];
    let AOAll_btsFH: any[] = [];

    let HOHome_cleanS: any[] = [];
    let HOAll_cleanS: any[] = [];
    let AOAway_cleanS: any[] = [];
    let AOAll_cleanS: any[] = [];

    let HOHome_soem: any[] = [];
    let HOAll_soem: any[] = [];
    let AOAway_soem: any[] = [];
    let AOAll_soem: any[] = [];

    let HOHome_stgoem: any[] = [];
    let HOAll_stgoem: any[] = [];
    let AOAway_stgoem: any[] = [];
    let AOAll_stgoem: any[] = [];

    let HOHome_sibh: any[] = [];
    let HOAll_sibh: any[] = [];
    let AOAway_sibh: any[] = [];
    let AOAll_sibh: any[] = [];

    let HOHome_gibh: any[] = [];
    let HOAll_gibh: any[] = [];
    let AOAway_gibh: any[] = [];
    let AOAll_gibh: any[] = [];

    let HOHome_leadHT: any[] = [];
    let HOAll_leadHT: any[] = [];
    let AOAway_leadHT: any[] = [];
    let AOAll_leadHT: any[] = [];

    let HOHome_loseHT: any[] = [];
    let HOAll_loseHT: any[] = [];
    let AOAway_loseHT: any[] = [];
    let AOAll_loseHT: any[] = [];

    let HOHome_drawHT: any[] = [];
    let HOAll_drawHT: any[] = [];
    let AOAway_drawHT: any[] = [];
    let AOAll_drawHT: any[] = [];

    let HOHome_over_1_5: any[] = [];
    let HOAll_over_1_5: any[] = [];
    let AOAway_over_1_5: any[] = [];
    let AOAll_over_1_5: any[] = [];

    let HOHome_over_2_5: any[] = [];
    let HOAll_over_2_5: any[] = [];
    let AOAway_over_2_5: any[] = [];
    let AOAll_over_2_5: any[] = [];

    let HOHome_over_3_5: any[] = [];
    let HOAll_over_3_5: any[] = [];
    let AOAway_over_3_5: any[] = [];
    let AOAll_over_3_5: any[] = [];

    let HOHome_over_4_5: any[] = [];
    let HOAll_over_4_5: any[] = [];
    let AOAway_over_4_5: any[] = [];
    let AOAll_over_4_5: any[] = [];

    let HOHome_over_5_5: any[] = [];
    let HOAll_over_5_5: any[] = [];
    let AOAway_over_5_5: any[] = [];
    let AOAll_over_5_5: any[] = [];

    let HOHome_under_1_5: any[] = [];
    let HOAll_under_1_5: any[] = [];
    let AOAway_under_1_5: any[] = [];
    let AOAll_under_1_5: any[] = [];

    let HOHome_under_2_5: any[] = [];
    let HOAll_under_2_5: any[] = [];
    let AOAway_under_2_5: any[] = [];
    let AOAll_under_2_5: any[] = [];

    let HOHome_over_0_5_HT: any[] = [];
    let HOAll_over_0_5_HT: any[] = [];
    let AOAway_over_0_5_HT: any[] = [];
    let AOAll_over_0_5_HT: any[] = [];

    let HOHome_over_1_5_HT: any[] = [];
    let HOAll_over_1_5_HT: any[] = [];
    let AOAway_over_1_5_HT: any[] = [];
    let AOAll_over_1_5_HT: any[] = [];

    let HOHome_over_2_5_HT: any[] = [];
    let HOAll_over_2_5_HT: any[] = [];
    let AOAway_over_2_5_HT: any[] = [];
    let AOAll_over_2_5_HT: any[] = [];

    let HOHome_win_BTTS: any[] = [];
    let HOAll_win_BTTS: any[] = [];
    let AOAway_win_BTTS: any[] = [];
    let AOAll_win_BTTS: any[] = [];

    let HOHome_draw_BTTS: any[] = [];
    let HOAll_draw_BTTS: any[] = [];
    let AOAway_draw_BTTS: any[] = [];
    let AOAll_draw_BTTS: any[] = [];

    let HOHome_lose_BTTS: any[] = [];
    let HOAll_lose_BTTS: any[] = [];
    let AOAway_lose_BTTS: any[] = [];
    let AOAll_lose_BTTS: any[] = [];

    let HOHome_home_home: any[] = [];
    let HOAll_home_home: any[] = [];
    let AOAway_home_home: any[] = [];
    let AOAll_home_home: any[] = [];

    let HOHome_home_draw: any[] = [];
    let HOAll_home_draw: any[] = [];
    let AOAway_home_draw: any[] = [];
    let AOAll_home_draw: any[] = [];

    let HOHome_home_away: any[] = [];
    let HOAll_home_away: any[] = [];
    let AOAway_home_away: any[] = [];
    let AOAll_home_away: any[] = [];

    let HOHome_draw_home: any[] = [];
    let HOAll_draw_home: any[] = [];
    let AOAway_draw_home: any[] = [];
    let AOAll_draw_home: any[] = [];

    let HOHome_draw_draw: any[] = [];
    let HOAll_draw_draw: any[] = [];
    let AOAway_draw_draw: any[] = [];
    let AOAll_draw_draw: any[] = [];

    let HOHome_draw_away: any[] = [];
    let HOAll_draw_away: any[] = [];
    let AOAway_draw_away: any[] = [];
    let AOAll_draw_away: any[] = [];

    let HOHome_away_home: any[] = [];
    let HOAll_away_home: any[] = [];
    let AOAway_away_home: any[] = [];
    let AOAll_away_home: any[] = [];

    let HOHome_away_draw: any[] = [];
    let HOAll_away_draw: any[] = [];
    let AOAway_away_draw: any[] = [];
    let AOAll_away_draw: any[] = [];

    let HOHome_away_away: any[] = [];
    let HOAll_away_away: any[] = [];
    let AOAway_away_away: any[] = [];
    let AOAll_away_away: any[] = [];

    let homeOBJHome_games: any[] = [];
    let homeOBJAll_games: any[] = [];
    let awayOBJAway_games: any[] = [];
    let awayOBJAll_games: any[] = [];

    let sqlDate = null;
    let matchDate = new Date(props.date);
    matchDate.setDate(matchDate.getDate());
    // matchDate.setHours(0,0,0,0);
    let end = true;

    let sqlDateMinus = new Date();
    let sqlDatePlus = new Date();

    json_result.map((element: any) => {
      sqlDate = new Date(element.gameDate);
      sqlDate.setHours(matchDate.getHours(), matchDate.getMinutes(), 0, 0);

      sqlDateMinus.setTime(sqlDate.getTime() - 1 * 86400000);
      sqlDateMinus.setHours(matchDate.getHours(), matchDate.getMinutes(), 0, 0);

      sqlDatePlus.setTime(sqlDate.getTime() + 1 * 86400000);
      sqlDatePlus.setHours(matchDate.getHours(), matchDate.getMinutes(), 0, 0);

      if (
        sqlDate.getTime() > matchDate.getTime() ||
        sqlDate.getTime() === matchDate.getTime()
      ) {
        end = false;
      }

      // If dates are the same start fun form calc results
      if (
        (sqlDate.getTime() === matchDate.getTime() ||
          sqlDateMinus.getTime() === matchDate.getTime() ||
          sqlDatePlus.getTime() === matchDate.getTime()) &&
        homeTeam === element.homeTeam &&
        awayTeam === element.awayTeam
      ) {
        final_results = finalResultsFun(final_results, element);
      }

      // Home team as home
      if (homeTeam === element.homeTeam && end) {
        homeOBJHome.gspm += element.homeScoreFullTime;
        HOHome_gspm.push(element);
        HOHome_gcpm.push(element);
        homeOBJHome.gcpm += element.awayScoreFullTime;
        homeOBJHome.gamesCount += 1;

        homeOBJHome_games.push(element);

        // Conceded in both halfs
        if (element.awayScoreFirstHalf > 0 && element.awayScoreSecondHalf > 0) {
          homeOBJHome.cc_sibh += 1;
          homeOBJHome.cc_sibhSER += 1;
        } else {
          homeOBJHome.cc_sibhSER = 0;
        }

        // Over 0.5, 1.5, 2.5 Goals Second Half
        let secHalfGoals =
          element.homeScoreSecondHalf + element.awayScoreSecondHalf;
        if (secHalfGoals > 0) {
          homeOBJHome.over_0_5_SH += 1;
          homeOBJHome.over_0_5_SHSER += 1;
          HOHome_over_0_5_SH.push(element);

          if (secHalfGoals > 1) {
            homeOBJHome.over_1_5_SH += 1;
            homeOBJHome.over_1_5_SHSER += 1;
            HOHome_over_1_5_SH.push(element);
          } else {
            homeOBJHome.over_1_5_SHSER = 0;
          }

          if (secHalfGoals > 2) {
            homeOBJHome.over_2_5_SH += 1;
            homeOBJHome.over_2_5_SHSER += 1;
            HOHome_over_2_5_SH.push(element);
          } else {
            homeOBJHome.over_2_5_SHSER = 0;
          }
        } else {
          homeOBJHome.over_0_5_SHSER = 0;
          homeOBJHome.over_1_5_SHSER = 0;
          homeOBJHome.over_2_5_SHSER = 0;
        }

        // conceded 0.5, 0.5FH i 1.5
        if (element.awayScoreFullTime > 0) {
          homeOBJHome.cc_0_5 += 1;
          homeOBJHome.cc_0_5SER += 1;
          if (element.awayScoreFirstHalf > 0) {
            homeOBJHome.cc_0_5_FH += 1;
            homeOBJHome.cc_0_5_FHSER += 1;
          } else {
            homeOBJHome.cc_0_5_FHSER = 0;
          }
          if (element.awayScoreFullTime > 1) {
            homeOBJHome.cc_1_5 += 1;
            homeOBJHome.cc_1_5SER += 1;
          } else {
            homeOBJHome.cc_1_5SER = 0;
          }
        } else {
          homeOBJHome.cc_0_5SER = 0;
          homeOBJHome.cc_1_5SER = 0;
          homeOBJHome.cc_0_5_FHSER = 0;
        }

        // conceded goal second half
        if (element.awayScoreSecondHalf > 0) {
          homeOBJHome.cc_0_5_SH += 1;
          homeOBJHome.cc_0_5_SHSER += 1;
        } else {
          homeOBJHome.cc_0_5_SHSER = 0;
        }

        // More goals first half / second half
        if (
          element.homeScoreFirstHalf + element.awayScoreFirstHalf >
          element.homeScoreSecondHalf + element.awayScoreSecondHalf
        ) {
          homeOBJHome.more_FH += 1;
          homeOBJHome.more_FHSER += 1;
          homeOBJHome.more_SHSER = 0;
          HOHome_more_FH.push(element);
        } else if (
          element.homeScoreFirstHalf + element.awayScoreFirstHalf <
          element.homeScoreSecondHalf + element.awayScoreSecondHalf
        ) {
          homeOBJHome.more_SH += 1;
          homeOBJHome.more_SHSER += 1;
          homeOBJHome.more_FHSER = 0;
          HOHome_more_SH.push(element);
        } else {
          homeOBJHome.more_FHSER = 0;
          homeOBJHome.more_SHSER = 0;
        }

        // Team scored Second Half
        if (element.homeScoreSecondHalf > 0) {
          homeOBJHome.sinSH += 1;
          homeOBJHome.sinSHSER += 1;
          HOHome_sinSH.push(element);
        } else {
          homeOBJHome.sinSHSER = 0;
        }

        // Win, Draw, Lose
        let allGoals = element.homeScoreFullTime + element.awayScoreFullTime;

        if (element.winnerFT === "h") {
          homeOBJHome.win += 1;
          homeOBJHome.winSER += 1;
          homeOBJHome.drawSER = 0;
          homeOBJHome.loseSER = 0;
          HOHome_win.push(element);

          if (allGoals > 1) {
            homeOBJHome.win2 += 1;
            homeOBJHome.win2SER += 1;
            homeOBJHome.draw2SER = 0;
            homeOBJHome.lose2SER = 0;
            HOHome_win2.push(element);
          } else {
            homeOBJHome.win2SER = 0;
            homeOBJHome.draw2SER = 0;
            homeOBJHome.lose2SER = 0;
          }

          if (allGoals > 2) {
            homeOBJHome.win3 += 1;
            homeOBJHome.win3SER += 1;
            homeOBJHome.draw3SER = 0;
            homeOBJHome.lose3SER = 0;
            HOHome_win3.push(element);
          } else {
            homeOBJHome.win3SER = 0;
            homeOBJHome.draw3SER = 0;
            homeOBJHome.lose3SER = 0;
          }
        } else if (element.winnerFT === "d") {
          homeOBJHome.draw += 1;
          homeOBJHome.winSER = 0;
          homeOBJHome.drawSER += 1;
          homeOBJHome.loseSER = 0;
          HOHome_draw.push(element);

          if (allGoals > 1) {
            homeOBJHome.draw2 += 1;
            homeOBJHome.win2SER = 0;
            homeOBJHome.draw2SER += 1;
            homeOBJHome.lose2SER = 0;
            HOHome_draw2.push(element);
          } else {
            homeOBJHome.win2SER = 0;
            homeOBJHome.draw2SER = 0;
            homeOBJHome.lose2SER = 0;
          }

          if (allGoals > 2) {
            homeOBJHome.draw3 += 1;
            homeOBJHome.win3SER = 0;
            homeOBJHome.draw3SER += 1;
            homeOBJHome.lose3SER = 0;
            HOHome_draw3.push(element);
          } else {
            homeOBJHome.win3SER = 0;
            homeOBJHome.draw3SER = 0;
            homeOBJHome.lose3SER = 0;
          }
        } else {
          homeOBJHome.lose += 1;
          homeOBJHome.winSER = 0;
          homeOBJHome.drawSER = 0;
          homeOBJHome.loseSER += 1;
          HOHome_lose.push(element);

          if (allGoals > 1) {
            homeOBJHome.lose2 += 1;
            homeOBJHome.win2SER = 0;
            homeOBJHome.draw2SER = 0;
            homeOBJHome.lose2SER += 1;
            HOHome_lose2.push(element);
          } else {
            homeOBJHome.win2SER = 0;
            homeOBJHome.draw2SER = 0;
            homeOBJHome.lose2SER = 0;
          }

          if (allGoals > 2) {
            homeOBJHome.lose3 += 1;
            homeOBJHome.win3SER = 0;
            homeOBJHome.draw3SER = 0;
            homeOBJHome.lose3SER += 1;
            HOHome_lose3.push(element);
          } else {
            homeOBJHome.win3SER = 0;
            homeOBJHome.draw3SER = 0;
            homeOBJHome.lose3SER = 0;
          }
        }

        // GG3+
        if (element.homeScoreFullTime && element.awayScoreFullTime) {
          if (allGoals > 2) {
            homeOBJHome.btts3 += 1;
            HOHome_btts3.push(element);
          } else {
            homeOBJHome.btts3SER = 0;
          }
        } else {
          homeOBJHome.btts3SER = 0;
        }

        // gg second half
        if (element.homeScoreSecondHalf && element.awayScoreSecondHalf) {
          homeOBJHome.BTTS_SH += 1;
          homeOBJHome.BTTS_SHSER += 1;
          HOHome_BTTS_SH.push(element);
        } else {
          homeOBJHome.BTTS_SHSER = 0;
        }

        // Team scored in First Half
        if (element.homeScoreFirstHalf > 0) {
          homeOBJHome.sinFH += 1;
          homeOBJHome.sinFHSER += 1;
          HOHome_sinFH.push(element);
        } else {
          homeOBJHome.sinFHSER = 0;
        }

        // both scored - GG
        if (element.homeScoreFullTime && element.awayScoreFullTime) {
          homeOBJHome.bts += 1;
          homeOBJHome.btsSER += 1;
          HOHome_bts.push(element);

          // gg first half
          if (element.homeScoreFirstHalf && element.awayScoreFirstHalf) {
            homeOBJHome.btsFH += 1;
            homeOBJHome.btsFHSER += 1;
            HOHome_btsFH.push(element);
          } else {
            homeOBJHome.btsFHSER = 0;
          }

          // 1&gg, x&gg, 2&gg
          if (element.winnerFT === "h") {
            homeOBJHome.win_BTTS += 1;
            homeOBJHome.win_BTTSSER += 1;
            homeOBJHome.draw_BTTSSER = 0;
            homeOBJHome.lose_BTTSSER = 0;
            HOHome_win_BTTS.push(element);
          } else if (element.winnerFT === "d") {
            homeOBJHome.draw_BTTS += 1;
            homeOBJHome.win_BTTSSER = 0;
            homeOBJHome.draw_BTTSSER += 1;
            homeOBJHome.lose_BTTSSER = 0;
            HOHome_draw_BTTS.push(element);
          } else {
            homeOBJHome.lose_BTTS += 1;
            HOHome_lose_BTTS.push(element);
            homeOBJHome.win_BTTSSER = 0;
            homeOBJHome.draw_BTTSSER = 0;
            homeOBJHome.lose_BTTSSER += 1;
          }
        } else {
          homeOBJHome.btsSER = 0;
          homeOBJHome.btsFHSER = 0;
          homeOBJHome.win_BTTSSER = 0;
          homeOBJHome.draw_BTTSSER = 0;
          homeOBJHome.lose_BTTSSER = 0;
        }

        // clean sheets
        if (element.awayScoreFullTime === 0) {
          homeOBJHome.cleanS += 1;
          homeOBJHome.cleanSSER += 1;
          HOHome_cleanS.push(element);
        } else {
          homeOBJHome.cleanSSER = 0;
        }

        // Scored on every match
        if (element.homeScoreFullTime > 0) {
          homeOBJHome.soem += 1;
          homeOBJHome.soemSER += 1;
          HOHome_soem.push(element);
        } else {
          homeOBJHome.soemSER = 0;
        }

        // Scored two goals on every match
        if (element.homeScoreFullTime > 1) {
          homeOBJHome.stgoem += 1;
          HOHome_stgoem.push(element);
          homeOBJHome.stgoemSER += 1;
        } else {
          homeOBJHome.stgoemSER = 0;
        }

        // Team scored in both halves
        if (element.homeScoreFirstHalf && element.homeScoreSecondHalf) {
          homeOBJHome.sibh += 1;
          HOHome_sibh.push(element);
          homeOBJHome.sibhSER += 1;
        } else {
          homeOBJHome.sibhSER = 0;
        }

        // Goal in both halves
        if (
          (element.homeScoreFirstHalf || element.awayScoreFirstHalf) &&
          (element.homeScoreSecondHalf || element.awayScoreSecondHalf)
        ) {
          homeOBJHome.gibh += 1;
          HOHome_gibh.push(element);
          homeOBJHome.gibhSER += 1;
        } else {
          homeOBJHome.gibhSER = 0;
        }

        // Lead/lose/draw at half-time ...
        if (element.winnerFH === "h") {
          homeOBJHome.leadHT += 1;
          HOHome_leadHT.push(element);
          homeOBJHome.leadHTSER += 1;
          homeOBJHome.drawHTSER = 0;
          homeOBJHome.loseHTSER = 0;
        } else if (element.winnerFH === "d") {
          homeOBJHome.drawHT += 1;
          HOHome_drawHT.push(element);
          homeOBJHome.leadHTSER = 0;
          homeOBJHome.drawHTSER += 1;
          homeOBJHome.loseHTSER = 0;
        } else {
          homeOBJHome.loseHT += 1;
          HOHome_loseHT.push(element);
          homeOBJHome.leadHTSER = 0;
          homeOBJHome.drawHTSER = 0;
          homeOBJHome.loseHTSER += 1;
        }

        // Over x goals
        allGoals = element.homeScoreFullTime + element.awayScoreFullTime;
        if (allGoals > 1) {
          homeOBJHome.over_1_5 += 1;
          HOHome_over_1_5.push(element);
          homeOBJHome.over_1_5SER += 1;
        } else {
          homeOBJHome.over_1_5SER = 0;
        }

        if (allGoals > 2) {
          homeOBJHome.over_2_5 += 1;
          HOHome_over_2_5.push(element);
          homeOBJHome.over_2_5SER += 1;
        } else {
          homeOBJHome.over_2_5SER = 0;
        }

        if (allGoals > 3) {
          homeOBJHome.over_3_5 += 1;
          HOHome_over_3_5.push(element);
          homeOBJHome.over_3_5SER += 1;
        } else {
          homeOBJHome.over_3_5SER = 0;
        }

        if (allGoals > 4) {
          homeOBJHome.over_4_5 += 1;
          HOHome_over_4_5.push(element);
          homeOBJHome.over_4_5SER += 1;
        } else {
          homeOBJHome.over_4_5SER = 0;
        }

        if (allGoals > 5) {
          homeOBJHome.over_5_5 += 1;
          HOHome_over_5_5.push(element);
          homeOBJHome.over_5_5SER += 1;
        } else {
          homeOBJHome.over_5_5SER = 0;
        }

        // Under goals
        if (allGoals < 3) {
          homeOBJHome.under_2_5 += 1;
          HOHome_under_2_5.push(element);
          homeOBJHome.under_2_5SER += 1;
        } else {
          homeOBJHome.under_2_5SER = 0;
        }

        if (allGoals < 2) {
          homeOBJHome.under_1_5 += 1;
          HOHome_under_1_5.push(element);
          homeOBJHome.under_1_5SER += 1;
        } else {
          homeOBJHome.under_1_5SER = 0;
        }

        // Over x goals at half-time
        allGoals = element.homeScoreFirstHalf + element.awayScoreFirstHalf;
        if (allGoals > 0) {
          homeOBJHome.over_0_5_HT += 1;
          HOHome_over_0_5_HT.push(element);
          homeOBJHome.over_0_5_HTSER += 1;
        } else {
          homeOBJHome.over_0_5_HTSER = 0;
        }

        if (allGoals > 1) {
          homeOBJHome.over_1_5_HT += 1;
          HOHome_over_1_5_HT.push(element);
          homeOBJHome.over_1_5_HTSER += 1;
        } else {
          homeOBJHome.over_1_5_HTSER = 0;
        }

        if (allGoals > 2) {
          homeOBJHome.over_2_5_HT += 1;
          HOHome_over_2_5_HT.push(element);
          homeOBJHome.over_2_5_HTSER += 1;
        } else {
          homeOBJHome.over_2_5_HTSER = 0;
        }

        // half-time/Full Time
        if (element.winnerFH === "h") {
          homeOBJHome.draw_homeSER = 0;
          homeOBJHome.draw_drawSER = 0;
          homeOBJHome.draw_awaySER = 0;

          homeOBJHome.away_homeSER = 0;
          homeOBJHome.away_drawSER = 0;
          homeOBJHome.away_awaySER = 0;

          if (element.winnerFT === "h") {
            homeOBJHome.home_home += 1;
            HOHome_home_home.push(element);
            homeOBJHome.home_homeSER += 1;

            homeOBJHome.home_drawSER = 0;
            homeOBJHome.home_awaySER = 0;
          } else if (element.winnerFT === "d") {
            homeOBJHome.home_draw += 1;
            HOHome_home_draw.push(element);
            homeOBJHome.home_drawSER += 1;

            homeOBJHome.home_homeSER = 0;
            homeOBJHome.home_awaySER = 0;
          } else {
            homeOBJHome.home_away += 1;
            HOHome_home_away.push(element);
            homeOBJHome.home_awaySER += 1;

            homeOBJHome.home_homeSER = 0;
            homeOBJHome.home_drawSER = 0;
          }
        } else if (element.winnerFH === "d") {
          homeOBJHome.home_homeSER = 0;
          homeOBJHome.home_drawSER = 0;
          homeOBJHome.home_awaySER = 0;

          homeOBJHome.away_homeSER = 0;
          homeOBJHome.away_drawSER = 0;
          homeOBJHome.away_awaySER = 0;

          if (element.winnerFT === "h") {
            homeOBJHome.draw_home += 1;
            HOHome_draw_home.push(element);
            homeOBJHome.draw_homeSER += 1;

            homeOBJHome.draw_drawSER = 0;
            homeOBJHome.draw_awaySER = 0;
          } else if (element.winnerFT === "d") {
            homeOBJHome.draw_draw += 1;
            HOHome_draw_draw.push(element);
            homeOBJHome.draw_drawSER += 1;

            homeOBJHome.draw_homeSER = 0;
            homeOBJHome.draw_awaySER = 0;
          } else {
            homeOBJHome.draw_away += 1;
            HOHome_draw_away.push(element);
            homeOBJHome.draw_awaySER += 1;

            homeOBJHome.draw_homeSER = 0;
            homeOBJHome.draw_drawSER = 0;
          }
        } else {
          homeOBJHome.home_homeSER = 0;
          homeOBJHome.home_drawSER = 0;
          homeOBJHome.home_awaySER = 0;

          homeOBJHome.draw_homeSER = 0;
          homeOBJHome.draw_drawSER = 0;
          homeOBJHome.draw_awaySER = 0;

          if (element.winnerFT === "h") {
            homeOBJHome.away_home += 1;
            HOHome_away_home.push(element);
            homeOBJHome.away_homeSER += 1;

            homeOBJHome.away_drawSER = 0;
            homeOBJHome.away_awaySER = 0;
          } else if (element.winnerFT === "d") {
            homeOBJHome.away_draw += 1;
            HOHome_away_draw.push(element);
            homeOBJHome.away_drawSER += 1;

            homeOBJHome.away_homeSER = 0;
            homeOBJHome.away_awaySER = 0;
          } else {
            homeOBJHome.away_away += 1;
            HOHome_away_away.push(element);
            homeOBJHome.away_awaySER += 1;

            homeOBJHome.away_homeSER = 0;
            homeOBJHome.away_drawSER = 0;
          }
        }
      }

      // Home team on all games
      if (
        (homeTeam === element.homeTeam || homeTeam === element.awayTeam) &&
        end
      ) {
        const isHome = homeTeam === element.homeTeam ? true : false;

        homeOBJAll_games.push(element);

        // Conceded in both halfs
        if (isHome) {
          if (
            element.awayScoreFirstHalf > 0 &&
            element.awayScoreSecondHalf > 0
          ) {
            homeOBJAll.cc_sibh += 1;
            homeOBJAll.cc_sibhSER += 1;
          } else {
            homeOBJAll.cc_sibhSER = 0;
          }
        } else {
          if (
            element.homeScoreFirstHalf > 0 &&
            element.homeScoreSecondHalf > 0
          ) {
            homeOBJAll.cc_sibh += 1;
            homeOBJAll.cc_sibhSER += 1;
          } else {
            homeOBJAll.cc_sibhSER = 0;
          }
        }

        // Over 0.5, 1.5, 2.5 Goals Second Half
        let secHalfGoals =
          element.homeScoreSecondHalf + element.awayScoreSecondHalf;
        if (secHalfGoals > 0) {
          homeOBJAll.over_0_5_SH += 1;
          homeOBJAll.over_0_5_SHSER += 1;
          HOAll_over_0_5_SH.push(element);

          if (secHalfGoals > 1) {
            homeOBJAll.over_1_5_SH += 1;
            homeOBJAll.over_1_5_SHSER += 1;
            HOAll_over_1_5_SH.push(element);
          } else {
            homeOBJAll.over_1_5_SHSER = 0;
          }

          if (secHalfGoals > 2) {
            homeOBJAll.over_2_5_SH += 1;
            homeOBJAll.over_2_5_SHSER += 1;
            HOAll_over_2_5_SH.push(element);
          } else {
            homeOBJAll.over_2_5_SHSER = 0;
          }
        } else {
          homeOBJAll.over_0_5_SHSER = 0;
          homeOBJAll.over_1_5_SHSER = 0;
          homeOBJAll.over_2_5_SHSER = 0;
        }

        // conceded goal second half
        if (isHome) {
          if (element.awayScoreSecondHalf > 0) {
            homeOBJAll.cc_0_5_SH += 1;
            homeOBJAll.cc_0_5_SHSER += 1;
          } else {
            homeOBJAll.cc_0_5_SHSER = 0;
          }
        } else {
          if (element.homeScoreSecondHalf > 0) {
            homeOBJAll.cc_0_5_SH += 1;
            homeOBJAll.cc_0_5_SHSER += 1;
          } else {
            homeOBJAll.cc_0_5_SHSER = 0;
          }
        }

        // conceded 0.5, 0.5FH i 1.5
        if (isHome) {
          if (element.awayScoreFullTime > 0) {
            homeOBJAll.cc_0_5 += 1;
            homeOBJAll.cc_0_5SER += 1;
            if (element.awayScoreFirstHalf > 0) {
              homeOBJAll.cc_0_5_FH += 1;
              homeOBJAll.cc_0_5_FHSER += 1;
            } else {
              homeOBJAll.cc_0_5_FHSER = 0;
            }
            if (element.awayScoreFullTime > 1) {
              homeOBJAll.cc_1_5 += 1;
              homeOBJAll.cc_1_5SER += 1;
            } else {
              homeOBJAll.cc_1_5SER = 0;
            }
          } else {
            homeOBJAll.cc_0_5SER = 0;
            homeOBJAll.cc_1_5SER = 0;
            homeOBJAll.cc_0_5_FHSER = 0;
          }
        } else {
          if (element.homeScoreFullTime > 0) {
            homeOBJAll.cc_0_5 += 1;
            homeOBJAll.cc_0_5SER += 1;
            if (element.homeScoreFirstHalf > 0) {
              homeOBJAll.cc_0_5_FH += 1;
              homeOBJAll.cc_0_5_FHSER += 1;
            } else {
              homeOBJAll.cc_0_5_FHSER = 0;
            }
            if (element.homeScoreFullTime > 1) {
              homeOBJAll.cc_1_5 += 1;
              homeOBJAll.cc_1_5SER += 1;
            } else {
              homeOBJAll.cc_1_5SER = 0;
            }
          } else {
            homeOBJAll.cc_0_5SER = 0;
            homeOBJAll.cc_1_5SER = 0;
            homeOBJAll.cc_0_5_FHSER = 0;
          }
        }

        // More goals first half / second half
        if (
          element.homeScoreFirstHalf + element.awayScoreFirstHalf >
          element.homeScoreSecondHalf + element.awayScoreSecondHalf
        ) {
          homeOBJAll.more_FH += 1;
          homeOBJAll.more_FHSER += 1;
          homeOBJAll.more_SHSER = 0;
          HOAll_more_FH.push(element);
        } else if (
          element.homeScoreFirstHalf + element.awayScoreFirstHalf <
          element.homeScoreSecondHalf + element.awayScoreSecondHalf
        ) {
          homeOBJAll.more_SH += 1;
          homeOBJAll.more_SHSER += 1;
          homeOBJAll.more_FHSER = 0;
          HOAll_more_SH.push(element);
        } else {
          homeOBJAll.more_FHSER = 0;
          homeOBJAll.more_SHSER = 0;
        }

        // Team scored Second Half
        if (isHome) {
          if (element.homeScoreSecondHalf > 0) {
            homeOBJAll.sinSH += 1;
            homeOBJAll.sinSHSER += 1;
            HOAll_sinSH.push(element);
          } else {
            homeOBJAll.sinSHSER = 0;
          }
        } else {
          if (element.awayScoreSecondHalf > 0) {
            homeOBJAll.sinSH += 1;
            homeOBJAll.sinSHSER += 1;
            HOAll_sinSH.push(element);
          } else {
            homeOBJAll.sinSHSER = 0;
          }
        }

        // Goals scored per match
        if (isHome) {
          homeOBJAll.gspm += element.homeScoreFullTime;
          HOAll_gspm.push(element);
        } else {
          homeOBJAll.gspm += element.awayScoreFullTime;
          HOAll_gspm.push(element);
        }

        if (isHome) {
          homeOBJAll.gcpm += element.awayScoreFullTime;
          HOAll_gcpm.push(element);
        } else {
          homeOBJAll.gcpm += element.homeScoreFullTime;
          HOAll_gcpm.push(element);
        }

        homeOBJAll.gamesCount += 1;

        // Win, Draw, Lose
        if (isHome) {
          let allGoals = element.homeScoreFullTime + element.awayScoreFullTime;
          if (element.winnerFT === "h") {
            homeOBJAll.win += 1;
            homeOBJAll.winSER += 1;
            homeOBJAll.drawSER = 0;
            homeOBJAll.loseSER = 0;
            HOAll_win.push(element);

            if (allGoals > 1) {
              homeOBJAll.win2 += 1;
              homeOBJAll.win2SER += 1;
              homeOBJAll.draw2SER = 0;
              homeOBJAll.lose2SER = 0;
              HOAll_win2.push(element);
            } else {
              homeOBJAll.win2SER = 0;
              homeOBJAll.draw2SER = 0;
              homeOBJAll.lose2SER = 0;
            }

            if (allGoals > 2) {
              homeOBJAll.win3 += 1;
              homeOBJAll.win3SER += 1;
              homeOBJAll.draw3SER = 0;
              homeOBJAll.lose3SER = 0;
              HOAll_win3.push(element);
            } else {
              homeOBJAll.win3SER = 0;
              homeOBJAll.draw3SER = 0;
              homeOBJAll.lose3SER = 0;
            }
          } else if (element.winnerFT === "d") {
            homeOBJAll.draw += 1;
            homeOBJAll.winSER = 0;
            homeOBJAll.drawSER += 1;
            homeOBJAll.loseSER = 0;
            HOAll_draw.push(element);

            if (allGoals > 1) {
              homeOBJAll.draw2 += 1;
              homeOBJAll.win2SER = 0;
              homeOBJAll.draw2SER += 1;
              homeOBJAll.lose2SER = 0;
              HOAll_draw2.push(element);
            } else {
              homeOBJAll.win2SER = 0;
              homeOBJAll.draw2SER = 0;
              homeOBJAll.lose2SER = 0;
            }

            if (allGoals > 2) {
              homeOBJAll.draw3 += 1;
              homeOBJAll.win3SER = 0;
              homeOBJAll.draw3SER += 1;
              homeOBJAll.lose3SER = 0;
              HOAll_draw3.push(element);
            } else {
              homeOBJAll.win3SER = 0;
              homeOBJAll.draw3SER = 0;
              homeOBJAll.lose3SER = 0;
            }
          } else {
            homeOBJAll.lose += 1;
            homeOBJAll.winSER = 0;
            homeOBJAll.drawSER = 0;
            homeOBJAll.loseSER += 1;
            HOAll_lose.push(element);

            if (allGoals > 1) {
              homeOBJAll.lose2 += 1;
              homeOBJAll.win2SER = 0;
              homeOBJAll.draw2SER = 0;
              homeOBJAll.lose2SER += 1;
              HOAll_lose2.push(element);
            } else {
              homeOBJAll.win2SER = 0;
              homeOBJAll.draw2SER = 0;
              homeOBJAll.lose2SER = 0;
            }

            if (allGoals > 2) {
              homeOBJAll.lose3 += 1;
              homeOBJAll.win3SER = 0;
              homeOBJAll.draw3SER = 0;
              homeOBJAll.lose3SER += 1;
              HOAll_lose3.push(element);
            } else {
              homeOBJAll.win3SER = 0;
              homeOBJAll.draw3SER = 0;
              homeOBJAll.lose3SER = 0;
            }
          }

          // Team scored in First Half
          if (element.homeScoreFirstHalf > 0) {
            homeOBJAll.sinFH += 1;
            homeOBJAll.sinFHSER += 1;
            HOAll_sinFH.push(element);
          } else {
            homeOBJAll.sinFHSER = 0;
          }
        } else {
          let allGoals = element.homeScoreFullTime + element.awayScoreFullTime;
          if (element.winnerFT === "a") {
            homeOBJAll.win += 1;
            homeOBJAll.winSER += 1;
            homeOBJAll.drawSER = 0;
            homeOBJAll.loseSER = 0;
            HOAll_win.push(element);

            if (allGoals > 1) {
              homeOBJAll.win2 += 1;
              homeOBJAll.win2SER += 1;
              homeOBJAll.draw2SER = 0;
              homeOBJAll.lose2SER = 0;
              HOAll_win2.push(element);
            } else {
              homeOBJAll.win2SER = 0;
              homeOBJAll.draw2SER = 0;
              homeOBJAll.lose2SER = 0;
            }

            if (allGoals > 2) {
              homeOBJAll.win3 += 1;
              homeOBJAll.win3SER += 1;
              homeOBJAll.draw3SER = 0;
              homeOBJAll.lose3SER = 0;
              HOAll_win3.push(element);
            } else {
              homeOBJAll.win3SER = 0;
              homeOBJAll.draw3SER = 0;
              homeOBJAll.lose3SER = 0;
            }
          } else if (element.winnerFT === "d") {
            homeOBJAll.draw += 1;
            homeOBJAll.winSER = 0;
            homeOBJAll.drawSER += 1;
            homeOBJAll.loseSER = 0;
            HOAll_draw.push(element);

            if (allGoals > 1) {
              homeOBJAll.draw2 += 1;
              homeOBJAll.win2SER = 0;
              homeOBJAll.draw2SER += 1;
              homeOBJAll.lose2SER = 0;
              HOAll_draw2.push(element);
            } else {
              homeOBJAll.win2SER = 0;
              homeOBJAll.draw2SER = 0;
              homeOBJAll.lose2SER = 0;
            }

            if (allGoals > 2) {
              homeOBJAll.draw3 += 1;
              homeOBJAll.win3SER = 0;
              homeOBJAll.draw3SER += 1;
              homeOBJAll.lose3SER = 0;
              HOAll_draw3.push(element);
            } else {
              homeOBJAll.win3SER = 0;
              homeOBJAll.draw3SER = 0;
              homeOBJAll.lose3SER = 0;
            }
          } else {
            homeOBJAll.lose += 1;
            homeOBJAll.winSER = 0;
            homeOBJAll.drawSER = 0;
            homeOBJAll.loseSER += 1;
            HOAll_lose.push(element);

            if (allGoals > 1) {
              homeOBJAll.lose2 += 1;
              homeOBJAll.win2SER = 0;
              homeOBJAll.draw2SER = 0;
              homeOBJAll.lose2SER += 1;
              HOAll_lose2.push(element);
            } else {
              homeOBJAll.win2SER = 0;
              homeOBJAll.draw2SER = 0;
              homeOBJAll.lose2SER = 0;
            }

            if (allGoals > 2) {
              homeOBJAll.lose3 += 1;
              homeOBJAll.win3SER = 0;
              homeOBJAll.draw3SER = 0;
              homeOBJAll.lose3SER += 1;
              HOAll_lose3.push(element);
            } else {
              homeOBJAll.win3SER = 0;
              homeOBJAll.draw3SER = 0;
              homeOBJAll.lose3SER = 0;
            }
          }

          // Team scored in First Half
          if (element.awayScoreFirstHalf > 0) {
            homeOBJAll.sinFH += 1;
            homeOBJAll.sinFHSER += 1;
            HOAll_sinFH.push(element);
          } else {
            homeOBJAll.sinFHSER = 0;
          }
        }

        // GG3+
        if (element.homeScoreFullTime && element.awayScoreFullTime) {
          let allGoals = element.homeScoreFullTime + element.awayScoreFullTime;
          if (allGoals > 2) {
            homeOBJAll.btts3 += 1;
            HOAll_btts3.push(element);
          } else {
            homeOBJAll.btts3SER = 0;
          }
        } else {
          homeOBJAll.btts3SER = 0;
        }

        // gg second half
        if (element.homeScoreSecondHalf && element.awayScoreSecondHalf) {
          homeOBJAll.BTTS_SH += 1;
          homeOBJAll.BTTS_SHSER += 1;
          HOAll_BTTS_SH.push(element);
        } else {
          homeOBJAll.BTTS_SHSER = 0;
        }

        // both scored - GG
        if (element.homeScoreFullTime && element.awayScoreFullTime) {
          homeOBJAll.bts += 1;
          HOAll_bts.push(element);
          homeOBJAll.btsSER += 1;

          if (element.homeScoreFirstHalf && element.awayScoreFirstHalf) {
            homeOBJAll.btsFH += 1;
            HOAll_btsFH.push(element);
            homeOBJAll.btsFHSER += 1;
          } else {
            homeOBJAll.btsFHSER = 0;
          }

          // 1&gg, x&gg, 2&gg
          if (element.winnerFT === "h") {
            if (isHome) {
              homeOBJAll.win_BTTS += 1;
              HOAll_win_BTTS.push(element);
              homeOBJAll.win_BTTSSER += 1;
              homeOBJAll.draw_BTTSSER = 0;
              homeOBJAll.lose_BTTSSER = 0;
            } else {
              homeOBJAll.lose_BTTS += 1;
              HOAll_lose_BTTS.push(element);
              homeOBJAll.win_BTTSSER = 0;
              homeOBJAll.draw_BTTSSER = 0;
              homeOBJAll.lose_BTTSSER += 1;
            }
          } else if (element.winnerFT === "d") {
            homeOBJAll.draw_BTTS += 1;
            HOAll_draw_BTTS.push(element);
            homeOBJAll.win_BTTSSER = 0;
            homeOBJAll.draw_BTTSSER += 1;
            homeOBJAll.lose_BTTSSER = 0;
          } else {
            if (isHome) {
              homeOBJAll.lose_BTTS += 1;
              HOAll_lose_BTTS.push(element);
              homeOBJAll.win_BTTSSER = 0;
              homeOBJAll.draw_BTTSSER = 0;
              homeOBJAll.lose_BTTSSER += 1;
            } else {
              homeOBJAll.win_BTTS += 1;
              HOAll_win_BTTS.push(element);
              homeOBJAll.win_BTTSSER += 1;
              homeOBJAll.draw_BTTSSER = 0;
              homeOBJAll.lose_BTTSSER = 0;
            }
          }
        } else {
          homeOBJAll.btsSER = 0;
          homeOBJAll.btsFHSER = 0;
          homeOBJAll.win_BTTSSER = 0;
          homeOBJAll.draw_BTTSSER = 0;
          homeOBJAll.lose_BTTSSER = 0;
        }

        // clean sheets
        if (isHome) {
          if (element.awayScoreFullTime === 0) {
            homeOBJAll.cleanS += 1;
            HOAll_cleanS.push(element);
            homeOBJAll.cleanSSER += 1;
          } else {
            homeOBJAll.cleanSSER = 0;
          }
        } else {
          if (element.homeScoreFullTime === 0) {
            homeOBJAll.cleanS += 1;
            HOAll_cleanS.push(element);
            homeOBJAll.cleanSSER += 1;
          } else {
            homeOBJAll.cleanSSER = 0;
          }
        }

        // Scored on every match
        if (isHome) {
          if (element.homeScoreFullTime > 0) {
            homeOBJAll.soem += 1;
            HOAll_soem.push(element);
            homeOBJAll.soemSER += 1;
          } else {
            homeOBJAll.soemSER = 0;
          }
        } else {
          if (element.awayScoreFullTime > 0) {
            homeOBJAll.soem += 1;
            HOAll_soem.push(element);
            homeOBJAll.soemSER += 1;
          } else {
            homeOBJAll.soemSER = 0;
          }
        }

        // Scored two goals on every match
        if (isHome) {
          if (element.homeScoreFullTime > 1) {
            homeOBJAll.stgoem += 1;
            HOAll_stgoem.push(element);
            homeOBJAll.stgoemSER += 1;
          } else {
            homeOBJAll.stgoemSER = 0;
          }
        } else {
          if (element.awayScoreFullTime > 1) {
            homeOBJAll.stgoem += 1;
            HOAll_stgoem.push(element);
            homeOBJAll.stgoemSER += 1;
          } else {
            homeOBJAll.stgoemSER = 0;
          }
        }

        // Team scored in both halves
        if (isHome) {
          if (element.homeScoreFirstHalf && element.homeScoreSecondHalf) {
            homeOBJAll.sibh += 1;
            HOAll_sibh.push(element);
            homeOBJAll.sibhSER += 1;
          } else {
            homeOBJAll.sibhSER = 0;
          }
        } else {
          if (element.awayScoreFirstHalf && element.awayScoreSecondHalf) {
            homeOBJAll.sibh += 1;
            HOAll_sibh.push(element);
            homeOBJAll.sibhSER += 1;
          } else {
            homeOBJAll.sibhSER = 0;
          }
        }

        // Goal in both halves
        if (
          (element.homeScoreFirstHalf || element.awayScoreFirstHalf) &&
          (element.homeScoreSecondHalf || element.awayScoreSecondHalf)
        ) {
          homeOBJAll.gibh += 1;
          HOAll_gibh.push(element);
          homeOBJAll.gibhSER += 1;
        } else {
          homeOBJAll.gibhSER = 0;
        }

        // Lead/lose/draw at half-time ...
        if (isHome) {
          if (element.winnerFH === "h") {
            homeOBJAll.leadHT += 1;
            HOAll_leadHT.push(element);
            homeOBJAll.leadHTSER += 1;
            homeOBJAll.drawHTSER = 0;
            homeOBJAll.loseHTSER = 0;
          } else if (element.winnerFH === "d") {
            homeOBJAll.drawHT += 1;
            HOAll_drawHT.push(element);
            homeOBJAll.leadHTSER = 0;
            homeOBJAll.drawHTSER += 1;
            homeOBJAll.loseHTSER = 0;
          } else {
            homeOBJAll.loseHT += 1;
            HOAll_loseHT.push(element);
            homeOBJAll.leadHTSER = 0;
            homeOBJAll.drawHTSER = 0;
            homeOBJAll.loseHTSER += 1;
          }
        } else {
          if (element.winnerFH === "a") {
            homeOBJAll.leadHT += 1;
            HOAll_leadHT.push(element);
            homeOBJAll.leadHTSER += 1;
            homeOBJAll.drawHTSER = 0;
            homeOBJAll.loseHTSER = 0;
          } else if (element.winnerFH === "d") {
            homeOBJAll.drawHT += 1;
            HOAll_drawHT.push(element);
            homeOBJAll.leadHTSER = 0;
            homeOBJAll.drawHTSER += 1;
            homeOBJAll.loseHTSER = 0;
          } else {
            homeOBJAll.loseHT += 1;
            HOAll_loseHT.push(element);
            homeOBJAll.leadHTSER = 0;
            homeOBJAll.drawHTSER = 0;
            homeOBJAll.loseHTSER += 1;
          }
        }

        // Over x goals
        let allGoals = element.homeScoreFullTime + element.awayScoreFullTime;
        if (allGoals > 1) {
          homeOBJAll.over_1_5 += 1;
          HOAll_over_1_5.push(element);
          homeOBJAll.over_1_5SER += 1;
        } else {
          homeOBJAll.over_1_5SER = 0;
        }

        if (allGoals > 2) {
          homeOBJAll.over_2_5 += 1;
          HOAll_over_2_5.push(element);
          homeOBJAll.over_2_5SER += 1;
        } else {
          homeOBJAll.over_2_5SER = 0;
        }

        if (allGoals > 3) {
          homeOBJAll.over_3_5 += 1;
          HOAll_over_3_5.push(element);
          homeOBJAll.over_3_5SER += 1;
        } else {
          homeOBJAll.over_3_5SER = 0;
        }

        if (allGoals > 4) {
          homeOBJAll.over_4_5 += 1;
          HOAll_over_4_5.push(element);
          homeOBJAll.over_4_5SER += 1;
        } else {
          homeOBJAll.over_4_5SER = 0;
        }

        if (allGoals > 5) {
          homeOBJAll.over_5_5 += 1;
          HOAll_over_5_5.push(element);
          homeOBJAll.over_5_5SER += 1;
        } else {
          homeOBJAll.over_5_5SER = 0;
        }

        // Under goals
        if (allGoals < 3) {
          homeOBJAll.under_2_5 += 1;
          HOAll_under_2_5.push(element);
          homeOBJAll.under_2_5SER += 1;
        } else {
          homeOBJAll.under_2_5SER = 0;
        }

        if (allGoals < 2) {
          homeOBJAll.under_1_5 += 1;
          HOAll_under_1_5.push(element);
          homeOBJAll.under_1_5SER += 1;
        } else {
          homeOBJAll.under_1_5SER = 0;
        }

        // Over x goals at half-time
        allGoals = element.homeScoreFirstHalf + element.awayScoreFirstHalf;
        if (allGoals > 0) {
          homeOBJAll.over_0_5_HT += 1;
          HOAll_over_0_5_HT.push(element);
          homeOBJAll.over_0_5_HTSER += 1;
        } else {
          homeOBJAll.over_0_5_HTSER = 0;
        }

        if (allGoals > 1) {
          homeOBJAll.over_1_5_HT += 1;
          HOAll_over_1_5_HT.push(element);
          homeOBJAll.over_1_5_HTSER += 1;
        } else {
          homeOBJAll.over_1_5_HTSER = 0;
        }

        if (allGoals > 2) {
          homeOBJAll.over_2_5_HT += 1;
          HOAll_over_2_5_HT.push(element);
          homeOBJAll.over_2_5_HTSER += 1;
        } else {
          homeOBJAll.over_2_5_HTSER = 0;
        }

        // half-time/Full Time

        if (isHome) {
          if (element.winnerFH === "h") {
            homeOBJAll.draw_homeSER = 0;
            homeOBJAll.draw_drawSER = 0;
            homeOBJAll.draw_awaySER = 0;

            homeOBJAll.away_homeSER = 0;
            homeOBJAll.away_drawSER = 0;
            homeOBJAll.away_awaySER = 0;

            if (element.winnerFT === "h") {
              homeOBJAll.home_home += 1;
              HOAll_home_home.push(element);
              homeOBJAll.home_homeSER += 1;

              homeOBJAll.home_drawSER = 0;
              homeOBJAll.home_awaySER = 0;
            } else if (element.winnerFT === "d") {
              homeOBJAll.home_draw += 1;
              HOAll_home_draw.push(element);
              homeOBJAll.home_drawSER += 1;

              homeOBJAll.home_homeSER = 0;
              homeOBJAll.home_awaySER = 0;
            } else {
              homeOBJAll.home_away += 1;
              HOAll_home_away.push(element);
              homeOBJAll.home_awaySER += 1;

              homeOBJAll.home_homeSER = 0;
              homeOBJAll.home_drawSER = 0;
            }
          } else if (element.winnerFH === "d") {
            homeOBJAll.home_homeSER = 0;
            homeOBJAll.home_drawSER = 0;
            homeOBJAll.home_awaySER = 0;

            homeOBJAll.away_homeSER = 0;
            homeOBJAll.away_drawSER = 0;
            homeOBJAll.away_awaySER = 0;

            if (element.winnerFT === "h") {
              homeOBJAll.draw_home += 1;
              HOAll_draw_home.push(element);
              homeOBJAll.draw_homeSER += 1;

              homeOBJAll.draw_drawSER = 0;
              homeOBJAll.draw_awaySER = 0;
            } else if (element.winnerFT === "d") {
              homeOBJAll.draw_draw += 1;
              HOAll_draw_draw.push(element);
              homeOBJAll.draw_drawSER += 1;

              homeOBJAll.draw_homeSER = 0;
              homeOBJAll.draw_awaySER = 0;
            } else {
              homeOBJAll.draw_away += 1;
              HOAll_draw_away.push(element);
              homeOBJAll.draw_awaySER += 1;

              homeOBJAll.draw_homeSER = 0;
              homeOBJAll.draw_drawSER = 0;
            }
          } else {
            homeOBJAll.home_homeSER = 0;
            homeOBJAll.home_drawSER = 0;
            homeOBJAll.home_awaySER = 0;

            homeOBJAll.draw_homeSER = 0;
            homeOBJAll.draw_drawSER = 0;
            homeOBJAll.draw_awaySER = 0;

            if (element.winnerFT === "h") {
              homeOBJAll.away_home += 1;
              HOAll_away_home.push(element);
              homeOBJAll.away_homeSER += 1;

              homeOBJAll.away_drawSER = 0;
              homeOBJAll.away_awaySER = 0;
            } else if (element.winnerFT === "d") {
              homeOBJAll.away_draw += 1;
              HOAll_away_draw.push(element);
              homeOBJAll.away_drawSER += 1;

              homeOBJAll.away_homeSER = 0;
              homeOBJAll.away_awaySER = 0;
            } else {
              homeOBJAll.away_away += 1;
              HOAll_away_away.push(element);
              homeOBJAll.away_awaySER += 1;

              homeOBJAll.away_homeSER = 0;
              homeOBJAll.away_drawSER = 0;
            }
          }
        } else {
          if (element.winnerFH === "a") {
            homeOBJAll.draw_homeSER = 0;
            homeOBJAll.draw_drawSER = 0;
            homeOBJAll.draw_awaySER = 0;

            homeOBJAll.away_homeSER = 0;
            homeOBJAll.away_drawSER = 0;
            homeOBJAll.away_awaySER = 0;

            if (element.winnerFT === "a") {
              homeOBJAll.home_home += 1;
              HOAll_home_home.push(element);
              homeOBJAll.home_homeSER += 1;

              homeOBJAll.home_drawSER = 0;
              homeOBJAll.home_awaySER = 0;
            } else if (element.winnerFT === "d") {
              homeOBJAll.home_draw += 1;
              HOAll_home_draw.push(element);
              homeOBJAll.home_drawSER += 1;

              homeOBJAll.home_homeSER = 0;
              homeOBJAll.home_awaySER = 0;
            } else {
              homeOBJAll.home_away += 1;
              HOAll_home_away.push(element);
              homeOBJAll.home_awaySER += 1;

              homeOBJAll.home_homeSER = 0;
              homeOBJAll.home_drawSER = 0;
            }
          } else if (element.winnerFH === "d") {
            homeOBJAll.home_homeSER = 0;
            homeOBJAll.home_drawSER = 0;
            homeOBJAll.home_awaySER = 0;

            homeOBJAll.away_homeSER = 0;
            homeOBJAll.away_drawSER = 0;
            homeOBJAll.away_awaySER = 0;

            if (element.winnerFT === "a") {
              homeOBJAll.draw_home += 1;
              HOAll_draw_home.push(element);
              homeOBJAll.draw_homeSER += 1;

              homeOBJAll.draw_drawSER = 0;
              homeOBJAll.draw_awaySER = 0;
            } else if (element.winnerFT === "d") {
              homeOBJAll.draw_draw += 1;
              HOAll_draw_draw.push(element);
              homeOBJAll.draw_drawSER += 1;

              homeOBJAll.draw_homeSER = 0;
              homeOBJAll.draw_awaySER = 0;
            } else {
              homeOBJAll.draw_away += 1;
              HOAll_draw_away.push(element);
              homeOBJAll.draw_awaySER += 1;

              homeOBJAll.draw_homeSER = 0;
              homeOBJAll.draw_drawSER = 0;
            }
          } else {
            homeOBJAll.home_homeSER = 0;
            homeOBJAll.home_drawSER = 0;
            homeOBJAll.home_awaySER = 0;

            homeOBJAll.draw_homeSER = 0;
            homeOBJAll.draw_drawSER = 0;
            homeOBJAll.draw_awaySER = 0;

            if (element.winnerFT === "a") {
              homeOBJAll.away_home += 1;
              HOAll_away_home.push(element);
              homeOBJAll.away_homeSER += 1;

              homeOBJAll.away_drawSER = 0;
              homeOBJAll.away_awaySER = 0;
            } else if (element.winnerFT === "d") {
              homeOBJAll.away_draw += 1;
              HOAll_away_draw.push(element);
              homeOBJAll.away_drawSER += 1;

              homeOBJAll.away_homeSER = 0;
              homeOBJAll.away_awaySER = 0;
            } else {
              homeOBJAll.away_away += 1;
              HOAll_away_away.push(element);
              homeOBJAll.away_awaySER += 1;

              homeOBJAll.away_homeSER = 0;
              homeOBJAll.away_drawSER = 0;
            }
          }
        }
      }

      // Away team as away
      if (awayTeam === element.awayTeam && end) {
        awayOBJAway_games.push(element);

        awayOBJAway.gspm += element.awayScoreFullTime;
        AOAway_gspm.push(element);
        awayOBJAway.gcpm += element.homeScoreFullTime;
        AOAway_gcpm.push(element);
        awayOBJAway.gamesCount += 1;

        // Conceded in both halfs
        if (element.homeScoreFirstHalf > 0 && element.homeScoreSecondHalf > 0) {
          awayOBJAway.cc_sibh += 1;
          awayOBJAway.cc_sibhSER += 1;
        } else {
          awayOBJAway.cc_sibhSER = 0;
        }

        // Over 0.5, 1.5, 2.5 Goals Second Half
        let secHalfGoals =
          element.homeScoreSecondHalf + element.awayScoreSecondHalf;
        if (secHalfGoals > 0) {
          awayOBJAway.over_0_5_SH += 1;
          awayOBJAway.over_0_5_SHSER += 1;
          AOAway_over_0_5_SH.push(element);

          if (secHalfGoals > 1) {
            awayOBJAway.over_1_5_SH += 1;
            awayOBJAway.over_1_5_SHSER += 1;
            AOAway_over_1_5_SH.push(element);
          } else {
            awayOBJAway.over_1_5_SHSER = 0;
          }

          if (secHalfGoals > 2) {
            awayOBJAway.over_2_5_SH += 1;
            awayOBJAway.over_2_5_SHSER += 1;
            AOAway_over_2_5_SH.push(element);
          } else {
            awayOBJAway.over_2_5_SHSER = 0;
          }
        } else {
          awayOBJAway.over_0_5_SHSER = 0;
          awayOBJAway.over_1_5_SHSER = 0;
          awayOBJAway.over_2_5_SHSER = 0;
        }

        // Team scored Second Half
        if (element.awayScoreSecondHalf > 0) {
          awayOBJAway.sinSH += 1;
          awayOBJAway.sinSHSER += 1;
          AOAway_sinSH.push(element);
        } else {
          awayOBJAway.sinSHSER = 0;
        }

        // conceded goal second half
        if (element.homeScoreSecondHalf > 0) {
          awayOBJAway.cc_0_5_SH += 1;
          awayOBJAway.cc_0_5_SHSER += 1;
        } else {
          awayOBJAway.cc_0_5_SHSER = 0;
        }

        // conceded 0.5, 0.5FH i 1.5
        if (element.homeScoreFullTime > 0) {
          awayOBJAway.cc_0_5 += 1;
          awayOBJAway.cc_0_5SER += 1;
          if (element.homeScoreFirstHalf > 0) {
            awayOBJAway.cc_0_5_FH += 1;
            awayOBJAway.cc_0_5_FHSER += 1;
          } else {
            awayOBJAway.cc_0_5_FHSER = 0;
          }
          if (element.homeScoreFullTime > 1) {
            awayOBJAway.cc_1_5 += 1;
            awayOBJAway.cc_1_5SER += 1;
          } else {
            awayOBJAway.cc_1_5SER = 0;
          }
        } else {
          awayOBJAway.cc_0_5SER = 0;
          awayOBJAway.cc_1_5SER = 0;
          awayOBJAway.cc_0_5_FHSER = 0;
        }

        // More goals first half / second half
        if (
          element.homeScoreFirstHalf + element.awayScoreFirstHalf >
          element.homeScoreSecondHalf + element.awayScoreSecondHalf
        ) {
          awayOBJAway.more_FH += 1;
          awayOBJAway.more_FHSER += 1;
          awayOBJAway.more_SHSER = 0;
          AOAway_more_FH.push(element);
        } else if (
          element.homeScoreFirstHalf + element.awayScoreFirstHalf <
          element.homeScoreSecondHalf + element.awayScoreSecondHalf
        ) {
          awayOBJAway.more_SH += 1;
          awayOBJAway.more_SHSER += 1;
          awayOBJAway.more_FHSER = 0;
          AOAway_more_SH.push(element);
        } else {
          awayOBJAway.more_FHSER = 0;
          awayOBJAway.more_SHSER = 0;
        }

        // Win, Draw, Lose
        let allGoals = element.homeScoreFullTime + element.awayScoreFullTime;

        if (element.winnerFT === "a") {
          awayOBJAway.win += 1;
          awayOBJAway.winSER += 1;
          awayOBJAway.drawSER = 0;
          awayOBJAway.loseSER = 0;
          AOAway_win.push(element);

          if (allGoals > 1) {
            awayOBJAway.win2 += 1;
            awayOBJAway.win2SER += 1;
            awayOBJAway.draw2SER = 0;
            awayOBJAway.lose2SER = 0;
            AOAway_win2.push(element);
          } else {
            awayOBJAway.win2SER = 0;
            awayOBJAway.draw2SER = 0;
            awayOBJAway.lose2SER = 0;
          }

          if (allGoals > 2) {
            awayOBJAway.win3 += 1;
            awayOBJAway.win3SER += 1;
            awayOBJAway.draw3SER = 0;
            awayOBJAway.lose3SER = 0;
            AOAway_win3.push(element);
          } else {
            awayOBJAway.win3SER = 0;
            awayOBJAway.draw3SER = 0;
            awayOBJAway.lose3SER = 0;
          }
        } else if (element.winnerFT === "d") {
          awayOBJAway.draw += 1;
          awayOBJAway.winSER = 0;
          awayOBJAway.drawSER += 1;
          awayOBJAway.loseSER = 0;
          AOAway_draw.push(element);

          if (allGoals > 1) {
            awayOBJAway.draw2 += 1;
            awayOBJAway.win2SER = 0;
            awayOBJAway.draw2SER += 1;
            awayOBJAway.lose2SER = 0;
            AOAway_draw2.push(element);
          } else {
            awayOBJAway.win2SER = 0;
            awayOBJAway.draw2SER = 0;
            awayOBJAway.lose2SER = 0;
          }

          if (allGoals > 2) {
            awayOBJAway.draw3 += 1;
            awayOBJAway.win3SER = 0;
            awayOBJAway.draw3SER += 1;
            awayOBJAway.lose3SER = 0;
            AOAway_draw3.push(element);
          } else {
            awayOBJAway.win3SER = 0;
            awayOBJAway.draw3SER = 0;
            awayOBJAway.lose3SER = 0;
          }
        } else {
          awayOBJAway.lose += 1;
          awayOBJAway.winSER = 0;
          awayOBJAway.drawSER = 0;
          awayOBJAway.loseSER += 1;
          AOAway_lose.push(element);

          if (allGoals > 1) {
            awayOBJAway.lose2 += 1;
            awayOBJAway.win2SER = 0;
            awayOBJAway.draw2SER = 0;
            awayOBJAway.lose2SER += 1;
            AOAway_lose2.push(element);
          } else {
            awayOBJAway.win2SER = 0;
            awayOBJAway.draw2SER = 0;
            awayOBJAway.lose2SER = 0;
          }

          if (allGoals > 2) {
            awayOBJAway.lose3 += 1;
            awayOBJAway.win3SER = 0;
            awayOBJAway.draw3SER = 0;
            awayOBJAway.lose3SER += 1;
            AOAway_lose3.push(element);
          } else {
            awayOBJAway.win3SER = 0;
            awayOBJAway.draw3SER = 0;
            awayOBJAway.lose3SER = 0;
          }
        }

        // GG3+
        if (element.homeScoreFullTime && element.awayScoreFullTime) {
          if (allGoals > 2) {
            awayOBJAway.btts3 += 1;
            AOAway_btts3.push(element);
          } else {
            awayOBJAway.btts3SER = 0;
          }
        } else {
          awayOBJAway.btts3SER = 0;
        }

        // gg second half
        if (element.homeScoreSecondHalf && element.awayScoreSecondHalf) {
          awayOBJAway.BTTS_SH += 1;
          awayOBJAway.BTTS_SHSER += 1;
          AOAway_BTTS_SH.push(element);
        } else {
          awayOBJAway.BTTS_SHSER = 0;
        }

        // Team scored in First Half
        if (element.awayScoreFirstHalf > 0) {
          awayOBJAway.sinFH += 1;
          awayOBJAway.sinFHSER += 1;
          AOAway_sinFH.push(element);
        } else {
          awayOBJAway.sinFHSER = 0;
        }

        // both scored - GG
        if (element.awayScoreFullTime && element.homeScoreFullTime) {
          awayOBJAway.bts += 1;
          AOAway_bts.push(element);
          awayOBJAway.btsSER += 1;

          if (element.awayScoreFirstHalf && element.homeScoreFirstHalf) {
            awayOBJAway.btsFH += 1;
            AOAway_btsFH.push(element);
            awayOBJAway.btsFHSER += 1;
          } else {
            awayOBJAway.btsFHSER = 0;
          }

          // 1&gg, x&gg, 2&gg
          if (element.winnerFT === "a") {
            awayOBJAway.win_BTTS += 1;
            AOAway_win_BTTS.push(element);
            awayOBJAway.win_BTTSSER += 1;
            awayOBJAway.draw_BTTSSER = 0;
            awayOBJAway.lose_BTTSSER = 0;
          } else if (element.winnerFT === "d") {
            awayOBJAway.draw_BTTS += 1;
            AOAway_draw_BTTS.push(element);
            awayOBJAway.win_BTTSSER = 0;
            awayOBJAway.draw_BTTSSER += 1;
            awayOBJAway.lose_BTTSSER = 0;
          } else {
            awayOBJAway.lose_BTTS += 1;
            AOAway_lose_BTTS.push(element);
            awayOBJAway.win_BTTSSER = 0;
            awayOBJAway.draw_BTTSSER = 0;
            awayOBJAway.lose_BTTSSER += 1;
          }
        } else {
          awayOBJAway.btsSER = 0;
          awayOBJAway.btsFHSER = 0;
          awayOBJAway.win_BTTSSER = 0;
          awayOBJAway.draw_BTTSSER = 0;
          awayOBJAway.lose_BTTSSER = 0;
        }

        // clean sheets
        if (element.homeScoreFullTime === 0) {
          awayOBJAway.cleanS += 1;
          AOAway_cleanS.push(element);
          awayOBJAway.cleanSSER += 1;
        } else {
          awayOBJAway.cleanSSER = 0;
        }

        // Scored on every match
        if (element.awayScoreFullTime > 0) {
          awayOBJAway.soem += 1;
          AOAway_soem.push(element);
          awayOBJAway.soemSER += 1;
        } else {
          awayOBJAway.soemSER = 0;
        }

        // Scored two goals on every match
        if (element.awayScoreFullTime > 1) {
          awayOBJAway.stgoem += 1;
          AOAway_stgoem.push(element);
          awayOBJAway.stgoemSER += 1;
        } else {
          awayOBJAway.stgoemSER = 0;
        }

        // Team scored in both halves
        if (element.awayScoreFirstHalf && element.awayScoreSecondHalf) {
          awayOBJAway.sibh += 1;
          AOAway_sibh.push(element);
          awayOBJAway.sibhSER += 1;
        } else {
          awayOBJAway.sibhSER = 0;
        }

        // Goal in both halves
        if (
          (element.awayScoreFirstHalf || element.homeScoreFirstHalf) &&
          (element.homeScoreSecondHalf || element.awayScoreSecondHalf)
        ) {
          awayOBJAway.gibh += 1;
          AOAway_gibh.push(element);
          awayOBJAway.gibhSER += 1;
        } else {
          awayOBJAway.gibhSER = 0;
        }

        // Lead/lose/draw at half-time ...
        if (element.winnerFH === "a") {
          awayOBJAway.leadHT += 1;
          AOAway_leadHT.push(element);
          awayOBJAway.leadHTSER += 1;
          awayOBJAway.drawHTSER = 0;
          awayOBJAway.loseHTSER = 0;
        } else if (element.winnerFH === "d") {
          awayOBJAway.drawHT += 1;
          AOAway_drawHT.push(element);
          awayOBJAway.leadHTSER = 0;
          awayOBJAway.drawHTSER += 1;
          awayOBJAway.loseHTSER = 0;
        } else {
          awayOBJAway.loseHT += 1;
          AOAway_loseHT.push(element);
          awayOBJAway.leadHTSER = 0;
          awayOBJAway.drawHTSER = 0;
          awayOBJAway.loseHTSER += 1;
        }

        // Over x goals
        allGoals = element.awayScoreFullTime + element.homeScoreFullTime;
        if (allGoals > 1) {
          awayOBJAway.over_1_5 += 1;
          AOAway_over_1_5.push(element);
          awayOBJAway.over_1_5SER += 1;
        } else {
          awayOBJAway.over_1_5SER = 0;
        }

        if (allGoals > 2) {
          awayOBJAway.over_2_5 += 1;
          AOAway_over_2_5.push(element);
          awayOBJAway.over_2_5SER += 1;
        } else {
          awayOBJAway.over_2_5SER = 0;
        }

        if (allGoals > 3) {
          awayOBJAway.over_3_5 += 1;
          AOAway_over_3_5.push(element);
          awayOBJAway.over_3_5SER += 1;
        } else {
          awayOBJAway.over_3_5SER = 0;
        }

        if (allGoals > 4) {
          awayOBJAway.over_4_5 += 1;
          AOAway_over_4_5.push(element);
          awayOBJAway.over_4_5SER += 1;
        } else {
          awayOBJAway.over_4_5SER = 0;
        }

        if (allGoals > 5) {
          awayOBJAway.over_5_5 += 1;
          AOAway_over_5_5.push(element);
          awayOBJAway.over_5_5SER += 1;
        } else {
          awayOBJAway.over_5_5SER = 0;
        }

        // Under goals
        if (allGoals < 3) {
          awayOBJAway.under_2_5 += 1;
          AOAway_under_2_5.push(element);
          awayOBJAway.under_2_5SER += 1;
        } else {
          awayOBJAway.under_2_5SER = 0;
        }

        if (allGoals < 2) {
          awayOBJAway.under_1_5 += 1;
          AOAway_under_1_5.push(element);
          awayOBJAway.under_1_5SER += 1;
        } else {
          awayOBJAway.under_1_5SER = 0;
        }

        // Over x goals at half-time
        allGoals = element.awayScoreFirstHalf + element.homeScoreFirstHalf;
        if (allGoals > 0) {
          awayOBJAway.over_0_5_HT += 1;
          AOAway_over_0_5_HT.push(element);
          awayOBJAway.over_0_5_HTSER += 1;
        } else {
          awayOBJAway.over_0_5_HTSER = 0;
        }

        if (allGoals > 1) {
          awayOBJAway.over_1_5_HT += 1;
          AOAway_over_1_5_HT.push(element);
          awayOBJAway.over_1_5_HTSER += 1;
        } else {
          awayOBJAway.over_1_5_HTSER = 0;
        }

        if (allGoals > 2) {
          awayOBJAway.over_2_5_HT += 1;
          AOAway_over_2_5_HT.push(element);
          awayOBJAway.over_2_5_HTSER += 1;
        } else {
          awayOBJAway.over_2_5_HTSER = 0;
        }

        // half-time/Full Time
        if (element.winnerFH === "a") {
          awayOBJAway.draw_homeSER = 0;
          awayOBJAway.draw_drawSER = 0;
          awayOBJAway.draw_awaySER = 0;

          awayOBJAway.away_homeSER = 0;
          awayOBJAway.away_drawSER = 0;
          awayOBJAway.away_awaySER = 0;

          if (element.winnerFT === "a") {
            awayOBJAway.home_home += 1;
            AOAway_home_home.push(element);
            awayOBJAway.home_homeSER += 1;

            awayOBJAway.home_drawSER = 0;
            awayOBJAway.home_awaySER = 0;
          } else if (element.winnerFT === "d") {
            awayOBJAway.home_draw += 1;
            AOAway_home_draw.push(element);
            awayOBJAway.home_drawSER += 1;

            awayOBJAway.home_homeSER = 0;
            awayOBJAway.home_awaySER = 0;
          } else {
            awayOBJAway.home_away += 1;
            AOAway_home_away.push(element);
            awayOBJAway.home_awaySER += 1;

            awayOBJAway.home_homeSER = 0;
            awayOBJAway.home_drawSER = 0;
          }
        } else if (element.winnerFH === "d") {
          awayOBJAway.home_homeSER = 0;
          awayOBJAway.home_drawSER = 0;
          awayOBJAway.home_awaySER = 0;

          awayOBJAway.away_homeSER = 0;
          awayOBJAway.away_drawSER = 0;
          awayOBJAway.away_awaySER = 0;

          if (element.winnerFT === "a") {
            awayOBJAway.draw_home += 1;
            AOAway_draw_home.push(element);
            awayOBJAway.draw_homeSER += 1;

            awayOBJAway.draw_drawSER = 0;
            awayOBJAway.draw_awaySER = 0;
          } else if (element.winnerFT === "d") {
            awayOBJAway.draw_draw += 1;
            AOAway_draw_draw.push(element);
            awayOBJAway.draw_drawSER += 1;

            awayOBJAway.draw_homeSER = 0;
            awayOBJAway.draw_awaySER = 0;
          } else {
            awayOBJAway.draw_away += 1;
            AOAway_draw_away.push(element);
            awayOBJAway.draw_awaySER += 1;

            awayOBJAway.draw_homeSER = 0;
            awayOBJAway.draw_drawSER = 0;
          }
        } else {
          awayOBJAway.home_homeSER = 0;
          awayOBJAway.home_drawSER = 0;
          awayOBJAway.home_awaySER = 0;

          awayOBJAway.draw_homeSER = 0;
          awayOBJAway.draw_drawSER = 0;
          awayOBJAway.draw_awaySER = 0;

          if (element.winnerFT === "a") {
            awayOBJAway.away_home += 1;
            AOAway_away_home.push(element);
            awayOBJAway.away_homeSER += 1;

            awayOBJAway.away_drawSER = 0;
            awayOBJAway.away_awaySER = 0;
          } else if (element.winnerFT === "d") {
            awayOBJAway.away_draw += 1;
            AOAway_away_draw.push(element);
            awayOBJAway.away_drawSER += 1;

            awayOBJAway.away_homeSER = 0;
            awayOBJAway.away_awaySER = 0;
          } else {
            awayOBJAway.away_away += 1;
            AOAway_away_away.push(element);
            awayOBJAway.away_awaySER += 1;

            awayOBJAway.away_homeSER = 0;
            awayOBJAway.away_drawSER = 0;
          }
        }
      }

      // Away team on all games
      if (
        (awayTeam === element.homeTeam || awayTeam === element.awayTeam) &&
        end
      ) {
        awayOBJAll_games.push(element);

        const isAway = awayTeam === element.awayTeam ? true : false;

        // Conceded in both halfs
        if (isAway) {
          if (
            element.homeScoreFirstHalf > 0 &&
            element.homeScoreSecondHalf > 0
          ) {
            awayOBJAll.cc_sibh += 1;
            awayOBJAll.cc_sibhSER += 1;
          } else {
            awayOBJAll.cc_sibhSER = 0;
          }
        } else {
          if (
            element.awayScoreFirstHalf > 0 &&
            element.awayScoreSecondHalf > 0
          ) {
            awayOBJAll.cc_sibh += 1;
            awayOBJAll.cc_sibhSER += 1;
          } else {
            awayOBJAll.cc_sibhSER = 0;
          }
        }

        // Over 0.5, 1.5, 2.5 Goals Second Half
        let secHalfGoals =
          element.homeScoreSecondHalf + element.awayScoreSecondHalf;
        if (secHalfGoals > 0) {
          awayOBJAll.over_0_5_SH += 1;
          awayOBJAll.over_0_5_SHSER += 1;
          AOAll_over_0_5_SH.push(element);

          if (secHalfGoals > 1) {
            awayOBJAll.over_1_5_SH += 1;
            awayOBJAll.over_1_5_SHSER += 1;
            AOAll_over_1_5_SH.push(element);
          } else {
            awayOBJAll.over_1_5_SHSER = 0;
          }

          if (secHalfGoals > 2) {
            awayOBJAll.over_2_5_SH += 1;
            awayOBJAll.over_2_5_SHSER += 1;
            AOAll_over_2_5_SH.push(element);
          } else {
            awayOBJAll.over_2_5_SHSER = 0;
          }
        } else {
          awayOBJAll.over_0_5_SHSER = 0;
          awayOBJAll.over_1_5_SHSER = 0;
          awayOBJAll.over_2_5_SHSER = 0;
        }

        // conceded goal second half
        if (isAway) {
          if (element.homeScoreSecondHalf > 0) {
            awayOBJAll.cc_0_5_SH += 1;
            awayOBJAll.cc_0_5_SHSER += 1;
          } else {
            awayOBJAll.cc_0_5_SHSER = 0;
          }
        } else {
          if (element.awayScoreSecondHalf > 0) {
            awayOBJAll.cc_0_5_SH += 1;
            awayOBJAll.cc_0_5_SHSER += 1;
          } else {
            awayOBJAll.cc_0_5_SHSER = 0;
          }
        }

        // conceded 0.5, 0.5FH i 1.5
        if (isAway) {
          if (element.homeScoreFullTime > 0) {
            awayOBJAll.cc_0_5 += 1;
            awayOBJAll.cc_0_5SER += 1;
            if (element.homeScoreFirstHalf > 0) {
              awayOBJAll.cc_0_5_FH += 1;
              awayOBJAll.cc_0_5_FHSER += 1;
            } else {
              awayOBJAll.cc_0_5_FHSER = 0;
            }
            if (element.homeScoreFullTime > 1) {
              awayOBJAll.cc_1_5 += 1;
              awayOBJAll.cc_1_5SER += 1;
            } else {
              awayOBJAll.cc_1_5SER = 0;
            }
          } else {
            awayOBJAll.cc_0_5SER = 0;
            awayOBJAll.cc_1_5SER = 0;
            awayOBJAll.cc_0_5_FHSER = 0;
          }
        } else {
          if (element.awayScoreFullTime > 0) {
            awayOBJAll.cc_0_5 += 1;
            awayOBJAll.cc_0_5SER += 1;
            if (element.awayScoreFirstHalf > 0) {
              awayOBJAll.cc_0_5_FH += 1;
              awayOBJAll.cc_0_5_FHSER += 1;
            } else {
              awayOBJAll.cc_0_5_FHSER = 0;
            }
            if (element.awayScoreFullTime > 1) {
              awayOBJAll.cc_1_5 += 1;
              awayOBJAll.cc_1_5SER += 1;
            } else {
              awayOBJAll.cc_1_5SER = 0;
            }
          } else {
            awayOBJAll.cc_0_5SER = 0;
            awayOBJAll.cc_1_5SER = 0;
            awayOBJAll.cc_0_5_FHSER = 0;
          }
        }

        // More goals first half / second half
        if (
          element.homeScoreFirstHalf + element.awayScoreFirstHalf >
          element.homeScoreSecondHalf + element.awayScoreSecondHalf
        ) {
          awayOBJAll.more_FH += 1;
          awayOBJAll.more_FHSER += 1;
          awayOBJAll.more_SHSER = 0;
          AOAll_more_FH.push(element);
        } else if (
          element.homeScoreFirstHalf + element.awayScoreFirstHalf <
          element.homeScoreSecondHalf + element.awayScoreSecondHalf
        ) {
          awayOBJAll.more_SH += 1;
          awayOBJAll.more_SHSER += 1;
          awayOBJAll.more_FHSER = 0;
          AOAll_more_SH.push(element);
        } else {
          awayOBJAll.more_FHSER = 0;
          awayOBJAll.more_SHSER = 0;
        }

        // Team scored Second Half
        if (isAway) {
          if (element.awayScoreSecondHalf > 0) {
            awayOBJAll.sinSH += 1;
            awayOBJAll.sinSHSER += 1;
            AOAll_sinSH.push(element);
          } else {
            awayOBJAll.sinSHSER = 0;
          }
        } else {
          if (element.homeScoreSecondHalf > 0) {
            awayOBJAll.sinSH += 1;
            awayOBJAll.sinSHSER += 1;
            AOAll_sinSH.push(element);
          } else {
            awayOBJAll.sinSHSER = 0;
          }
        }

        if (isAway) {
          awayOBJAll.gspm += element.awayScoreFullTime;
          AOAll_gspm.push(element);
        } else {
          awayOBJAll.gspm += element.homeScoreFullTime;
          AOAll_gspm.push(element);
        }

        if (isAway) {
          awayOBJAll.gcpm += element.homeScoreFullTime;
          AOAll_gcpm.push(element);
        } else {
          awayOBJAll.gcpm += element.awayScoreFullTime;
          AOAll_gcpm.push(element);
        }

        awayOBJAll.gamesCount += 1;

        // Win, Draw, Lose
        if (isAway) {
          let allGoals = element.homeScoreFullTime + element.awayScoreFullTime;
          if (element.winnerFT === "a") {
            awayOBJAll.win += 1;
            awayOBJAll.winSER += 1;
            awayOBJAll.drawSER = 0;
            awayOBJAll.loseSER = 0;
            AOAll_win.push(element);

            if (allGoals > 1) {
              awayOBJAll.win2 += 1;
              awayOBJAll.win2SER += 1;
              awayOBJAll.draw2SER = 0;
              awayOBJAll.lose2SER = 0;
              AOAll_win2.push(element);
            } else {
              awayOBJAll.win2SER = 0;
              awayOBJAll.draw2SER = 0;
              awayOBJAll.lose2SER = 0;
            }

            if (allGoals > 2) {
              awayOBJAll.win3 += 1;
              awayOBJAll.win3SER += 1;
              awayOBJAll.draw3SER = 0;
              awayOBJAll.lose3SER = 0;
              AOAll_win3.push(element);
            } else {
              awayOBJAll.win3SER = 0;
              awayOBJAll.draw3SER = 0;
              awayOBJAll.lose3SER = 0;
            }
          } else if (element.winnerFT === "d") {
            awayOBJAll.draw += 1;
            awayOBJAll.winSER = 0;
            awayOBJAll.drawSER += 1;
            awayOBJAll.loseSER = 0;
            AOAll_draw.push(element);

            if (allGoals > 1) {
              awayOBJAll.draw2 += 1;
              awayOBJAll.win2SER = 0;
              awayOBJAll.draw2SER += 1;
              awayOBJAll.lose2SER = 0;
              AOAll_draw2.push(element);
            } else {
              awayOBJAll.win2SER = 0;
              awayOBJAll.draw2SER = 0;
              awayOBJAll.lose2SER = 0;
            }

            if (allGoals > 2) {
              awayOBJAll.draw3 += 1;
              awayOBJAll.win3SER = 0;
              awayOBJAll.draw3SER += 1;
              awayOBJAll.lose3SER = 0;
              AOAll_draw3.push(element);
            } else {
              awayOBJAll.win3SER = 0;
              awayOBJAll.draw3SER = 0;
              awayOBJAll.lose3SER = 0;
            }
          } else {
            awayOBJAll.lose += 1;
            awayOBJAll.winSER = 0;
            awayOBJAll.drawSER = 0;
            awayOBJAll.loseSER += 1;
            AOAll_lose.push(element);

            if (allGoals > 1) {
              awayOBJAll.lose2 += 1;
              awayOBJAll.win2SER = 0;
              awayOBJAll.draw2SER = 0;
              awayOBJAll.lose2SER += 1;
              AOAll_lose2.push(element);
            } else {
              awayOBJAll.win2SER = 0;
              awayOBJAll.draw2SER = 0;
              awayOBJAll.lose2SER = 0;
            }

            if (allGoals > 2) {
              awayOBJAll.lose3 += 1;
              awayOBJAll.win3SER = 0;
              awayOBJAll.draw3SER = 0;
              awayOBJAll.lose3SER += 1;
              AOAll_lose3.push(element);
            } else {
              awayOBJAll.win3SER = 0;
              awayOBJAll.draw3SER = 0;
              awayOBJAll.lose3SER = 0;
            }
          }

          // Team scored in First Half
          if (element.awayScoreFirstHalf > 0) {
            awayOBJAll.sinFH += 1;
            awayOBJAll.sinFHSER += 1;
            AOAll_sinFH.push(element);
          } else {
            awayOBJAll.sinFHSER = 0;
          }
        } else {
          let allGoals = element.homeScoreFullTime + element.awayScoreFullTime;
          if (element.winnerFT === "h") {
            awayOBJAll.win += 1;
            awayOBJAll.winSER += 1;
            awayOBJAll.drawSER = 0;
            awayOBJAll.loseSER = 0;
            AOAll_win.push(element);

            if (allGoals > 1) {
              awayOBJAll.win2 += 1;
              awayOBJAll.win2SER += 1;
              awayOBJAll.draw2SER = 0;
              awayOBJAll.lose2SER = 0;
              AOAll_win2.push(element);
            } else {
              awayOBJAll.win2SER = 0;
              awayOBJAll.draw2SER = 0;
              awayOBJAll.lose2SER = 0;
            }

            if (allGoals > 2) {
              awayOBJAll.win3 += 1;
              awayOBJAll.win3SER += 1;
              awayOBJAll.draw3SER = 0;
              awayOBJAll.lose3SER = 0;
              AOAll_win3.push(element);
            } else {
              awayOBJAll.win3SER = 0;
              awayOBJAll.draw3SER = 0;
              awayOBJAll.lose3SER = 0;
            }
          } else if (element.winnerFT === "d") {
            awayOBJAll.draw += 1;
            awayOBJAll.winSER = 0;
            awayOBJAll.drawSER += 1;
            awayOBJAll.loseSER = 0;
            AOAll_draw.push(element);

            if (allGoals > 1) {
              awayOBJAll.draw2 += 1;
              awayOBJAll.win2SER = 0;
              awayOBJAll.draw2SER += 1;
              awayOBJAll.lose2SER = 0;
              AOAll_draw2.push(element);
            } else {
              awayOBJAll.win2SER = 0;
              awayOBJAll.draw2SER = 0;
              awayOBJAll.lose2SER = 0;
            }

            if (allGoals > 2) {
              awayOBJAll.draw3 += 1;
              awayOBJAll.win3SER = 0;
              awayOBJAll.draw3SER += 1;
              awayOBJAll.lose3SER = 0;
              AOAll_draw3.push(element);
            } else {
              awayOBJAll.win3SER = 0;
              awayOBJAll.draw3SER = 0;
              awayOBJAll.lose3SER = 0;
            }
          } else {
            awayOBJAll.lose += 1;
            awayOBJAll.winSER = 0;
            awayOBJAll.drawSER = 0;
            awayOBJAll.loseSER += 1;
            AOAll_lose.push(element);

            if (allGoals > 1) {
              awayOBJAll.lose2 += 1;
              awayOBJAll.win2SER = 0;
              awayOBJAll.draw2SER = 0;
              awayOBJAll.lose2SER += 1;
              AOAll_lose2.push(element);
            } else {
              awayOBJAll.win2SER = 0;
              awayOBJAll.draw2SER = 0;
              awayOBJAll.lose2SER = 0;
            }

            if (allGoals > 2) {
              awayOBJAll.lose3 += 1;
              awayOBJAll.win3SER = 0;
              awayOBJAll.draw3SER = 0;
              awayOBJAll.lose3SER += 1;
              AOAll_lose3.push(element);
            } else {
              awayOBJAll.win3SER = 0;
              awayOBJAll.draw3SER = 0;
              awayOBJAll.lose3SER = 0;
            }
          }

          // Team scored in First Half
          if (element.homeScoreFirstHalf > 0) {
            awayOBJAll.sinFH += 1;
            awayOBJAll.sinFHSER += 1;
            AOAll_sinFH.push(element);
          } else {
            awayOBJAll.sinFHSER = 0;
          }
        }

        // GG3+
        if (element.homeScoreFullTime && element.awayScoreFullTime) {
          let allGoals = element.homeScoreFullTime + element.awayScoreFullTime;
          if (allGoals > 2) {
            awayOBJAll.btts3 += 1;
            AOAll_btts3.push(element);
          } else {
            awayOBJAll.btts3SER = 0;
          }
        } else {
          awayOBJAll.btts3SER = 0;
        }

        // gg second half
        if (element.homeScoreSecondHalf && element.awayScoreSecondHalf) {
          awayOBJAll.BTTS_SH += 1;
          awayOBJAll.BTTS_SHSER += 1;
          AOAll_BTTS_SH.push(element);
        } else {
          awayOBJAll.BTTS_SHSER = 0;
        }

        // both scored - GG
        if (element.awayScoreFullTime && element.homeScoreFullTime) {
          awayOBJAll.bts += 1;
          AOAll_bts.push(element);
          awayOBJAll.btsSER += 1;

          if (element.homeScoreFirstHalf && element.awayScoreFirstHalf) {
            awayOBJAll.btsFH += 1;
            AOAll_btsFH.push(element);
            awayOBJAll.btsFHSER += 1;
          } else {
            awayOBJAll.btsFHSER = 0;
          }

          // 1&gg, x&gg, 2&gg
          if (element.winnerFT === "a") {
            if (isAway) {
              awayOBJAll.win_BTTS += 1;
              AOAll_win_BTTS.push(element);
              awayOBJAll.win_BTTSSER += 1;
              awayOBJAll.draw_BTTSSER = 0;
              awayOBJAll.lose_BTTSSER = 0;
            } else {
              awayOBJAll.lose_BTTS += 1;
              AOAll_lose_BTTS.push(element);
              awayOBJAll.win_BTTSSER = 0;
              awayOBJAll.draw_BTTSSER = 0;
              awayOBJAll.lose_BTTSSER += 1;
            }
          } else if (element.winnerFT === "d") {
            awayOBJAll.draw_BTTS += 1;
            AOAll_draw_BTTS.push(element);
            awayOBJAll.win_BTTSSER = 0;
            awayOBJAll.draw_BTTSSER += 1;
            awayOBJAll.lose_BTTSSER = 0;
          } else {
            if (isAway) {
              awayOBJAll.lose_BTTS += 1;
              AOAll_lose_BTTS.push(element);
              awayOBJAll.win_BTTSSER = 0;
              awayOBJAll.draw_BTTSSER = 0;
              awayOBJAll.lose_BTTSSER += 1;
            } else {
              awayOBJAll.win_BTTS += 1;
              AOAll_win_BTTS.push(element);
              awayOBJAll.win_BTTSSER += 1;
              awayOBJAll.draw_BTTSSER = 0;
              awayOBJAll.lose_BTTSSER = 0;
            }
          }
        } else {
          awayOBJAll.btsSER = 0;
          awayOBJAll.btsFHSER = 0;
          awayOBJAll.win_BTTSSER = 0;
          awayOBJAll.draw_BTTSSER = 0;
          awayOBJAll.lose_BTTSSER = 0;
        }

        // clean sheets
        if (isAway) {
          if (element.homeScoreFullTime === 0) {
            awayOBJAll.cleanS += 1;
            AOAll_cleanS.push(element);
            awayOBJAll.cleanSSER += 1;
          } else {
            awayOBJAll.cleanSSER = 0;
          }
        } else {
          if (element.awayScoreFullTime === 0) {
            awayOBJAll.cleanS += 1;
            AOAll_cleanS.push(element);
            awayOBJAll.cleanSSER += 1;
          } else {
            awayOBJAll.cleanSSER = 0;
          }
        }

        // Scored on every match
        if (isAway) {
          if (element.awayScoreFullTime > 0) {
            awayOBJAll.soem += 1;
            AOAll_soem.push(element);
            awayOBJAll.soemSER += 1;
          } else {
            awayOBJAll.soemSER = 0;
          }
        } else {
          if (element.homeScoreFullTime > 0) {
            awayOBJAll.soem += 1;
            AOAll_soem.push(element);
            awayOBJAll.soemSER += 1;
          } else {
            awayOBJAll.soemSER = 0;
          }
        }

        // Scored two goals on every match
        if (isAway) {
          if (element.awayScoreFullTime > 1) {
            awayOBJAll.stgoem += 1;
            AOAll_stgoem.push(element);
            awayOBJAll.stgoemSER += 1;
          } else {
            awayOBJAll.stgoemSER = 0;
          }
        } else {
          if (element.homeScoreFullTime > 1) {
            awayOBJAll.stgoem += 1;
            AOAll_stgoem.push(element);
            awayOBJAll.stgoemSER += 1;
          } else {
            awayOBJAll.stgoemSER = 0;
          }
        }

        // Team scored in both halves
        if (isAway) {
          if (element.awayScoreFirstHalf && element.awayScoreSecondHalf) {
            awayOBJAll.sibh += 1;
            AOAll_sibh.push(element);
            awayOBJAll.sibhSER += 1;
          } else {
            awayOBJAll.sibhSER = 0;
          }
        } else {
          if (element.homeScoreFirstHalf && element.homeScoreSecondHalf) {
            awayOBJAll.sibh += 1;
            AOAll_sibh.push(element);
            awayOBJAll.sibhSER += 1;
          } else {
            awayOBJAll.sibhSER = 0;
          }
        }

        // Goal in both halves
        if (
          (element.homeScoreFirstHalf || element.awayScoreFirstHalf) &&
          (element.homeScoreSecondHalf || element.awayScoreSecondHalf)
        ) {
          awayOBJAll.gibh += 1;
          AOAll_gibh.push(element);
          awayOBJAll.gibhSER += 1;
        } else {
          awayOBJAll.gibhSER = 0;
        }

        // Lead/lose/draw at half-time ...
        if (isAway) {
          if (element.winnerFH === "a") {
            awayOBJAll.leadHT += 1;
            AOAll_leadHT.push(element);
            awayOBJAll.leadHTSER += 1;
            awayOBJAll.drawHTSER = 0;
            awayOBJAll.loseHTSER = 0;
          } else if (element.winnerFH === "d") {
            awayOBJAll.drawHT += 1;
            AOAll_drawHT.push(element);
            awayOBJAll.leadHTSER = 0;
            awayOBJAll.drawHTSER += 1;
            awayOBJAll.loseHTSER = 0;
          } else {
            awayOBJAll.loseHT += 1;
            AOAll_loseHT.push(element);
            awayOBJAll.leadHTSER = 0;
            awayOBJAll.drawHTSER = 0;
            awayOBJAll.loseHTSER += 1;
          }
        } else {
          if (element.winnerFH === "h") {
            awayOBJAll.leadHT += 1;
            AOAll_leadHT.push(element);
            awayOBJAll.leadHTSER += 1;
            awayOBJAll.drawHTSER = 0;
            awayOBJAll.loseHTSER = 0;
          } else if (element.winnerFH === "d") {
            awayOBJAll.drawHT += 1;
            AOAll_drawHT.push(element);
            awayOBJAll.leadHTSER = 0;
            awayOBJAll.drawHTSER += 1;
            awayOBJAll.loseHTSER = 0;
          } else {
            awayOBJAll.loseHT += 1;
            AOAll_loseHT.push(element);
            awayOBJAll.leadHTSER = 0;
            awayOBJAll.drawHTSER = 0;
            awayOBJAll.loseHTSER += 1;
          }
        }

        // Over x goals
        let allGoals = element.awayScoreFullTime + element.homeScoreFullTime;
        if (allGoals > 1) {
          awayOBJAll.over_1_5 += 1;
          AOAll_over_1_5.push(element);
          awayOBJAll.over_1_5SER += 1;
        } else {
          awayOBJAll.over_1_5SER = 0;
        }

        if (allGoals > 2) {
          awayOBJAll.over_2_5 += 1;
          AOAll_over_2_5.push(element);
          awayOBJAll.over_2_5SER += 1;
        } else {
          awayOBJAll.over_2_5SER = 0;
        }

        if (allGoals > 3) {
          awayOBJAll.over_3_5 += 1;
          AOAll_over_3_5.push(element);
          awayOBJAll.over_3_5SER += 1;
        } else {
          awayOBJAll.over_3_5SER = 0;
        }

        if (allGoals > 4) {
          awayOBJAll.over_4_5 += 1;
          AOAll_over_4_5.push(element);
          awayOBJAll.over_4_5SER += 1;
        } else {
          awayOBJAll.over_4_5SER = 0;
        }

        if (allGoals > 5) {
          awayOBJAll.over_5_5 += 1;
          AOAll_over_5_5.push(element);
          awayOBJAll.over_5_5SER += 1;
        } else {
          awayOBJAll.over_5_5SER = 0;
        }

        // Under goals
        if (allGoals < 3) {
          awayOBJAll.under_2_5 += 1;
          AOAll_under_2_5.push(element);
          awayOBJAll.under_2_5SER += 1;
        } else {
          awayOBJAll.under_2_5SER = 0;
        }

        if (allGoals < 2) {
          awayOBJAll.under_1_5 += 1;
          AOAll_under_1_5.push(element);
          awayOBJAll.under_1_5SER += 1;
        } else {
          awayOBJAll.under_1_5SER = 0;
        }

        // Over x goals at half-time
        allGoals = element.homeScoreFirstHalf + element.awayScoreFirstHalf;
        if (allGoals > 0) {
          awayOBJAll.over_0_5_HT += 1;
          AOAll_over_0_5_HT.push(element);
          awayOBJAll.over_0_5_HTSER += 1;
        } else {
          awayOBJAll.over_0_5_HTSER = 0;
        }

        if (allGoals > 1) {
          awayOBJAll.over_1_5_HT += 1;
          AOAll_over_1_5_HT.push(element);
          awayOBJAll.over_1_5_HTSER += 1;
        } else {
          awayOBJAll.over_1_5_HTSER = 0;
        }

        if (allGoals > 2) {
          awayOBJAll.over_2_5_HT += 1;
          AOAll_over_2_5_HT.push(element);
          awayOBJAll.over_2_5_HTSER += 1;
        } else {
          awayOBJAll.over_2_5_HTSER = 0;
        }

        // half-time/Full Time

        if (isAway) {
          if (element.winnerFH === "a") {
            awayOBJAll.draw_homeSER = 0;
            awayOBJAll.draw_drawSER = 0;
            awayOBJAll.draw_awaySER = 0;

            awayOBJAll.away_homeSER = 0;
            awayOBJAll.away_drawSER = 0;
            awayOBJAll.away_awaySER = 0;

            if (element.winnerFT === "a") {
              awayOBJAll.home_home += 1;
              AOAll_home_home.push(element);
              awayOBJAll.home_homeSER += 1;

              awayOBJAll.home_drawSER = 0;
              awayOBJAll.home_awaySER = 0;
            } else if (element.winnerFT === "d") {
              awayOBJAll.home_draw += 1;
              AOAll_home_draw.push(element);
              awayOBJAll.home_drawSER += 1;

              awayOBJAll.home_homeSER = 0;
              awayOBJAll.home_awaySER = 0;
            } else {
              awayOBJAll.home_away += 1;
              AOAll_home_away.push(element);
              awayOBJAll.home_awaySER += 1;

              awayOBJAll.home_homeSER = 0;
              awayOBJAll.home_drawSER = 0;
            }
          } else if (element.winnerFH === "d") {
            awayOBJAll.home_homeSER = 0;
            awayOBJAll.home_drawSER = 0;
            awayOBJAll.home_awaySER = 0;

            awayOBJAll.away_homeSER = 0;
            awayOBJAll.away_drawSER = 0;
            awayOBJAll.away_awaySER = 0;

            if (element.winnerFT === "a") {
              awayOBJAll.draw_home += 1;
              AOAll_draw_home.push(element);
              awayOBJAll.draw_homeSER += 1;

              awayOBJAll.draw_drawSER = 0;
              awayOBJAll.draw_awaySER = 0;
            } else if (element.winnerFT === "d") {
              awayOBJAll.draw_draw += 1;
              AOAll_draw_draw.push(element);
              awayOBJAll.draw_drawSER += 1;

              awayOBJAll.draw_homeSER = 0;
              awayOBJAll.draw_awaySER = 0;
            } else {
              awayOBJAll.draw_away += 1;
              AOAll_draw_away.push(element);
              awayOBJAll.draw_awaySER += 1;

              awayOBJAll.draw_homeSER = 0;
              awayOBJAll.draw_drawSER = 0;
            }
          } else {
            awayOBJAll.home_homeSER = 0;
            awayOBJAll.home_drawSER = 0;
            awayOBJAll.home_awaySER = 0;

            awayOBJAll.draw_homeSER = 0;
            awayOBJAll.draw_drawSER = 0;
            awayOBJAll.draw_awaySER = 0;

            if (element.winnerFT === "a") {
              awayOBJAll.away_home += 1;
              AOAll_away_home.push(element);
              awayOBJAll.away_homeSER += 1;

              awayOBJAll.away_drawSER = 0;
              awayOBJAll.away_awaySER = 0;
            } else if (element.winnerFT === "d") {
              awayOBJAll.away_draw += 1;
              AOAll_away_draw.push(element);
              awayOBJAll.away_drawSER += 1;

              awayOBJAll.away_homeSER = 0;
              awayOBJAll.away_awaySER = 0;
            } else {
              awayOBJAll.away_away += 1;
              AOAll_away_away.push(element);
              awayOBJAll.away_awaySER += 1;

              awayOBJAll.away_homeSER = 0;
              awayOBJAll.away_drawSER = 0;
            }
          }
        } else {
          if (element.winnerFH === "h") {
            awayOBJAll.draw_homeSER = 0;
            awayOBJAll.draw_drawSER = 0;
            awayOBJAll.draw_awaySER = 0;

            awayOBJAll.away_homeSER = 0;
            awayOBJAll.away_drawSER = 0;
            awayOBJAll.away_awaySER = 0;

            if (element.winnerFT === "h") {
              awayOBJAll.home_home += 1;
              AOAll_home_home.push(element);
              awayOBJAll.home_homeSER += 1;

              awayOBJAll.home_drawSER = 0;
              awayOBJAll.home_awaySER = 0;
            } else if (element.winnerFT === "d") {
              awayOBJAll.home_draw += 1;
              AOAll_home_draw.push(element);
              awayOBJAll.home_drawSER += 1;

              awayOBJAll.home_homeSER = 0;
              awayOBJAll.home_awaySER = 0;
            } else {
              awayOBJAll.home_away += 1;
              AOAll_home_away.push(element);
              awayOBJAll.home_awaySER += 1;

              awayOBJAll.home_homeSER = 0;
              awayOBJAll.home_drawSER = 0;
            }
          } else if (element.winnerFH === "d") {
            awayOBJAll.home_homeSER = 0;
            awayOBJAll.home_drawSER = 0;
            awayOBJAll.home_awaySER = 0;

            awayOBJAll.away_homeSER = 0;
            awayOBJAll.away_drawSER = 0;
            awayOBJAll.away_awaySER = 0;

            if (element.winnerFT === "h") {
              awayOBJAll.draw_home += 1;
              AOAll_draw_home.push(element);
              awayOBJAll.draw_homeSER += 1;

              awayOBJAll.draw_drawSER = 0;
              awayOBJAll.draw_awaySER = 0;
            } else if (element.winnerFT === "d") {
              awayOBJAll.draw_draw += 1;
              AOAll_draw_draw.push(element);
              awayOBJAll.draw_drawSER += 1;

              awayOBJAll.draw_homeSER = 0;
              awayOBJAll.draw_awaySER = 0;
            } else {
              awayOBJAll.draw_away += 1;
              AOAll_draw_away.push(element);
              awayOBJAll.draw_awaySER += 1;

              awayOBJAll.draw_homeSER = 0;
              awayOBJAll.draw_drawSER = 0;
            }
          } else {
            awayOBJAll.home_homeSER = 0;
            awayOBJAll.home_drawSER = 0;
            awayOBJAll.home_awaySER = 0;

            awayOBJAll.draw_homeSER = 0;
            awayOBJAll.draw_drawSER = 0;
            awayOBJAll.draw_awaySER = 0;

            if (element.winnerFT === "h") {
              awayOBJAll.away_home += 1;
              AOAll_away_home.push(element);
              awayOBJAll.away_homeSER += 1;

              awayOBJAll.away_drawSER = 0;
              awayOBJAll.away_awaySER = 0;
            } else if (element.winnerFT === "d") {
              awayOBJAll.away_draw += 1;
              AOAll_away_draw.push(element);
              awayOBJAll.away_drawSER += 1;

              awayOBJAll.away_homeSER = 0;
              awayOBJAll.away_awaySER = 0;
            } else {
              awayOBJAll.away_away += 1;
              AOAll_away_away.push(element);
              awayOBJAll.away_awaySER += 1;

              awayOBJAll.away_homeSER = 0;
              awayOBJAll.away_drawSER = 0;
            }
          }
        }
      }

      return null;
    });

    homeOBJAll_games.reverse();
    homeOBJHome_games.reverse();
    awayOBJAway_games.reverse();
    awayOBJAll_games.reverse();

    let homeOBJHome_list = {
      over_0_5_SH: HOHome_over_0_5_SH,
      over_1_5_SH: HOHome_over_1_5_SH,
      over_2_5_SH: HOHome_over_2_5_SH,
      sinSH: HOHome_sinSH,
      more_FH: HOHome_more_FH,
      more_SH: HOHome_more_SH,
      win2: HOHome_win2,
      draw2: HOHome_draw2,
      lose2: HOHome_lose2,
      BTTS_SH: HOHome_BTTS_SH,
      win: HOHome_win,
      draw: HOHome_draw,
      lose: HOHome_lose,
      win3: HOHome_win3,
      draw3: HOHome_draw3,
      lose3: HOHome_lose3,
      btts3: HOHome_btts3,
      sinFH: HOHome_sinFH,
      gspm: HOHome_gspm,
      gcpm: HOHome_gcpm,
      bts: HOHome_bts,
      btsFH: HOHome_btsFH,
      cleanS: HOHome_cleanS,
      soem: HOHome_soem,
      stgoem: HOHome_stgoem,
      sibh: HOHome_sibh,
      gibh: HOHome_gibh,
      leadHT: HOHome_leadHT,
      loseHT: HOHome_loseHT,
      drawHT: HOHome_drawHT,
      over_1_5: HOHome_over_1_5,
      over_2_5: HOHome_over_2_5,
      over_3_5: HOHome_over_3_5,
      over_4_5: HOHome_over_4_5,
      over_5_5: HOHome_over_5_5,
      under_1_5: HOHome_under_1_5,
      under_2_5: HOHome_under_2_5,
      over_0_5_HT: HOHome_over_0_5_HT,
      over_1_5_HT: HOHome_over_1_5_HT,
      over_2_5_HT: HOHome_over_2_5_HT,
      win_BTTS: HOHome_win_BTTS,
      draw_BTTS: HOHome_draw_BTTS,
      lose_BTTS: HOHome_lose_BTTS,
      home_home: HOHome_home_home,
      home_draw: HOHome_home_draw,
      home_away: HOHome_home_away,
      draw_home: HOHome_draw_home,
      draw_draw: HOHome_draw_draw,
      draw_away: HOHome_draw_away,
      away_home: HOHome_away_home,
      away_draw: HOHome_away_draw,
      away_away: HOHome_away_away,
    };
    let homeOBJAll_list = {
      over_0_5_SH: HOAll_over_0_5_SH,
      over_1_5_SH: HOAll_over_1_5_SH,
      over_2_5_SH: HOAll_over_2_5_SH,
      sinSH: HOAll_sinSH,
      more_FH: HOAll_more_FH,
      more_SH: HOAll_more_SH,
      win2: HOAll_win2,
      draw2: HOAll_draw2,
      lose2: HOAll_lose2,
      BTTS_SH: HOAll_BTTS_SH,
      win: HOAll_win,
      draw: HOAll_draw,
      lose: HOAll_lose,
      win3: HOAll_win3,
      draw3: HOAll_draw3,
      lose3: HOAll_lose3,
      btts3: HOAll_btts3,
      sinFH: HOAll_sinFH,
      gspm: HOAll_gspm,
      gcpm: HOAll_gcpm,
      bts: HOAll_bts,
      btsFH: HOAll_btsFH,
      cleanS: HOAll_cleanS,
      soem: HOAll_soem,
      stgoem: HOAll_stgoem,
      sibh: HOAll_sibh,
      gibh: HOAll_gibh,
      leadHT: HOAll_leadHT,
      loseHT: HOAll_loseHT,
      drawHT: HOAll_drawHT,
      over_1_5: HOAll_over_1_5,
      over_2_5: HOAll_over_2_5,
      over_3_5: HOAll_over_3_5,
      over_4_5: HOAll_over_4_5,
      over_5_5: HOAll_over_5_5,
      under_1_5: HOAll_under_1_5,
      under_2_5: HOAll_under_2_5,
      over_0_5_HT: HOAll_over_0_5_HT,
      over_1_5_HT: HOAll_over_1_5_HT,
      over_2_5_HT: HOAll_over_2_5_HT,
      win_BTTS: HOAll_win_BTTS,
      draw_BTTS: HOAll_draw_BTTS,
      lose_BTTS: HOAll_lose_BTTS,
      home_home: HOAll_home_home,
      home_draw: HOAll_home_draw,
      home_away: HOAll_home_away,
      draw_home: HOAll_draw_home,
      draw_draw: HOAll_draw_draw,
      draw_away: HOAll_draw_away,
      away_home: HOAll_away_home,
      away_draw: HOAll_away_draw,
      away_away: HOAll_away_away,
    };
    let awayOBJAway_list = {
      over_0_5_SH: AOAway_over_0_5_SH,
      over_1_5_SH: AOAway_over_1_5_SH,
      over_2_5_SH: AOAway_over_2_5_SH,
      sinSH: AOAway_sinSH,
      more_FH: AOAway_more_FH,
      more_SH: AOAway_more_SH,
      win2: AOAway_win2,
      draw2: AOAway_draw2,
      lose2: AOAway_lose2,
      BTTS_SH: AOAway_BTTS_SH,
      win: AOAway_win,
      draw: AOAway_draw,
      lose: AOAway_lose,
      win3: AOAway_win3,
      draw3: AOAway_draw3,
      lose3: AOAway_lose3,
      btts3: AOAway_btts3,
      sinFH: AOAway_sinFH,
      gspm: AOAway_gspm,
      gcpm: AOAway_gcpm,
      bts: AOAway_bts,
      btsFH: AOAway_btsFH,
      cleanS: AOAway_cleanS,
      soem: AOAway_soem,
      stgoem: AOAway_stgoem,
      sibh: AOAway_sibh,
      gibh: AOAway_gibh,
      leadHT: AOAway_leadHT,
      loseHT: AOAway_loseHT,
      drawHT: AOAway_drawHT,
      over_1_5: AOAway_over_1_5,
      over_2_5: AOAway_over_2_5,
      over_3_5: AOAway_over_3_5,
      over_4_5: AOAway_over_4_5,
      over_5_5: AOAway_over_5_5,
      under_1_5: AOAway_under_1_5,
      under_2_5: AOAway_under_2_5,
      over_0_5_HT: AOAway_over_0_5_HT,
      over_1_5_HT: AOAway_over_1_5_HT,
      over_2_5_HT: AOAway_over_2_5_HT,
      win_BTTS: AOAway_win_BTTS,
      draw_BTTS: AOAway_draw_BTTS,
      lose_BTTS: AOAway_lose_BTTS,
      home_home: AOAway_home_home,
      home_draw: AOAway_home_draw,
      home_away: AOAway_home_away,
      draw_home: AOAway_draw_home,
      draw_draw: AOAway_draw_draw,
      draw_away: AOAway_draw_away,
      away_home: AOAway_away_home,
      away_draw: AOAway_away_draw,
      away_away: AOAway_away_away,
    };
    let awayOBJAll_list = {
      over_0_5_SH: AOAll_over_0_5_SH,
      over_1_5_SH: AOAll_over_1_5_SH,
      over_2_5_SH: AOAll_over_2_5_SH,
      sinSH: AOAll_sinSH,
      more_FH: AOAll_more_FH,
      more_SH: AOAll_more_SH,
      win2: AOAll_win2,
      draw2: AOAll_draw2,
      lose2: AOAll_lose2,
      BTTS_SH: AOAll_BTTS_SH,
      win: AOAll_win,
      draw: AOAll_draw,
      lose: AOAll_lose,
      win3: AOAll_win3,
      draw3: AOAll_draw3,
      lose3: AOAll_lose3,
      btts3: AOAll_btts3,
      sinFH: AOAll_sinFH,
      gspm: AOAll_gspm,
      gcpm: AOAll_gcpm,
      bts: AOAll_bts,
      btsFH: AOAll_btsFH,
      cleanS: AOAll_cleanS,
      soem: AOAll_soem,
      stgoem: AOAll_stgoem,
      sibh: AOAll_sibh,
      gibh: AOAll_gibh,
      leadHT: AOAll_leadHT,
      loseHT: AOAll_loseHT,
      drawHT: AOAll_drawHT,
      over_1_5: AOAll_over_1_5,
      over_2_5: AOAll_over_2_5,
      over_3_5: AOAll_over_3_5,
      over_4_5: AOAll_over_4_5,
      over_5_5: AOAll_over_5_5,
      under_1_5: AOAll_under_1_5,
      under_2_5: AOAll_under_2_5,
      over_0_5_HT: AOAll_over_0_5_HT,
      over_1_5_HT: AOAll_over_1_5_HT,
      over_2_5_HT: AOAll_over_2_5_HT,
      win_BTTS: AOAll_win_BTTS,
      draw_BTTS: AOAll_draw_BTTS,
      lose_BTTS: AOAll_lose_BTTS,
      home_home: AOAll_home_home,
      home_draw: AOAll_home_draw,
      home_away: AOAll_home_away,
      draw_home: AOAll_draw_home,
      draw_draw: AOAll_draw_draw,
      draw_away: AOAll_draw_away,
      away_home: AOAll_away_home,
      away_draw: AOAll_away_draw,
      away_away: AOAll_away_away,
    };

    setState({
      homeOBJHome: homeOBJHome,
      homeOBJAll: homeOBJAll,
      awayOBJAway: awayOBJAway,
      awayOBJAll: awayOBJAll,
      homeOBJHome_games: homeOBJHome_games,
      homeOBJAll_games: homeOBJAll_games,
      awayOBJAway_games: awayOBJAway_games,
      awayOBJAll_games: awayOBJAll_games,
      homeOBJHome_list: homeOBJHome_list,
      homeOBJAll_list: homeOBJAll_list,
      awayOBJAway_list: awayOBJAway_list,
      awayOBJAll_list: awayOBJAll_list,
      h2h: hth_result,
      table: table,
      final_results: final_results,
      spinner: false,
    });
  };

  // window.scrollTo(0, 0);

  let content = (
    <div className={classes.spinnerBox}>
      <Spinner />
    </div>
  );

  console.log(typeof state !== "undefined" && state.spinner === false);

  if (typeof state !== "undefined" && state.spinner === false) {
    content = (
      <div className={classes.Backdrop}>
        <BackdropClose click={goback} />
        <MatchTitle
          date={props.date}
          t={props.t}
          comp={props.comp}
          co={props.country}
          h={props.h}
          a={props.a}
        />

        <SingleBettingBox
          homeOBJHome={state.homeOBJHome}
          homeOBJAll={state.homeOBJAll}
          awayOBJAway={state.awayOBJAway}
          awayOBJAll={state.awayOBJAll}
          final_results={state.final_results}
        />

        <MatchHomeBox
          h={props.h}
          homeOBJHome={state.homeOBJHome}
          homeOBJAll={state.homeOBJAll}
          homeOBJHome_games={state.homeOBJHome_games}
          homeOBJAll_games={state.homeOBJAll_games}
          homeOBJHome_list={state.homeOBJHome_list}
          homeOBJAll_list={state.homeOBJAll_list}
          object={state.h2h}
        />

        <MatchAwayBox
          a={props.a}
          awayOBJAway={state.awayOBJAway}
          awayOBJAll={state.awayOBJAll}
          awayOBJAway_games={state.awayOBJAway_games}
          awayOBJAll_games={state.awayOBJAll_games}
          awayOBJAway_list={state.awayOBJAway_list}
          awayOBJAll_list={state.awayOBJAll_list}
          object={state.h2h}
        />

        <div className={classes.tableContainer}>
          <Table table={state.table} />
        </div>
      </div>
    );
  }

  return (
    <div id="backdrop" className={classes.Backdrop}>
      {content}
    </div>
  );
};

export default Backdrop;
