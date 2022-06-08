import React from 'react';
import classes from './BackdropClose.module.css';
import xClose from '../../assets/images/red-cross.png';


const backdropClose = (props) => {
    return (
        <div id="closeButton" className={classes.CloseButton} onClick={props.click}>
            <img className={classes.CloseSign} src={xClose} alt="close" />
        </div>
    );
}

export default backdropClose;