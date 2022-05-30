import React from 'react';
import classes from './GenOdds.module.css'

const genOdds = (props) => {


    const name = props.name;
    const content = props.content;

    return (
        < div className={classes.genOdds} onClick={props.click}>
            <div className={classes.topOdds}>
                {name}
                </div>
            <div className={classes.bottomOdds}>
                {content}
            </div>
        </div >
    );

}

export default genOdds;