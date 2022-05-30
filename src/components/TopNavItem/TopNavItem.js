import React from 'react';
import classes from './TopNavItem.modal.css';
import { NavLink } from 'react-router-dom';

const topNavItem = (props) => {

    console.log(props);

    return (

        <NavLink
            to={props.link}
            exact={props.exact.toString()}
            activeclassname={classes.active}
        >


            <li className={classes.NavigationItem} onClick={props.click}>
                <span style={{ marginRight: "10px", color: "orange" }}>
                    {props.icon}
                </span>
                {props.name}
            </li>
        </NavLink>
    );
}

export default topNavItem;