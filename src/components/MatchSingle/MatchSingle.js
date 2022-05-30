import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './MatchSingle.module.css'
import Aux from '../AuxAux/AuxAux';

import ReactGA from 'react-ga';


class MatchSingle extends Component {



    openBackdrop(backdropOBJ) {

        ReactGA.event({
            category: "Games",
            action: "Clicked",
            label: this.props.h + " vs " + this.props.a,
          });

        const yPos = document.getElementById("body").getBoundingClientRect().top;
        const back = document.getElementById("backdrop");
        
        if (back !== null) back.style.display = "flex";
        document.getElementById("body").style.display = "none";

        this.props.backdropSet(backdropOBJ, yPos);
        /*window.location.hash = "game";*/


    }




    render() {

        let backdropOBJ = {
            date: this.props.date,
            time: this.props.t,
            home: this.props.h,
            away: this.props.a,
            country: this.props.country,
            competition: this.props.comp,
            simpleDate: this.props.simpleDate
        }

        return (

            <Aux>
                < div className={classes.Container} onClick={() => this.openBackdrop(backdropOBJ)} >
                    <div className={classes.Date}>
                        {this.props.t}
                    </div>
                    <div className={classes.GameInfo}>
                        <div className={classes.homeTeam}>
                            {this.props.h}
                        </div>
                        <div className={classes.vs}>
                            {' vs '}
                        </div>
                        <div className={classes.awayTeam}>
                            {this.props.a}
                        </div>
                    </div>
                    <span className={classes.tooltiptext}>Click for full details!</span>
                </div >
            </Aux>


        );

    }


}



const mapDispatchToProps = dispatch => {
    return {
        backdropSet: (backdropOBJ, yPos) => dispatch({ type: "backdropSet", data: backdropOBJ, yPos: yPos })
    }
}


export default connect(null, mapDispatchToProps)(MatchSingle);