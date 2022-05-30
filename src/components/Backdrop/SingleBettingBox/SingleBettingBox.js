import React, { Component } from 'react';
import classes from './SingleBettingBox.module.css';
import OverallButton from '../../MatchHomeBox/OverallButton/OverallButton';
import TipsLine from './tipsLine/tipsLine';
import Title from '../../MatchHomeBox/TittleTemplateBox/TittleTemplateBox';

class SingleBettingBox extends Component {

    state = {
        recomended: true,
        couldTry: false,
        recomendedObj: [],
        couldTryObj: []
    }

    componentDidMount() {
        this.calcBettingTips();
    }

    setRecomended = () => {
        this.setState({
            recomended: true,
            couldTry: false
        });
    }

    setCouldTry = () => {
        this.setState({
            recomended: false,
            couldTry: true
        });
    }


    calcChance = (home, away, br) => {

        const h1_count = this.props.homeOBJHome.gamesCount;
        const h2_count = this.props.homeOBJAll.gamesCount;
        const a1_count = this.props.awayOBJAway.gamesCount;
        const a2_count = this.props.awayOBJAll.gamesCount;


        if (h1_count > 3 && a1_count > 3) {

            let homeChance = 0;
            let awayChance = 0;

            const homeOBJHome = this.props.homeOBJHome;
            const homeOBJAll = this.props.homeOBJAll;
            const awayOBJAway = this.props.awayOBJAway;
            const awayOBJAll = this.props.awayOBJAll;



            let h1_perc = parseInt((homeOBJHome[home] / h1_count * 100).toFixed(0));
            let h2_perc = parseInt((homeOBJAll[home] / h2_count * 100).toFixed(0));
            let a1_perc = parseInt((awayOBJAway[away] / a1_count * 100).toFixed(0));
            let a2_perc = parseInt((awayOBJAll[away] / a2_count * 100).toFixed(0));

            let x = 1.5;
            let y = 0.7;
            let border = true;
            let borderPerc = br * 70 / 100;
            let totalChance = 0;

            if (br <= 70) borderPerc = br * 50 / 100;

            if (home === "soem" || away === "soem" || home === "over_1_5"
                || home === "over_0_5_SH" || away === "over_0_5_SH") {
                x = 1;

                if ((homeOBJHome[home + "SER"] > 5 || homeOBJAll[home + "SER"] > 5)
                    && (awayOBJAway[away + "SER"] > 5 || awayOBJAll[away + "SER"] > 5)) {
                    x = x * 1.2;
                    y = y * 1.2;
                }
            } else {
                if ((homeOBJHome[home + "SER"] > 2 || homeOBJAll[home + "SER"] > 2)
                    && (awayOBJAway[away + "SER"] > 2 || awayOBJAll[away + "SER"] > 2)) {
                    x = x * 1.4;
                    y = y * 1.4;
                }
            }


            if (h1_perc > h2_perc) {
                homeChance = h1_perc + homeOBJHome[home + "SER"] * x + homeOBJAll[home + "SER"] * y;
            } else {
                homeChance = Math.round((h1_perc + h2_perc) / 2) + homeOBJHome[home + "SER"] * x + homeOBJAll[home + "SER"] * y;
            }

            if (a1_perc > a2_perc) {
                awayChance = a1_perc + awayOBJAway[away + "SER"] * x + awayOBJAll[away + "SER"] * y;
            } else {
                awayChance = Math.round((a1_perc + a2_perc) / 2) + awayOBJAway[away + "SER"] * x + awayOBJAll[away + "SER"] * y;
            }

            totalChance = Math.round((homeChance + awayChance) / 2);

            if ((homeChance < borderPerc || awayChance < borderPerc) && homeChance < 98 && awayChance < 98) border = false;


            if (home === "gibh") {
                let a_h1_perc = this.calcChance("over_0_5_HT", "over_0_5_HT", 82);
                let a_a1_perc = this.calcChance("over_0_5_SH", "over_0_5_SH", 84);
                if (a_h1_perc.total > 82 || a_a1_perc.total > 84) {
                    totalChance += parseInt((((a_h1_perc.total + a_a1_perc.total) / 2 - totalChance) / 4).toFixed(0));
                }
            } else if (home === "bts") {
                let a_h1_perc = this.calcChance("soem", "cc_0_5", 85);
                let a_a1_perc = this.calcChance("cc_0_5", "soem", 85);

                if (a_h1_perc.total > 85 || a_a1_perc.total > 85) {
                    totalChance += parseInt((((a_h1_perc.total + a_a1_perc.total) / 2 - totalChance) / 4).toFixed(0));
                }
            }

            if (!border) {
                totalChance = 0;
            }


            return {
                total: totalChance > 94 ? 94 : totalChance,
                h1_perc: Math.round(h1_perc),
                h2_perc: Math.round(h2_perc),
                a1_perc: Math.round(a1_perc),
                a2_perc: Math.round(a2_perc),
            };
            
        } else {
            return {
                total: 0,
                h1_perc: 0,
                h2_perc: 0,
                a1_perc: 0,
                a2_perc: 0,
            };
        }
    }

    calcBettingTips = () => {

        let recomendedObj = [];
        let couldTryObj = [];
        let tip = "";
        let explanation = [];
        let chance = {};
        let final = null;

        const homeTeam = this.props.homeOBJHome.teamName;
        const awayTeam = this.props.awayOBJAway.teamName;
        const final_result = this.props.final_results;



        // home team win
        chance = this.calcChance("win", "lose", 65);
        if (chance.total >= 65) {
            explanation = [];

            tip = homeTeam + " To Win Full-Time";

            explanation.push(homeTeam + " won " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " won " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.winSER > 2) {
                explanation.push(homeTeam + " won the last " + this.props.homeOBJHome.winSER + " of their home games");
            }

            if (this.props.homeOBJAll.winSER > 2) {
                explanation.push(homeTeam + " won the last " + this.props.homeOBJAll.winSER + " of all the games");
            }

            explanation.push(awayTeam + " lost " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " lost " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.loseSER > 2) {
                explanation.push(awayTeam + " lost the last " + this.props.awayOBJAway.loseSER + " of their away games");
            }

            if (this.props.awayOBJAll.loseSER > 2) {
                explanation.push(awayTeam + " lost the last " + this.props.awayOBJAll.loseSER + " of all the games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.win === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }


        // draw
        chance = this.calcChance("draw", "draw", 45);
        if (chance.total >= 45) {
            explanation.length = 0;

            tip = "Draw Full-Time";

            explanation.push(chance.h1_perc + "% of " + homeTeam + " home games ended without winner");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(chance.h2_perc + "% of all " + homeTeam + " games ended without winner");
            }

            if (this.props.homeOBJHome.drawSER > 2) {
                explanation.push(homeTeam + " played without winner in " + this.props.homeOBJHome.drawSER + " of its last home games");
            }

            if (this.props.homeOBJAll.drawSER > 2) {
                explanation.push(homeTeam + " played without winner in the last " + this.props.homeOBJAll.drawSER + " games");
            }


            explanation.push(chance.a1_perc + "% of " + awayTeam + " away games ended without winner");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(chance.a2_perc + "% of all " + awayTeam + " games ended without winner");
            }

            if (this.props.awayOBJAway.drawSER > 2) {
                explanation.push(awayTeam + " played without winner in " + this.props.awayOBJAway.drawSER + " of its last away games");
            }

            if (this.props.awayOBJAll.drawSER > 2) {
                explanation.push(awayTeam + " played without winner in the last " + this.props.awayOBJAll.drawSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.draw === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 35 && chance.total <= 44) {
            explanation.length = 0;

            tip = "Draw Full-Time";

            explanation.push(chance.h1_perc + "% of " + homeTeam + " home games ended without winner");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(chance.h2_perc + "% of all " + homeTeam + " games ended without winner");
            }

            if (this.props.homeOBJHome.drawSER > 2) {
                explanation.push(homeTeam + " played without winner in " + this.props.homeOBJHome.drawSER + " of its last home games");
            }

            if (this.props.homeOBJAll.drawSER > 2) {
                explanation.push(homeTeam + " played without winner in the last " + this.props.homeOBJAll.drawSER + " games");
            }


            explanation.push(chance.a1_perc + "% of " + awayTeam + " away games ended without winner");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(chance.a2_perc + "% of all " + awayTeam + " games ended without winner");
            }

            if (this.props.awayOBJAway.drawSER > 2) {
                explanation.push(awayTeam + " played without winner in " + this.props.awayOBJAway.drawSER + " of its last away games");
            }

            if (this.props.awayOBJAll.drawSER > 2) {
                explanation.push(awayTeam + " played without winner in the last " + this.props.awayOBJAll.drawSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.draw === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }


        // Away team win
        chance = this.calcChance("lose", "win", 65);
        if (chance.total >= 65) {
            explanation.length = 0;

            tip = awayTeam + " To Win Full-Time";

            explanation.push(homeTeam + " lost " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " lost " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.loseSER > 2) {
                explanation.push(homeTeam + " lost the last " + this.props.homeOBJHome.loseSER + " of their home games");
            }

            if (this.props.homeOBJAll.loseSER > 2) {
                explanation.push(homeTeam + " lost the last " + this.props.homeOBJAll.loseSER + " of all the games");
            }


            explanation.push(awayTeam + " won " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " won " + chance.a2_perc + "% of all the games");
            }


            if (this.props.awayOBJAway.winSER > 2) {
                explanation.push(awayTeam + " won the last " + this.props.awayOBJAway.winSER + " of their away games");
            }

            if (this.props.awayOBJAll.winSER > 2) {
                explanation.push(awayTeam + " won the last " + this.props.awayOBJAll.winSER + " of all the games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.lose === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }


        // Home Team To Score
        chance = this.calcChance("soem", "cc_0_5", 85);
        if (chance.total >= 85) {
            explanation.length = 0;

            tip = homeTeam + " To Score";

            explanation.push(homeTeam + " scored in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " scored in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.soemSER > 2) {
                explanation.push(homeTeam + " scored in the last " + this.props.homeOBJHome.soemSER + " of their home games");
            }

            if (this.props.homeOBJAll.soemSER > 2) {
                explanation.push(homeTeam + " scored in the last " + this.props.homeOBJAll.soemSER + " of all the games");
            }

            explanation.push(awayTeam + " conceded over 0.5 goals in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " conceded over 0.5 goals in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.cc_0_5SER > 2) {
                explanation.push(awayTeam + " conceded over 0.5 goals in the last " + this.props.awayOBJAway.cc_0_5SER + " of their away games");
            }

            if (this.props.awayOBJAll.cc_0_5SER > 2) {
                explanation.push(awayTeam + " conceded over 0.5 goals in the last " + this.props.awayOBJAll.cc_0_5SER + " of all the games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.soem === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }


        // Away Team To Score
        chance = this.calcChance("cc_0_5", "soem", 85);
        if (chance.total >= 85) {
            explanation.length = 0;

            tip = awayTeam + " To Score";

            explanation.push(homeTeam + " conceded over 0.5 goals in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " conceded over 0.5 goals in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.cc_0_5SER > 2) {
                explanation.push(homeTeam + " conceded over 0.5 goals in the last " + this.props.homeOBJHome.cc_0_5SER + " of their home games");
            }

            if (this.props.homeOBJAll.cc_0_5SER > 2) {
                explanation.push(homeTeam + " conceded over 0.5 goals in the last " + this.props.homeOBJAll.cc_0_5SER + " of all the games");
            }

            explanation.push(awayTeam + " scored in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " scored in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.soemSER > 2) {
                explanation.push(awayTeam + " scored in the last " + this.props.awayOBJAway.soemSER + " of their away games");
            }

            if (this.props.awayOBJAll.soemSER > 2) {
                explanation.push(awayTeam + " scored in the last " + this.props.awayOBJAll.soemSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.cc_0_5 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }


        // Home Team To Score Twice
        chance = this.calcChance("stgoem", "cc_1_5", 70);
        if (chance.total >= 70) {
            explanation.length = 0;

            tip = homeTeam + " To Score Over 1.5 goals";

            explanation.push(homeTeam + " scored twice in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " scored twice in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.stgoemSER > 2) {
                explanation.push(homeTeam + "  scored twice in the last " + this.props.homeOBJHome.stgoemSER + " of their home games");
            }

            if (this.props.homeOBJAll.stgoemSER > 2) {
                explanation.push(homeTeam + "  scored twice in the last " + this.props.homeOBJAll.stgoemSER + " games");
            }

            explanation.push(awayTeam + " conceded over 1.5 goals in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " conceded over 1.5 goals in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.cc_1_5SER > 2) {
                explanation.push(awayTeam + " conceded over 1.5 goals in the last " + this.props.awayOBJAway.cc_1_5SER + " of their away games");
            }

            if (this.props.awayOBJAll.cc_1_5SER > 2) {
                explanation.push(awayTeam + " conceded over 1.5 goals in the last " + this.props.awayOBJAll.cc_1_5SER + " of all the games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.stgoem === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 65 && chance.total <= 69) {
            explanation.length = 0;

            tip = homeTeam + " To Score Over 1.5 goals";

            explanation.push(homeTeam + " scored twice in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " scored twice in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.stgoemSER > 2) {
                explanation.push(homeTeam + "  scored twice in the last " + this.props.homeOBJHome.stgoemSER + " of their home games");
            }

            if (this.props.homeOBJAll.stgoemSER > 2) {
                explanation.push(homeTeam + "  scored twice in the last " + this.props.homeOBJAll.stgoemSER + " games");
            }

            explanation.push(awayTeam + " conceded over 1.5 goals in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " conceded over 1.5 goals in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.cc_1_5SER > 2) {
                explanation.push(awayTeam + " conceded over 1.5 goals in the last " + this.props.awayOBJAway.cc_1_5SER + " of their away games");
            }

            if (this.props.awayOBJAll.cc_1_5SER > 2) {
                explanation.push(awayTeam + " conceded over 1.5 goals in the last " + this.props.awayOBJAll.cc_1_5SER + " of all the games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.stgoem === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Away Team To Score Twice
        chance = this.calcChance("cc_1_5", "stgoem", 70);
        if (chance.total >= 70) {
            explanation.length = 0;

            tip = awayTeam + " To Score Over 1.5 goals";

            explanation.push(homeTeam + " conceded over 1.5 goals in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " conceded over 1.5 goals in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.cc_1_5 > 2) {
                explanation.push(homeTeam + " conceded over 1.5 goals in the last " + this.props.homeOBJHome.cc_1_5 + " of their home games");
            }

            if (this.props.homeOBJAll.cc_1_5 > 2) {
                explanation.push(homeTeam + " conceded over 1.5 goals in the last " + this.props.homeOBJAll.cc_1_5 + " games");
            }

            explanation.push(awayTeam + " scored twice in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " scored twice in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.stgoemSER > 2) {
                explanation.push(awayTeam + " scored twice in the last " + this.props.awayOBJAway.stgoemSER + " of their away games");
            }

            if (this.props.awayOBJAway.stgoemSER > 2) {
                explanation.push(awayTeam + " scored twice in the last " + this.props.awayOBJAway.stgoemSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.cc_1_5 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 65 && chance.total <= 69) {
            explanation.length = 0;

            tip = awayTeam + " To Score Over 1.5 goals";

            explanation.push(homeTeam + " conceded over 1.5 goals in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " conceded over 1.5 goals in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.cc_1_5 > 2) {
                explanation.push(homeTeam + " conceded over 1.5 goals in the last " + this.props.homeOBJHome.cc_1_5 + " of their home games");
            }

            if (this.props.homeOBJAll.cc_1_5 > 2) {
                explanation.push(homeTeam + " conceded over 1.5 goals in the last " + this.props.homeOBJAll.cc_1_5 + " games");
            }

            explanation.push(awayTeam + " scored twice in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " scored twice in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.stgoemSER > 2) {
                explanation.push(awayTeam + " scored twice in the last " + this.props.awayOBJAway.stgoemSER + " of their home games");
            }

            if (this.props.awayOBJAway.stgoemSER > 2) {
                explanation.push(awayTeam + " scored twice in the last " + this.props.awayOBJAway.stgoemSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.cc_1_5 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // home team win and over 1.5 goals
        chance = this.calcChance("win2", "lose2", 60);
        if (chance.total >= 60) {
            explanation = [];

            tip = homeTeam + " To Win And Over 1.5 Goals";

            explanation.push(homeTeam + " won and goals count was over 1.5 in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " won and goals count was over 1.5 in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.win2SER > 2) {
                explanation.push(homeTeam + " won and goals count was over 1.5 in the last " + this.props.homeOBJHome.win2SER + " of their home games");
            }

            if (this.props.homeOBJAll.win2SER > 2) {
                explanation.push(homeTeam + " won and goals count was over 1.5 in the last " + this.props.homeOBJAll.win2SER + " games");
            }

            explanation.push(awayTeam + " lost and goals count was over 1.5 in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " lost and goals count was over 1.5 in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.lose2SER > 2) {
                explanation.push(awayTeam + " lost and goals count was over 1.5 in the last " + this.props.awayOBJAway.lose2SER + " of their away games");
            }

            if (this.props.awayOBJAll.lose2SER > 2) {
                explanation.push(awayTeam + " lost and goals count was over 1.5 in the last " + this.props.awayOBJAll.lose2SER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.win2 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }


        // draw and over 1.5
        chance = this.calcChance("draw2", "draw2", 40);
        if (chance.total >= 40) {
            explanation.length = 0;

            tip = "Draw And Over 1.5 Goals";

            explanation.push(chance.h1_perc + "% of " + homeTeam + " home games ended without winner and goals count was over 1.5");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(chance.h2_perc + "% of all " + homeTeam + " games ended without winner and goals count was over 1.5");
            }

            if (this.props.homeOBJHome.draw2SER > 2) {
                explanation.push(homeTeam + " played without winner and goals count was over 1.5 in last " + this.props.homeOBJHome.draw2SER + " home games");
            }

            if (this.props.homeOBJAll.draw2SER > 2) {
                explanation.push(homeTeam + " played without winner and goals count was over 1.5 in the last " + this.props.homeOBJAll.draw2SER + " games");
            }


            explanation.push(chance.a1_perc + "% of " + awayTeam + " away games ended without winner and goals count was over 1.5");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(chance.a2_perc + "% of all " + awayTeam + " games ended without winner and goals count was over 1.5");
            }

            if (this.props.awayOBJAway.draw2SER > 2) {
                explanation.push(awayTeam + " played without winner and goals count was over 1.5 in last " + this.props.awayOBJAway.draw2SER + " away games");
            }

            if (this.props.awayOBJAll.draw2SER > 2) {
                explanation.push(awayTeam + " played without winner and goals count was over 1.5 in the last " + this.props.awayOBJAll.draw2SER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.draw2 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }


        // Away team win and over 1.5 goals
        chance = this.calcChance("lose2", "win2", 60);
        if (chance.total >= 60) {
            explanation.length = 0;

            tip = awayTeam + " To Win And Over 1.5 Goals";

            explanation.push(homeTeam + " lost and goals count was over 1.5 in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " lost and goals count was over 1.5 in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.lose2SER > 2) {
                explanation.push(homeTeam + " lost and goals count was over 1.5 in the last " + this.props.homeOBJHome.lose2SER + " of their home games");
            }

            if (this.props.homeOBJAll.lose2SER > 2) {
                explanation.push(homeTeam + " lost and goals count was over 1.5 in the last " + this.props.homeOBJAll.lose2SER + " games");
            }


            explanation.push(awayTeam + " won and goals count was over 1.5 in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " won and goals count was over 1.5 in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.win2SER > 2) {
                explanation.push(awayTeam + " won and goals count was over 1.5 in the last " + this.props.awayOBJAway.win2SER + " of their away games");
            }

            if (this.props.awayOBJAll.win2SER > 2) {
                explanation.push(awayTeam + " won and goals count was over 1.5 in the last " + this.props.awayOBJAll.win2SER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.lose2 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }


        // home team win and over 2.5 goals
        chance = this.calcChance("win3", "lose3", 60);
        if (chance.total >= 60) {
            explanation = [];

            tip = homeTeam + " To Win And Over 2.5 Goals";

            explanation.push(homeTeam + " won and goals count was over 2.5 in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " won and goals count was over 2.5 in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.win3SER > 2) {
                explanation.push(homeTeam + " won and goals count was over 2.5 in the last " + this.props.homeOBJHome.win3SER + " of their home games");
            }

            if (this.props.homeOBJAll.win3SER > 2) {
                explanation.push(homeTeam + " won and goals count was over 2.5 in the last " + this.props.homeOBJAll.win3SER + " of all the games");
            }

            explanation.push(awayTeam + " lost and goals count was over 2.5 in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " lost and goals count was over 2.5 in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.lose3SER > 2) {
                explanation.push(awayTeam + " lost and goals count was over 2.5 in the last " + this.props.awayOBJAway.lose3SER + " of their away games");
            }

            if (this.props.awayOBJAll.lose3SER > 2) {
                explanation.push(awayTeam + " lost and goals count was over 2.5 in the last " + this.props.awayOBJAll.lose3SER + " of all the games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.win3 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 50 && chance.total <= 59) {
            explanation = [];

            tip = homeTeam + " To Win And Over 2.5 Goals";

            explanation.push(homeTeam + " won and goals count was over 2.5 in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " won and goals count was over 2.5 in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.win3SER > 2) {
                explanation.push(homeTeam + " won and goals count was over 2.5 in the last " + this.props.homeOBJHome.win3SER + " of their home games");
            }

            if (this.props.homeOBJAll.win3SER > 2) {
                explanation.push(homeTeam + " won and goals count was over 2.5 in the last " + this.props.homeOBJAll.win3SER + " of all the games");
            }

            explanation.push(awayTeam + " lost and goals count was over 2.5 in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " lost and goals count was over 2.5 in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.lose3SER > 2) {
                explanation.push(awayTeam + " lost and goals count was over 2.5 in the last " + this.props.awayOBJAway.lose3SER + " of their away games");
            }

            if (this.props.awayOBJAll.lose3SER > 2) {
                explanation.push(awayTeam + " lost and goals count was over 2.5 in the last " + this.props.awayOBJAll.lose3SER + " of all the games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.win3 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // draw and over 2.5
        chance = this.calcChance("draw3", "draw3", 30);
        if (chance.total >= 30) {
            explanation.length = 0;

            tip = "Draw And Over 2.5 Goals";

            explanation.push(chance.h1_perc + "% of " + homeTeam + " home games ended without winner and goals count was over 2.5");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(chance.h2_perc + "% of all " + homeTeam + " games ended without winner and goals count was over 2.5");
            }

            if (this.props.homeOBJHome.draw3SER > 2) {
                explanation.push(homeTeam + " played without winner and goals count was over 2.5 in " + this.props.homeOBJHome.draw3SER + " of its last home games");
            }

            if (this.props.homeOBJAll.draw3SER > 2) {
                explanation.push(homeTeam + " played without winner and goals count was over 2.5 in the last " + this.props.homeOBJAll.draw3SER + " games");
            }


            explanation.push(chance.a1_perc + "% of " + awayTeam + " away games ended without winner and goals count was over 2.5");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(chance.a2_perc + "% of all " + awayTeam + " games ended without winner and goals count was over 2.5");
            }

            if (this.props.awayOBJAway.draw3SER > 2) {
                explanation.push(awayTeam + " played without winner and goals count was over 2.5 in " + this.props.awayOBJAway.draw3SER + " of its last away games");
            }

            if (this.props.awayOBJAll.draw3SER > 2) {
                explanation.push(awayTeam + " played without winner and goals count was over 2.5 in the last " + this.props.awayOBJAll.draw3SER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.draw3 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 20 && chance.total <= 29) {
            explanation.length = 0;

            tip = "Draw And Over 2.5 Goals";

            explanation.push(chance.h1_perc + "% of " + homeTeam + " home games ended without winner and goals count was over 2.5");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(chance.h2_perc + "% of all " + homeTeam + " games ended without winner and goals count was over 2.5");
            }

            if (this.props.homeOBJHome.draw3SER > 2) {
                explanation.push(homeTeam + " played without winner and goals count was over 2.5 in " + this.props.homeOBJHome.draw3SER + " of its last home games");
            }

            if (this.props.homeOBJAll.draw3SER > 2) {
                explanation.push(homeTeam + " played without winner and goals count was over 2.5 in the last " + this.props.homeOBJAll.draw3SER + " games");
            }


            explanation.push(chance.a1_perc + "% of " + awayTeam + " away games ended without winner and goals count was over 2.5");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(chance.a2_perc + "% of all " + awayTeam + " games ended without winner and goals count was over 2.5");
            }

            if (this.props.awayOBJAway.draw3SER > 2) {
                explanation.push(awayTeam + " played without winner and goals count was over 2.5 in " + this.props.awayOBJAway.draw3SER + " of its last away games");
            }

            if (this.props.awayOBJAll.draw3SER > 2) {
                explanation.push(awayTeam + " played without winner and goals count was over 2.5 in the last " + this.props.awayOBJAll.draw3SER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.draw3 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Away team win and over 2.5 goals
        chance = this.calcChance("lose3", "win3", 60);
        if (chance.total >= 60) {
            explanation.length = 0;

            tip = awayTeam + " To Win And Over 2.5 Goals";

            explanation.push(homeTeam + " lost and goals count was over 2.5 in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " lost and goals count was over 2.5 in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.lose3SER > 2) {
                explanation.push(homeTeam + " lost and goals count was over 2.5 in the last " + this.props.homeOBJHome.lose3SER + " of their home games");
            }

            if (this.props.homeOBJAll.lose3SER > 2) {
                explanation.push(homeTeam + " lost and goals count was over 2.5 in the last " + this.props.homeOBJAll.lose3SER + " of all the games");
            }


            explanation.push(awayTeam + " won and goals count was over 2.5 in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " won and goals count was over 2.5 in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.win3SER > 2) {
                explanation.push(awayTeam + " won and goals count was over 2.5 in the last " + this.props.awayOBJAway.win3SER + " of their away games");
            }

            if (this.props.awayOBJAll.win3SER > 2) {
                explanation.push(awayTeam + " won and goals count was over 2.5 in the last " + this.props.awayOBJAll.win3SER + " of all the games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.lose3 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 50 && chance.total <= 59) {
            explanation.length = 0;

            tip = awayTeam + " To Win And Over 2.5 Goals";

            explanation.push(homeTeam + " lost and goals count was over 2.5 in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " lost and goals count was over 2.5 in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.lose3SER > 2) {
                explanation.push(homeTeam + " lost and goals count was over 2.5 in the last " + this.props.homeOBJHome.lose3SER + " of their home games");
            }

            if (this.props.homeOBJAll.lose3SER > 2) {
                explanation.push(homeTeam + " lost and goals count was over 2.5 in the last " + this.props.homeOBJAll.lose3SER + " of all the games");
            }


            explanation.push(awayTeam + " won and goals count was over 2.5 in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " won and goals count was over 2.5 in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.win3SER > 2) {
                explanation.push(awayTeam + " won and goals count was over 2.5 in the last " + this.props.awayOBJAway.win3SER + " of their away games");
            }

            if (this.props.awayOBJAll.win3SER > 2) {
                explanation.push(awayTeam + " won and goals count was over 2.5 in the last " + this.props.awayOBJAll.win3SER + " of all the games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.lose3 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // over 1.5 goals
        chance = this.calcChance("over_1_5", "over_1_5", 85);
        if (chance.total >= 85) {
            explanation.length = 0;

            tip = "Over 1.5 Goals";

            explanation.push("Over 1.5 goals have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 1.5 goals have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_1_5SER > 2) {
                explanation.push("Over 1.5 goals have been scored in the last " + this.props.homeOBJHome.over_1_5SER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_1_5SER > 2) {
                explanation.push("Over 1.5 goals have been scored in the last " + this.props.homeOBJAll.over_1_5SER + " of " + homeTeam + " games");
            }


            explanation.push("Over 1.5 goals have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 1.5 goals have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_1_5SER > 2) {
                explanation.push("Over 1.5 goals have been scored in the last " + this.props.awayOBJAway.over_1_5SER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_1_5SER > 2) {
                explanation.push("Over 1.5 goals have been scored in the last " + this.props.awayOBJAll.over_1_5SER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_1_5 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }


        // over 2.5 goals
        chance = this.calcChance("over_2_5", "over_2_5", 70);
        if (chance.total >= 70) {
            explanation.length = 0;

            tip = "Over 2.5 Goals";

            explanation.push("Over 2.5 goals have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 2.5 goals have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_2_5SER > 2) {
                explanation.push("Over 2.5 goals have been scored in the last " + this.props.homeOBJHome.over_2_5SER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_2_5SER > 2) {
                explanation.push("Over 2.5 goals have been scored in the last " + this.props.homeOBJAll.over_2_5SER + " of " + homeTeam + " games");
            }


            explanation.push("Over 2.5 goals have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 2.5 goals have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_2_5SER > 2) {
                explanation.push("Over 2.5 goals have been scored in the last " + this.props.awayOBJAway.over_2_5SER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_2_5SER > 2) {
                explanation.push("Over 2.5 goals have been scored in the last " + this.props.awayOBJAll.over_2_5SER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_2_5 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }


        // Over 3.5 goals
        chance = this.calcChance("over_3_5", "over_3_5", 55);
        if (chance.total >= 55) {
            explanation.length = 0;

            tip = "Over 3.5 Goals";

            explanation.push("Over 3.5 goals have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 3.5 goals have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_3_5SER > 2) {
                explanation.push("Over 3.5 goals have been scored in the last " + this.props.homeOBJHome.over_3_5SER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_3_5SER > 2) {
                explanation.push("Over 3.5 goals have been scored in the last " + this.props.homeOBJAll.over_3_5SER + " of " + homeTeam + " games");
            }


            explanation.push("Over 3.5 goals have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 3.5 goals have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_3_5SER > 2) {
                explanation.push("Over 3.5 goals have been scored in the last " + this.props.awayOBJAway.over_3_5SER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_3_5SER > 2) {
                explanation.push("Over 3.5 goals have been scored in the last " + this.props.awayOBJAll.over_3_5SER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_3_5 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 45 && chance.total <= 54) {
            explanation.length = 0;

            tip = "Over 3.5 Goals";

            explanation.push("Over 3.5 goals have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 3.5 goals have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_3_5SER > 2) {
                explanation.push("Over 3.5 goals have been scored in the last " + this.props.homeOBJHome.over_3_5SER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_3_5SER > 2) {
                explanation.push("Over 3.5 goals have been scored in the last " + this.props.homeOBJAll.over_3_5SER + " of " + homeTeam + " games");
            }


            explanation.push("Over 3.5 goals have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 3.5 goals have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_3_5SER > 2) {
                explanation.push("Over 3.5 goals have been scored in the last " + this.props.awayOBJAway.over_3_5SER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_3_5SER > 2) {
                explanation.push("Over 3.5 goals have been scored in the last " + this.props.awayOBJAll.over_3_5SER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_3_5 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Over 4.5 goals
        chance = this.calcChance("over_4_5", "over_4_5", 45);
        if (chance.total >= 45) {
            explanation.length = 0;

            tip = "Over 4.5 Goals";

            explanation.push("Over 4.5 goals have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 4.5 goals have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_4_5SER > 2) {
                explanation.push("Over 4.5 goals have been scored in the last " + this.props.homeOBJHome.over_4_5SER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_4_5SER > 2) {
                explanation.push("Over 4.5 goals have been scored in the last " + this.props.homeOBJAll.over_4_5SER + " of " + homeTeam + " games");
            }


            explanation.push("Over 4.5 goals have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 4.5 goals have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_4_5SER > 2) {
                explanation.push("Over 4.5 goals have been scored in the last " + this.props.awayOBJAway.over_4_5SER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_4_5SER > 2) {
                explanation.push("Over 4.5 goals have been scored in the last " + this.props.awayOBJAll.over_4_5SER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_4_5 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 30 && chance.total <= 44) {
            explanation.length = 0;

            tip = "Over 4.5 Goals";

            explanation.push("Over 4.5 goals have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 4.5 goals have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_4_5SER > 2) {
                explanation.push("Over 4.5 goals have been scored in the last " + this.props.homeOBJHome.over_4_5SER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_4_5SER > 2) {
                explanation.push("Over 4.5 goals have been scored in the last " + this.props.homeOBJAll.over_4_5SER + " of " + homeTeam + " games");
            }


            explanation.push("Over 4.5 goals have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 4.5 goals have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_4_5SER > 2) {
                explanation.push("Over 4.5 goals have been scored in the last " + this.props.awayOBJAway.over_4_5SER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_4_5SER > 2) {
                explanation.push("Over 4.5 goals have been scored in the last " + this.props.awayOBJAll.over_4_5SER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_4_5 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Over 5.5 goals
        chance = this.calcChance("over_5_5", "over_5_5", 40);
        if (chance.total >= 40) {
            explanation.length = 0;

            tip = "Over 5.5 Goals";

            explanation.push("Over 5.5 goals have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 5.5 goals have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_5_5SER > 2) {
                explanation.push("Over 5.5 goals have been scored in the last " + this.props.homeOBJHome.over_5_5SER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_5_5SER > 2) {
                explanation.push("Over 5.5 goals have been scored in the last " + this.props.homeOBJAll.over_5_5SER + " of " + homeTeam + " games");
            }


            explanation.push("Over 5.5 goals have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 5.5 goals have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_5_5SER > 2) {
                explanation.push("Over 5.5 goals have been scored in the last " + this.props.awayOBJAway.over_5_5SER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_5_5SER > 2) {
                explanation.push("Over 5.5 goals have been scored in the last " + this.props.awayOBJAll.over_5_5SER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_5_5 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 25 && chance.total <= 39) {
            explanation.length = 0;

            tip = "Over 5.5 Goals";

            explanation.push("Over 5.5 goals have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 5.5 goals have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_5_5SER > 2) {
                explanation.push("Over 5.5 goals have been scored in the last " + this.props.homeOBJHome.over_5_5SER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_5_5SER > 2) {
                explanation.push("Over 5.5 goals have been scored in the last " + this.props.homeOBJAll.over_5_5SER + " of " + homeTeam + " games");
            }


            explanation.push("Over 5.5 goals have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 5.5 goals have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_5_5SER > 2) {
                explanation.push("Over 5.5 goals have been scored in the last " + this.props.awayOBJAway.over_5_5SER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_5_5SER > 2) {
                explanation.push("Over 5.5 goals have been scored in the last " + this.props.awayOBJAll.over_5_5SER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_5_5 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Under 1.5 goals
        chance = this.calcChance("under_1_5", "under_1_5", 60);
        if (chance.total >= 60) {
            explanation.length = 0;

            tip = "Under 1.5 Goals";

            explanation.push("Under 1.5 goals have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Under 1.5 goals have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.under_1_5SER > 2) {
                explanation.push("Under 1.5 goals have been scored in the last " + this.props.homeOBJHome.under_1_5SER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.under_1_5SER > 2) {
                explanation.push("Under 1.5 goals have been scored in the last " + this.props.homeOBJAll.under_1_5SER + " of " + homeTeam + " games");
            }


            explanation.push("Under 1.5 goals have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Under 1.5 goals have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.under_1_5SER > 2) {
                explanation.push("Under 1.5 goals have been scored in the last " + this.props.awayOBJAway.under_1_5SER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.under_1_5SER > 2) {
                explanation.push("Under 1.5 goals have been scored in the last " + this.props.awayOBJAll.under_1_5SER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.under_1_5 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 38 && chance.total <= 59) {
            explanation.length = 0;

            tip = "Under 1.5 Goals";

            explanation.push("Under 1.5 goals have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Under 1.5 goals have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.under_1_5SER > 2) {
                explanation.push("Under 1.5 goals have been scored in the last " + this.props.homeOBJHome.under_1_5SER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.under_1_5SER > 2) {
                explanation.push("Under 1.5 goals have been scored in the last " + this.props.homeOBJAll.under_1_5SER + " of " + homeTeam + " games");
            }


            explanation.push("Under 1.5 goals have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Under 1.5 goals have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.under_1_5SER > 2) {
                explanation.push("Under 1.5 goals have been scored in the last " + this.props.awayOBJAway.under_1_5SER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.under_1_5SER > 2) {
                explanation.push("Under 1.5 goals have been scored in the last " + this.props.awayOBJAll.under_1_5SER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.under_1_5 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Under 2.5 goals
        chance = this.calcChance("under_2_5", "under_2_5", 65);
        if (chance.total >= 65) {
            explanation.length = 0;

            tip = "Under 2.5 Goals";

            explanation.push("Under 2.5 goals have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Under 2.5 goals have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.under_2_5SER > 2) {
                explanation.push("Under 2.5 goals have been scored in the last " + this.props.homeOBJHome.under_2_5SER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.under_2_5SER > 2) {
                explanation.push("Under 2.5 goals have been scored in the last " + this.props.homeOBJAll.under_2_5SER + " of " + homeTeam + " games");
            }


            explanation.push("Under 2.5 goals have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Under 2.5 goals have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.under_2_5SER > 2) {
                explanation.push("Under 2.5 goals have been scored in the last " + this.props.awayOBJAway.under_2_5SER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.under_2_5SER > 2) {
                explanation.push("Under 2.5 goals have been scored in the last " + this.props.awayOBJAll.under_2_5SER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.under_2_5 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }

        // Over 0.5 goals First Half
        chance = this.calcChance("over_0_5_HT", "over_0_5_HT", 82);
        if (chance.total >= 80) {
            explanation.length = 0;

            tip = "Over 0.5 Goals First Half";

            explanation.push("Over 0.5 goals at HT have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 0.5 goals at HT have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_0_5_HTSER > 2) {
                explanation.push("Over 0.5 goals at HT have been scored in the last " + this.props.homeOBJHome.over_0_5_HTSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_0_5_HTSER > 2) {
                explanation.push("Over 0.5 goals at HT have been scored in the last " + this.props.homeOBJAll.over_0_5_HTSER + " of " + homeTeam + " games");
            }


            explanation.push("Over 0.5 goals at HT have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 0.5 goals at HT have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_0_5_HTSER > 2) {
                explanation.push("Over 0.5 goals at HT have been scored in the last " + this.props.awayOBJAway.over_0_5_HTSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_0_5_HTSER > 2) {
                explanation.push("Over 0.5 goals at HT have been scored in the last " + this.props.awayOBJAll.over_0_5_HTSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_0_5_HT === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }

        // Over 1.5 goals at First Half
        chance = this.calcChance("over_1_5_HT", "over_1_5_HT", 60);
        if (chance.total >= 60) {
            explanation.length = 0;

            tip = "Over 1.5 Goals First Half";

            explanation.push("Over 1.5 goals at HT have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 1.5 goals at HT have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_1_5_HTSER > 2) {
                explanation.push("Over 1.5 goals at HT have been scored in the last " + this.props.homeOBJHome.over_1_5_HTSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_1_5_HTSER > 2) {
                explanation.push("Over 1.5 goals at HT have been scored in the last " + this.props.homeOBJAll.over_1_5_HTSER + " of " + homeTeam + " games");
            }


            explanation.push("Over 1.5 goals at HT have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 1.5 goals at HT have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_1_5_HTSER > 2) {
                explanation.push("Over 1.5 goals at HT have been scored in the last " + this.props.awayOBJAway.over_1_5_HTSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_1_5_HTSER > 2) {
                explanation.push("Over 1.5 goals at HT have been scored in the last " + this.props.awayOBJAll.over_1_5_HTSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_1_5_HT === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 45 && chance.total <= 59) {
            explanation.length = 0;

            tip = "Over 1.5 Goals First Half";

            explanation.push("Over 1.5 goals at HT have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 1.5 goals at HT have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_1_5_HTSER > 2) {
                explanation.push("Over 1.5 goals at HT have been scored in the last " + this.props.homeOBJHome.over_1_5_HTSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_1_5_HTSER > 2) {
                explanation.push("Over 1.5 goals at HT have been scored in the last " + this.props.homeOBJAll.over_1_5_HTSER + " of " + homeTeam + " games");
            }


            explanation.push("Over 1.5 goals at HT have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 1.5 goals at HT have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_1_5_HTSER > 2) {
                explanation.push("Over 1.5 goals at HT have been scored in the last " + this.props.awayOBJAway.over_1_5_HTSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_1_5_HTSER > 2) {
                explanation.push("Over 1.5 goals at HT have been scored in the last " + this.props.awayOBJAll.over_1_5_HTSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_1_5_HT === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Over 2.5 goals First Half
        chance = this.calcChance("over_2_5_HT", "over_2_5_HT", 50);
        if (chance.total >= 50) {
            explanation.length = 0;

            tip = "Over 2.5 Goals First Half";

            explanation.push("Over 2.5 goals at HT have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 2.5 goals at HT have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_2_5_HTSER > 2) {
                explanation.push("Over 2.5 goals at HT have been scored in the last " + this.props.homeOBJHome.over_2_5_HTSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_2_5_HTSER > 2) {
                explanation.push("Over 2.5 goals at HT have been scored in the last " + this.props.homeOBJAll.over_2_5_HTSER + " of " + homeTeam + " games");
            }


            explanation.push("Over 2.5 goals at HT have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 2.5 goals at HT have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_2_5_HTSER > 2) {
                explanation.push("Over 2.5 goals at HT have been scored in the last " + this.props.awayOBJAway.over_2_5_HTSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_2_5_HTSER > 2) {
                explanation.push("Over 2.5 goals at HT have been scored in the last " + this.props.awayOBJAll.over_2_5_HTSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_2_5_HT === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 30 && chance.total <= 49) {
            explanation.length = 0;

            tip = "Over 2.5 Goals First Half";

            explanation.push("Over 2.5 goals at HT have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 2.5 goals at HT have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_2_5_HTSER > 2) {
                explanation.push("Over 2.5 goals at HT have been scored in the last " + this.props.homeOBJHome.over_2_5_HTSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_2_5_HTSER > 2) {
                explanation.push("Over 2.5 goals at HT have been scored in the last " + this.props.homeOBJAll.over_2_5_HTSER + " of " + homeTeam + " games");
            }


            explanation.push("Over 2.5 goals at HT have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 2.5 goals at HT have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_2_5_HTSER > 2) {
                explanation.push("Over 2.5 goals at HT have been scored in the last " + this.props.awayOBJAway.over_2_5_HTSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_2_5_HTSER > 2) {
                explanation.push("Over 2.5 goals at HT have been scored in the last " + this.props.awayOBJAll.over_2_5_HTSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_2_5_HT === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Over 0.5 goals at Second Half
        chance = this.calcChance("over_0_5_SH", "over_0_5_SH", 82);
        if (chance.total >= 82) {
            explanation.length = 0;

            tip = "Over 0.5 Goals Second Half";

            explanation.push("Over 0.5 goals at second half have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 0.5 goals at second half have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_0_5_SHSER > 2) {
                explanation.push("Over 0.5 goals at second half have been scored in the last " + this.props.homeOBJHome.over_0_5_SHSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_0_5_SHSER > 2) {
                explanation.push("Over 0.5 goals at second half have been scored in the last " + this.props.homeOBJAll.over_0_5_SHSER + " of " + homeTeam + " games");
            }


            explanation.push("Over 0.5 goals at second half have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 0.5 goals at second half have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_0_5_SHSER > 2) {
                explanation.push("Over 0.5 goals at second half have been scored in the last " + this.props.awayOBJAway.over_0_5_SHSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_0_5_SHSER > 2) {
                explanation.push("Over 0.5 goals at second half have been scored in the last " + this.props.awayOBJAll.over_0_5_SHSER + " of " + awayTeam + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_0_5_SH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }

        // Over 1.5 goals at Second Half
        chance = this.calcChance("over_1_5_SH", "over_1_5_SH", 65);
        if (chance.total >= 65) {
            explanation.length = 0;

            tip = "Over 1.5 Goals Second Half";

            explanation.push("Over 1.5 goals at second half have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 1.5 goals at second half have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_1_5_SHSER > 2) {
                explanation.push("Over 1.5 goals at second half have been scored in the last " + this.props.homeOBJHome.over_1_5_SHSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_1_5_SHSER > 2) {
                explanation.push("Over 1.5 goals at second half have been scored in the last " + this.props.homeOBJAll.over_1_5_SHSER + " of " + homeTeam + " games");
            }


            explanation.push("Over 1.5 goals at second half have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 1.5 goals at second half have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_1_5_SHSER > 2) {
                explanation.push("Over 1.5 goals at second half have been scored in the last " + this.props.awayOBJAway.over_1_5_SHSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_1_5_SHSER > 2) {
                explanation.push("Over 1.5 goals at second half have been scored in the last " + this.props.awayOBJAll.over_1_5_SHSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_1_5_SH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 55 && chance.total <= 64) {
            explanation.length = 0;

            tip = "Over 1.5 Goals Second Half";

            explanation.push("Over 1.5 goals at second half have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 1.5 goals at second half have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_1_5_SHSER > 2) {
                explanation.push("Over 1.5 goals at second half have been scored in the last " + this.props.homeOBJHome.over_1_5_SHSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_1_5_SHSER > 2) {
                explanation.push("Over 1.5 goals at second half have been scored in the last " + this.props.homeOBJAll.over_1_5_SHSER + " of " + homeTeam + " games");
            }


            explanation.push("Over 1.5 goals at second half have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 1.5 goals at second half have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_1_5_SHSER > 2) {
                explanation.push("Over 1.5 goals at second half have been scored in the last " + this.props.awayOBJAway.over_1_5_SHSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_1_5_SHSER > 2) {
                explanation.push("Over 1.5 goals at second half have been scored in the last " + this.props.awayOBJAll.over_1_5_SHSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_1_5_SH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Over 2.5 goals at Second Half
        chance = this.calcChance("over_2_5_SH", "over_2_5_SH", 50);
        if (chance.total >= 50) {
            explanation.length = 0;

            tip = "Over 2.5 Goals Second Half";

            explanation.push("Over 2.5 goals at second half have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 2.5 goals at second half have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_2_5_SHSER > 2) {
                explanation.push("Over 2.5 goals at second half have been scored in the last " + this.props.homeOBJHome.over_2_5_SHSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_2_5_SHSER > 2) {
                explanation.push("Over 2.5 goals at second half have been scored in the last " + this.props.homeOBJAll.over_2_5_SHSER + " of " + homeTeam + " games");
            }


            explanation.push("Over 2.5 goals at second half have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 2.5 goals at second half have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_2_5_SHSER > 2) {
                explanation.push("Over 2.5 goals at second half have been scored in the last " + this.props.awayOBJAway.over_2_5_SHSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_2_5_SHSER > 2) {
                explanation.push("Over 2.5 goals at second half have been scored in the last " + this.props.awayOBJAll.over_2_5_SHSER + " of " + awayTeam + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_2_5_SH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 38 && chance.total <= 50) {
            explanation.length = 0;

            tip = "Over 2.5 Goals Second Half";

            explanation.push("Over 2.5 goals at second half have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Over 2.5 goals at second half have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.over_2_5_SHSER > 2) {
                explanation.push("Over 2.5 goals at second half have been scored in the last " + this.props.homeOBJHome.over_2_5_SHSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.over_2_5_SHSER > 2) {
                explanation.push("Over 2.5 goals at second half have been scored in the last " + this.props.homeOBJAll.over_2_5_SHSER + " of " + homeTeam + " games");
            }


            explanation.push("Over 2.5 goals at second half have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Over 2.5 goals at second half have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.over_2_5_SHSER > 2) {
                explanation.push("Over 2.5 goals at second half have been scored in the last " + this.props.awayOBJAway.over_2_5_SHSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.over_2_5_SHSER > 2) {
                explanation.push("Over 2.5 goals at second half have been scored in the last " + this.props.awayOBJAll.over_2_5_SHSER + " of " + awayTeam + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.over_2_5_SH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Both teams to score
        chance = this.calcChance("bts", "bts", 68);
        if (chance.total >= 68) {
            explanation.length = 0;

            tip = "Both Teams To Score (BTTS)";

            explanation.push("Both teams have scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Both teams have scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.btsSER > 2) {
                explanation.push("Both teams have scored in the last " + this.props.homeOBJHome.btsSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.btsSER > 2) {
                explanation.push("Both teams have scored in the last " + this.props.homeOBJAll.btsSER + " of " + homeTeam + " games");
            }


            explanation.push("Both teams have scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Both teams have scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.btsSER > 2) {
                explanation.push("Both teams have scored in the last " + this.props.awayOBJAway.btsSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.btsSER > 2) {
                explanation.push("Both teams have scored in the last " + this.props.awayOBJAll.btsSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.bts === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 60 && chance.total <= 67) {
            explanation.length = 0;

            tip = "Both Teams To Score (BTTS)";

            explanation.push("Both teams have scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Both teams have scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.btsSER > 2) {
                explanation.push("Both teams have scored in the last " + this.props.homeOBJHome.btsSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.btsSER > 2) {
                explanation.push("Both teams have scored in the last " + this.props.homeOBJAll.btsSER + " of " + homeTeam + " games");
            }


            explanation.push("Both teams have scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Both teams have scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.btsSER > 2) {
                explanation.push("Both teams have scored in the last " + this.props.awayOBJAway.btsSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.btsSER > 2) {
                explanation.push("Both teams have scored in the last " + this.props.awayOBJAll.btsSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.bts === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Both teams to score First Half
        chance = this.calcChance("btsFH", "btsFH", 48);
        if (chance.total >= 48) {
            explanation.length = 0;

            tip = "Both Teams To Score First Half";

            explanation.push("Both teams have scored in the first half in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Both teams have scored in the first half in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.btsFHSER > 2) {
                explanation.push("Both teams have scored in the first half in the last " + this.props.homeOBJHome.btsFHSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.btsFHSER > 2) {
                explanation.push("Both teams have scored in the first half in the last " + this.props.homeOBJAll.btsFHSER + " of " + homeTeam + " games");
            }


            explanation.push("Both teams have scored in the first half in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Both teams have scored in the first half in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.btsFHSER > 2) {
                explanation.push("Both teams have scored in the first half in the last " + this.props.awayOBJAway.btsFHSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.btsFHSER > 2) {
                explanation.push("Both teams have scored in the first half in the last " + this.props.awayOBJAll.btsFHSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.btsFH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 33 && chance.total <= 47) {
            explanation.length = 0;

            tip = "Both Teams To Score First Half";

            explanation.push("Both teams have scored in the first half in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Both teams have scored in the first half in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.btsFHSER > 2) {
                explanation.push("Both teams have scored in the first half in the last " + this.props.homeOBJHome.btsFHSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.btsFHSER > 2) {
                explanation.push("Both teams have scored in the first half in the last " + this.props.homeOBJAll.btsFHSER + " of " + homeTeam + " games");
            }


            explanation.push("Both teams have scored in the first half in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Both teams have scored in the first half in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.btsFHSER > 2) {
                explanation.push("Both teams have scored in the first half in the last " + this.props.awayOBJAway.btsFHSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.btsFHSER > 2) {
                explanation.push("Both teams have scored in the first half in the last " + this.props.awayOBJAll.btsFHSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.btsFH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }

        // Both teams to score Second Half
        chance = this.calcChance("BTTS_SH", "BTTS_SH", 55);
        if (chance.total >= 55) {
            explanation.length = 0;

            tip = "Both Teams To Score Second Half";

            explanation.push("Both teams have scored in the second half in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Both teams have scored in the second half in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.BTTS_SHSER > 2) {
                explanation.push("Both teams have scored in the second half in the last " + this.props.homeOBJHome.BTTS_SHSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.BTTS_SHSER > 2) {
                explanation.push("Both teams have scored in the second half in the last " + this.props.homeOBJAll.BTTS_SHSER + " of " + homeTeam + " games");
            }


            explanation.push("Both teams have scored in the second half in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Both teams have scored in the second half in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.BTTS_SHSER > 2) {
                explanation.push("Both teams have scored in the second half in the last " + this.props.awayOBJAway.BTTS_SHSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.BTTS_SHSER > 2) {
                explanation.push("Both teams have scored in the second half in the last " + this.props.awayOBJAll.BTTS_SHSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.BTTS_SH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 45 && chance.total <= 54) {
            explanation.length = 0;

            tip = "Both Teams To Score Second Half";

            explanation.push("Both teams have scored in the second half in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Both teams have scored in the second half in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.BTTS_SHSER > 2) {
                explanation.push("Both teams have scored in the second half in the last " + this.props.homeOBJHome.BTTS_SHSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.BTTS_SHSER > 2) {
                explanation.push("Both teams have scored in the second half in the last " + this.props.homeOBJAll.BTTS_SHSER + " of " + homeTeam + " games");
            }


            explanation.push("Both teams have scored in the second half in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Both teams have scored in the second half in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.BTTS_SHSER > 2) {
                explanation.push("Both teams have scored in the second half in the last " + this.props.awayOBJAway.BTTS_SHSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.BTTS_SHSER > 2) {
                explanation.push("Both teams have scored in the second half in the last " + this.props.awayOBJAll.BTTS_SHSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.BTTS_SH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }


        // BTTS And Over 2.5 Goals
        chance = this.calcChance("btts3", "btts3", 65);
        if (chance.total >= 65) {
            explanation.length = 0;

            tip = "BTTS And Over 2.5 Goals";

            explanation.push("BTTS and over 2.5 goals have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("BTTS and over 2.5 goals have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.btts3SER > 2) {
                explanation.push("BTTS and over 2.5 goals have been scored in the last " + this.props.homeOBJHome.btts3SER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.btts3SER > 2) {
                explanation.push("BTTS and over 2.5 goals have been scored in the last " + this.props.homeOBJAll.btts3SER + " of " + homeTeam + " games");
            }


            explanation.push("BTTS and over 2.5 goals have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("BTTS and over 2.5 goals have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.btts3SER > 2) {
                explanation.push("BTTS and over 2.5 goals have been scored in the last " + this.props.awayOBJAway.btts3SER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.btts3SER > 2) {
                explanation.push("BTTS and over 2.5 goals have been scored in the last " + this.props.awayOBJAll.btts3SER + " of " + awayTeam + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.btts3 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 55 && chance.total <= 64) {
            explanation.length = 0;

            tip = "BTTS And Over 2.5 Goals";

            explanation.push("BTTS and over 2.5 goals have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("BTTS and over 2.5 goals have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.btts3SER > 2) {
                explanation.push("BTTS and over 2.5 goals have been scored in the last " + this.props.homeOBJHome.btts3SER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.btts3SER > 2) {
                explanation.push("BTTS and over 2.5 goals have been scored in the last " + this.props.homeOBJAll.btts3SER + " of " + homeTeam + " games");
            }


            explanation.push("BTTS and over 2.5 goals have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("BTTS and over 2.5 goals have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.btts3SER > 2) {
                explanation.push("BTTS and over 2.5 goals have been scored in the last " + this.props.awayOBJAway.btts3SER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.btts3SER > 2) {
                explanation.push("BTTS and over 2.5 goals have been scored in the last " + this.props.awayOBJAll.btts3SER + " of " + awayTeam + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.btts3 === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }

        // Home Team Win and BTTS
        chance = this.calcChance("win_BTTS", "lose_BTTS", 60);
        if (chance.total >= 60) {
            explanation.length = 0;

            tip = homeTeam + " to Win and BTTS";

            explanation.push("Both teams have scored and " + homeTeam + " won in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Both teams have scored and " + homeTeam + " won in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.win_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + homeTeam + " won in last " + this.props.homeOBJHome.win_BTTSSER + " home games");
            }

            if (this.props.homeOBJAll.win_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + homeTeam + " won in last " + this.props.homeOBJAll.win_BTTSSER + " games");
            }


            explanation.push("Both teams have scored and " + awayTeam + " lost in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Both teams have scored and " + awayTeam + " lost in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.lose_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + awayTeam + " lost in last " + this.props.awayOBJAway.lose_BTTSSER + " away games");
            }

            if (this.props.awayOBJAll.lose_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + awayTeam + " lost in last " + this.props.awayOBJAll.lose_BTTSSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.win_BTTS === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 50 && chance.total <= 59) {
            explanation.length = 0;

            tip = homeTeam + " to Win and BTTS";

            explanation.push("Both teams have scored and " + homeTeam + " won in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Both teams have scored and " + homeTeam + " won in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.win_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + homeTeam + " won in last " + this.props.homeOBJHome.win_BTTSSER + " home games");
            }

            if (this.props.homeOBJAll.win_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + homeTeam + " won in last " + this.props.homeOBJAll.win_BTTSSER + " games");
            }


            explanation.push("Both teams have scored and " + awayTeam + " lost in " + chance.a1_perc + "% of their home games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Both teams have scored and " + awayTeam + " lost in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.lose_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + awayTeam + " lost in last " + this.props.awayOBJAway.lose_BTTSSER + " away games");
            }

            if (this.props.awayOBJAll.lose_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + awayTeam + " lost in last " + this.props.awayOBJAll.lose_BTTSSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.win_BTTS === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }

        // Away Team Win and BTTS
        chance = this.calcChance("lose_BTTS", "win_BTTS", 60);
        if (chance.total >= 60) {
            explanation.length = 0;

            tip = awayTeam + " to Win and BTTS";

            explanation.push("Both teams have scored and " + homeTeam + " lost in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Both teams have scored and " + homeTeam + " lost in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.lose_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + homeTeam + " won in last " + this.props.homeOBJHome.lose_BTTSSER + " home games");
            }

            if (this.props.homeOBJAll.lose_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + homeTeam + " won in last " + this.props.homeOBJAll.lose_BTTSSER + " games");
            }


            explanation.push("Both teams have scored and " + awayTeam + " won in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Both teams have scored and " + awayTeam + " won in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.win_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + awayTeam + " won in last " + this.props.awayOBJAway.win_BTTSSER + " away games");
            }

            if (this.props.awayOBJAll.win_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + awayTeam + " won in last " + this.props.awayOBJAll.win_BTTSSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.lose_BTTS === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 50 && chance.total <= 59) {
            explanation.length = 0;

            tip = awayTeam + " to Win and BTTS";

            explanation.push("Both teams have scored and " + homeTeam + " lost in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Both teams have scored and " + homeTeam + " lost in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.lose_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + homeTeam + " won in last " + this.props.homeOBJHome.lose_BTTSSER + " home games");
            }

            if (this.props.homeOBJAll.lose_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + homeTeam + " won in last " + this.props.homeOBJAll.lose_BTTSSER + " games");
            }


            explanation.push("Both teams have scored and " + awayTeam + " won in " + chance.a1_perc + "% of their home games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Both teams have scored and " + awayTeam + " won in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.win_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + awayTeam + " won in last " + this.props.awayOBJAway.win_BTTSSER + " away games");
            }

            if (this.props.awayOBJAll.win_BTTSSER > 2) {
                explanation.push("Both teams have scored and " + awayTeam + " won in last " + this.props.awayOBJAll.win_BTTSSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.lose_BTTS === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }

        // Draw and BTTS - IZBACENO


        // Home Team Win Half TIme
        chance = this.calcChance("leadHT", "loseHT", 58);
        if (chance.total >= 58) {
            explanation.length = 0;

            tip = homeTeam + " To Win Half-Time";

            explanation.push(homeTeam + " led at half-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " led at half-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.leadHTSER > 2) {
                explanation.push(homeTeam + " led at half-time in last " + this.props.homeOBJHome.leadHTSER + " home games");
            }

            if (this.props.homeOBJAll.leadHTSER > 2) {
                explanation.push(homeTeam + " led at half-time in last " + this.props.homeOBJAll.leadHTSER + " games");
            }


            explanation.push(awayTeam + " lost at half-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " lost at half-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.loseHTSER > 2) {
                explanation.push(awayTeam + " lost at half-time in last " + this.props.awayOBJAway.loseHTSER + " away games");
            }

            if (this.props.awayOBJAll.loseHTSER > 2) {
                explanation.push(awayTeam + " lost at half-time in last " + this.props.awayOBJAll.loseHTSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.leadHT === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 50 && chance.total <= 57) {
            explanation.length = 0;

            tip = homeTeam + " To Win Half-Time";

            explanation.push(homeTeam + " led at half-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " led at half-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.leadHTSER > 2) {
                explanation.push(homeTeam + " led at half-time in last " + this.props.homeOBJHome.leadHTSER + " home games");
            }

            if (this.props.homeOBJAll.leadHTSER > 2) {
                explanation.push(homeTeam + " led at half-time in last " + this.props.homeOBJAll.leadHTSER + " games");
            }


            explanation.push(awayTeam + " lost at half-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " lost at half-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.loseHTSER > 2) {
                explanation.push(awayTeam + " lost at half-time in last " + this.props.awayOBJAway.loseHTSER + " away games");
            }

            if (this.props.awayOBJAll.loseHTSER > 2) {
                explanation.push(awayTeam + " lost at half-time in last " + this.props.awayOBJAll.loseHTSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.leadHT === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }



        // Away Team Win Half TIme
        chance = this.calcChance("loseHT", "leadHT", 58);
        if (chance.total >= 58) {
            explanation.length = 0;

            tip = awayTeam + " To Win Half-Time";

            explanation.push(homeTeam + " lost at half-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " lost at half-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.loseHTSER > 2) {
                explanation.push(homeTeam + " lost at half-time in last " + this.props.homeOBJHome.loseHTSER + " home games");
            }

            if (this.props.homeOBJAll.loseHTSER > 2) {
                explanation.push(homeTeam + " lost at half-time in last " + this.props.homeOBJAll.loseHTSER + " games");
            }


            explanation.push(awayTeam + " won at half-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " won at half-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.leadHTSER > 2) {
                explanation.push(awayTeam + " won at half-time in last " + this.props.awayOBJAway.leadHTSER + " away games");
            }

            if (this.props.awayOBJAll.leadHTSER > 2) {
                explanation.push(awayTeam + " won at half-time in last " + this.props.awayOBJAll.leadHTSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.loseHT === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 50 && chance.total <= 57) {
            explanation.length = 0;

            tip = awayTeam + " To Win Half-Time";

            explanation.push(homeTeam + " lost at half-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " lost at half-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.loseHTSER > 2) {
                explanation.push(homeTeam + " lost at half-time in last " + this.props.homeOBJHome.loseHTSER + " home games");
            }

            if (this.props.homeOBJAll.loseHTSER > 2) {
                explanation.push(homeTeam + " lost at half-time in last " + this.props.homeOBJAll.loseHTSER + " games");
            }


            explanation.push(awayTeam + " won at half-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " won at half-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.leadHTSER > 2) {
                explanation.push(awayTeam + " won at half-time in last " + this.props.awayOBJAway.leadHTSER + " away games");
            }

            if (this.props.awayOBJAll.leadHTSER > 2) {
                explanation.push(awayTeam + " won at half-time in last " + this.props.awayOBJAll.leadHTSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.loseHT === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }


        // Draw Half TIme
        chance = this.calcChance("drawHT", "drawHT", 62);
        if (chance.total >= 62) {
            explanation.length = 0;

            tip = "Draw Half-Time";

            explanation.push(homeTeam + " draw at half-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " draw at half-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.drawHTSER > 2) {
                explanation.push(homeTeam + " draw at half-time in last " + this.props.homeOBJHome.drawHTSER + " home games");
            }

            if (this.props.homeOBJAll.drawHTSER > 2) {
                explanation.push(homeTeam + " draw at half-time in last " + this.props.homeOBJAll.drawHTSER + " games");
            }


            explanation.push(awayTeam + " draw at half-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " draw at half-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.drawHTSER > 2) {
                explanation.push(awayTeam + " draw at half-time in last " + this.props.awayOBJAway.drawHTSER + " away games");
            }

            if (this.props.awayOBJAll.drawHTSER > 2) {
                explanation.push(awayTeam + " draw at half-time in last " + this.props.awayOBJAll.drawHTSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.drawHT === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 55 && chance.total <= 61) {
            explanation.length = 0;

            tip = "Draw Half-Time";

            explanation.push(homeTeam + " draw at half-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " draw at half-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.drawHTSER > 2) {
                explanation.push(homeTeam + " draw at half-time in last " + this.props.homeOBJHome.drawHTSER + " home games");
            }

            if (this.props.homeOBJAll.drawHTSER > 2) {
                explanation.push(homeTeam + " draw at half-time in last " + this.props.homeOBJAll.drawHTSER + " games");
            }


            explanation.push(awayTeam + " draw at half-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " draw at half-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.drawHTSER > 2) {
                explanation.push(awayTeam + " draw at half-time in last " + this.props.awayOBJAway.drawHTSER + " away games");
            }

            if (this.props.awayOBJAll.drawHTSER > 2) {
                explanation.push(awayTeam + " draw at half-time in last " + this.props.awayOBJAll.drawHTSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.drawHT === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Home Team To Score in First Half
        chance = this.calcChance("sinFH", "cc_0_5_FH", 70);
        if (chance.total >= 70) {
            explanation.length = 0;

            tip = homeTeam + " To Score First Half";

            explanation.push(homeTeam + " scored in the first half in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " scored in the first half in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.sinFHSER > 2) {
                explanation.push(homeTeam + " scored in the first half in the last " + this.props.homeOBJHome.sinFHSER + " of their home games");
            }

            if (this.props.homeOBJAll.sinFHSER > 2) {
                explanation.push(homeTeam + " scored in the first half in the last " + this.props.homeOBJAll.sinFHSER + " games");
            }

            explanation.push(awayTeam + " conceded over 0.5 goals in the first half in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " conceded over 0.5 goals in the first half in " + chance.a2_perc + "% games");
            }

            if (this.props.awayOBJAway.cc_0_5_FHSER > 2) {
                explanation.push(awayTeam + " conceded over 0.5 goals in the first half in the last " + this.props.awayOBJAway.cc_0_5_FHSER + " of their away games");
            }

            if (this.props.awayOBJAll.cc_0_5_FHSER > 2) {
                explanation.push(awayTeam + " conceded over 0.5 goals in the first half in the last " + this.props.awayOBJAll.cc_0_5_FHSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.sinFH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 60 && chance.total <= 69) {
            explanation.length = 0;

            tip = homeTeam + " To Score First Half";

            explanation.push(homeTeam + " scored in the first half in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " scored in the first half in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.sinFHSER > 2) {
                explanation.push(homeTeam + " scored in the first half in the last " + this.props.homeOBJHome.sinFHSER + " of their home games");
            }

            if (this.props.homeOBJAll.sinFHSER > 2) {
                explanation.push(homeTeam + " scored in the first half in the last " + this.props.homeOBJAll.sinFHSER + " games");
            }

            explanation.push(awayTeam + " conceded over 0.5 goals in the first half in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " conceded over 0.5 goals in the first half in " + chance.a2_perc + "% games");
            }

            if (this.props.awayOBJAway.cc_0_5_FHSER > 2) {
                explanation.push(awayTeam + " conceded over 0.5 goals in the first half in the last " + this.props.awayOBJAway.cc_0_5_FHSER + " of their away games");
            }

            if (this.props.awayOBJAll.cc_0_5_FHSER > 2) {
                explanation.push(awayTeam + " conceded over 0.5 goals in the first half in the last " + this.props.awayOBJAll.cc_0_5_FHSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.sinFH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Away Team To Score in First Half
        chance = this.calcChance("cc_0_5_FH", "sinFH", 70);
        if (chance.total >= 70) {
            explanation.length = 0;

            tip = awayTeam + " To Score First Half";

            explanation.push(homeTeam + " conceded over 0.5 goals in the first half in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " conceded over 0.5 goals in the first half in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.cc_0_5_FHSER > 2) {
                explanation.push(homeTeam + " conceded over 0.5 goals in the first half in the last " + this.props.homeOBJHome.cc_0_5_FHSER + " of their home games");
            }

            if (this.props.homeOBJAll.cc_0_5_FHSER > 2) {
                explanation.push(homeTeam + " conceded over 0.5 goals in the first half in the last " + this.props.homeOBJAll.cc_0_5_FHSER + " games");
            }

            explanation.push(awayTeam + " scored in the first half in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " scored in the first half in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.sinFHSER > 2) {
                explanation.push(awayTeam + " scored in the first half in the last " + this.props.awayOBJAway.sinFHSER + " of their away games");
            }

            if (this.props.awayOBJAll.sinFHSER > 2) {
                explanation.push(awayTeam + " scored in the first half in the last " + this.props.awayOBJAll.sinFHSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.cc_0_5_FH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 60 && chance.total <= 69) {
            explanation.length = 0;

            tip = awayTeam + " To Score First Half";

            explanation.push(homeTeam + " conceded over 0.5 goals in the first half in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " conceded over 0.5 goals in the first half in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.cc_0_5_FHSER > 2) {
                explanation.push(homeTeam + " conceded over 0.5 goals in the first half in the last " + this.props.homeOBJHome.cc_0_5_FHSER + " of their home games");
            }

            if (this.props.homeOBJAll.cc_0_5_FHSER > 2) {
                explanation.push(homeTeam + " conceded over 0.5 goals in the first half in the last " + this.props.homeOBJAll.cc_0_5_FHSER + " games");
            }

            explanation.push(awayTeam + " scored in the first half in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " scored in the first half in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.sinFHSER > 2) {
                explanation.push(awayTeam + " scored in the first half in the last " + this.props.awayOBJAway.sinFHSER + " of their away games");
            }

            if (this.props.awayOBJAll.sinFHSER > 2) {
                explanation.push(awayTeam + " scored in the first half in the last " + this.props.awayOBJAll.sinFHSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.cc_0_5_FH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Home Team To Score in second Half
        chance = this.calcChance("sinSH", "cc_0_5_SH", 75);
        if (chance.total >= 75) {
            explanation.length = 0;

            tip = homeTeam + " To Score over 0.5 goals Second Half";

            explanation.push(homeTeam + " scored in the second half in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " scored in the second half in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.sinSHSER > 2) {
                explanation.push(homeTeam + " scored in the second half in the last " + this.props.homeOBJHome.sinSHSER + " of their home games");
            }

            if (this.props.homeOBJAll.sinSHSER > 2) {
                explanation.push(homeTeam + " scored in the second half in the last " + this.props.homeOBJAll.sinSHSER + " games");
            }

            explanation.push(awayTeam + " conceded goal in the second half in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " conceded goal in the second half in " + chance.a2_perc + "% games");
            }

            if (this.props.awayOBJAway.cc_0_5_SHSER > 2) {
                explanation.push(awayTeam + " conceded goal in the second half in the last " + this.props.awayOBJAway.cc_0_5_SHSER + " of their away games");
            }

            if (this.props.awayOBJAll.cc_0_5_SHSER > 2) {
                explanation.push(awayTeam + " conceded goal in the second half in the last " + this.props.awayOBJAll.cc_0_5_SHSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.sinSH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 68 && chance.total <= 74) {
            explanation.length = 0;

            tip = homeTeam + " To Score over 0.5 goals Second Half";

            explanation.push(homeTeam + " scored in the second half in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " scored in the second half in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.sinSHSER > 2) {
                explanation.push(homeTeam + " scored in the second half in the last " + this.props.homeOBJHome.sinSHSER + " of their home games");
            }

            if (this.props.homeOBJAll.sinSHSER > 2) {
                explanation.push(homeTeam + " scored in the second half in the last " + this.props.homeOBJAll.sinSHSER + " games");
            }

            explanation.push(awayTeam + " conceded goal in the second half in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " conceded goal in the second half in " + chance.a2_perc + "% games");
            }

            if (this.props.awayOBJAway.cc_0_5_SHSER > 2) {
                explanation.push(awayTeam + " conceded goal in the second half in the last " + this.props.awayOBJAway.cc_0_5_SHSER + " of their away games");
            }

            if (this.props.awayOBJAll.cc_0_5_SHSER > 2) {
                explanation.push(awayTeam + " conceded goal in the second half in the last " + this.props.awayOBJAll.cc_0_5_SHSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.sinSH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Away Team To Score in second Half
        chance = this.calcChance("cc_0_5_SH", "sinSH", 75);
        if (chance.total >= 75) {
            explanation.length = 0;

            tip = awayTeam + " To Score over 0.5 goals Second Half";

            explanation.push(homeTeam + " conceded goal in the second half in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " conceded goal in the second half in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.cc_0_5_SHSER > 2) {
                explanation.push(homeTeam + " conceded goal in the second half in the last " + this.props.homeOBJHome.cc_0_5_SHSER + " of their home games");
            }

            if (this.props.homeOBJAll.cc_0_5_SHSER > 2) {
                explanation.push(homeTeam + " conceded goal in the second half in the last " + this.props.homeOBJAll.cc_0_5_SHSER + " games");
            }

            explanation.push(awayTeam + " scored in the second half in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " scored in the second half in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.sinSHSER > 2) {
                explanation.push(awayTeam + " scored in the second half in the last " + this.props.awayOBJAway.sinSHSER + " of their away games");
            }

            if (this.props.awayOBJAll.sinSHSER > 2) {
                explanation.push(awayTeam + " scored in the second half in the last " + this.props.awayOBJAll.sinSHSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.cc_0_5_SH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 68 && chance.total <= 74) {
            explanation.length = 0;

            tip = awayTeam + " To Score over 0.5 goals Second Half";

            explanation.push(homeTeam + " conceded goal in the second half in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " conceded goal in the second half in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.cc_0_5_SHSER > 2) {
                explanation.push(homeTeam + " conceded goal in the second half in the last " + this.props.homeOBJHome.cc_0_5_SHSER + " of their home games");
            }

            if (this.props.homeOBJAll.cc_0_5_SHSER > 2) {
                explanation.push(homeTeam + " conceded goal in the second half in the last " + this.props.homeOBJAll.cc_0_5_SHSER + " games");
            }

            explanation.push(awayTeam + " scored in the second half in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " scored in the second half in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.sinSHSER > 2) {
                explanation.push(awayTeam + " scored in the second half in the last " + this.props.awayOBJAway.sinSHSER + " of their away games");
            }

            if (this.props.awayOBJAll.sinSHSER > 2) {
                explanation.push(awayTeam + " scored in the second half in the last " + this.props.awayOBJAll.sinSHSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.cc_0_5_SH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Home Team to Score in Both Halves
        chance = this.calcChance("sibh", "cc_sibh", 55);
        if (chance.total >= 55) {
            explanation.length = 0;

            tip = homeTeam + " To Score In Both Halves";

            explanation.push(homeTeam + " scored in both halves in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " scored in both halves in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.sibhSER > 2) {
                explanation.push(homeTeam + " scored in both halves in the last " + this.props.homeOBJHome.sibhSER + " of their home games");
            }

            if (this.props.homeOBJAll.sibhSER > 2) {
                explanation.push(homeTeam + " scored in both halves in the last " + this.props.homeOBJAll.sibhSER + " games");
            }

            explanation.push(awayTeam + " conceded in both halves in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " conceded in both halves in " + chance.a2_perc + "% games");
            }

            if (this.props.awayOBJAway.cc_sibhSER > 2) {
                explanation.push(awayTeam + " conceded in both halves in the last " + this.props.awayOBJAway.cc_sibhSER + " of their away games");
            }

            if (this.props.awayOBJAll.cc_sibhSER > 2) {
                explanation.push(awayTeam + " conceded in both halves in the last " + this.props.awayOBJAll.cc_sibhSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.sibh === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 43 && chance.total <= 54) {
            explanation.length = 0;

            tip = homeTeam + " To Score In Both Halves";

            explanation.push(homeTeam + " scored in both halves in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " scored in both halves in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.sibhSER > 2) {
                explanation.push(homeTeam + " scored in both halves in the last " + this.props.homeOBJHome.sibhSER + " of their home games");
            }

            if (this.props.homeOBJAll.sibhSER > 2) {
                explanation.push(homeTeam + " scored in both halves in the last " + this.props.homeOBJAll.sibhSER + " games");
            }

            explanation.push(awayTeam + " conceded in both halves in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " conceded in both halves in " + chance.a2_perc + "% games");
            }

            if (this.props.awayOBJAway.cc_sibhSER > 2) {
                explanation.push(awayTeam + " conceded in both halves in the last " + this.props.awayOBJAway.cc_sibhSER + " of their away games");
            }

            if (this.props.awayOBJAll.cc_sibhSER > 2) {
                explanation.push(awayTeam + " conceded in both halves in the last " + this.props.awayOBJAll.cc_sibhSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.sibh === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Away Team to Score in Both Halves
        chance = this.calcChance("cc_sibh", "sibh", 55);
        if (chance.total >= 55) {
            explanation.length = 0;

            tip = awayTeam + " To Score In Both Halves";

            explanation.push(homeTeam + " conceded in both halves in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " conceded in both halves in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.cc_sibhSER > 2) {
                explanation.push(homeTeam + " conceded in both halves in the last " + this.props.homeOBJHome.cc_sibhSER + " of their home games");
            }

            if (this.props.homeOBJAll.cc_sibhSER > 2) {
                explanation.push(homeTeam + " conceded in both halves in the last " + this.props.homeOBJAll.cc_sibhSER + " games");
            }

            explanation.push(awayTeam + " scored in both halves in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " scored in both halves in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.sibhSER > 2) {
                explanation.push(awayTeam + " scored in both halves in the last " + this.props.awayOBJAway.sibhSER + " of their away games");
            }

            if (this.props.awayOBJAll.sibhSER > 2) {
                explanation.push(awayTeam + " scored in both halves in the last " + this.props.awayOBJAll.sibhSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.cc_sibh === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 43 && chance.total <= 54) {
            explanation.length = 0;

            tip = awayTeam + " To Score In Both Halves";

            explanation.push(homeTeam + " conceded in both halves in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " conceded in both halves in " + chance.h2_perc + "% of all the games");
            }

            if (this.props.homeOBJHome.cc_sibhSER > 2) {
                explanation.push(homeTeam + " conceded in both halves in the last " + this.props.homeOBJHome.cc_sibhSER + " of their home games");
            }

            if (this.props.homeOBJAll.cc_sibhSER > 2) {
                explanation.push(homeTeam + " conceded in both halves in the last " + this.props.homeOBJAll.cc_sibhSER + " games");
            }

            explanation.push(awayTeam + " scored in both halves in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " scored in both halves in " + chance.a2_perc + "% of all the games");
            }

            if (this.props.awayOBJAway.sibhSER > 2) {
                explanation.push(awayTeam + " scored in both halves in the last " + this.props.awayOBJAway.sibhSER + " of their away games");
            }

            if (this.props.awayOBJAll.sibhSER > 2) {
                explanation.push(awayTeam + " scored in both halves in the last " + this.props.awayOBJAll.sibhSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.cc_sibh === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }

        // Goal in Both Halves
        chance = this.calcChance("gibh", "gibh", 70);
        if (chance.total >= 70) {
            explanation.length = 0;

            tip = "Goal In Both Halves";

            explanation.push("Goal in both halves have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Goal in both halves have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.gibhSER > 2) {
                explanation.push("Goal in both halves have been scored in the last " + this.props.homeOBJHome.gibhSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.gibhSER > 2) {
                explanation.push("Goal in both halves have been scored in the last " + this.props.homeOBJAll.gibhSER + " of " + homeTeam + " games");
            }

            explanation.push("Goal in both halves have been scored in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Goal in both halves have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.gibhSER > 2) {
                explanation.push("Goal in both halves have been scored in the last " + this.props.awayOBJAway.gibhSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.gibhSER > 2) {
                explanation.push("Goal in both halves have been scored in the last " + this.props.awayOBJAll.gibhSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.gibh === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 60 && chance.total <= 69) {
            explanation.length = 0;

            tip = "Goal In Both Halves";

            explanation.push("Goal in both halves have been scored in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("Goal in both halves have been scored in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.gibhSER > 2) {
                explanation.push("Goal in both halves have been scored in the last " + this.props.homeOBJHome.gibhSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.gibhSER > 2) {
                explanation.push("Goal in both halves have been scored in the last " + this.props.homeOBJAll.gibhSER + " of " + homeTeam + " games");
            }

            explanation.push("Goal in both halves have been scored in " + chance.a1_perc + "% of " + awayTeam + " home games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("Goal in both halves have been scored in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.gibhSER > 2) {
                explanation.push("Goal in both halves have been scored in the last " + this.props.awayOBJAway.gibhSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.gibhSER > 2) {
                explanation.push("Goal in both halves have been scored in the last " + this.props.awayOBJAll.gibhSER + " of " + awayTeam + " games");
            }


            final = null;

            if (final_result.isSet === 1) {
                if (final_result.gibh === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // More Goals First Half
        chance = this.calcChance("more_FH", "more_FH", 55);
        if (chance.total >= 55) {
            explanation.length = 0;

            tip = "More Goals First Half";

            explanation.push("More goals have been scored in the first half in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("More goals have been scored in the first half in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.more_FHSER > 2) {
                explanation.push("More goals have been scored in the first half in the last " + this.props.homeOBJHome.more_FHSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.more_FHSER > 2) {
                explanation.push("More goals have been scored in the first half in the last " + this.props.homeOBJAll.more_FHSER + " of " + homeTeam + " games");
            }


            explanation.push("More goals have been scored in the first half in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("More goals have been scored in the first half in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.more_FHSER > 2) {
                explanation.push("More goals have been scored in the first half in the last " + this.props.awayOBJAway.more_FHSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.more_FHSER > 2) {
                explanation.push("More goals have been scored in the first half in the last " + this.props.awayOBJAll.more_FHSER + " of " + awayTeam + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.more_FH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 45 && chance.total <= 54) {
            explanation.length = 0;

            tip = "More Goals First Half";

            explanation.push("More goals have been scored in the first half in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("More goals have been scored in the first half in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.more_FHSER > 2) {
                explanation.push("More goals have been scored in the first half in the last " + this.props.homeOBJHome.more_FHSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.more_FHSER > 2) {
                explanation.push("More goals have been scored in the first half in the last " + this.props.homeOBJAll.more_FHSER + " of " + homeTeam + " games");
            }


            explanation.push("More goals have been scored in the first half in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("More goals have been scored in the first half in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.more_FHSER > 2) {
                explanation.push("More goals have been scored in the first half in the last " + this.props.awayOBJAway.more_FHSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.more_FHSER > 2) {
                explanation.push("More goals have been scored in the first half in the last " + this.props.awayOBJAll.more_FHSER + " of " + awayTeam + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.more_FH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // More Goals Second Half
        chance = this.calcChance("more_SH", "more_SH", 65);
        if (chance.total >= 65) {
            explanation.length = 0;

            tip = "More Goals Second Half";

            explanation.push("More goals have been scored in the second half in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("More goals have been scored in the second half in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.more_SHSER > 2) {
                explanation.push("More goals have been scored in the second half in the last " + this.props.homeOBJHome.more_SHSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.more_SHSER > 2) {
                explanation.push("More goals have been scored in the second half in the last " + this.props.homeOBJAll.more_SHSER + " of " + homeTeam + " games");
            }


            explanation.push("More goals have been scored in the second half in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("More goals have been scored in the second half in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.more_SHSER > 2) {
                explanation.push("More goals have been scored in the second half in the last " + this.props.awayOBJAway.more_SHSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.more_SHSER > 2) {
                explanation.push("More goals have been scored in the second half in the last " + this.props.awayOBJAll.more_SHSER + " of " + awayTeam + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.more_SH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 55 && chance.total <= 64) {
            explanation.length = 0;

            tip = "More Goals Second Half";

            explanation.push("More goals have been scored in the second half in " + chance.h1_perc + "% of " + homeTeam + " home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push("More goals have been scored in the second half in " + chance.h2_perc + "% of " + homeTeam + " games");
            }

            if (this.props.homeOBJHome.more_SHSER > 2) {
                explanation.push("More goals have been scored in the second half in the last " + this.props.homeOBJHome.more_SHSER + " of " + homeTeam + " home games");
            }

            if (this.props.homeOBJAll.more_SHSER > 2) {
                explanation.push("More goals have been scored in the second half in the last " + this.props.homeOBJAll.more_SHSER + " of " + homeTeam + " games");
            }


            explanation.push("More goals have been scored in the second half in " + chance.a1_perc + "% of " + awayTeam + " away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push("More goals have been scored in the second half in " + chance.a2_perc + "% of " + awayTeam + " games");
            }

            if (this.props.awayOBJAway.more_SHSER > 2) {
                explanation.push("More goals have been scored in the second half in the last " + this.props.awayOBJAway.more_SHSER + " of " + awayTeam + " away games");
            }

            if (this.props.awayOBJAll.more_SHSER > 2) {
                explanation.push("More goals have been scored in the second half in the last " + this.props.awayOBJAll.more_SHSER + " of " + awayTeam + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.more_SH === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Home Team Win HT and Win FT
        chance = this.calcChance("home_home", "away_away", 58);
        if (chance.total >= 58) {
            explanation.length = 0;

            tip = homeTeam + " To Win Half-Time and Full-Time";

            explanation.push(homeTeam + " won both half-time and full-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " won both half-time and full-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.home_homeSER > 2) {
                explanation.push(homeTeam + " won both half-time and full-time in the last " + this.props.homeOBJHome.home_homeSER + " home games");
            }

            if (this.props.homeOBJAll.home_homeSER > 2) {
                explanation.push(homeTeam + " won both half-time and full-time in the last " + this.props.homeOBJAll.home_homeSER + " games");
            }


            explanation.push(awayTeam + " lost both half-time and full-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " lost both half-time and full-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.away_awaySER > 2) {
                explanation.push(awayTeam + " lost both half-time and full-time in the last " + this.props.awayOBJAway.away_awaySER + " away games");
            }

            if (this.props.awayOBJAll.away_awaySER > 2) {
                explanation.push(awayTeam + " lost both half-time and full-time in the last " + this.props.awayOBJAll.away_awaySER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.home_home === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 45 && chance.total <= 57) {
            explanation.length = 0;

            tip = homeTeam + " To Win Half-Time and Full-Time";

            explanation.push(homeTeam + " won both half-time and full-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " won both half-time and full-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.home_homeSER > 2) {
                explanation.push(homeTeam + " won both half-time and full-time in the last " + this.props.homeOBJHome.home_homeSER + " home games");
            }

            if (this.props.homeOBJAll.home_homeSER > 2) {
                explanation.push(homeTeam + " won both half-time and full-time in the last " + this.props.homeOBJAll.home_homeSER + " games");
            }


            explanation.push(awayTeam + " lost both half-time and full-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " lost both half-time and full-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.away_awaySER > 2) {
                explanation.push(awayTeam + " lost both half-time and full-time in the last " + this.props.awayOBJAway.away_awaySER + " away games");
            }

            if (this.props.awayOBJAll.away_awaySER > 2) {
                explanation.push(awayTeam + " lost both half-time and full-time in the last " + this.props.awayOBJAll.away_awaySER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.home_home === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Home Team Win HT and Draw FT
        chance = this.calcChance("home_draw", "away_draw", 20);
        if (chance.total >= 20) {
            explanation.length = 0;

            tip = homeTeam + " To Win Half-Time and Draw Full-Time";

            explanation.push(homeTeam + " won half-time and played a draw full-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " won half-time and played a draw full-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.home_drawSER > 2) {
                explanation.push(homeTeam + " won half-time and played a draw full-time in the last " + this.props.homeOBJHome.home_drawSER + " home games");
            }

            if (this.props.homeOBJAll.home_drawSER > 2) {
                explanation.push(homeTeam + " won half-time and played a draw full-time in the last " + this.props.homeOBJAll.home_drawSER + " games");
            }


            explanation.push(awayTeam + " lost half-time and played a draw full-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " lost half-time and played a draw full-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.away_drawSER > 2) {
                explanation.push(awayTeam + " lost half-time and played a draw full-time in the last " + this.props.awayOBJAway.away_drawSER + " away games");
            }

            if (this.props.awayOBJAll.away_drawSER > 2) {
                explanation.push(awayTeam + " lost half-time and played a draw full-time in the last " + this.props.awayOBJAll.away_drawSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.home_draw === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Home Team Win HT and Lose FT
        chance = this.calcChance("home_away", "away_home", 10);
        if (chance.total >= 10) {
            explanation.length = 0;

            tip = homeTeam + " To Win Half-Time and " + awayTeam + " To Win Full-Time";

            explanation.push(homeTeam + " won half-time and lost full-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " won half-time and lost full-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.home_awaySER > 2) {
                explanation.push(homeTeam + " won half-time and lost full-time in the last " + this.props.homeOBJHome.home_awaySER + " home games");
            }

            if (this.props.homeOBJAll.home_awaySER > 2) {
                explanation.push(homeTeam + " won half-time and lost full-time in the last " + this.props.homeOBJAll.home_awaySER + " games");
            }


            explanation.push(awayTeam + " lost half-time and won full-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " lost half-time and won full-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.away_homeSER > 2) {
                explanation.push(awayTeam + " lost half-time and won full-time in the last " + this.props.awayOBJAway.away_homeSER + " away games");
            }

            if (this.props.awayOBJAll.away_homeSER > 2) {
                explanation.push(awayTeam + " lost half-time and won full-time in the last " + this.props.awayOBJAll.away_homeSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.home_away === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }


        // Draw HT and home win FT
        chance = this.calcChance("draw_home", "draw_away", 45);
        if (chance.total >= 45) {
            explanation.length = 0;

            tip = "Draw Half-Time and " + homeTeam + " To Win Full-Time";

            explanation.push(homeTeam + " played a draw half-time and won full-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " played a draw half-time and won full-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.draw_homeSER > 2) {
                explanation.push(homeTeam + " played a draw half-time and won full-time in the last " + this.props.homeOBJHome.draw_homeSER + " home games");
            }

            if (this.props.homeOBJAll.draw_homeSER > 2) {
                explanation.push(homeTeam + " played a draw half-time and won full-time in the last " + this.props.homeOBJAll.draw_homeSER + " games");
            }


            explanation.push(awayTeam + " played a draw half-time and lost full-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " played a draw half-time and lost full-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.draw_awaySER > 2) {
                explanation.push(awayTeam + " played a draw half-time and lost full-time in the last " + this.props.awayOBJAway.draw_awaySER + " away games");
            }

            if (this.props.awayOBJAll.draw_awaySER > 2) {
                explanation.push(awayTeam + " played a draw half-time and lost full-time in the last " + this.props.awayOBJAll.draw_awaySER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.draw_home === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 33 && chance.total <= 44) {
            explanation.length = 0;

            tip = "Draw Half-Time and " + homeTeam + " To Win Full-Time";

            explanation.push(homeTeam + " played a draw half-time and won full-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " played a draw half-time and won full-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.draw_homeSER > 2) {
                explanation.push(homeTeam + " played a draw half-time and won full-time in the last " + this.props.homeOBJHome.draw_homeSER + " home games");
            }

            if (this.props.homeOBJAll.draw_homeSER > 2) {
                explanation.push(homeTeam + " played a draw half-time and won full-time in the last " + this.props.homeOBJAll.draw_homeSER + " games");
            }


            explanation.push(awayTeam + " played a draw half-time and lost full-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " played a draw half-time and lost full-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.draw_awaySER > 2) {
                explanation.push(awayTeam + " played a draw half-time and lost full-time in the last " + this.props.awayOBJAway.draw_awaySER + " away games");
            }

            if (this.props.awayOBJAll.draw_awaySER > 2) {
                explanation.push(awayTeam + " played a draw half-time and lost full-time in the last " + this.props.awayOBJAll.draw_awaySER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.draw_home === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }



        // Draw HT and away win FT
        chance = this.calcChance("draw_away", "draw_home", 45);
        if (chance.total >= 45) {
            explanation.length = 0;

            tip = "Draw Half-Time and " + awayTeam + " To Win Full-Time";

            explanation.push(homeTeam + " played a draw half-time and lost full-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " played a draw half-time and lost full-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.draw_awaySER > 2) {
                explanation.push(homeTeam + " played a draw half-time and lost full-time in the last " + this.props.homeOBJHome.draw_awaySER + " home games");
            }

            if (this.props.homeOBJAll.draw_awaySER > 2) {
                explanation.push(homeTeam + " played a draw half-time and lost full-time in the last " + this.props.homeOBJAll.draw_awaySER + " games");
            }


            explanation.push(awayTeam + " played a draw half-time and won full-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " played a draw half-time and won full-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.draw_homeSER > 2) {
                explanation.push(awayTeam + " played a draw half-time and won full-time in the last " + this.props.awayOBJAway.draw_homeSER + " away games");
            }

            if (this.props.awayOBJAll.draw_homeSER > 2) {
                explanation.push(awayTeam + " played a draw half-time and won full-time in the last " + this.props.awayOBJAll.draw_homeSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.draw_away === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 33 && chance.total <= 44) {
            explanation.length = 0;

            tip = "Draw Half-Time and " + awayTeam + " To Win Full-Time";

            explanation.push(homeTeam + " played a draw half-time and lost full-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " played a draw half-time and lost full-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.draw_awaySER > 2) {
                explanation.push(homeTeam + " played a draw half-time and lost full-time in the last " + this.props.homeOBJHome.draw_awaySER + " home games");
            }

            if (this.props.homeOBJAll.draw_awaySER > 2) {
                explanation.push(homeTeam + " played a draw half-time and lost full-time in the last " + this.props.homeOBJAll.draw_awaySER + " games");
            }


            explanation.push(awayTeam + " played a draw half-time and won full-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " played a draw half-time and won full-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.draw_homeSER > 2) {
                explanation.push(awayTeam + " played a draw half-time and won full-time in the last " + this.props.awayOBJAway.draw_homeSER + " away games");
            }

            if (this.props.awayOBJAll.draw_homeSER > 2) {
                explanation.push(awayTeam + " played a draw half-time and won full-time in the last " + this.props.awayOBJAll.draw_homeSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.draw_away === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Draw HT and Draw FT
        chance = this.calcChance("draw_draw", "draw_draw", 30);
        if (chance.total >= 30) {
            explanation.length = 0;

            tip = "Draw Half-Time and Draw Full-Time";

            explanation.push(homeTeam + " played a draw both half-time and full-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " played a draw both half-time and full-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.draw_drawSER > 2) {
                explanation.push(homeTeam + " played a draw both half-time and full-time in the last " + this.props.homeOBJHome.draw_drawSER + " home games");
            }

            if (this.props.homeOBJAll.draw_drawSER > 2) {
                explanation.push(homeTeam + " played a draw both half-time and full-time in the last " + this.props.homeOBJAll.draw_drawSER + " games");
            }


            explanation.push(awayTeam + " played a draw both half-time and full-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " played a draw both half-time and full-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.draw_drawSER > 2) {
                explanation.push(awayTeam + " played a draw both half-time and full-time in the last " + this.props.awayOBJAway.draw_drawSER + " away games");
            }

            if (this.props.awayOBJAll.draw_drawSER > 2) {
                explanation.push(awayTeam + " played a draw both half-time and full-time in the last " + this.props.awayOBJAll.draw_drawSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.draw_draw === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }


        // Away Team Win HT and Win FT
        chance = this.calcChance("away_away", "home_home", 58);
        if (chance.total >= 58) {
            explanation.length = 0;

            tip = awayTeam + " To Win Half-Time and Full-Time";

            explanation.push(homeTeam + " lost both half-time and full-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " lost both half-time and full-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.away_awaySER > 2) {
                explanation.push(homeTeam + " lost both half-time and full-time in the last " + this.props.homeOBJHome.away_awaySER + " home games");
            }

            if (this.props.homeOBJAll.away_awaySER > 2) {
                explanation.push(homeTeam + " lost both half-time and full-time in the last " + this.props.homeOBJAll.away_awaySER + " games");
            }


            explanation.push(awayTeam + " won both half-time and full-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " won both half-time and full-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.home_homeSER > 2) {
                explanation.push(awayTeam + " won both half-time and full-time in the last " + this.props.awayOBJAway.home_homeSER + " away games");
            }

            if (this.props.awayOBJAll.home_homeSER > 2) {
                explanation.push(awayTeam + " won both half-time and full-time in the last " + this.props.awayOBJAll.home_homeSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.away_away === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            recomendedObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        } else if (chance.total >= 45 && chance.total <= 57) {
            explanation.length = 0;

            tip = awayTeam + " To Win Half-Time and Full-Time";

            explanation.push(homeTeam + " lost both half-time and full-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " lost both half-time and full-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.away_awaySER > 2) {
                explanation.push(homeTeam + " lost both half-time and full-time in the last " + this.props.homeOBJHome.away_awaySER + " home games");
            }

            if (this.props.homeOBJAll.away_awaySER > 2) {
                explanation.push(homeTeam + " lost both half-time and full-time in the last " + this.props.homeOBJAll.away_awaySER + " games");
            }


            explanation.push(awayTeam + " won both half-time and full-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " won both half-time and full-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.home_homeSER > 2) {
                explanation.push(awayTeam + " won both half-time and full-time in the last " + this.props.awayOBJAway.home_homeSER + " away games");
            }

            if (this.props.awayOBJAll.home_homeSER > 2) {
                explanation.push(awayTeam + " won both half-time and full-time in the last " + this.props.awayOBJAll.home_homeSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.away_away === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });
        }


        // Away Team Win HT and Draw FT
        chance = this.calcChance("away_draw", "home_draw", 20);
        if (chance.total >= 20) {
            explanation.length = 0;

            tip = awayTeam + " To Win Half-Time and Draw Full-Time";

            explanation.push(homeTeam + " lost half-time and played a draw full-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " lost half-time and played a draw full-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.away_drawSER > 2) {
                explanation.push(homeTeam + " lost half-time and played a draw full-time in the last " + this.props.homeOBJHome.away_drawSER + " home games");
            }

            if (this.props.homeOBJAll.away_drawSER > 2) {
                explanation.push(homeTeam + " lost half-time and played a draw full-time in the last " + this.props.homeOBJAll.away_drawSER + " games");
            }


            explanation.push(awayTeam + " won half-time and played a draw full-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " won half-time and played a draw full-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.home_drawSER > 2) {
                explanation.push(awayTeam + " won half-time and played a draw full-time in the last " + this.props.awayOBJAway.home_drawSER + " away games");
            }

            if (this.props.awayOBJAll.home_drawSER > 2) {
                explanation.push(awayTeam + " won half-time and played a draw full-time in the last " + this.props.awayOBJAll.home_drawSER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.away_draw === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }



        // Away Team Win HT and Lose FT
        chance = this.calcChance("away_home", "home_away", 10);
        if (chance.total >= 10) {
            explanation.length = 0;

            tip = awayTeam + " To Win Half-Time and " + homeTeam + " To Win Full-Time";

            explanation.push(homeTeam + " lost half-time and won full-time in " + chance.h1_perc + "% of their home games");
            if (chance.h1_perc < chance.h2_perc) {
                explanation.push(homeTeam + " lost half-time and won full-time in " + chance.h2_perc + "% of their games");
            }

            if (this.props.homeOBJHome.away_homeSER > 2) {
                explanation.push(homeTeam + " lost half-time and won full-time in the last " + this.props.homeOBJHome.away_homeSER + " home games");
            }

            if (this.props.homeOBJAll.away_homeSER > 2) {
                explanation.push(homeTeam + " lost half-time and won full-time in the last " + this.props.homeOBJAll.away_homeSER + " games");
            }


            explanation.push(awayTeam + " won half-time and lost full-time in " + chance.a1_perc + "% of their away games");
            if (chance.a1_perc < chance.a2_perc) {
                explanation.push(awayTeam + " won half-time and lost full-time in " + chance.a2_perc + "% of their games");
            }

            if (this.props.awayOBJAway.home_awaySER > 2) {
                explanation.push(awayTeam + " won half-time and lost full-time in the last " + this.props.awayOBJAway.home_awaySER + " away games");
            }

            if (this.props.awayOBJAll.home_awaySER > 2) {
                explanation.push(awayTeam + " won half-time and lost full-time in the last " + this.props.awayOBJAll.home_awaySER + " games");
            }

            final = null;

            if (final_result.isSet === 1) {
                if (final_result.away_home === 1) {
                    final = true;
                } else {
                    final = false;
                }
            }

            couldTryObj.push({ tip: tip, explanation: [...explanation], chance: chance.total, final: final });

        }




        this.setState({
            recomendedObj: recomendedObj,
            couldTryObj: couldTryObj
        });
    }


    render() {


        let content = "";
        let result = "";

        if (this.props.final_results.isSet) {
            result = <div className={classes.result}>
                Result: {this.props.final_results.result}
            </div>
        }

        if (this.state.recomended) {

            if (this.state.recomendedObj.length > 0) {

                let sortedObj = [...this.state.recomendedObj];

                sortedObj.sort((a, b) => {
                    return b.chance - a.chance;
                });

                content = sortedObj.map((response, index) => {
                    return <TipsLine
                        key={index}
                        tip={response.tip}
                        explanation={response.explanation}
                        chance={response.chance}
                        final={response.final}
                    />
                });
            } else {
                content = <div className={classes.noTips}>
                    No available tips for this match.
                    </div>
            }

        } else {
            if (this.state.couldTryObj.length > 0) {

                let sortedObj = [...this.state.couldTryObj];

                sortedObj.sort((a, b) => {
                    return b.chance - a.chance;
                });

                content = sortedObj.map((response, index) => {
                    return <TipsLine
                        key={index}
                        tip={response.tip}
                        explanation={response.explanation}
                        chance={response.chance}
                        final={response.final}
                    />
                });
            } else {
                content = <div className={classes.noTips}>
                    No available tips for this match.
                    </div>
            }
        }

        return (
            <div id="sinBettBox" className={classes.SingleBettingBox}>
                <Title name="Betting Tips" />

                <div className={classes.overallButtons}>
                    <OverallButton o={this.state.recomended} click={this.setRecomended} name="Recommended" />
                    <OverallButton o={this.state.couldTry} click={this.setCouldTry} name="You Could Try" />
                </div>
                {result}
                {content}
            </div>
        );
    }
}

export default SingleBettingBox;