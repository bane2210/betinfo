import React from 'react';
import classes from './percCount.module.css';

const percCount: React.FC<{text: string;}> = (props) => {

    return <div className={classes.percCount}>
        {props.text}
    </div>
}

export default percCount;