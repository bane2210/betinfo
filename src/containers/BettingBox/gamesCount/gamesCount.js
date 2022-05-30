import React from 'react';
import classes from './gamesCount.module.css';

const gamesCount = (props) => {

    let style = "17px";
    
    if(props.isBig){
        style= "22px";
    }

    return <div style={{width: style}} className={classes.gamesCount}>
        {props.count}
    </div>;
}

export default gamesCount;