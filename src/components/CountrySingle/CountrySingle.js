import React from 'react';
import classes from './CountrySingle.module.css';
import CountryFlag from '../CountryLogo/CountryLogo';

const countrySingle = (props) => {

    return (

            <div className={classes.Container}>
            <CountryFlag co={props.co}/>
            {props.c}
            </div>
    );

}

export default countrySingle;