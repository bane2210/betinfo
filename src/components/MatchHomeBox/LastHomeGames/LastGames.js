import React, { Component } from 'react';
import classes from './LastGames.module.css';

import OverallButton from '../OverallButton/OverallButton';
import Title from '../TittleTemplateBox/TittleTemplateBox';

class LastGames extends Component {

    state = {
        all: true,
        single: false,
        start: 0,
        end: 8
    }

    load8less = () => {
        const max = this.state.all ? this.props.all.length : this.props.home.length;

        if (this.state.end > 8 && this.state.end !== (max)) {
            const start = this.state.start - 8;
            const end = this.state.end - 8;
            this.setState({
                start: start,
                end: end
            });
        } else if (this.state.end === (max)) {
            const start = this.state.start - 8;
            let end = this.state.end - (max % 8);
            if (max % 8 === 0) {
                end = this.state.end - 8;
            }
            this.setState({
                start: start,
                end: end
            });
        }

    }

    load8more = () => {
        const max = this.state.all ? this.props.all.length : this.props.home.length;

        if ((this.state.end + 8) < (max)) {

            const start = this.state.start + 8;
            const end = this.state.end + 8;
            this.setState({
                start: start,
                end: end
            });
        } else if (this.state.end !== max) {
            const start = this.state.start + 8;
            const end = max;
            this.setState({
                start: start,
                end: end
            });
        }

    }

    setAll = () => {
        this.setState({
            all: true,
            single: false,
            start: 0,
            end: 8
        });
    }

    setHome = () => {
        this.setState({
            all: false,
            single: true,
            start: 0,
            end: 8
        });
    }


    render() {

        let temp = "";
        let contentForm = "";
        let contentFormNext = "";
        let dateTemp = null;
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const teamName = this.props.name;
        let day = "";
        const max = this.state.all ? this.props.all.length : this.props.home.length;

        if (this.state.all) {

            let arr = this.props.all;

            if (arr.length > 0) {

                if (arr.length > 8) {
                    contentForm = arr.slice(this.state.start, this.state.end).map((element, index) => {

                        dateTemp = new Date(element.gameDate);

                        if (element.homeTeam === teamName) {

                            if (element.winnerFT === 'h') {
                                temp = classes.W + " " + classes.s;
                            } else if (element.winnerFT === 'd') {
                                temp = classes.D + " " + classes.s;
                            } else {
                                temp = classes.L + " " + classes.s;
                            }

                            day = parseInt(dateTemp.getDate()) < 10 ? "0" + dateTemp.getDate() : dateTemp.getDate()

                            return (
                                <div key={index} className={classes.line}>
                                    <span className={classes.date}>{day + " " + months[dateTemp.getMonth()]}</span>
                                    <span className={classes.teamName + " " + classes.b}>{element.homeTeam}</span>
                                    <span className={temp}>{element.result + " (" + element.homeScoreFirstHalf + "-" + element.awayScoreFirstHalf + ")"}</span>
                                    <span className={classes.teamName}>{element.awayTeam}</span>
                                </div>
                            );

                        } else {
                            if (element.winnerFT === 'a') {
                                temp = classes.W + " " + classes.s;
                            } else if (element.winnerFT === 'd') {
                                temp = classes.D + " " + classes.s;
                            } else {
                                temp = classes.L + " " + classes.s;
                            }

                            day = parseInt(dateTemp.getDate()) < 10 ? "0" + dateTemp.getDate() : dateTemp.getDate()

                            return (
                                <div key={index} className={classes.line}>
                                    <span className={classes.date}>{day + " " + months[dateTemp.getMonth()]}</span>
                                    <span className={classes.teamName}>{element.homeTeam}</span>
                                    <span className={temp}>{element.result + " (" + element.homeScoreFirstHalf + "-" + element.awayScoreFirstHalf + ")"}</span>
                                    <span className={classes.teamName + " " + classes.b}>{element.awayTeam}</span>
                                </div>
                            );
                        }


                    });


                    contentFormNext = (<div className={classes.nextPrevBox}>
                        <div style={{ opacity: this.state.end === max ? "0.2" : "1.0" }} className={classes.nextPrev} onClick={this.load8more}>
                            {"<< Previous"}
                        </div>
                        <div style={{ opacity: this.state.start === 0 ? "0.2" : "1.0" }} className={classes.nextPrev} onClick={this.load8less}>
                            {"Next >>"}
                        </div>
                    </div >);

                } else {
                    contentForm = arr.map((element, index) => {
                        dateTemp = new Date(element.gameDate);

                        if (element.homeTeam === teamName) {

                            if (element.winnerFT === 'h') {
                                temp = classes.W + " " + classes.s;
                            } else if (element.winnerFT === 'd') {
                                temp = classes.D + " " + classes.s;
                            } else {
                                temp = classes.L + " " + classes.s;
                            }

                            day = parseInt(dateTemp.getDate()) < 10 ? "0" + dateTemp.getDate() : dateTemp.getDate()

                            return (
                                <div key={index} className={classes.line}>
                                    <span className={classes.date}>{day + " " + months[dateTemp.getMonth()]}</span>
                                    <span className={classes.teamName + " " + classes.b}>{element.homeTeam}</span>
                                    <span className={temp}>{element.result + " (" + element.homeScoreFirstHalf + "-" + element.awayScoreFirstHalf + ")"}</span>
                                    <span className={classes.teamName}>{element.awayTeam}</span>
                                </div>
                            );

                        } else {

                            if (element.winnerFT === 'a') {
                                temp = classes.W + " " + classes.s;
                            } else if (element.winnerFT === 'd') {
                                temp = classes.D + " " + classes.s;
                            } else {
                                temp = classes.L + " " + classes.s;
                            }

                            day = parseInt(dateTemp.getDate()) < 10 ? "0" + dateTemp.getDate() : dateTemp.getDate()

                            return (
                                <div key={index} className={classes.line}>
                                    <span className={classes.date}>{day + " " + months[dateTemp.getMonth()]}</span>
                                    <span className={classes.teamName}>{element.homeTeam}</span>
                                    <span className={temp}>{element.result + " (" + element.homeScoreFirstHalf + "-" + element.awayScoreFirstHalf + ")"}</span>
                                    <span className={classes.teamName + " " + classes.b}>{element.awayTeam}</span>
                                </div>
                            );
                        }


                    });
                }

            } else {
                contentForm = <div>No matches played.</div>

            }

        } else {

            let arr = this.props.home;

            if (arr.length > 0) {

                if (arr.length > 8) {
                    contentForm = arr.slice(this.state.start, this.state.end).map((element, index) => {
                        dateTemp = new Date(element.gameDate);

                        if (element.winnerFT === 'h') {
                            temp = classes.W + " " + classes.s;
                        } else if (element.winnerFT === 'd') {
                            temp = classes.D + " " + classes.s;
                        } else {
                            temp = classes.L + " " + classes.s;
                        }

                        day = parseInt(dateTemp.getDate()) < 10 ? "0" + dateTemp.getDate() : dateTemp.getDate()

                        return (
                            <div key={index} className={classes.line}>
                                <span className={classes.date}>{day + " " + months[dateTemp.getMonth()]}</span>
                                <span className={classes.teamName + " " + classes.b}>{element.homeTeam}</span>
                                <span className={temp}>{element.result + " (" + element.homeScoreFirstHalf + "-" + element.awayScoreFirstHalf + ")"}</span>
                                <span className={classes.teamName}>{element.awayTeam}</span>
                            </div>
                        );

                    });


                    contentFormNext = (<div className={classes.nextPrevBox}>
                        <div style={{ opacity: this.state.end === max ? "0.2" : "1.0" }} className={classes.nextPrev} onClick={this.load8more}>
                            {"<< Previous"}
                        </div>
                        <div style={{ opacity: this.state.start === 0 ? "0.2" : "1.0" }} className={classes.nextPrev} onClick={this.load8less}>
                            {"Next >>"}
                        </div>
                    </div >);

                } else {
                    contentForm = arr.map((element, index) => {
                        dateTemp = new Date(element.gameDate);

                        if (element.winnerFT === 'h') {
                            temp = classes.W + " " + classes.s;
                        } else if (element.winnerFT === 'd') {
                            temp = classes.D + " " + classes.s;
                        } else {
                            temp = classes.L + " " + classes.s;
                        }

                        day = parseInt(dateTemp.getDate()) < 10 ? "0" + dateTemp.getDate() : dateTemp.getDate()

                        return (
                            <div key={index} className={classes.line}>
                                <span className={classes.date}>{day + " " + months[dateTemp.getMonth()]}</span>
                                <span className={classes.teamName + " " + classes.b}>{element.homeTeam}</span>
                                <span className={temp}>{element.result + " (" + element.homeScoreFirstHalf + "-" + element.awayScoreFirstHalf + ")"}</span>
                                <span className={classes.teamName}>{element.awayTeam}</span>
                            </div>
                        );

                    });
                }

            } else {
                contentForm = <div>No matches played.</div>
            }

        }

        return (
            <div className={classes.lastGamesBox}>
                <Title name="Previous Results" />
                <div className={classes.overallButtons}>
                    <OverallButton o={this.state.all} click={this.setAll} name="All" />
                    <OverallButton o={this.state.single} click={this.setHome} name="Home" />
                </div>
                {contentForm}
                {contentFormNext}
            </div>

        );
    }
}

export default LastGames;