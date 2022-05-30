import React, { Component } from 'react';
import classes from './StatsLine.module.css';


class StatsLine extends Component {

    state = {
        open: false,
        arr: []
    }


    styleCalc = (x) => {

        if (x < 40) return "gray";
        else if (x < 60) return "black";
        else if (x < 81) return "#7fad5b";
        else return "#008000";
    }



    toglleOpen = () => {

        if (this.state.open) {
            this.setState({
                open: false
            });
        } else {
            this.setState({
                open: true
            });
        }

    }

    render() {

        let br = this.props.br;
        const txt = this.props.txt;
        let gameList = null;
        let day = null;
        let dateTemp = null;
        let style = null;
        let temp = "";
        const teamName = this.props.teamName;
        let teamNameHome = classes.teamName;
        let teamNameAway = classes.teamName;
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let gamesListArr = this.props.gameList.reverse();

        if (gamesListArr.length > 0 && this.state.open) {
            gameList = gamesListArr.map((element, index) => {

                dateTemp = new Date(element.gameDate);
                day = parseInt(dateTemp.getDate()) < 10 ? "0" + dateTemp.getDate() : dateTemp.getDate()

                teamNameHome = classes.teamName;
                teamNameAway = classes.teamName;

                if (this.props.homeAll === "H") {
                    teamNameHome = classes.teamName + " " + classes.b;
                    if (element.winnerFT === 'h') {
                        temp = classes.W + " " + classes.s;
                    } else if (element.winnerFT === 'd') {
                        temp = classes.D + " " + classes.s;
                    } else {
                        temp = classes.L + " " + classes.s;
                    }

                } else {

                    if (element.homeTeam === teamName) {
                        teamNameHome = classes.teamName + " " + classes.b;
                        if (element.winnerFT === 'h') {
                            temp = classes.W + " " + classes.s;
                        } else if (element.winnerFT === 'd') {
                            temp = classes.D + " " + classes.s;
                        } else {
                            temp = classes.L + " " + classes.s;
                        }

                    } else {
                        teamNameAway = classes.teamName + " " + classes.b;
                        if (element.winnerFT === 'a') {

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

        if (gamesListArr.length === 0 && this.props.setList) {
            style = { opacity: "0.4" };
        } else if (!this.props.setList) {
            style = { visibility: "hidden" };
        }



        let content = "";

        if (br === "NaN") br = "0%";

        if (this.state.open) {
            content = <li className={classes.StatsLine} onClick={this.toglleOpen}>
                <div className={classes.a}>
                    <div style={{ color: this.styleCalc(br) }} className={classes.br}>{br + "%"}</div>
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
            if (gamesListArr.length > 0) {
                content = <li className={classes.StatsLine} onClick={this.toglleOpen}>
                    <div style={{ color: this.styleCalc(br) }} className={classes.br}>{br + "%"}</div>
                    <div className={classes.txtContainer}>
                        <div className={classes.txt}> {txt} </div>
                        <div className={classes.bottomBorder}><span style={{ width: br + "%" }} /></div>
                    </div>
                    <div className={classes.List} style={style} > List <i style={{ fontSize: "11px" }} className="fa fa-arrow-right" aria-hidden="true"></i>
                    </div>
                </li>;
            } else {

                if (this.props.setList) {
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
}

export default StatsLine;