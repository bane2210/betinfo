import React from 'react';
import classes from './CountrySingle.module.css';
import CountryFlag from '../CountryLogo/CountryLogo';

interface Prop<T, U> {
    key: T;
    c: T;
    co: U;
}
const countrySingle = (props: Prop<string, string>) => {

    return (

            <div className={classes.Container}>
            <CountryFlag co={props.co}/>
            {props.c}
            </div>
    );

}

export default countrySingle;