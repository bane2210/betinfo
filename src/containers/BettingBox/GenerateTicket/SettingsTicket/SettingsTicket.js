import React, { Component } from 'react';
import classes from './SettingsTicket.module.css';

import OddsTimeButton from './oddsTimeButton/oddsTimeButton';
import CompetitionsBox from './CompetitionsBox/CompetitionsBox';
import MarketBox from './MarketBox/MarketBox';


class SettingsTicket extends Component {

    render() {


        let content;
        let settingsButtons = {};
        let header = "";


        if (this.props.type === 1) {
            let yesNo;

            header = <div className={classes.header}>{"Choose approximate odds"}</div>;

            settingsButtons = ["1.5", "1.7", "2", "2.5", "3", "4", "5", "7", "10", "15", "20", "25", "30", "40", "50", "60", "80", "100"];

            content = settingsButtons.map((element, index) => {
                yesNo = false;

                if(this.props.value[0] === element) yesNo = true;

                return <OddsTimeButton key={index} yesNo={yesNo} name={element} oddsTimeClick={() => this.props.oddsTimeClick(element, 1)} type={1} />;
            });
        }

        if (this.props.type === 2) {
            let yesNo;

            header = <div className={classes.header}>{"Choose kick-off time"}</div>;

            settingsButtons = ["1", "3", "6", "12", "24", "36"];

            content = settingsButtons.map((element, index) => {
                yesNo = false;

                if(this.props.value[1] === element) yesNo = true;

                return <OddsTimeButton key={index} yesNo={yesNo} name={element} oddsTimeClick={() => this.props.oddsTimeClick(element, 2)} type={2} />;
            });

        }

        if (this.props.type === 3) {
            header = <div className={classes.header}>{"Choose competitions"}</div>;
            content = <CompetitionsBox save={this.props.saveCompetitions} settingsObjectValue = {this.props.competitionsTicket} />
        }

        if (this.props.type === 4) {
            header = <div className={classes.header}>{"Choose Betting Markets"}</div>;
            content = <MarketBox save={this.props.saveMarket} settingsObjectValue = {this.props.marketTicket} />
        }


        return (
            <div className={classes.Settings} onClick={this.props.click}>
                {header}
                {content}
            </div>
        );
    }


}

export default SettingsTicket;