import React, { useState } from 'react';
import classes from './tipsLine.module.css';
import wrong from '../../../../assets/images/wrong.png';
import correct from '../../../../assets/images/correct_250.png';

type Prop = {
    key: number;
    tip: string;
    explanation: string[];
    chance: number;
    final: boolean | null;
}

const TipsLine = (props: Prop) => {
    const [state, setState] = useState({
        open: false
    });

    const openClose = () => {
        if (state.open) {
            setState(() => {
                return {
                    open: false
                };
            });
        } else {
            setState(() => {
                return {
                    open: true
                };
            });

        }
    }

        let content: JSX.Element | "" = "";
        let final: JSX.Element | "" = "";
        let style = "white";
        let opacityStyle = "1.0";

        if (props.final !== null) {

            if (props.final) {
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

        if (state.open) {
            let explanation = props.explanation.map((element, index) => {
                return <div key={index} className={classes.explanationLine}>{element}</div>
            });

            content = <div className={classes.tipsLineContainer}>
                <div className={classes.tipsLine} onClick={openClose} style={{ border: "1px solid " + style }}>
                    {final}
                    <div className={classes.tip}>{props.tip}</div>
                    <div className={classes.chance}>
                        <div className={classes.chanceBack} >
                            <div style={{ width: props.chance + "%", opacity: opacityStyle }} className={classes.chanceFront} />
                        </div>
                    Chance: <span className={classes.chanceBr}> {props.chance + "%"} </span>
                    </div>
                    <div className={classes.explanationTxt}>Explanation <i style={{ fontSize: "11px" }} className="fa fa-arrow-down" aria-hidden="true"></i></div>
                    <div className={classes.explanation}>{explanation}</div>
                </div>
            </div>;
        } else {
            content = <div className={classes.tipsLineContainer}>
                <div className={classes.tipsLine} onClick={openClose} style={{ border: "1px solid " + style }}>
                    {final}
                    <div className={classes.tip}>{props.tip}</div>
                    <div className={classes.chance}>
                        <div className={classes.chanceBack} >
                            <div style={{ width: props.chance + "%", opacity: opacityStyle }} className={classes.chanceFront} />
                        </div>
                    Chance: <span className={classes.chanceBr}> {props.chance + "%"} </span>
                    </div>
                    <div className={classes.explanationTxt}>Explanation <i style={{ fontSize: "11px" }} className="fa fa-arrow-right" aria-hidden="true"></i></div>
                </div>
            </div>;

        }
        return (
            content
        );

}

export default TipsLine;