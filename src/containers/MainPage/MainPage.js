import React, { Component } from 'react';
import Axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import LeagueList from '../../components/LeagueList/LeagueList';
import NavDates from '../../components/NavDates/NavDates';
import classes from './MainPage.module.css';
import BettingBox from '../BettingBox/BettingBox';
import Aux from '../../components/AuxAux/AuxAux';
import Marketing from '../../components/Marketing/Marketing';

class MainPage extends Component {

    state = {

        games: [],
        dateSet: "",
        dateSetAllways: "",
        firstTime: true,
        loadSpinner: true,
        positionButton: 3

    }


    componentDidUpdate() {
        
        if (this.state.dateSet !== "") {

            const url = "/api_stats/load_betinfo_schedule.php?date=%27" + this.state.dateSet + "%27";

            Axios.get(url)
                .then(response => {
                    this.setState({ games: response.data, dateSet: "", dateSetAllways: this.state.dateSet, firstTime: false, loadSpinner: false });
                });
        }

    }

    changeUrl = (finalDate, pos) => {
        if (finalDate !== this.state.firstTime) {
            this.setState({
                dateSet: finalDate,
                firstTime: false,
                loadSpinner: true,
                positionButton: pos
            });
        }
    }


    componentDidMount() {

        // 2020-03-09
        if (this.state.firstTime) {

            const todayDate = new Date();
            const m = parseInt(todayDate.getMonth()) + 1;
            const todayDay = todayDate.getDate() < 10 ? '0' + todayDate.getDate() : todayDate.getDate();
            const todayMonth = m < 10 ? '0' + m : m;
            const todayYear = todayDate.getFullYear() < 10 ? '0' + todayDate.getFullYear() : todayDate.getFullYear();

            const finalDate = todayYear + "-" + todayMonth + "-" + todayDay;

            const url = "/api_stats/load_betinfo_schedule.php?date=%27" + finalDate + "%27";

            Axios.get(url)
                .then(response => {
                    this.setState({ games: response.data, dateSet: "", dateSetAllways: finalDate, firstTime: false, loadSpinner: false });
                });
        }
    }


    render() {

        window.scrollTo(0, 0);

        let content = <Spinner />;



        if (!this.state.loadSpinner) {
            content = (
                <Aux>
                    <BettingBox  date={this.state.dateSetAllways}/>
                    {this.props.m === "" ? null : <div key="4444" className={classes.mark}><Marketing m={this.props.m} /></div>}
                    <LeagueList dateSet={this.state.dateSetAllways} games={this.state.games} />
                </Aux>
            );
        }
        // Ubacivanje middle banners pomocu {this.props.m}
        return (
            <div className={classes.Aux} id="mainPage">
                <NavDates change={this.changeUrl} position={this.state.positionButton} />
                {content}
            </div>
        );

    }
}

export default MainPage;