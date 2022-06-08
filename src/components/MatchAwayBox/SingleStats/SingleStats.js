import React, { useState } from 'react';
import classes from './SingleStats.module.css';
import Title from '../../MatchHomeBox/TittleTemplateBox/TittleTemplateBox';
import OverallButton from '../../MatchHomeBox/OverallButton/OverallButton';
import StatsLine from '../StatsLine/StatsLine';

const SingleStats = (props) => {
    const [state, setState] = useState({
        all: false,
        single: true
    });


    const setAll = () => {
        setState(prevState => {
            return {
                ...prevState,
                all: true,
                single: false
            };
        });
    }

    const setSingle = () => {
        setState(prevState => {
            return {
                ...prevState,
                all: false,
                single: true
            };
        });
    }

        const awayOBJAway = props.awayOBJAway;
        const awayOBJAll = props.awayOBJAll;

        const awayOBJAway_list = props.awayOBJAway_list;
        const awayOBJAll_list = props.awayOBJAll_list;

        let contentOverall;
        let contentWinOver;
        let contentBTTS;
        let contentHT;
        let contentOU;
        let contentOUHTFT;
        let contentHTFT;

        let gamesCountVar;


        if (state.single) {

            gamesCountVar = awayOBJAway.gamesCount;

            contentOverall = <ul>
                <StatsLine
                    br={(awayOBJAway.gspm / awayOBJAway.gamesCount).toFixed(2)}
                    txt={"Goals scored per game"}
                    gameList={[]}
                    setList={false}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.gcpm / awayOBJAway.gamesCount).toFixed(2)}
                    txt={"Goals conceded per game"}
                    gameList={[]}
                    setList={false}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.win / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Win"}
                    gameList={awayOBJAway_list.win}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.draw / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Draw"}
                    gameList={awayOBJAway_list.draw}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.lose / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Lose"}
                    gameList={awayOBJAway_list.lose}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.cleanS / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Clean sheets"}
                    gameList={awayOBJAway_list.cleanS}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.soem / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Team scored over 0.5 goals"}
                    gameList={awayOBJAway_list.soem}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.stgoem / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Team scored over 1.5 goals"}
                    gameList={awayOBJAway_list.stgoem}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"

                />
            </ul>;

            contentWinOver = <ul>
                <StatsLine
                    br={(awayOBJAway.win2 / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Win and over 1.5 goals"}
                    gameList={awayOBJAway_list.win2}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.draw2 / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Draw and over 1.5 goals"}
                    gameList={awayOBJAway_list.draw2}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.lose2 / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Lose and over 1.5 goals"}
                    gameList={awayOBJAway_list.lose2}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.win3 / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Win and over 2.5 goals"}
                    gameList={awayOBJAway_list.win3}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.draw3 / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Draw and over 2.5 goals"}
                    gameList={awayOBJAway_list.draw3}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.lose3 / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Lose and over 2.5 goals"}
                    gameList={awayOBJAway_list.lose3}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />
            </ul>;

            contentBTTS = <ul>
                <StatsLine
                    br={(awayOBJAway.bts / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Both teams to score (BTTS)"}
                    gameList={awayOBJAway_list.bts}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.btsFH / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"BTTS in the first half"}
                    gameList={awayOBJAway_list.btsFH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.BTTS_SH / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"BTTS in the second half"}
                    gameList={awayOBJAway_list.BTTS_SH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.btts3 / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"BTTS and over 2.5 goals"}
                    gameList={awayOBJAway_list.btts3}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />
                <StatsLine
                    br={(awayOBJAway.win_BTTS / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Team won and BTTS"}
                    gameList={awayOBJAway_list.win_BTTS}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.draw_BTTS / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Draw and BTTS"}
                    gameList={awayOBJAway_list.draw_BTTS}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.lose_BTTS / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Team lost and BTTS"}
                    gameList={awayOBJAway_list.lose_BTTS}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />
            </ul>;

            contentHT = <ul>
                <StatsLine
                    br={(awayOBJAway.leadHT / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Team won first half"}
                    gameList={awayOBJAway_list.leadHT}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.loseHT / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Team lost first half"}
                    gameList={awayOBJAway_list.loseHT}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.drawHT / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Draw at half-time"}
                    gameList={awayOBJAway_list.drawHT}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.sinFH / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Team Scored over 0.5 in FH"}
                    gameList={awayOBJAway_list.sinFH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.sinSH / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Team Scored over 0.5 in SH"}
                    gameList={awayOBJAway_list.sinSH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.sibh / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Team Scored in both halves"}
                    gameList={awayOBJAway_list.sibh}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.gibh / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Goal in both halves"}
                    gameList={awayOBJAway_list.gibh}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.more_FH / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"More goals in the first half"}
                    gameList={awayOBJAway_list.more_FH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.more_SH / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"More goals in the second half"}
                    gameList={awayOBJAway_list.more_SH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />
            </ul>;

            contentOU = <ul>
                <StatsLine
                    br={(awayOBJAway.over_1_5 / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Over 1.5 goals"}
                    gameList={awayOBJAway_list.over_1_5}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.over_2_5 / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Over 2.5 goals"}
                    gameList={awayOBJAway_list.over_2_5}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.over_3_5 / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Over 3.5 goals"}
                    gameList={awayOBJAway_list.over_3_5}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.over_4_5 / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Over 4.5 goals"}
                    gameList={awayOBJAway_list.over_4_5}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.over_5_5 / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Over 5.5 goals"}
                    gameList={awayOBJAway_list.over_5_5}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.under_1_5 / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Under 1.5 goals"}
                    gameList={awayOBJAway_list.under_1_5}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.under_2_5 / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Under 2.5 goals"}
                    gameList={awayOBJAway_list.under_2_5}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

            </ul>;

            contentOUHTFT = <ul>
                <StatsLine
                    br={(awayOBJAway.over_0_5_HT / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Over 0.5 goals first half"}
                    gameList={awayOBJAway_list.over_0_5_HT}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />
                <StatsLine
                    br={(awayOBJAway.over_1_5_HT / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Over 1.5 goals first half"}
                    gameList={awayOBJAway_list.over_1_5_HT}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />
                <StatsLine
                    br={(awayOBJAway.over_2_5_HT / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Over 2.5 goals first half"}
                    gameList={awayOBJAway_list.over_2_5_HT}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.over_0_5_SH / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Over 0.5 goals second half"}
                    gameList={awayOBJAway_list.over_0_5_SH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />
                <StatsLine
                    br={(awayOBJAway.over_1_5_SH / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Over 1.5 goals second half"}
                    gameList={awayOBJAway_list.over_1_5_SH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />
                <StatsLine
                    br={(awayOBJAway.over_2_5_SH / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Over 2.5 goals second half"}
                    gameList={awayOBJAway_list.over_2_5_SH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

            </ul>;

            contentHTFT = <ul>
                <StatsLine
                    br={(awayOBJAway.home_home / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Win HT - Win FT"}
                    gameList={awayOBJAway_list.home_home}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.home_draw / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Win HT - Draw FT"}
                    gameList={awayOBJAway_list.home_draw}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.home_away / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Win HT - Lose FT"}
                    gameList={awayOBJAway_list.home_away}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.draw_home / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Draw HT - Win FT"}
                    gameList={awayOBJAway_list.draw_home}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.draw_draw / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Draw HT - Draw FT"}
                    gameList={awayOBJAway_list.draw_draw}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.draw_away / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Draw HT - Lose FT"}
                    gameList={awayOBJAway_list.draw_away}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(awayOBJAway.away_home / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Lose HT - Win FT"}
                    gameList={awayOBJAway_list.away_home}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />
                <StatsLine
                    br={(awayOBJAway.away_draw / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Lose HT - Draw FT"}
                    gameList={awayOBJAway_list.away_draw}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />
                <StatsLine
                    br={(awayOBJAway.away_away / awayOBJAway.gamesCount * 100).toFixed(0)}
                    txt={"Lose HT - Lose FT"}
                    gameList={awayOBJAway_list.away_away}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="H"
                />
            </ul>;

        }

        else if (state.all) {

            gamesCountVar = awayOBJAll.gamesCount;

            contentOverall = <ul>
                <StatsLine
                    br={(awayOBJAll.gspm / awayOBJAll.gamesCount).toFixed(2)}
                    txt={"Goals scored per game"}
                    gameList={[]}
                    setList={false}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.gcpm / awayOBJAll.gamesCount).toFixed(2)}
                    txt={"Goals conceded per game"}
                    gameList={[]}
                    setList={false}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.win / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Win"}
                    gameList={awayOBJAll_list.win}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.draw / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw"}
                    gameList={awayOBJAll_list.draw}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.lose / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Lose"}
                    gameList={awayOBJAll_list.lose}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.cleanS / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Clean sheets"}
                    gameList={awayOBJAll_list.cleanS}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.soem / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team scored over 0.5 goals"}
                    gameList={awayOBJAll_list.soem}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.stgoem / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team scored over 1.5 goals"}
                    gameList={awayOBJAll_list.stgoem}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"

                />
            </ul>;

            contentWinOver = <ul>
                <StatsLine
                    br={(awayOBJAll.win2 / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Win and over 1.5 goals"}
                    gameList={awayOBJAll_list.win2}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.draw2 / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw and over 1.5 goals"}
                    gameList={awayOBJAll_list.draw2}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.lose2 / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Lose and over 1.5 goals"}
                    gameList={awayOBJAll_list.lose2}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.win3 / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Win and over 2.5 goals"}
                    gameList={awayOBJAll_list.win3}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.draw3 / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw and over 2.5 goals"}
                    gameList={awayOBJAll_list.draw3}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.lose3 / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Lose and over 2.5 goals"}
                    gameList={awayOBJAll_list.lose3}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

            </ul>;

            contentBTTS = <ul>
                <StatsLine
                    br={(awayOBJAll.bts / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Both teams to score (BTTS)"}
                    gameList={awayOBJAll_list.bts}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.btsFH / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"BTTS in the first half"}
                    gameList={awayOBJAll_list.btsFH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.BTTS_SH / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"BTTS in the second half"}
                    gameList={awayOBJAll_list.BTTS_SH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.btts3 / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"BTTS and over 2.5 goals"}
                    gameList={awayOBJAll_list.btts3}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.win_BTTS / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team won and BTTS"}
                    gameList={awayOBJAll_list.win_BTTS}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.draw_BTTS / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw and BTTS"}
                    gameList={awayOBJAll_list.draw_BTTS}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.lose_BTTS / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team lost and BTTS"}
                    gameList={awayOBJAll_list.lose_BTTS}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />
            </ul>;

            contentHT = <ul>
                <StatsLine
                    br={(awayOBJAll.leadHT / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team won first half"}
                    gameList={awayOBJAll_list.leadHT}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.loseHT / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team lost first half"}
                    gameList={awayOBJAll_list.loseHT}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.drawHT / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw at half-time"}
                    gameList={awayOBJAll_list.drawHT}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.sinFH / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team Scored over 0.5 in FH"}
                    gameList={awayOBJAll_list.sinFH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.sinSH / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team Scored over 0.5 in SH"}
                    gameList={awayOBJAll_list.sinSH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.sibh / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team Scored in both halves"}
                    gameList={awayOBJAll_list.sibh}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.gibh / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Goal in both halves"}
                    gameList={awayOBJAll_list.gibh}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.more_FH / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"More goals in the first half"}
                    gameList={awayOBJAll_list.more_FH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.more_SH / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"More goals in the second half"}
                    gameList={awayOBJAll_list.more_SH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />
            </ul>;

            contentOU = <ul>
                <StatsLine
                    br={(awayOBJAll.over_1_5 / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 1.5 goals"}
                    gameList={awayOBJAll_list.over_1_5}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.over_2_5 / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 2.5 goals"}
                    gameList={awayOBJAll_list.over_2_5}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.over_3_5 / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 3.5 goals"}
                    gameList={awayOBJAll_list.over_3_5}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.over_4_5 / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 4.5 goals"}
                    gameList={awayOBJAll_list.over_4_5}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.over_5_5 / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 5.5 goals"}
                    gameList={awayOBJAll_list.over_5_5}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.under_1_5 / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Under 1.5 goals"}
                    gameList={awayOBJAll_list.under_1_5}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.under_2_5 / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Under 2.5 goals"}
                    gameList={awayOBJAll_list.under_2_5}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />
            </ul>

            contentOUHTFT = <ul>
                <StatsLine
                    br={(awayOBJAll.over_0_5_HT / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 0.5 goals first half"}
                    gameList={awayOBJAll_list.over_0_5_HT}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />
                <StatsLine
                    br={(awayOBJAll.over_1_5_HT / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 1.5 goals first half"}
                    gameList={awayOBJAll_list.over_1_5_HT}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />
                <StatsLine
                    br={(awayOBJAll.over_2_5_HT / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 2.5 goals first half"}
                    gameList={awayOBJAll_list.over_2_5_HT}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.over_0_5_SH / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 0.5 goals second half"}
                    gameList={awayOBJAll_list.over_0_5_SH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />
                <StatsLine
                    br={(awayOBJAll.over_1_5_SH / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 1.5 goals second half"}
                    gameList={awayOBJAll_list.over_1_5_SH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />
                <StatsLine
                    br={(awayOBJAll.over_2_5_SH / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 2.5 goals second half"}
                    gameList={awayOBJAll_list.over_2_5_SH}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

            </ul>

            contentHTFT = <ul>
                <StatsLine
                    br={(awayOBJAll.home_home / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Win HT - Win FT"}
                    gameList={awayOBJAll_list.home_home}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.home_draw / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Win HT - Draw FT"}
                    gameList={awayOBJAll_list.home_draw}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.home_away / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Win HT - Lose FT"}
                    gameList={awayOBJAll_list.home_away}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.draw_home / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw HT - Win FT"}
                    gameList={awayOBJAll_list.draw_home}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.draw_draw / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw HT - Draw FT"}
                    gameList={awayOBJAll_list.draw_draw}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.draw_away / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw HT - Lose FT"}
                    gameList={awayOBJAll_list.draw_away}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(awayOBJAll.away_home / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Lose HT - Win FT"}
                    gameList={awayOBJAll_list.away_home}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />
                <StatsLine
                    br={(awayOBJAll.away_draw / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Lose HT - Draw FT"}
                    gameList={awayOBJAll_list.away_draw}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />
                <StatsLine
                    br={(awayOBJAll.away_away / awayOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Lose HT - Lose FT"}
                    gameList={awayOBJAll_list.away_away}
                    setList={true}
                    teamName={props.teamName}
                    homeAll="A"
                />
            </ul>;

        }


        return (
            <div className={classes.SingleStatsContainer}>
                <Title name="Statistics" />
                <div id="awayButtons" className={classes.overallButtons}>
                    <OverallButton o={state.single} click={setSingle} name="Away" />
                    <OverallButton o={state.all} click={setAll} name="All" />
                </div>
                <div className={classes.gamesCount}>Number of games: <span style={{ fontSize: "17px", fontWeight: "600" }}>{gamesCountVar} </span> </div>
                <div className={classes.SingleStats}>
                    <Title name="Overall" />
                    {contentOverall}
                </div>

                <div className={classes.SingleStats}>
                    <Title name="Win/Draw/Lose & Over Goals" />
                    {contentWinOver}
                </div>

                <div className={classes.SingleStats}>
                    <Title name="Over/Under" />
                    {contentOU}
                </div>

                <div className={classes.SingleStats}>
                    <Title name="Over/Under FH-SH" />
                    {contentOUHTFT}
                </div>

                <div className={classes.SingleStats}>
                    <Title name="First Half (FH) / Second Half (SH)" />
                    {contentHT}
                </div>

                <div className={classes.SingleStats}>
                    <Title name="Half-Time/Full-Time" />
                    {contentHTFT}
                </div>

                <div className={classes.SingleStats}>
                    <Title name="Both Teams To Score" />
                    {contentBTTS}
                </div>

            </div>
        );
}

export default SingleStats;