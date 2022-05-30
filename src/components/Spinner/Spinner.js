import React from 'react';
import classes from './Spinner.module.css';

const spinner = () => (
    <div className={classes.spinnerBox}>
        <div className={classes.spinnerNew}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
);

export default spinner;