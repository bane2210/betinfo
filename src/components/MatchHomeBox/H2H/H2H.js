import React, { Component } from 'react';
import classes from './H2H.module.css';
import Title from '../TittleTemplateBox/TittleTemplateBox';

class H2H extends Component {

    state = {
        start: 0,
        end: 6
    }


    load6less = () => {
        const max = this.props.object.length;

        if (this.state.end > 6 && this.state.end !== (max)) {
            const start = this.state.start - 6;
            const end = this.state.end - 6;
            this.setState({
                start: start,
                end: end
            });
        } else if (this.state.end === (max)) {
            const start = this.state.start - 6;
            let end = this.state.end - (max % 6);
            if (max % 6 === 0) {
                end = this.state.end - 6;
            }
            this.setState({
                start: start,
                end: end
            });
        }

    }

    load6more = () => {
        const max = this.props.object.length;

        if ((this.state.end + 6) < (max)) {

            const start = this.state.start + 6;
            const end = this.state.end + 6;
            this.setState({
                start: start,
                end: end
            });
        } else if(this.state.end !== max) {
            const start = this.state.start + 6;
            const end = max;
            this.setState({
                start: start,
                end: end
            });
        }

    }

    render() {

        let temp = "";
        let dateTemp = null;
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let day = "";
        let contentForm = "";
        let contentFormNext = "";
        const teamName = this.props.name;
        let homeTeamClass = "";
        let awayTeamClass = "";
        let seasonTemp = "";
        let seasonTempArr = [];
        const max = this.props.object!== null ? this.props.object.length : 0;

        if (this.props.object !== null) {

            // Ako je odigrano vise od 8 H2H meceva
            if (this.props.object.length > 6) {
                contentForm = this.props.object.slice(this.state.start, this.state.end).map((element, index) => {

                    element.awayTeam = new DOMParser().parseFromString(element.awayTeam, 'text/html').body.textContent;
                    element.homeTeam = new DOMParser().parseFromString(element.homeTeam, 'text/html').body.textContent;

                    dateTemp = new Date(element.gameDate);
                    day = parseInt(dateTemp.getDate()) < 10 ? "0" + dateTemp.getDate() : dateTemp.getDate();
                    if (element.season.includes('/')) {
                        seasonTempArr = element.season.split('/');
                        seasonTemp = seasonTempArr[0].slice(2, seasonTempArr[0].length) + "/" + seasonTempArr[1].slice(2, seasonTempArr[1].length);

                    } else {
                        seasonTemp = element.season;
                    }

                    homeTeamClass = classes.teamName;
                    awayTeamClass = classes.teamName;

                    if (element.homeTeam === teamName) {

                        homeTeamClass = classes.teamName + " " + classes.b;

                        if (element.winnerFT === 'h') {
                            temp = classes.W + " " + classes.s;
                        } else if (element.winnerFT === 'd') {
                            temp = classes.D + " " + classes.s;
                        } else {
                            temp = classes.L + " " + classes.s;
                        }

                    } else {
                        awayTeamClass = classes.teamName + " " + classes.b;

                        if (element.winnerFT === 'a') {
                            temp = classes.W + " " + classes.s;
                        } else if (element.winnerFT === 'd') {
                            temp = classes.D + " " + classes.s;
                        } else {
                            temp = classes.L + " " + classes.s;
                        }



                    }

                    return (
                        <div key={index} className={classes.line}>
                            <span className={classes.season}>{seasonTemp}</span>
                            <span className={classes.date}>{day + " " + months[dateTemp.getMonth()]}</span>
                            <span className={homeTeamClass}>{element.homeTeam}</span>
                            <span className={temp}>{element.result + " (" + element.homeScoreFirstHalf + "-" + element.awayScoreFirstHalf + ")"}</span>
                            <span className={awayTeamClass}>{element.awayTeam}</span>
                        </div>
                    );

                });

                contentFormNext = (<div className={classes.nextPrevBox}>
                    <div style={{opacity: this.state.end === max ? "0.2" : "1.0" }} className={classes.nextPrev} onClick={this.load6more}>
                        {"<< Previous"}
                    </div>
                    <div style={{opacity: this.state.start === 0 ? "0.2" : "1.0"}} className={classes.nextPrev} onClick={this.load6less}>
                        {"Next >>"}
                    </div>
                </div >);


            } else {
                contentForm = this.props.object.map((element, index) => {

                    dateTemp = new Date(element.gameDate);
                    day = parseInt(dateTemp.getDate()) < 10 ? "0" + dateTemp.getDate() : dateTemp.getDate();
                    if (element.season.includes('/')) {
                        seasonTempArr = element.season.split('/');
                        seasonTemp = seasonTempArr[0].slice(2, seasonTempArr[0].length) + "/" + seasonTempArr[1].slice(2, seasonTempArr[1].length);

                    } else {
                        seasonTemp = element.season;
                    }

                    homeTeamClass = classes.teamName;
                    awayTeamClass = classes.teamName;

                    if (element.homeTeam === teamName) {

                        homeTeamClass = classes.teamName + " " + classes.b;

                        if (element.winnerFT === 'h') {
                            temp = classes.W + " " + classes.s;
                        } else if (element.winnerFT === 'd') {
                            temp = classes.D + " " + classes.s;
                        } else {
                            temp = classes.L + " " + classes.s;
                        }

                    } else {
                        awayTeamClass = classes.teamName + " " + classes.b;

                        if (element.winnerFT === 'a') {
                            temp = classes.W + " " + classes.s;
                        } else if (element.winnerFT === 'd') {
                            temp = classes.D + " " + classes.s;
                        } else {
                            temp = classes.L + " " + classes.s;
                        }



                    }

                    return (
                        <div key={index} className={classes.line}>
                            <span className={classes.season}>{seasonTemp}</span>
                            <span className={classes.date}>{day + " " + months[dateTemp.getMonth()]}</span>
                            <span className={homeTeamClass}>{element.homeTeam}</span>
                            <span className={temp}>{element.result + " (" + element.homeScoreFirstHalf + "-" + element.awayScoreFirstHalf + ")"}</span>
                            <span className={awayTeamClass}>{element.awayTeam}</span>
                        </div>
                    );

                });
            }

        } else {
            contentForm = <div className={classes.noH2H}>There are no available games.</div>
        }


        return (
            <div className={classes.h2h}>
                <Title name="Head 2 Head" />
                {contentForm}
                {contentFormNext}
            </div>

        );
    }


}

export default H2H;