import { useState } from 'react';
import classes from './TopNav.module.css';
import Logo from '../Logo/Logo';
import TopNavItem from '../TopNavItem/TopNavItem';
import {NavLink} from 'react-router-dom';

const TopNav = () => {

    const [state, setState] = useState({
        open: false,
        close: false
    });


    const closeFun = () => {
        setState({ open: false, close: true });

    }

    const openFun = () => {
        setState({ open: true, close: false });
    }

    const toggleFun = () => {
        if (state.open) {
            setState({ open: false, close: true });
        } else {
            setState({ open: true, close: false });
        }
    }

       // window.scrollTo(0, 0);

        let classVar = classes.NavigationItems;

        if (state.open) {
            classVar = classes.NavigationItems + " " + classes.open;
        } else if (state.close) {
            classVar = classes.NavigationItems + " " + classes.close;
        }

        return (
            <div className={classes.TopNav}>
                <div className={classes.topNavCont}>
                    <div className={classes.shortLogo}>
                        <NavLink to="/">
                            <Logo />
                        </NavLink>
                    </div>
                    <div className={classes.Icon} onClick={toggleFun}>
                        <i className="fa fa-bars"></i>
                    </div>
                    <ul className={classVar}>
                        <TopNavItem
                            icon={<i className="fa fa-home" aria-hidden="true"></i>}
                            link="/"
                            exact={true}
                            name="Home"
                            click={closeFun} />

                        <TopNavItem
                            icon={<i className="fa fa-unlock-alt" aria-hidden="true"></i>}
                            link="/subscription"
                            exact={true}
                            name="Subscribe"
                            click={closeFun} />

                        <TopNavItem
                            icon={<i className="fa fa-envelope-o" aria-hidden="true"></i>}
                            link="/contact"
                            exact={true}
                            name="Contact"
                            click={closeFun} />

                        <TopNavItem
                            icon={<i className="fa fa-sign-in" aria-hidden="true"></i>}
                            link="/login"
                            exact={true}
                            name="Login"
                            click={closeFun} />
                    </ul>
                </div>
            </div>
        );

}

export default TopNav;
