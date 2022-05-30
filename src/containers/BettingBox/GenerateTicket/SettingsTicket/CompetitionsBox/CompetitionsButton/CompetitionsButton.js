import React from 'react';
import classes from './CompetitionsButton.module.css';

import correct from '../../../../../../assets/images/correct_250.png';

const oddsTimeButton = (props) => {

    let style = classes.container;
    let name = props.name;


    if (props.value) {
        style = classes.container + " " + classes.Active;
    }

    let yesNo = "";

    if (props.value) {
        yesNo = <div className={classes.final}>
            <img className={classes.correct} src={correct} alt="correct" />
        </div>;
    }

    return (
        <div className={style} onClick={props.click}>
            <div className={classes.content} >
                {name}
            </div>
            {yesNo}
        </div>
    );


}

export default oddsTimeButton;