import React, { Component } from 'react';
import classes from './GenerateTicket.module.css';

import OddsTimeCompMarket from './GenOdds/GenOdds';
import SettingsTicket from './SettingsTicket/SettingsTicket';

import Game from '../tipsSingle/tipSingle/singleGame/singleGame';

import ReactGA from 'react-ga';


class GenerateTicket extends Component {

    state = {
        settings: 0,
        odds: "",
        time: "12",
        competition: [],
        market: [{ group: "Win/Draw", name: "a_win", description: "Win Full-Time", value: 1 }, { group: "Win/Draw", name: "a_draw", description: "Draw Full-Time", value: 1 }, { group: "Win/Draw", name: "a_win2", description: "Win And Over 1.5", value: 1 }, { group: "Win/Draw", name: "a_draw2", description: "Draw And Over 1.5", value: 0 }, { group: "Win/Draw", name: "a_win3", description: "Win And Over 2.5", value: 1 }, { group: "Win/Draw", name: "a_draw3", description: "Draw And Over 2.5", value: 0 }, { group: "Win/Draw", name: "a_leadHT", description: "Win Half-Time", value: 1 }, { group: "Win/Draw", name: "a_drawHT", description: "Draw Half-Time", value: 1 }, { group: "Over/Under", name: "a_over_1_5", description: "Over 1.5 Goals", value: 1 }, { group: "Over/Under", name: "a_over_2_5", description: "Over 2.5 Goals", value: 1 }, { group: "Over/Under", name: "a_over_3_5", description: "Over 3.5 Goals", value: 1 }, { group: "Over/Under", name: "a_over_4_5", description: "Over 4.5 Goals", value: 0 }, { group: "Over/Under", name: "a_over_5_5", description: "Over 5.5 Goals", value: 0 }, { group: "Over/Under", name: "a_under_1_5", description: "Under 1.5 Goals", value: 1 }, { group: "Over/Under", name: "a_under_2_5", description: "Under 2.5 Goals", value: 1 }, { group: "Over/Under", name: "a_over_0_5_HT", description: "Over 0.5 Goals First Half", value: 1 }, { group: "Over/Under", name: "a_over_1_5_HT", description: "Over 1.5 Goals First Half", value: 1 }, { group: "Over/Under", name: "a_over_2_5_HT", description: "Over 2.5 Goals First Half", value: 0 }, { group: "Over/Under", name: "a_over_0_5_SH", description: "Over 0.5 Goals Second Half", value: 1 }, { group: "Over/Under", name: "a_over_1_5_SH", description: "Over 1.5 Goals Second Half", value: 1 }, { group: "Over/Under", name: "a_over_2_5_SH", description: "Over 2.5 Goals Second Half", value: 1 }, { group: "Both Teams To Score", name: "a_btts", description: "BTTS", value: 1 }, { group: "Both Teams To Score", name: "a_btts3", description: "BTTS And Over 2.5 Goals", value: 1 }, { group: "Both Teams To Score", name: "a_bttsFH", description: "BTTS First Half", value: 0 }, { group: "Both Teams To Score", name: "a_bttsSH", description: "BTTS Second Half", value: 1 }, { group: "Both Teams To Score", name: "a_win_BTTS", description: "Win and BTTS", value: 1 }, { group: "Goals", name: "a_stgoem", description: "Team Over 1.5", value: 1 }, { group: "Goals", name: "a_sinFH", description: "Team To Score FH", value: 1 }, { group: "Goals", name: "a_sinSH", description: "Team To Score SH", value: 1 }, { group: "Goals", name: "a_sinBH", description: "Team To Score Both Halves", value: 1 }, { group: "Goals", name: "a_goalBH", description: "Goal In Both Halves", value: 1 }, { group: "Goals", name: "a_more_FH", description: "More Goals First Half", value: 1 }, { group: "Goals", name: "a_more_SH", description: "More Goals Second Half", value: 1 }, { group: "Half Time/Full Time", name: "a_win_win", description: "Win Half-Time and Full-Time", value: 1 }, { group: "Half Time/Full Time", name: "a_draw_draw", description: "Draw Half-Time and Full-Time", value: 0 }],
        error: "",
        ticket: "-1"
    }


    generateTicketFun = () => {


        let borderMin = 0;
        let borderMax = 0;
        const odd = parseFloat(this.state.odds);

        if (odd <= 1.7) {
            borderMin = 0;
            borderMax = 1.4;
        } else if (odd <= 2.5) {
            borderMin = 0;
            borderMax = 1.6;
        } else if (odd <= 7) {
            borderMin = 1.3;
            borderMax = 2;
        } else if (odd <= 30) {
            borderMin = 1.48;
            borderMax = 3.0;
        } else if (odd <= 60) {
            borderMin = 1.6;
            borderMax = 4;
        } else if (odd <= 100) {
            borderMin = 1.7;
            borderMax = 8;
        }


        const arr = this.props.genTicketObject.arrFilterFree;
        let marketValues = [];
        let competitionsValues = [];
        let games = [];
        const odds = [{ name: "a_win", value: 1.2 }, { name: "a_draw", value: 3.1 }, { name: "a_win2", value: 1.25 }, { name: "a_draw2", value: 3.4 }, { name: "a_win3", value: 1.6 }, { name: "a_draw3", value: 4.2 }, { name: "a_leadHT", value: 1.6 }, { name: "a_drawHT", value: 1.9 }, { name: "a_over_1_5", value: 1.15 }, { name: "a_over_2_5", value: 1.5 }, { name: "a_over_3_5", value: 1.9 }, { name: "a_over_4_5", value: 2.2 }, { name: "a_over_5_5", value: 3 }, { name: "a_under_1_5", value: 2.2 }, { name: "a_under_2_5", value: 1.6 }, { name: "a_over_0_5_HT", value: 1.20 }, { name: "a_over_1_5_HT", value: 1.8 }, { name: "a_over_2_5_HT", value: 3.6 }, { name: "a_over_0_5_SH", value: 1.10 }, { name: "a_over_1_5_SH", value: 1.5 }, { name: "a_over_2_5_SH", value: 2.5 }, { name: "a_btts", value: 1.5 }, { name: "a_btts3", value: 1.65 }, { name: "a_bttsFH", value: 2.3 }, { name: "a_bttsSH", value: 2.1 }, { name: "a_win_BTTS", value: 1.9 }, { name: "a_stgoem", value: 1.3 }, { name: "a_sinFH", value: 1.50 }, { name: "a_sinSH", value: 1.35 }, { name: "a_sinBH", value: 1.8 }, { name: "a_goalBH", value: 1.4 }, { name: "a_more_FH", value: 2.2 }, { name: "a_more_SH", value: 1.9 }, { name: "a_win_win", value: 1.3 }, { name: "a_win_draw", value: 5 }, { name: "a_draw_win", value: 2 }, { name: "a_draw_draw", value: 3.5 }, { name: "a_lose_win", value: 20 }, { name: "a_lose_draw", value: 5 }];

        let currentTime = new Date();
        let choosenTime = new Date();
        let gameTime = null;
        let tempOdds = 0;

        choosenTime.setTime(currentTime.getTime() + (parseInt(this.state.time) * 60 * 60 * 1000));


        this.state.market.forEach(element => {
            if (element.value === 1) {
                marketValues.push(element.name);
            }
        });

        this.state.competition.forEach(element => {
            if (element.value === 1) {
                competitionsValues.push(element.name);
            }
        });

        arr.forEach(element => {

            // proveravamo da li je taj tip izbran za kladjenje
            if (marketValues.includes(element.name)) {

                // proveravamo utakmicu po utakmicu iz tog tipa
                element.content.forEach(game => {

                    // proveravamo da li je to takmicenje izabrano
                    if (competitionsValues.length === 0 || (competitionsValues.length > 0 && competitionsValues.includes(game.country + " " + game.competition))) {

                        // proveravamo da li vreme pocetka meca odgovara odabranom
                        gameTime = new Date(game.colDate + "T" + game.colTime);

                        if (gameTime > currentTime && gameTime < choosenTime) {

                            tempOdds = parseFloat(odds[odds.findIndex(odds => odds.name === element.name)].value);

                            if (tempOdds >= borderMin && tempOdds <= borderMax && game.result === "") {
                                games.push({ odds: tempOdds, colDate: game.colDate, awayTeam: game.awayTeam, chance: game.chance, colTime: game.colTime, competition: game.competition, country: game.country, explanation: game.explanation, homeTeam: game.homeTeam, result: game.result, resultCount: game.resultCount, tip: game.tip });
                            }
                        }
                    }
                });
            }
        });

        games.sort((a, b) => parseInt(a.chance) > parseInt(b.chance) ? -1 : 1);

        let uniqueNames = [];
        let ticketGames = [];
        tempOdds = 1;

        if (games.length > 3) {


            let randomBr = 0;



            let singleGame;

            while (tempOdds < odd && games.length > 0) {

                // Slucaj ako je kvota malo ispod zadate
                if (tempOdds > (odd / 1.3) && odd > 2) {

                    games.sort((a, b) => a.odds < b.odds ? -1 : 1);

                    console.log(tempOdds);
                    console.log(games);

                    if (games.length > 60) {
                        randomBr = Math.floor(Math.random() * 10);
                    } else {
                        randomBr = Math.floor(Math.random() * games.length);
                    }


                    singleGame = games[randomBr];

                    if (uniqueNames.indexOf(singleGame.country + " " + singleGame.competition) === -1) {

                        uniqueNames.push(singleGame.country + " " + singleGame.competition);
                        tempOdds = tempOdds * singleGame.odds;
                        ticketGames.push(games[randomBr]);
                        games.splice(randomBr, 1);

                    } else {
                        games.splice(randomBr, 1);
                    }


                } else {

                    if (games.length > 150) {
                        randomBr = Math.floor(Math.random() * 20);
                    } else {
                        randomBr = Math.floor(Math.random() * games.length);
                    }


                    singleGame = games[randomBr];

                    if (uniqueNames.indexOf(singleGame.country + " " + singleGame.competition) === -1) {

                        uniqueNames.push(singleGame.country + " " + singleGame.competition);
                        tempOdds = tempOdds * singleGame.odds;
                        ticketGames.push(games[randomBr]);
                        games.splice(randomBr, 1);

                    } else {
                        games.splice(randomBr, 1);
                    }
                }

            }


        }


        let contentGames = "0";

        if (tempOdds >= odd) {
            contentGames = ticketGames.map((element, index) => {
                return <Game key={index} element={element} index={index} />
            });
        }


        ReactGA.event({
            category: "Ticket",
            action: "Genereted",
            label: "Odd: " + odd +", Time: " + this.state.time,
          });



        this.setState({
            ticket: contentGames
        });



    }



    setSettings = (br) => {
        this.setState({
            settings: br,
            ticket: "-1"
        });
    }

    saveCompetitions = (object) => {
        this.setState({
            competition: object,
            settings: 0
        });
    }

    saveMarket = (object) => {
        this.setState({
            market: object,
            settings: 0
        });
    }

    setStateOddsTime = (value, br) => {

        if (br === 1) {
            this.setState({
                odds: value,
                settings: 0,
                ticket: "-1",
                error: ""
            });
        }

        if (br === 2) {
            this.setState({
                time: value,
                ticket: "-1",
                settings: 0
            });
        }

    }

    errorMessageGenerate = () => {
        this.setState({
            error: "You must choose odds"
        });
    }


    render() {

        let settingsButtons;

        if (this.state.settings === 0) {
            settingsButtons = <div className={classes.chooseContainer}>
                <OddsTimeCompMarket value={this.state.odds} name="Odds" click={() => this.setSettings(1)} content={this.state.odds ? this.state.odds : "Choose odds"} />
                <OddsTimeCompMarket value={this.state.time} name="Time" click={() => this.setSettings(2)} content={"Next " + this.state.time + "h"} />
                <OddsTimeCompMarket value={this.state.competition} name="Competitions" click={() => this.setSettings(3)} content={this.state.competition ? "Custom" : "All"} />
                <OddsTimeCompMarket value={this.state.market} name="Market" click={() => this.setSettings(4)} content={"Custom"} />
            </div>;
        } else {
            settingsButtons = <SettingsTicket
                type={this.state.settings}
                value={[this.state.odds, this.state.time]}
                oddsTimeClick={this.setStateOddsTime}
                competitionsTicket={this.props.genTicketObject.competitionsTicket}
                marketTicket={this.state.market}
                saveCompetitions={this.saveCompetitions}
                saveMarket={this.saveMarket}
            />;
        }

        let generateButton = "";
        let errorMessage = "";

        if (this.state.settings === 0) {

            if (this.state.error !== "") {
                errorMessage = <div className={classes.errorMessage}>
                    {this.state.error}
                </div>
            } else {
                errorMessage = <div className={classes.errorMessage}>{""}</div>;
            }
        }


        if (this.state.odds !== "" && this.state.settings === 0) {
            generateButton = <div className={classes.generateButtonContainer} onClick={this.generateTicketFun}>
                <div className={classes.generateButton}>
                    Generate Ticket
                </div>
            </div>;
        } else if (this.state.settings === 0) {
            generateButton = <div className={classes.generateButtonContainerNo} onClick={this.errorMessageGenerate}>
                <div className={classes.generateButtonNo}>
                    Generate Ticket
                </div>
            </div>;
        }


        let contentTicket = "";
        let line = <div className={classes.line}></div>;

        if (this.state.ticket === "-1") {
            contentTicket = "";
        } else if (this.state.ticket === "0") {
            contentTicket = <div className={classes.Unable}>Unable to generate ticket, try changing some parameters.</div>
        } else {
            contentTicket = this.state.ticket;
        }

        return <div className={classes.GenerateTicket}>
            <div className={classes.Header}>
                Generate Ticket
            </div>
            <div className={classes.Content}>
                {settingsButtons}
                {errorMessage}
            </div>
            {generateButton}
            <div className={classes.Games}>
                {this.state.ticket !== "-1" ? line : ""}
                {contentTicket}
            </div>
        </div>

    }


}


export default GenerateTicket;




