import React, { Component } from 'react';
import classes from './tipsLine.module.css';
import wrong from '../../../../assets/images/wrong.png';
import correct from '../../../../assets/images/correct_250.png';


class TipsLine extends Component {

    state = {
        open: false
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
        let content = "";
        let final = "";
        let style = "white";
        let opacityStyle = "1.0";

        if (this.props.final !== null) {

            if (this.props.final) {
                final = <div className={classes.final}>
                    <img className={classes.correct} src={correct} alt="correct" />
                </div>;
                style = "green";
            } else {
                final = <div className={classes.final}>
                    <img className={classes.wrong} src={wrong} alt="wrong" />
                </div>
                style = "#c10f0f";
                opacityStyle = "0.3"
            }
        }

        if (this.state.open) {
            let explanation = this.props.explanation.map((element, index) => {
                return <div key={index} className={classes.explanationLine}>{element}</div>
            });

            content = <div className={classes.tipsLineContainer}>
                <div className={classes.tipsLine} onClick={this.openClose} style={{ border: "1px solid " + style }}>
                    {final}
                    <div className={classes.tip}>{this.props.tip}</div>
                    <div className={classes.chance}>
                        <div className={classes.chanceBack} >
                            <div style={{ width: this.props.chance + "%", opacity: opacityStyle }} className={classes.chanceFront} />
                        </div>
                    Chance: <span className={classes.chanceBr}> {this.props.chance + "%"} </span>
                    </div>
                    <div className={classes.explanationTxt}>Explanation <i style={{ fontSize: "11px" }} className="fa fa-arrow-down" aria-hidden="true"></i></div>
                    <div className={classes.explanation}>{explanation}</div>
                </div>
            </div>;
        } else {
            content = <div className={classes.tipsLineContainer}>
                <div className={classes.tipsLine} onClick={this.openClose} style={{ border: "1px solid " + style }}>
                    {final}
                    <div className={classes.tip}>{this.props.tip}</div>
                    <div className={classes.chance}>
                        <div className={classes.chanceBack} >
                            <div style={{ width: this.props.chance + "%", opacity: opacityStyle }} className={classes.chanceFront} />
                        </div>
                    Chance: <span className={classes.chanceBr}> {this.props.chance + "%"} </span>
                    </div>
                    <div className={classes.explanationTxt}>Explanation <i style={{ fontSize: "11px" }} className="fa fa-arrow-right" aria-hidden="true"></i></div>
                </div>
            </div>;

        }
        return (
            content
        );
    }

}

export default TipsLine;