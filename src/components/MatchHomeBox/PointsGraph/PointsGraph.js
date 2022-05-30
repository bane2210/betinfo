import React from 'react';
import classes from './PointsGraph.module.css';

const pointsGraph = props => {

    const brGames = props.g * 3;
    const pts = props.pts / brGames * 100;

    return (
        <div className={classes.graphBox}>
            <div className={classes.backGraph}>
                {brGames + " Pts"}
            </div>
            <div
                className={classes.frontGraph}
                style={{ width: pts + "%" }}
            >
                <span className={classes.linePts}>
                </span>
                <span className={classes.frontPts}>
                    {props.pts + " Pts"}
                </span>
            </div>

        </div>
    );
}

export default pointsGraph;