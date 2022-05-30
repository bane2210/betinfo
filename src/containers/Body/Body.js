import React, { Component } from 'react';
import classes from './Body.module.css';

import PageCenter from '../PageCenter/PageCenter';
import TopNav from '../../components/TopNav/TopNav';
import Footer from '../../components/footer/Footer';
import Axios from 'axios';
import FooterMarketing from '../../components/FooterMarketing/FooterMarketing';
import Backdrop from '../../components/Backdrop/Backdrop';
import { connect } from 'react-redux';


class Body extends Component {

    state = {
        header: "",
        middle: "",
        sidebar: "",
        footer: ""
    }

    componentDidMount() {
        // 2020-03-09 

        const url = "/eng/api_stats/loadMarketing.php";
        window.onscroll = () => { this.goToTop() };

        Axios.get(url)
            .then(response => {
                this.setState({ header: response.data.header, middle: response.data.middle, sidebar: response.data.left, footer: response.data.footer });
            });

    }


    goToTop = () => {

        if (window.pageYOffset > 800) {
            document.getElementById("goToTop").style.display = "flex";
        } else {
            document.getElementById("goToTop").style.display = "none";
        }


    }

    goToTopClicked = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    render() {

        // Razdvajamo linkove za footer i posebnu stranicu

        let footerLinks = "";
        let pageLinks = "";

        if (this.state.footer.includes("<!-- Footer Links  -->")) {
            footerLinks = this.state.footer.split("<!-- Footer Links  -->")[1];
            pageLinks = this.state.footer.split("<!-- Footer Links  -->")[0];

        } else {
            footerLinks = this.state.footer;
            pageLinks = this.state.footer;

        }


        const xx = this.props.yPos;

        let goToTop = <div id="goToTop" className={classes.scrollTop} onClick={this.goToTopClicked}><i className="fa fa-arrow-up" aria-hidden="true"></i></div>

        document.body.addEventListener('keydown', function (e) {
            if (e.key === "Escape" || e.key === "Esc") {
                if (document.getElementById("backdrop") !== null) {
                    document.getElementById("backdrop").style.display = "none";
                    document.getElementById("body").style.display = "block";
                }
                window.scrollTo(0, 0 - xx);
                /* window.location.href.substr(0, window.location.href.indexOf('#'));*/
            }
        });

        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            // window.history.go(1);
            document.getElementById("backdrop").style.display = "none";
            document.getElementById("body").style.display = "block";
            window.scrollTo(0, 0 - xx);
        };

        /*     window.addEventListener("hashchange", e => {
                     if(window.location.hash === "#") {
                         document.getElementById("backdrop").style.display = "none";
                         document.getElementById("body").style.display = "block";
                         window.scrollTo(0, 0 - this.props.yPos);
                         window.location.hash = "";
                         }
             });*/


        let content = "";
        if (this.props.backdropOBJ.date !== "" && this.props.backdropOBJ.time !== "") {
            content = (
                <Backdrop date={this.props.backdropOBJ.date}
                    t={this.props.backdropOBJ.time}
                    h={this.props.backdropOBJ.home}
                    a={this.props.backdropOBJ.away}
                    country={this.props.backdropOBJ.country}
                    comp={this.props.backdropOBJ.competition}
                    simpleDate={this.props.backdropOBJ.simpleDate}
                    yPos={this.props.yPos} />
            );
        }


        

        return (

            <div>
                <TopNav />
                <div id="body" className={classes.bodyApp}>
                    <PageCenter s={this.state.sidebar} m={this.state.middle} h={this.state.header} f={pageLinks} />
                </div>
                {content}
                {goToTop}
                <FooterMarketing f={footerLinks} />
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = state => ({
    backdropOBJ: state.backdrop,
    yPos: state.yPos
})


export default connect(mapStateToProps)(Body);
