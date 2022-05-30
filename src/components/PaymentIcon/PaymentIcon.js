import React from 'react';
import classes from './PaymentIcon.module.css';
import { NavLink } from 'react-router-dom';

const paymentIcon = (props) => {

    return (
        <NavLink to="/subscription">
            <div className={classes.icon}>
                <img src={props.img} alt={props.alt} />
            </div>
        </NavLink>
    );
}

export default paymentIcon;