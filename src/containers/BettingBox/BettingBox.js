import React, { Component } from 'react';
import classes from './BettingBox.module.css';
import Axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import Tips from './tips/tips';
import TipsSingle from './tipsSingle/tipsSingle';
import GenerateTicket from './GenerateTicket/GenerateTicket';


class BettingBox extends Component {

    state = {
        tips: "Top Tips",
        prevDate: "",
        content: [],
        arrFilterFree: [],
        competitionsTicket: []
    }


    componentDidMount() {

        const url = "/api_stats/loadAllTips.php?date=%27" + this.props.date + "%27";

        Axios.get(url)
            .then(response => {

                let tempObj = [];
                let arrFilterFree = [];

                let competitionsTicket = [];
                let uniqueNames = [];

                response.data.forEach(element => {

                    tempObj = [];

                    element.content.forEach(elementContent => {

                        if (uniqueNames.indexOf(elementContent.country + " " + elementContent.competition) === -1) {
                            competitionsTicket.push({ name: elementContent.country + " " + elementContent.competition, value: 1 });
                            uniqueNames.push(elementContent.country + " " + elementContent.competition);
                        }

                        tempObj.push({ colDate: elementContent.colDate, awayTeam: elementContent.awayTeam, chance: elementContent.chance, colTime: elementContent.colTime, competition: elementContent.competition, country: elementContent.country, explanation: elementContent.explanation, homeTeam: elementContent.homeTeam, result: elementContent.result, resultCount: elementContent.resultCount, tip: elementContent.tip });
                    });

                    arrFilterFree.push({ name: element.name, content: [...tempObj] });

                });

                competitionsTicket.sort((a, b) => (a.name > b.name) ? 1 : -1);


                this.setState({
                    content: response.data,
                    prevDate: this.props.date,
                    arrFilterFree: arrFilterFree,
                    competitionsTicket: competitionsTicket
                });

            });


    }

    componentDidUpdate() {

        const url = "/api_stats/loadAllTips.php?date=%27" + this.props.date + "%27";

        if (this.props.date !== this.state.prevDate) {

            Axios.get(url)
                .then(response => {

                    let tempObj = [];
                    let arrFilterFree = [];

                    let competitionsTicket = [];
                    let uniqueNames = [];

                    response.data.forEach(element => {

                        tempObj = [];

                        element.content.forEach(elementContent => {

                            if (uniqueNames.indexOf(elementContent.country + " " + elementContent.competition) === -1) {
                                competitionsTicket.push({ name: elementContent.country + " " + elementContent.competition, value: 1 });
                                uniqueNames.push(elementContent.country + " " + elementContent.competition);
                            }

                            tempObj.push({ colDate: elementContent.colDate, awayTeam: elementContent.awayTeam, chance: elementContent.chance, colTime: elementContent.colTime, competition: elementContent.competition, country: elementContent.country, explanation: elementContent.explanation, homeTeam: elementContent.homeTeam, result: elementContent.result, resultCount: elementContent.resultCount, tip: elementContent.tip });
                        });

                        arrFilterFree.push({ name: element.name, content: [...tempObj] });

                    });

                    competitionsTicket.sort((a, b) => (a.name > b.name) ? 1 : -1);

                    this.setState({
                        content: response.data,
                        prevDate: this.props.date,
                        arrFilterFree: arrFilterFree,
                        competitionsTicket: competitionsTicket
                    });
                });
        }


    }



    setTips = (name) => {
        this.setState({
            tips: name
        });
    }

    gamesNumber = (arr, allGames) => {

        let br = 0;

        allGames.forEach((element, index) => {

            arr.forEach(el => {
                if (el === element.name) {
                    br += element.content.length;
                }
            });

        });

        return br;
    }

    render() {

        let content = <Spinner />;

        let arrTips = [];
        let arrNames = [];
        let arr = this.state.content;
        let win_draw_br = 0;
        let over_under_br = 0;
        let btts_br = 0;
        let goals_br = 0;
        let ht_ft_br = 0;
        let top_br = 0;


        let genTicketObject = { arrFilterFree: this.state.arrFilterFree, competitionsTicket: this.state.competitionsTicket }

        let todayDay;

        let clickedDate = 0;
        let today = new Date().getDate();



        if (this.state.prevDate !== "") {
            const sp = this.state.prevDate.split("-");
            todayDay = parseInt(sp[2]);
            clickedDate = todayDay;
        } else {
            todayDay = new Date().getDate();
        }

        let currentDay = null;
        let dateOld = null;
        //        let arrayExp;
        //        let tipsGroup = ["a_win", "a_draw", "a_draw", "a_win3", "a_leadHT", "a_drawHT", "a_over_2_5", "a_under_1_5", "a_under_2_5", "a_over_1_5_HT", "a_over_1_5_SH", "a_btts", "a_btts3", "a_bttsSH", "a_win_BTTS", "a_stgoem", "a_sinFH", "a_sinSH", "a_goalBH", "a_more_SH", "a_win_win", "a_draw_draw"];


        const filterDays = (element) => {

            dateOld = element.colDate + "T" + element.colTime;
            currentDay = new Date(dateOld);
            return currentDay.getDate() === todayDay;
        }


        let tempZvezd = [];

        let homeS = 0;
        let homeSerTxt = "";
        let awayS = 0;
        let awaySerTxt = "";
        let homeSAll = 0;
        let homeSerAllTxt = "";
        let awaySAll = 0;
        let awaySerAllTxt = "";

        let tempBr = 0;

        arr.forEach(element => {

            element.content = element.content.filter(filterDays);
            // element.content = element.content.filter(filterGames);
        });


        arr.forEach(element => {

            //            arrFilter = [];

            element.content.forEach((game, index) => {

                homeS = 0;
                homeSerTxt = "";
                awayS = 0;
                awaySerTxt = "";
                homeSAll = 0;
                homeSerAllTxt = "";
                awaySAll = 0;
                awaySerAllTxt = "";
                tempBr = 0;

                // tempObj.push({ colDate: elementContent.colDate, awayTeam: elementContent.awayTeam, chance: elementContent.chance, colTime: elementContent.colTime, 
                // competition: elementContent.competition, country: elementContent.country, explanation: elementContent.explanation, homeTeam: elementContent.homeTeam, 
                // result: elementContent.result, resultCount: elementContent.resultCount, tip: elementContent.tip });

                if (game.explanation.includes("the last")) {
                    tempZvezd = game.explanation.split("****");

                    tempZvezd.forEach(el => {

                        if (el.includes("the last")) {
                            tempBr = el.split("the last ")[1].substring(0, 2).trim();


                            if (el.includes(game.homeTeam)) {

                                if (el.includes("home games")) {
                                    homeS = tempBr;
                                    homeSerTxt = el;
                                } else {
                                    homeSAll = tempBr;
                                    homeSerAllTxt = el;
                                }

                            } else {
                                if (el.includes(game.awayTeam)) {

                                    if (el.includes("away games")) {
                                        awayS = tempBr;
                                        awaySerTxt = el;
                                    } else {
                                        awaySAll = tempBr;
                                        awaySerAllTxt = el;
                                    }

                                }
                            }

                        }
                    });


                    /*  if (temp.length < 2) {
                          arrFilter.push(index);
                      }
                      */
                }

                game["series"] = {
                    homeS: homeS, homeSerTxt: homeSerTxt, awayS: awayS, awaySerTxt: awaySerTxt, homeSAll: homeSAll,
                    homeSerAllTxt: homeSerAllTxt, awaySAll: awaySAll, awaySerAllTxt: awaySerAllTxt, h_a_total: parseInt(homeS) + parseInt(awayS), h_a_total_all: (parseInt(homeS) + parseInt(homeSAll) + parseInt(awayS) + parseInt(awaySAll))};


            });


            /*            if (arrFilter.length > 0) {
                            arrFilter.forEach(game => {
                                element.content.splice(game, 1);
                            });
                        }
            
                        */

        });









        arrTips = ["a_win", "a_draw", "a_win2", "a_draw2", "a_win3", "a_draw3", "a_leadHT", "a_drawHT"];
        win_draw_br = this.gamesNumber(arrTips, arr);

        arrTips = ["a_over_1_5", "a_over_2_5", "a_over_3_5", "a_over_4_5", "a_over_5_5", "a_under_1_5", "a_under_2_5", "a_over_0_5_HT", "a_over_1_5_HT", "a_over_2_5_HT", "a_over_0_5_SH", "a_over_1_5_SH", "a_over_2_5_SH"];
        over_under_br = this.gamesNumber(arrTips, arr);

        arrTips = ["a_btts", "a_btts3", "a_bttsFH", "a_bttsSH", "a_win_BTTS"];
        btts_br = this.gamesNumber(arrTips, arr);

        arrTips = ["a_stgoem", "a_sinFH", "a_sinSH", "a_sinBH", "a_goalBH", "a_more_FH", "a_more_SH"];
        goals_br = this.gamesNumber(arrTips, arr);

        arrTips = ["a_win_win", "a_win_draw", "a_draw_win", "a_draw_draw", "a_win_lose"];
        ht_ft_br = this.gamesNumber(arrTips, arr);



        arr.forEach((element, index) => {
            element.content.forEach(el => {
                if (parseInt(el.chance) >= 80) {
                    top_br++;
                }
            });

        });




        if (this.state.tips === "Win/Draw") {
            arrTips = ["a_win", "a_draw", "a_win2", "a_draw2", "a_win3", "a_draw3", "a_leadHT", "a_drawHT"];
            arrNames = ["Win", "Draw", "Win & 1.5+", "Draw & 1.5+", "Win & 2.5+", "Draw & 2.5+", "Win HT", "Draw HT"];

        }


        if (this.state.tips === "Over/Under") {
            arrTips = ["a_over_1_5", "a_over_2_5", "a_over_3_5", "a_over_4_5", "a_over_5_5", "a_under_1_5", "a_under_2_5", "a_over_0_5_HT", "a_over_1_5_HT", "a_over_2_5_HT", "a_over_0_5_SH", "a_over_1_5_SH", "a_over_2_5_SH"];
            arrNames = ["over 1.5", "over 2.5", "over 3.5", "over 4.5", "over 5.5", "under 1.5", "under 2.5", "over 0.5 HT", "over 1.5 HT", "over 2.5 HT", "over 0.5 SH", "over 1.5 SH", "over 2.5 SH"];

        }

        if (this.state.tips === "BTTS") {
            arrTips = ["a_btts", "a_btts3", "a_bttsFH", "a_bttsSH", "a_win_BTTS"];
            arrNames = ["Btts", "Btts & 2.5+", "Btts FH", "Btts SH", "Win & Btts"];
        }

        if (this.state.tips === "Goals") {
            arrTips = ["a_stgoem", "a_sinFH", "a_sinSH", "a_sinBH", "a_goalBH", "a_more_FH", "a_more_SH"];
            arrNames = ["Scored Twice", "Scored FH", "Scored SH", "Scored BH", "Goal BH", "More FH", "More SH"];
        }

        if (this.state.tips === "HT/FT") {
            arrTips = ["a_win_win", "a_win_draw", "a_draw_win", "a_draw_draw", "a_win_lose"];
            arrNames = ["Win-Win", "Win-Draw", "Draw-Win", "Draw-Draw", "Win-Lose"];
        }

        let isTop = false;

        if (this.state.tips === "Top Tips") {
            isTop = true;
        }



        /* let bane = arrTipsStrong.map((element, index) => {
            return <Game key={index} element={element.game} index={index} />
        })
        */


        if (this.state.content !== null) {
            content = <div className={classes.TipsBox}>
                <Tips gamesCount={top_br} current={this.state.tips} name="Top Tips" click={() => this.setTips("Top Tips")} />
                <Tips gamesCount={win_draw_br} current={this.state.tips} name="Win/Draw" click={() => this.setTips("Win/Draw")} />
                <Tips gamesCount={over_under_br} current={this.state.tips} name="Over/Under" click={() => this.setTips("Over/Under")} />
                <Tips gamesCount={btts_br} current={this.state.tips} name="BTTS" click={() => this.setTips("BTTS")} />
                <Tips gamesCount={goals_br} current={this.state.tips} name="Goals" click={() => this.setTips("Goals")} />
                <Tips gamesCount={ht_ft_br} current={this.state.tips} name="HT/FT" click={() => this.setTips("HT/FT")} />
            </div>
        }


        const borderArray = [{ name: "a_win", br: 65 }, { name: "a_draw", br: 45 }, { name: "a_win2", br: 60 }, { name: "a_draw2", br: 40 }, { name: "a_win3", br: 60 }, { name: "a_draw3", br: 30 }, { name: "a_leadHT", br: 58 }, { name: "a_drawHT", br: 60 }, { name: "a_over_1_5", br: 85 }, { name: "a_over_2_5", br: 70 }, { name: "a_over_3_5", br: 55 }, { name: "a_over_4_5", br: 45 }, { name: "a_over_5_5", br: 40 }, { name: "a_under_1_5", br: 60 }, { name: "a_under_2_5", br: 65 }, { name: "a_over_0_5_HT", br: 82 }, { name: "a_over_1_5_HT", br: 60 }, { name: "a_over_2_5_HT", br: 50 }, { name: "a_over_0_5_SH", br: 82 }, { name: "a_over_1_5_SH", br: 65 }, { name: "a_over_2_5_SH", br: 50 }, { name: "a_btts", br: 68 }, { name: "a_btts3", br: 65 }, { name: "a_bttsFH", br: 48 }, { name: "a_bttsSH", br: 55 }, { name: "a_win_BTTS", br: 60 }, { name: "a_stgoem", br: 70 }, { name: "a_sinFH", br: 70 }, { name: "a_sinSH", br: 75 }, { name: "a_sinBH", br: 55 }, { name: "a_goalBH", br: 70 }, { name: "a_more_FH", br: 55 }, { name: "a_more_SH", br: 65 }, { name: "a_win_win", br: 58 }, { name: "a_win_draw", br: 20 }, { name: "a_draw_win", br: 45 }, { name: "a_draw_draw", br: 35 }, { name: "a_lose_win", br: 20 }];


        // <OurTips arrGamesStrong={arrTipsStrong} arrTipsHigherOdds={arrTipsHigherOdds}  arrGamesAll={arrTipsAll} arrGamesSpecial={arrTipsSpecial} />


        return (
            <div className={classes.BettingBox} id="bettingBox">


                <div className={classes.AllTips}>
                    <div className={classes.WeRecomend}>
                        All tips
                </div>
                    {content}
                    <TipsSingle isTop={isTop} borderArray={borderArray} date={this.state.prevDate} sqlContent={arr} arrTips={arrTips} arrNames={arrNames} />
                </div>

                {today === clickedDate ? <GenerateTicket genTicketObject={genTicketObject} /> : ""}


            </div>
        );
    }


}

export default BettingBox;