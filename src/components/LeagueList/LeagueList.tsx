import React, { useState } from "react";
import CountrySingle from "../CountrySingle/CountrySingle";
import MatchSingle from "../MatchSingle/MatchSingle";
import classes from "./LeagueList.module.css";
import SortBy from "../../containers/BettingBox/SortBy/SortBy";

const LeagueList = (props: { dateSet: string; games: any[] }) => {
  const [state, setState] = useState({
    sortBy: 1,
  });

  const setSort = (br: number) => {
    setState(() => {
      return {
        sortBy: br,
      };
    });
  };

  const sortElements = (
    <div className={classes.SortByLine}>
      <div className={classes.label}>Sort By:</div>
      <SortBy
        key="Country"
        current={state.sortBy}
        name="Country"
        br={1}
        click={() => setSort(1)}
      />

      <SortBy
        key="Time"
        current={state.sortBy}
        name="Kick-Off"
        br={2}
        click={() => setSort(2)}
      />
    </div>
  );

  const content = props.games.slice(0);
  // content.sort((a, b) => (a.country > b.country) ? 1 : (a.country === b.country) ? ((a.competition > b.competition) ? 1 : -1) : -1);

  if (state.sortBy === 2) {
    let tempDateA;
    let tempDateB;
    content.sort((a, b) => {
      tempDateA = new Date(a.colDate + "T" + a.colTime);
      tempDateB = new Date(b.colDate + "T" + b.colTime);
      if (tempDateA.getTime() > tempDateB.getTime()) return 1;
      else return -1;
    });
  } else {
    content.sort((a, b) => {
      if (a.country > b.country) {
        return 1;
      } else if (a.country === b.country) {
        if (a.compID > b.compID) {
          return 1;
        } else if (a.compID === b.compID) {
          if (a.colTime > b.colTime) {
            return 1;
          } else if (a.colTime === b.colTime) {
            if (a.homeTeam > b.homeTeam) {
              return 1;
            } else if (a.homeTeam === b.homeTeam) {
              return 1;
            } else {
              return -1;
            }
          } else {
            return -1;
          }
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
  }

  let todayDay: number;
  if (props.dateSet !== "") {
    const sp = props.dateSet.split("-");
    todayDay = parseInt(sp[2]);
  } else {
    todayDay = new Date().getDate();
  }

  let currentDay = null;

  let dateOld = null;
  let hours = null;
  let minutes = null;
  let countryCompetition = "";
  let hasGames = false;
  let simpleDate = null;
  let brojac = 0;
  let contentCountry: "" | JSX.Element[] = "";

  const c = content.map((text, index) => {
    // 2020-04-04T16:00+01:00
    // colTime = "12:00+02:00"
    // colDate = "2020-04-18"
    // const dateB = game.colDate.split("-") ---- dateB[2] + "." + dateB[1] + "." + dateB[0]
    dateOld = text.colDate + "T" + text.colTime;
    simpleDate = text.colDate; // Koristimo za poredjenje datuma sa onim iz baze
    currentDay = new Date(dateOld);

    if (currentDay.getDate() === todayDay) {
      hasGames = true;
      hours =
        currentDay.getHours() < 10
          ? "0" + currentDay.getHours()
          : currentDay.getHours();
      minutes =
        currentDay.getMinutes() < 10
          ? "0" + currentDay.getMinutes()
          : currentDay.getMinutes();

      text.awayTeam = new DOMParser().parseFromString(
        text.awayTeam,
        "text/html"
      ).body.textContent;
      text.homeTeam = new DOMParser().parseFromString(
        text.homeTeam,
        "text/html"
      ).body.textContent;
      text.country = new DOMParser().parseFromString(
        text.country,
        "text/html"
      ).body.textContent;

      text.competition = new DOMParser().parseFromString(
        text.competition,
        "text/html"
      ).body.textContent;

      if (countryCompetition !== text.country + " - " + text.competition) {
        brojac++;

        countryCompetition = text.country + " - " + text.competition;

        if (brojac === 7 || brojac === 15) {
          contentCountry = [
            <CountrySingle key="cs" c={countryCompetition} co={text.country} />,
            <MatchSingle
              key={index}
              t={hours + ":" + minutes}
              h={text.homeTeam}
              a={text.awayTeam}
              country={text.country}
              comp={text.competition}
              date={currentDay}
              simpleDate={simpleDate}
            />,
            // Kod za banner DODATI KAO JOS JEDNOG CLANA NIZA ako zelimo da se pojavi ispod sedme lige
            // <div key="banner1" dangerouslySetInnerHTML={{ __html: '<div style="width: 92%; text-align: center; margin: 5px auto;"><a href="https://refpaiozdg.top/L?tag=d_953085m_25437c_698ban&site=953085&ad=25437" target="_blank" title="MegaPari"><img style="width: 99%; margin: 0px auto;" src="https://injuriesandsuspensions.com/wp-content/uploads/2021/04/698x60_1.gif" rel="nofollow" border="0" alt="MegaPari"></a></div>' }} />
          ];
        } else {
          contentCountry = [
            <CountrySingle key="cs" c={countryCompetition} co={text.country} />,
            <MatchSingle
              key={index}
              t={hours + ":" + minutes}
              h={text.homeTeam}
              a={text.awayTeam}
              country={text.country}
              comp={text.competition}
              date={currentDay}
              simpleDate={simpleDate}
            />,
          ];
        }

        return contentCountry;
      } else {
        return (
          <MatchSingle
            key={index}
            t={hours + ":" + minutes}
            h={text.homeTeam}
            a={text.awayTeam}
            country={text.country}
            comp={text.competition}
            date={currentDay}
          />
        );
      }
    } else {
      return null;
    }
  });

  let hasGamesDIv: "" | JSX.Element = "";
  if (!hasGames) {
    hasGamesDIv = (
      <div className={classes.noGames}>
        There are no available games for this date.
      </div>
    );
  }

  return (
    <div className={classes.Container}>
      <div className={classes.topExpl}>
        Below you can find detailed betting stats and picks for all today's
        games.
      </div>
      {sortElements}
      {c}
      {hasGamesDIv}
    </div>
  );
};

export default LeagueList;
