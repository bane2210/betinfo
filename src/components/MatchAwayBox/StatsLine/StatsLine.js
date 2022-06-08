import React, { useState } from 'react';
import classes from './StatsLine.module.css';


const StatsLine = (props) => {
    const [state, setState] = useState({
        open: false
    });

    const styleCalc = (x) => {

        if (x < 40) return "gray";
        else if (x < 60) return "black";
        else if (x < 81) return "#7fad5b";
        else return "#008000";
    }



    const toglleOpen = () => {

        if (state.open) {
            setState(prevState => {
                return {
                    ...prevState,
                    open: false
                };
            });
        } else {
            setState(prevState => {
                return {
                    ...prevState,
                    open: true
                };
            });
        }

    }

        let br = props.br;
        const txt = props.txt;
        let gameList = null;
        let day = null;
        let dateTemp = null;
        let style = null;
        let temp = "";
        const teamName = props.teamName;
        let teamNameHome = classes.teamName;
        let teamNameAway = classes.teamName;
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        if (props.gameList.reverse().length > 0 && state.open) {
            gameList = props.gameList.map((element, index) => {

                dateTemp = new Date(element.gameDate);
                day = parseInt(dateTemp.getDate()) < 10 ? "0" + dateTemp.getDate() : dateTemp.getDate()

                teamNameHome = classes.teamName;
                teamNameAway = classes.teamName;
         
                if (props.homeAll === "H") {
                    teamNameAway = classes.teamName + " " + classes.b;
                    if (element.winnerFT === 'a') {
                        temp = classes.W + " " + classes.s;
                    } else if (element.winnerFT === 'd') {
                        temp = classes.D + " " + classes.s;
                    } else {
                        temp = classes.L + " " + classes.s;
                    }

                } else {

                    if (element.awayTeam === teamName) {
                        teamNameAway = classes.teamName + " " + classes.b;
                        if (element.winnerFT === 'a') {
                            temp = classes.W + " " + classes.s;
                        } else if (element.winnerFT === 'd') {
                            temp = classes.D + " " + classes.s;
                        } else {
                            temp = classes.L + " " + classes.s;
                        }

                    } else {
                        teamNameHome = classes.teamName + " " + classes.b;
                        if (element.winnerFT === 'h') {

                            temp = classes.W + " " + classes.s;
                        } else if (element.winnerFT === 'd') {
                            temp = classes.D + " " + classes.s;
                        } else {
                            temp = classes.L + " " + classes.s;
                        }

                    }

                }


                return <div key={index} className={classes.line}>
                    <span className={classes.date}>{day + " " + months[dateTemp.getMonth()]}</span>
                    <span className={teamNameHome}>{element.homeTeam}</span>
                    <span className={temp}> {element.result + " (" + element.homeScoreFirstHalf + "-" + element.awayScoreFirstHalf + ")"}</span>
                    <span className={teamNameAway}>{element.awayTeam}</span>
                </div>
            });
        }

        if (props.gameList.length === 0 && props.setList) {
            style = { opacity: "0.4" };
        } else if (!props.setList) {
            style = { visibility: "hidden" };
        }



        let content = "";

        if (br === "NaN") br = "0%";

        if (state.open) {
            content = <li className={classes.StatsLine} onClick={toglleOpen}>
                <div className={classes.a}>
                    <div style={{ color: styleCalc(br) }} className={classes.br}>{br + "%"}</div>
                    <div className={classes.txtContainer}>
                        <div className={classes.txt}> {txt} </div>
                        <div className={classes.bottomBorder}><span style={{ width: br + "%" }} /></div>
                    </div>
                    <div className={classes.List} style={style}> List <i style={{ fontSize: "11px" }} className="fa fa-arrow-down" aria-hidden="true"></i>
                    </div>
                </div>
                <div className={classes.gameList}>{gameList}</div>
            </li>;
        } else {
            if (props.gameList.length > 0) {
                content = <li className={classes.StatsLine} onClick={toglleOpen}>
                    <div style={{ color: styleCalc(br) }} className={classes.br}>{br + "%"}</div>
                    <div className={classes.txtContainer}>
                        <div className={classes.txt}> {txt} </div>
                        <div className={classes.bottomBorder}><span style={{ width: br + "%" }} /></div>
                    </div>
                    <div className={classes.List} style={style}> List <i style={{ fontSize: "11px" }} className="fa fa-arrow-right" aria-hidden="true"></i>
                    </div>
                </li>;
            } else {

                if (props.setList) {
                    content = <li className={classes.StatsLine}>
                        <div className={classes.br}>{"0%"}</div>
                        <div className={classes.txtContainer}> {txt} </div>
                        <div className={classes.List} style={style}> List <i style={{ fontSize: "11px" }} className="fa fa-arrow-right" aria-hidden="true"></i>
                        </div>
                    </li>;
                } else {

                    content = <li className={classes.StatsLine}>
                        <div className={classes.br}>{br}</div>
                        <div className={classes.txtContainer}> {txt} </div>
                        <div className={classes.List} style={style}> List <i style={{ fontSize: "11px" }} className="fa fa-arrow-right" aria-hidden="true"></i>
                        </div>
                    </li>;
                }
            }

        }


        return (
            content
        );
}

export default StatsLine;