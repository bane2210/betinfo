import React from 'react';
import classes from './Header.module.css'
import Marketing from '../Marketing/Marketing';


const header = (props) => {

    return (
        <div className={classes.Header}>
            {props.h === "" ? null : <div className={classes.headerMarketing}><Marketing m={props.h} /></div>}
        </div>
    );
}

export default header;