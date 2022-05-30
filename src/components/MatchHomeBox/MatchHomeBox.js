import React, { Component } from 'react'
import classes from './MatchHomeBox.module.css';
import FormHomeBox from './FormHomeBox/FormHomeBox';
import SingleStats from './SingleStats/SingleStats';
import Series from './Series/Series';
import H2H from './H2H/H2H';


class MatchHomeBox extends Component {

    componentDidMount() {


        window.onscroll = () => { fixDiv() };
        const homeDIv = document.getElementById("homeTitle");
        const awayDIv = document.getElementById("awayTittle");
        const footerDIv = document.getElementById("footerID");
        const homeOverallButt = document.getElementById("homeButtons");
        const awayOverallButt = document.getElementById("awayButtons");
        const sinBettBox = document.getElementById("sinBettBox");
        let offHeight = 0;

        const sticky = homeDIv.offsetTop;
        const awaySticky = awayDIv.offsetTop;
        const footerSticky = footerDIv.offsetTop;
        const stickyButt = homeOverallButt.offsetTop;
        const stickyButtAway = awayOverallButt.offsetTop;

        /*console.log("sinBettBox PRE: " + sinBettBox.clientHeight);
        console.log("sinBettBox PRE: " + sinBettBox.offsetHeight);
        console.log("sticky: " + sticky);
        console.log("awaySticky: " + awaySticky);
        console.log("footerSticky: " + footerSticky);
        console.log("stickyButt: " + stickyButt);
        console.log("stickyButtAway: " + stickyButtAway);*/

        const fixDiv = () => {


            if (window.innerWidth < 500) {
                offHeight = window.pageYOffset - sinBettBox.clientHeight + 120;

                // Za prvi title
                if (((offHeight) > sticky) && (offHeight) < (awaySticky - 400)) {
                    homeDIv.style.position = "fixed";
                    homeDIv.style.top = "0px";
                    homeDIv.style.paddingTop = "45px";
                    homeDIv.style.left = "2px";
                    homeDIv.style.width = "100%";
                    homeDIv.style.zIndex = "2";

                } else {
                    homeDIv.style.position = "relative";
                    homeDIv.style.top = "0px";
                    homeDIv.style.paddingTop = "0px";
                }

                // Za prve buttons
                if (((offHeight + 30) > stickyButt) && (offHeight) < (awaySticky - 400)) {
                    homeOverallButt.style.position = "fixed";
                    homeOverallButt.style.background = "white";
                    homeOverallButt.style.paddingTop = "70px";
                    homeOverallButt.style.left = "2px";
                    homeOverallButt.style.width = "98%";
                } else {
                    homeOverallButt.style.position = "relative";
                    homeOverallButt.style.top = "0px";
                    homeOverallButt.style.paddingTop = "0px";
                }


                // Za drugi title
                if (((offHeight) > awaySticky) && (offHeight) < (footerSticky - 600)) {
                    awayDIv.style.position = "fixed";
                    awayDIv.style.top = "0px";
                    awayDIv.style.paddingTop = "45px";
                    awayDIv.style.left = "2px";
                    awayDIv.style.width = "100%";
                    awayDIv.style.zIndex = "2";

                } else {
                    awayDIv.style.position = "relative";
                    awayDIv.style.top = "0px";
                    awayDIv.style.paddingTop = "0px";
                }

                // Za druge buttons
                if (((offHeight + 40) > stickyButtAway) && (offHeight) < (footerSticky - 600)) {
                    awayOverallButt.style.position = "fixed";
                    awayOverallButt.style.background = "white";
                    awayOverallButt.style.paddingTop = "70px";
                    awayOverallButt.style.left = "2px";
                    awayOverallButt.style.width = "98%";
                } else {
                    awayOverallButt.style.position = "relative";
                    awayOverallButt.style.top = "0px";
                    awayOverallButt.style.paddingTop = "0px";
                }
            }


        }
    }


    render() {
        return (
            <div className={classes.homeBox}>
                <div id="homeTitle" className={classes.title}>
                    {this.props.h}
                </div>
                <FormHomeBox
                    home={this.props.homeOBJHome_games}
                    all={this.props.homeOBJAll_games}
                    name={this.props.h}


                />

                <H2H object={this.props.object} name={this.props.h} />

                <Series single={this.props.homeOBJHome} all={this.props.homeOBJAll} home_away="Home" />

                <SingleStats
                    teamName={this.props.h}
                    homeOBJHome={this.props.homeOBJHome}
                    homeOBJAll={this.props.homeOBJAll}

                    homeOBJHome_list={this.props.homeOBJHome_list}
                    homeOBJAll_list={this.props.homeOBJAll_list}
                />


            </div>
        );
    }
}

export default MatchHomeBox;