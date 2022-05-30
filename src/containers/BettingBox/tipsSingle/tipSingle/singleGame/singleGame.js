import React, { Component } from 'react';
import classes from './singleGame.module.css';

import wrong from '../../../../../assets/images/wrong.png';
import correct from '../../../../../assets/images/correct_250.png';
import Flag from '../../../../../components/CountryLogo/CountryLogo';

import { connect } from 'react-redux';
import ReactGA from 'react-ga';


class SingleGame extends Component {

    state = {
        open: false
    }


    openBackdrop(backdropOBJ) {

        ReactGA.event({
            category: "Games",
            action: "Clicked",
            label: this.props.h + " vs " + this.props.a,
        });

        const yPos = document.getElementById("body").getBoundingClientRect().top;
        const back = document.getElementById("backdrop");

        if (back !== null) back.style.display = "flex";
        document.getElementById("body").style.display = "none";

        this.props.backdropSet(backdropOBJ, yPos);
        /*window.location.hash = "game";*/


    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.element !== this.props.element) {
            if (this.state.open) {
                this.setState({
                    open: false
                })
            }
        }
    }

    openClose = () => {
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

        let element = this.props.element;
        let content = "";
        let final = "";
        let style = "#c5c0c0";
        let time = "";
        let explanation = "";
        let fullDetails = "";

        let result = "";

        const currentDay = new Date(element.colDate + "T" + element.colTime);
        const hours = currentDay.getHours() < 10 ? '0' + currentDay.getHours() : currentDay.getHours();
        const minutes = currentDay.getMinutes() < 10 ? '0' + currentDay.getMinutes() : currentDay.getMinutes();

        time = hours + ":" + minutes




        if (parseInt(this.props.element.resultCount) !== -1) {

            if (parseInt(this.props.element.resultCount) === 1) {
                final = <div className={classes.final}>
                    <img className={classes.correct} src={correct} alt="correct" />
                </div>;
                style = "green";
                result = <div className={classes.countryComp + " " + classes.greenRes} > Result: {this.props.element.result} </div>;
            } else if (parseInt(this.props.element.resultCount) === 0) {
                final = <div className={classes.final}>
                    <img className={classes.wrong} src={wrong} alt="wrong" />
                </div>
                style = "#c10f0f";
                result = <div className={classes.countryComp + " " + classes.redRes} > Result: {this.props.element.result} </div>;
            }
        }



        if (this.state.open) {
            /*
            <MatchSingle
                            key={index}
                            t={hours + ":" + minutes}
                            h={text.homeTeam}
                            a={text.awayTeam}
                            country={text.country}
                            comp={text.competition}
                            date={currentDay}
                            simpleDate={simpleDate} />
            */

           const currentDay = new Date(element.colDate + "T" + element.colTime);

           const hours = currentDay.getHours() < 10 ? '0' + currentDay.getHours() : currentDay.getHours();
           const minutes = currentDay.getMinutes() < 10 ? '0' + currentDay.getMinutes() : currentDay.getMinutes();


            let backdropOBJ = {
                date: currentDay,
                time: hours + ":" + minutes,
                home: element.homeTeam,
                away: element.awayTeam,
                country: element.country,
                competition: element.competition,
                simpleDate: element.date
            }

            fullDetails = <div className={classes.FullDetails}
                onClick={() => this.openBackdrop(backdropOBJ)}>
                Click for full details!
                </div>;


            explanation = element.explanation.split("****").map((element, index) => {
                if (element !== "") {
                    return <div key={index} className={classes.explanationLine}>{element}</div>
                } else return null;
            });


        }

        content = <div key={this.props.index} className={classes.tipsLineContainer}>
            <div className={classes.tipsLine} onClick={this.openClose} style={{ border: "1px solid " + style }}>
                {final}
                <div className={classes.tip}>
                    <div className={classes.flagContainer}>
                        <Flag co={element.country} />
                    </div>
                    <div className={classes.GamesLineTop}>
                        <div className={classes.teamNames}>
                            {element.homeTeam + " vs " + element.awayTeam}
                        </div>
                        <div className={classes.tipInner}>
                            {element.tip}
                        </div>
                    </div>
                </div>

                <div className={classes.GamesLine}>
                    <div className={classes.chance}>
                        <div className={classes.kickOfMob}>
                            Kick-off: {time}
                        </div>
                       Chance: <span className={classes.chanceBr}> {element.chance > 94 ? 94 + "%" : element.chance + "%"} </span>
                    </div>
                    <div className={classes.GamesLineBottom}>
                        <div className={classes.kickOf}>
                            Kick-off: {time}
                        </div>
                        <div className={classes.countryComp}>
                            {element.country + " - " + element.competition}
                        </div>
                        {result}
                        <div className={classes.explanationTxt}><span style={{ marginRight: "5px" }}> Explanation </span> {this.state.open ? <i style={{ fontSize: "11px" }} className="fa fa-arrow-down" aria-hidden="true"></i> : <i style={{ fontSize: "11px" }} className="fa fa-arrow-right" aria-hidden="true"></i>}</div>
                    </div>
                </div>

                <div className={classes.GamesLine}>
                    {this.state.open ? <div className={classes.explanation}>{explanation}{fullDetails}</div> : ""}
                </div>
            </div>
        </div>;

        return (
            content
        );
    }


}

const mapDispatchToProps = dispatch => {
    return {
        backdropSet: (backdropOBJ, yPos) => dispatch({ type: "backdropSet", data: backdropOBJ, yPos: yPos })
    }
}


export default connect(null, mapDispatchToProps)(SingleGame);
