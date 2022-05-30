import React, { Component } from 'react';
import classes from './Sidebar.module.css';
import Marketing from '../../components/Marketing/Marketing';
import { NavLink } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';

class Sidebar extends Component {

    render() {
        return (

                <div className={classes.Sidebar}>
                    <div className={classes.SidebarTop}>
                        <div className={classes.logoImg}>
                            <Logo />
                        </div>
                    </div>
                    <NavLink to="/livescore">
                        <div className={classes.livescore}>Livescore</div>
                    </NavLink>

                    <NavLink to="/dropping-odds">
                        <div className={classes.livescore}>Dropping Odds</div>
                    </NavLink>

                    <NavLink to="/partner-links">
                        <div className={classes.livescore}>Partners</div><br />
                    </NavLink>

                    {this.props.m === "" ? null : <Marketing m={this.props.s} />}

                </div>
        );
    }
}

export default Sidebar;