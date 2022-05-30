import React, { Component } from 'react'
import classes from './FormAwayBox.module.css';
import OverallButton from '../../MatchHomeBox/OverallButton/OverallButton';
import PointsGraph from '../../MatchHomeBox/PointsGraph/PointsGraph';
import LastAwayGames from '../LastAwayGames/LastAwayGames';


class FormAwayBox extends Component {


    state = {
        all: true,
        single: false
    }


    setAll = () => {
        this.setState({
            all: true,
            single: false
        });
    }

    setAway = () => {
        this.setState({
            all: false,
            single: true
        });
    }


    render() {
        let contentForm = "";
        const teamName = this.props.name;
        let brGames = 0;
        let pts = 0;

        if (this.state.all) {

            let arr = this.props.all;

            if (arr.length > 0) {

                if (arr.length > 6) {
                    brGames = 6;
                    contentForm = arr.slice(0, 6).map((element, index) => {

                        if (element.awayTeam === teamName) {

                            if (element.winnerFT === 'a') {
                                pts += 3;
                                return <span key={index} className={classes.W + " " + classes.standard}>W</span>
                            } else if (element.winnerFT === 'd') {
                                pts += 1;
                                return <span key={index} className={classes.D + " " + classes.standard}>D</span>
                            } else {
                                return <span key={index} className={classes.L + " " + classes.standard}>L</span>
                            }
                        } else {
                            if (element.winnerFT === 'h') {
                                pts += 3;
                                return <span key={index} className={classes.W + " " + classes.standard}>W</span>
                            } else if (element.winnerFT === 'd') {
                                pts += 1;
                                return <span key={index} className={classes.D + " " + classes.standard}>D</span>
                            } else {
                                return <span key={index} className={classes.L + " " + classes.standard}>L</span>
                            }
                        }


                    });
                } else {
                    contentForm = arr.map((element, index) => {

                        if (element.awayTeam === teamName) {

                            if (element.winnerFT === 'a') {
                                brGames += 1;
                                pts += 3;
                                return <span key={index} className={classes.W + " " + classes.standard}>W</span>
                            } else if (element.winnerFT === 'd') {
                                brGames += 1;
                                pts += 1;
                                return <span key={index} className={classes.D + " " + classes.standard}>D</span>
                            } else {
                                brGames += 1;
                                return <span key={index} className={classes.L + " " + classes.standard}>L</span>
                            }
                        } else {
                            if (element.winnerFT === 'h') {
                                brGames += 1;
                                pts += 3;
                                return <span key={index} className={classes.W + " " + classes.standard}>W</span>
                            } else if (element.winnerFT === 'd') {
                                brGames += 1;
                                pts += 1;
                                return <span key={index} className={classes.D + " " + classes.standard}>D</span>
                            } else {
                                brGames += 1;
                                return <span key={index} className={classes.L + " " + classes.standard}>L</span>
                            }
                        }


                    });
                }

            } else {
                contentForm = <div>No matches played.</div>
                brGames = 0;
                pts = 0;
            }

        } else {

            let arr = this.props.away;

            if (arr.length > 0) {

                if (arr.length > 6) {
                    brGames = 6;
                    contentForm = arr.slice(0, 6).map((element, index) => {
                        if (element.winnerFT === 'a') {
                            pts += 3;
                            return <span key={index} className={classes.W + " " + classes.standard}>W</span>
                        } else if (element.winnerFT === 'd') {
                            pts += 1;
                            return <span key={index} className={classes.D + " " + classes.standard}>D</span>
                        } else {
                            return <span key={index} className={classes.L + " " + classes.standard}>L</span>
                        }

                    });
                } else {
                    contentForm = arr.map((element, index) => {
                        if (element.winnerFT === 'a') {
                            brGames += 1;
                            pts += 3;
                            return <span key={index} className={classes.W + " " + classes.standard}>W</span>
                        } else if (element.winnerFT === 'd') {
                            brGames += 1;
                            pts += 1;
                            return <span key={index} className={classes.D + " " + classes.standard}>D</span>
                        } else {
                            brGames += 1;
                            return <span key={index} className={classes.L + " " + classes.standard}>L</span>
                        }

                    });
                }

            } else {
                brGames = 0;
                pts = 0;
                contentForm = <div>No matches played.</div>
            }

        }


        return (

            <div className={classes.formBox}>
                <div className={classes.overallButtons}>
                    <OverallButton o={this.state.all} click={this.setAll} name="All" />
                    <OverallButton o={this.state.single} click={this.setAway} name="Away" />
                </div>
                <div className={classes.wdl}>
                    Form: {contentForm}
                    {brGames > 0 ? <PointsGraph g={brGames} pts={pts} /> : null}
                </div>
                <LastAwayGames all={this.props.all} away={this.props.away} name={teamName} />



            </div>

        );
    }
}

export default FormAwayBox;