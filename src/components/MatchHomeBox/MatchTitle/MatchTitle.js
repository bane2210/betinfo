import React from 'react';
import classes from './MatchTitle.module.css';
import Logo from '../../CountryLogo/CountryLogo';

const matchTitle = (props) => {

    const todayDate = new Date(props.date);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // monday tuesday wednesday thursday friday saturday sunday
    //const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const todayDay = todayDate.getDate();
    const todayMonth = months[todayDate.getMonth()];
    const todayYear = todayDate.getFullYear();
    //const weekDay = weekDays[d.getDay()];
    const str = todayDay + " " + todayMonth + ", " + todayYear;

    return (
        <div className={classes.mainTitle}>
            <div className={classes.leftTeam}>
                {props.h}
            </div>

            <div className={classes.middleTitle}>

                <div className={classes.line}> <Logo co={props.co} /></div>
                <div className={classes.line + " " + classes.wrap}> {props.co + ", " + props.comp} </div>
                <div className={classes.line + " " + classes.d}> Date: {str} </div>
                <div className={classes.line + " " + classes.d}> Kick-off: {props.t} </div>
            </div>
            <div className={classes.vs}>
                 vs 
            </div>

            <div className={classes.rightTeam}>
                {props.a}
            </div>
        </div>
    );
}

export default matchTitle;
