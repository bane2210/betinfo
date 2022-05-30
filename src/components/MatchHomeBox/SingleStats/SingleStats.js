import React, { Component } from 'react';
import classes from './SingleStats.module.css';
import Title from '../TittleTemplateBox/TittleTemplateBox';
import OverallButton from '../OverallButton/OverallButton';
import StatsLine from '../StatsLine/StatsLine';

class SingleStats extends Component {

    state = {
        all: false,
        single: true
    }

    setAll = () => {
        this.setState({
            all: true,
            single: false
        });
    }

    setSingle = () => {
        this.setState({
            all: false,
            single: true
        });
    }

    render() {


        const homeOBJHome = this.props.homeOBJHome;
        const homeOBJAll = this.props.homeOBJAll;

        const homeOBJHome_list = this.props.homeOBJHome_list;
        const homeOBJAll_list = this.props.homeOBJAll_list;


        let contentOverall;
        let contentWinOver;
        let contentBTTS;
        let contentHT;
        let contentOU;
        let contentOUHTFT;
        let contentHTFT;

        let gamesCountVar;


        if (this.state.single) {

            gamesCountVar = homeOBJHome.gamesCount;

            contentOverall = <ul>
                <StatsLine
                    br={(homeOBJHome.gspm / homeOBJHome.gamesCount).toFixed(2)}
                    txt={"Goals scored per game"}
                    gameList={[]}
                    setList={false}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.gcpm / homeOBJHome.gamesCount).toFixed(2)}
                    txt={"Goals conceded per game"}
                    gameList={[]}
                    setList={false}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.win / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Win"}
                    gameList={homeOBJHome_list.win}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.draw / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Draw"}
                    gameList={homeOBJHome_list.draw}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.lose / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Lose"}
                    gameList={homeOBJHome_list.lose}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.cleanS / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Clean sheets"}
                    gameList={homeOBJHome_list.cleanS}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.soem / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Team scored over 0.5 goals"}
                    gameList={homeOBJHome_list.soem}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.stgoem / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Team scored over 1.5 goals"}
                    gameList={homeOBJHome_list.stgoem}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"

                />

            </ul>;


            contentWinOver = <ul>
                <StatsLine
                    br={(homeOBJHome.win2 / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Win and over 1.5 goals"}
                    gameList={homeOBJHome_list.win2}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.draw2 / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Draw and over 1.5 goals"}
                    gameList={homeOBJHome_list.draw2}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.lose2 / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Lose and over 1.5 goals"}
                    gameList={homeOBJHome_list.lose2}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.win3 / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Win and over 2.5 goals"}
                    gameList={homeOBJHome_list.win3}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.draw3 / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Draw and over 2.5 goals"}
                    gameList={homeOBJHome_list.draw3}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.lose3 / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Lose and over 2.5 goals"}
                    gameList={homeOBJHome_list.lose3}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

            </ul>;

            contentBTTS = <ul>
                <StatsLine
                    br={(homeOBJHome.bts / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Both teams to score (BTTS)"}
                    gameList={homeOBJHome_list.bts}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.btsFH / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"BTTS in the first half"}
                    gameList={homeOBJHome_list.btsFH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.BTTS_SH / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"BTTS in the second half"}
                    gameList={homeOBJHome_list.BTTS_SH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.btts3 / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"BTTS and over 2.5 goals"}
                    gameList={homeOBJHome_list.btts3}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.win_BTTS / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Team won and BTTS"}
                    gameList={homeOBJHome_list.win_BTTS}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.draw_BTTS / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Draw and BTTS"}
                    gameList={homeOBJHome_list.draw_BTTS}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.lose_BTTS / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Team lost and BTTS"}
                    gameList={homeOBJHome_list.lose_BTTS}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />
            </ul>;

            contentHT = <ul>
                <StatsLine
                    br={(homeOBJHome.leadHT / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Team won first half"}
                    gameList={homeOBJHome_list.leadHT}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.loseHT / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Team lost first half"}
                    gameList={homeOBJHome_list.loseHT}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.drawHT / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Draw at half-time"}
                    gameList={homeOBJHome_list.drawHT}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.sinFH / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Team Scored over 0.5 in FH"}
                    gameList={homeOBJHome_list.sinFH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.sinSH / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Team Scored over 0.5 in SH"}
                    gameList={homeOBJHome_list.sinSH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.sibh / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Team Scored in both halves"}
                    gameList={homeOBJHome_list.sibh}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.gibh / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Goal in both halves"}
                    gameList={homeOBJHome_list.gibh}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.more_FH / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"More goals in the first half"}
                    gameList={homeOBJHome_list.more_FH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.more_SH / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"More goals in the second half"}
                    gameList={homeOBJHome_list.more_SH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />
            </ul>;

            contentOU = <ul>
                <StatsLine
                    br={(homeOBJHome.over_1_5 / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Over 1.5 goals"}
                    gameList={homeOBJHome_list.over_1_5}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.over_2_5 / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Over 2.5 goals"}
                    gameList={homeOBJHome_list.over_2_5}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.over_3_5 / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Over 3.5 goals"}
                    gameList={homeOBJHome_list.over_3_5}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.over_4_5 / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Over 4.5 goals"}
                    gameList={homeOBJHome_list.over_4_5}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.over_5_5 / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Over 5.5 goals"}
                    gameList={homeOBJHome_list.over_5_5}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.under_1_5 / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Under 1.5 goals"}
                    gameList={homeOBJHome_list.under_1_5}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.under_2_5 / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Under 2.5 goals"}
                    gameList={homeOBJHome_list.under_2_5}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />
            </ul>;

            contentOUHTFT = <ul>

                <StatsLine
                    br={(homeOBJHome.over_0_5_HT / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Over 0.5 goals first half"}
                    gameList={homeOBJHome_list.over_0_5_HT}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />
                <StatsLine
                    br={(homeOBJHome.over_1_5_HT / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Over 1.5 goals first half"}
                    gameList={homeOBJHome_list.over_1_5_HT}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />
                <StatsLine
                    br={(homeOBJHome.over_2_5_HT / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Over 2.5 goals first half"}
                    gameList={homeOBJHome_list.over_2_5_HT}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.over_0_5_SH / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Over 0.5 goals second half"}
                    gameList={homeOBJHome_list.over_0_5_SH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />
                <StatsLine
                    br={(homeOBJHome.over_1_5_SH / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Over 1.5 goals second half"}
                    gameList={homeOBJHome_list.over_1_5_SH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />
                <StatsLine
                    br={(homeOBJHome.over_2_5_SH / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Over 2.5 goals second half"}
                    gameList={homeOBJHome_list.over_2_5_SH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />



            </ul>;

            contentHTFT = <ul>
                <StatsLine
                    br={(homeOBJHome.home_home / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Win HT - Win FT"}
                    gameList={homeOBJHome_list.home_home}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.home_draw / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Win HT - Draw FT"}
                    gameList={homeOBJHome_list.home_draw}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.home_away / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Win HT - Lose FT"}
                    gameList={homeOBJHome_list.home_away}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.draw_home / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Draw HT - Win FT"}
                    gameList={homeOBJHome_list.draw_home}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.draw_draw / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Draw HT - Draw FT"}
                    gameList={homeOBJHome_list.draw_draw}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.draw_away / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Draw HT - Lose FT"}
                    gameList={homeOBJHome_list.draw_away}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />

                <StatsLine
                    br={(homeOBJHome.away_home / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Lose HT - Win FT"}
                    gameList={homeOBJHome_list.away_home}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />
                <StatsLine
                    br={(homeOBJHome.away_draw / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Lose HT - Draw FT"}
                    gameList={homeOBJHome_list.away_draw}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />
                <StatsLine
                    br={(homeOBJHome.away_away / homeOBJHome.gamesCount * 100).toFixed(0)}
                    txt={"Lose HT - Lose FT"}
                    gameList={homeOBJHome_list.away_away}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="H"
                />
            </ul>;

        }

        else if (this.state.all) {

            gamesCountVar = homeOBJAll.gamesCount;

            contentOverall = <ul>
                <StatsLine
                    br={(homeOBJAll.gspm / homeOBJAll.gamesCount).toFixed(2)}
                    txt={"Goals scored per game"}
                    gameList={[]}
                    setList={false}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.gcpm / homeOBJAll.gamesCount).toFixed(2)}
                    txt={"Goals conceded per game"}
                    gameList={[]}
                    setList={false}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.win / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Win"}
                    gameList={homeOBJAll_list.win}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.draw / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw"}
                    gameList={homeOBJAll_list.draw}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.lose / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Lose"}
                    gameList={homeOBJAll_list.lose}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"

                />

                <StatsLine
                    br={(homeOBJAll.cleanS / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Clean sheets"}
                    gameList={homeOBJAll_list.cleanS}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.soem / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team scored over 0.5 goals"}
                    gameList={homeOBJAll_list.soem}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.stgoem / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team scored over 1.5 goals"}
                    gameList={homeOBJAll_list.stgoem}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"

                />
            </ul>;

            contentWinOver = <ul>
                <StatsLine
                    br={(homeOBJAll.win2 / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Win and over 1.5 goals"}
                    gameList={homeOBJAll_list.win2}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />



                <StatsLine
                    br={(homeOBJAll.draw2 / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw and over 1.5 goals"}
                    gameList={homeOBJAll_list.draw2}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.lose2 / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Lose and over 1.5 goals"}
                    gameList={homeOBJAll_list.lose2}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"

                />

                <StatsLine
                    br={(homeOBJAll.win3 / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Win and over 2.5 goals"}
                    gameList={homeOBJAll_list.win3}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.draw3 / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw and over 2.5 goals"}
                    gameList={homeOBJAll_list.draw3}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.lose3 / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Lose and over 2.5 goals"}
                    gameList={homeOBJAll_list.lose3}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"

                />
            </ul>;

            contentBTTS = <ul>
                <StatsLine
                    br={(homeOBJAll.bts / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Both teams to score (BTTS)"}
                    gameList={homeOBJAll_list.bts}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.btsFH / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"BTTS in the first half"}
                    gameList={homeOBJAll_list.btsFH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.BTTS_SH / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"BTTS in the second half"}
                    gameList={homeOBJAll_list.BTTS_SH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.btts3 / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"BTTS and over 2.5 goals"}
                    gameList={homeOBJAll_list.btts3}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.win_BTTS / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team won and BTTS"}
                    gameList={homeOBJAll_list.win_BTTS}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.draw_BTTS / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw and BTTS"}
                    gameList={homeOBJAll_list.draw_BTTS}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.lose_BTTS / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team lost and BTTS"}
                    gameList={homeOBJAll_list.lose_BTTS}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />
            </ul>;

            contentHT = <ul>
                <StatsLine
                    br={(homeOBJAll.leadHT / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team won first half"}
                    gameList={homeOBJAll_list.leadHT}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.loseHT / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team lost first half"}
                    gameList={homeOBJAll_list.loseHT}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.drawHT / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw at half-time"}
                    gameList={homeOBJAll_list.drawHT}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.sinFH / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team Scored over 0.5 in FH"}
                    gameList={homeOBJAll_list.sinFH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.sinSH / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team Scored over 0.5 in SH"}
                    gameList={homeOBJAll_list.sinSH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.sibh / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Team Scored in both halves"}
                    gameList={homeOBJAll_list.sibh}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.gibh / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Goal in both halves"}
                    gameList={homeOBJAll_list.gibh}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.more_FH / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"More goals in the first half"}
                    gameList={homeOBJAll_list.more_FH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.more_SH / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"More goals in the second half"}
                    gameList={homeOBJAll_list.more_SH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />
            </ul>;

            contentOU = <ul>
                <StatsLine
                    br={(homeOBJAll.over_1_5 / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 1.5 goals"}
                    gameList={homeOBJAll_list.over_1_5}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.over_2_5 / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 2.5 goals"}
                    gameList={homeOBJAll_list.over_2_5}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.over_3_5 / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 3.5 goals"}
                    gameList={homeOBJAll_list.over_3_5}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.over_4_5 / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 4.5 goals"}
                    gameList={homeOBJAll_list.over_4_5}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.over_5_5 / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 5.5 goals"}
                    gameList={homeOBJAll_list.over_5_5}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.under_1_5 / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Under 1.5 goals"}
                    gameList={homeOBJAll_list.under_1_5}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.under_2_5 / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Under 2.5 goals"}
                    gameList={homeOBJAll_list.under_2_5}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />
            </ul>

            contentOUHTFT = <ul>
                <StatsLine
                    br={(homeOBJAll.over_0_5_HT / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 0.5 goals first half"}
                    gameList={homeOBJAll_list.over_0_5_HT}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />
                <StatsLine
                    br={(homeOBJAll.over_1_5_HT / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 1.5 goals first half"}
                    gameList={homeOBJAll_list.over_1_5_HT}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />
                <StatsLine
                    br={(homeOBJAll.over_2_5_HT / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 2.5 goals first half"}
                    gameList={homeOBJAll_list.over_2_5_HT}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.over_0_5_SH / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 0.5 goals second half"}
                    gameList={homeOBJAll_list.over_0_5_SH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />
                <StatsLine
                    br={(homeOBJAll.over_1_5_SH / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 1.5 goals second half"}
                    gameList={homeOBJAll_list.over_1_5_SH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />
                <StatsLine
                    br={(homeOBJAll.over_2_5_SH / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Over 2.5 goals second half"}
                    gameList={homeOBJAll_list.over_2_5_SH}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

            </ul>

            contentHTFT = <ul>
                <StatsLine
                    br={(homeOBJAll.home_home / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Win HT - Win FT"}
                    gameList={homeOBJAll_list.home_home}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.home_draw / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Win HT - Draw FT"}
                    gameList={homeOBJAll_list.home_draw}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.home_away / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Win HT - Lose FT"}
                    gameList={homeOBJAll_list.home_away}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.draw_home / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw HT - Win FT"}
                    gameList={homeOBJAll_list.draw_home}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.draw_draw / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw HT - Draw FT"}
                    gameList={homeOBJAll_list.draw_draw}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.draw_away / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Draw HT - Lose FT"}
                    gameList={homeOBJAll_list.draw_away}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />

                <StatsLine
                    br={(homeOBJAll.away_home / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Lose HT - Win FT"}
                    gameList={homeOBJAll_list.away_home}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />
                <StatsLine
                    br={(homeOBJAll.away_draw / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Lose HT - Draw FT"}
                    gameList={homeOBJAll_list.away_draw}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />
                <StatsLine
                    br={(homeOBJAll.away_away / homeOBJAll.gamesCount * 100).toFixed(0)}
                    txt={"Lose HT - Lose FT"}
                    gameList={homeOBJAll_list.away_away}
                    setList={true}
                    teamName={this.props.teamName}
                    homeAll="A"
                />
            </ul>;

        }


        return (
            <div className={classes.SingleStatsContainer}>
                <Title name="Statistics" />
                <div id="homeButtons" className={classes.overallButtons}>
                    <OverallButton o={this.state.single} click={this.setSingle} name="Home" />
                    <OverallButton o={this.state.all} click={this.setAll} name="All" />
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
}

export default SingleStats;