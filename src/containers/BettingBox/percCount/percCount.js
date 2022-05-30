import React from 'react';
import classes from './percCount.module.css';

const percCount = (props) => {

    return <div className={classes.percCount}>
        {props.text}
    </div>
}

export default percCount;