import React from 'react';
import classes from './Logo.module.css';
import logoPng from '../../assets/images/logo.png';

const logo = () => {

    return (
            <img className={classes.logo} src={logoPng} alt="logo"/>
    );
}

export default logo;