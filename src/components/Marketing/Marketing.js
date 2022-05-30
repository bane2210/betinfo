import React from 'react';
import classes from './Marketing.module.css'

const marketing = (props) => {
    //        <div className={classes.baner} dangerouslySetInnerHTML={{__html: props.m}} />

    return (
        <div className={classes.baner} dangerouslySetInnerHTML={{ __html: props.m }} />
    );
}

export default marketing;