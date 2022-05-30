import React, { Component } from 'react';
import classes from './NavDates.module.css';
import NavDatesItem from '../NavDatesItem/NavDatesItem';

class NavDates extends Component {

    state = {
        open: false
    }

    openCloseFun = () => {
        if (this.state.open) {
            this.setState({
                open: false
            });
        } else {
            this.setState({
                open: true
            });
        }
    }


    render() {
        const todayDate = new Date();


        const todayDate_min_1 = new Date();
        todayDate_min_1.setDate(todayDate_min_1.getDate() - 1);

        const todayDate_min_2 = new Date();
        todayDate_min_2.setDate(todayDate_min_2.getDate() - 2);

        const todayDate_add_1 = new Date();
        todayDate_add_1.setDate(todayDate_add_1.getDate() + 1);

        const todayDate_add_2 = new Date();
        todayDate_add_2.setDate(todayDate_add_2.getDate() + 2);

        const todayDate_min_3 = new Date();
        todayDate_min_3.setDate(todayDate_min_3.getDate() - 3);

        const todayDate_min_4 = new Date();
        todayDate_min_4.setDate(todayDate_min_4.getDate() - 4);

        const todayDate_min_5 = new Date();
        todayDate_min_5.setDate(todayDate_min_5.getDate() - 5);

        const todayDate_min_6 = new Date();
        todayDate_min_6.setDate(todayDate_min_6.getDate() - 6);

        const todayDate_min_7 = new Date();
        todayDate_min_7.setDate(todayDate_min_7.getDate() - 7);

        const todayDate_min_8 = new Date();
        todayDate_min_8.setDate(todayDate_min_8.getDate() - 8);

        const todayDate_min_9 = new Date();
        todayDate_min_9.setDate(todayDate_min_9.getDate() - 9);

        const todayDate_min_10 = new Date();
        todayDate_min_10.setDate(todayDate_min_10.getDate() - 10);

        const todayDate_min_11 = new Date();
        todayDate_min_11.setDate(todayDate_min_11.getDate() - 11);




        const formatDate = (todayDate) => {
            const todayDay = todayDate.getDate() < 10 ? '0' + todayDate.getDate() : todayDate.getDate();
            const m = parseInt(todayDate.getMonth()) + 1;
            const todayMonth = m < 10 ? '0' + m : m;
            const todayYear = todayDate.getFullYear();
            const finalDate = todayYear + "-" + todayMonth + "-" + todayDay;
            return finalDate;
        }

        // 21 April - Thursday
        const formatName = (d) => {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
            // monday tuesday wednesday thursday friday saturday sunday
            //const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

            const todayDay = d.getDate();
            const todayMonth = months[d.getMonth()];
            //const weekDay = weekDays[d.getDay()];
            return todayDay + " " + todayMonth;
        }

        let content = "";

        if (!this.state.open) {

            content = <div className={classes.Nav}>
                <div className={classes.TopDates}>

                    <div className={classes.OpenClose} onClick={this.openCloseFun}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </div>

                    <NavDatesItem
                        name={formatName(todayDate_min_1)}
                        date={formatDate(todayDate_min_1)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="2"
                    />

                    <NavDatesItem
                        name="Today"
                        date={formatDate(todayDate)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="3"
                    />

                    <NavDatesItem
                        name={formatName(todayDate_add_1)}
                        date={formatDate(todayDate_add_1)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="4"
                    />

                    <NavDatesItem
                        name={formatName(todayDate_add_2)}
                        date={formatDate(todayDate_add_2)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="5"
                    />

                </div>

            </div>;
        } else {
            content = <div className={classes.Nav}>
                <div className={classes.TopDates}>

                    <div className={classes.OpenClose} onClick={this.openCloseFun}>
                    <i className="fa fa-minus" aria-hidden="true"></i>
                    </div>

                    <NavDatesItem
                        name={formatName(todayDate_min_1)}
                        date={formatDate(todayDate_min_1)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="2"
                    />

                    <NavDatesItem
                        name="Today"
                        date={formatDate(todayDate)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="3"
                    />

                    <NavDatesItem
                        name={formatName(todayDate_add_1)}
                        date={formatDate(todayDate_add_1)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="4"
                    />

                    <NavDatesItem
                        name={formatName(todayDate_add_2)}
                        date={formatDate(todayDate_add_2)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="5"
                    />
                </div>

                <div className={classes.TopLine}>
                    </div>

                <div className={classes.BottomDates}>
                    <NavDatesItem
                        name={formatName(todayDate_min_2)}
                        date={formatDate(todayDate_min_2)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="1"
                    />

                    <NavDatesItem
                        name={formatName(todayDate_min_3)}
                        date={formatDate(todayDate_min_3)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="6"
                    />

                    <NavDatesItem
                        name={formatName(todayDate_min_4)}
                        date={formatDate(todayDate_min_4)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="7"
                    />

                    <NavDatesItem
                        name={formatName(todayDate_min_5)}
                        date={formatDate(todayDate_min_5)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="8"
                    />

                    <NavDatesItem
                        name={formatName(todayDate_min_6)}
                        date={formatDate(todayDate_min_6)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="9"
                    />

                </div>

                <div className={classes.BottomDates}>
                    <NavDatesItem
                        name={formatName(todayDate_min_7)}
                        date={formatDate(todayDate_min_7)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="10"
                    />

                    <NavDatesItem
                        name={formatName(todayDate_min_8)}
                        date={formatDate(todayDate_min_8)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="11"
                    />

                    <NavDatesItem
                        name={formatName(todayDate_min_9)}
                        date={formatDate(todayDate_min_9)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="12"
                    />

                    <NavDatesItem
                        name={formatName(todayDate_min_10)}
                        date={formatDate(todayDate_min_10)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="13"
                    />

                    <NavDatesItem
                        name={formatName(todayDate_min_11)}
                        date={formatDate(todayDate_min_11)}
                        change={this.props.change}
                        position={this.props.position}
                        pos="14"
                    />


                </div>

            </div>;
        }

        return (
            content
        );
    }
}

export default NavDates;