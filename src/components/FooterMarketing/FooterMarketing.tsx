import React from 'react';
import classes from './FooterMarketing.module.css';
import Marketing from '../Marketing/Marketing';

const footerMarketing = ({f} : {f: string}) => {

    // const conntent = '<div style="color: green; margin: 0px 10px;">Partners: </div><div style="min-width: 150px;"><a style="color: blue;" href="https://www.betexplorer.com/" target="_blank" title="Bet Explorer" alt="Bet Explorer" > Bet Explorer </a></div>';
    
    return (
        <div className={classes.footerMarketing}>
            <div className={classes.banerBox}>
                <Marketing m={f} type="footer"/>
            </div>
        </div>
    );

}

export default footerMarketing;
