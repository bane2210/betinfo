import React, { useState } from 'react';
import classes from './Series.module.css';
import Title from '../TittleTemplateBox/TittleTemplateBox';
import OverallButton from '../OverallButton/OverallButton';
import {MainOBject} from "../../Backdrop/Backdrop"

interface Prop {
    single: MainOBject;
    all: MainOBject;
    home_away: "Home" | "Away";
}
const Series = (props: Prop) => {
    const [state, setState] = useState({
        single: false,
        all: true
    });

    const setAll = () => {
        setState(prevState => {
            return {
                ...prevState,
                all: true,
                single: false
            };
        });
    }

    const setSingle = () => {
        setState(prevState => {
            return {
                ...prevState,
                all: false,
                single: true
            };
        });
    }
    type Compare = {
        count: number;
        content: JSX.Element;
    }
    const compare = ( a: Compare, b: Compare ) => {
        if ( a.count > b.count ){
          return -1;
        }
        if ( a.count < b.count ){
          return 1;
        }
        return 0;
      }

        let arr: MainOBject | [] = [];
        let ccc = true;

        if (state.single) {
            arr = props.single;
        } else {
            arr = props.all;
        }


        let seriesOBJ = [
            { count: arr.btsSER, content: <div key="btsSER" className={classes.Series}><div className={classes.count}>{arr.btsSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Both teams to score (BTTS)</div></div> },
            { count: arr.winSER, content: <div key="winSER" className={classes.Series}><div className={classes.count}>{arr.winSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Win</div></div> },
            { count: arr.drawSER, content: <div key="drawSER" className={classes.Series}><div className={classes.count}>{arr.drawSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Draw</div></div> },
            { count: arr.loseSER, content: <div key="loseSER" className={classes.Series}><div className={classes.count}>{arr.loseSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Lose</div></div> },
            { count: arr.win3SER, content: <div key="win3SER" className={classes.Series}><div className={classes.count}>{arr.win3SER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Win and over 2.5 goals</div></div> },
            { count: arr.draw3SER, content: <div key="draw3SER" className={classes.Series}><div className={classes.count}>{arr.draw3SER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Draw and over 2.5 goals</div></div> },
            { count: arr.lose3SER, content: <div key="lose3SER" className={classes.Series}><div className={classes.count}>{arr.lose3SER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Lose and over 2.5 goals</div></div> },
            { count: arr.btts3SER, content: <div key="btts3SER" className={classes.Series}><div className={classes.count}>{arr.btts3SER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>BTTS and over 2.5 goals</div></div> },
            { count: arr.sinFHSER, content: <div key="sinFHSER" className={classes.Series}><div className={classes.count}>{arr.sinFHSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Scored in first half</div></div> },
            { count: arr.btsFHSER, content: <div key="btsFHSER" className={classes.Series}><div className={classes.count}>{arr.btsFHSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>BTTS in the first-half</div></div> },
            { count: arr.cleanSSER, content: <div key="cleanSSER" className={classes.Series}><div className={classes.count}>{arr.cleanSSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Clean sheets</div></div> },
            { count: arr.soemSER, content: <div key="soemSER" className={classes.Series}><div className={classes.count}>{arr.soemSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Team scored</div></div> },
            { count: arr.stgoemSER, content: <div key="stgoemSER" className={classes.Series}><div className={classes.count}>{arr.stgoemSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Team scored twice</div></div> },
            { count: arr.sibhSER, content: <div key="sibhSER" className={classes.Series}><div className={classes.count}>{arr.sibhSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Scored in both halves</div></div> },
            { count: arr.gibhSER, content: <div key="gibhSER" className={classes.Series}><div className={classes.count}>{arr.gibhSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Goal in both halves</div></div> },
            { count: arr.leadHTSER, content: <div key="leadHTSER" className={classes.Series}><div className={classes.count}>{arr.leadHTSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Team led at half-time</div></div> },
            { count: arr.loseHTSER, content: <div key="loseHTSER" className={classes.Series}><div className={classes.count}>{arr.loseHTSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Team lost at half-time</div></div> },
            { count: arr.drawHTSER, content: <div key="drawHTSER" className={classes.Series}><div className={classes.count}>{arr.drawHTSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Draw at half-time</div></div> },
            { count: arr.over_1_5SER, content: <div key="over_1_5SER" className={classes.Series}><div className={classes.count}>{arr.over_1_5SER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Over 1.5 goals</div></div> },
            { count: arr.over_2_5SER, content: <div key="over_2_5SER" className={classes.Series}><div className={classes.count}>{arr.over_2_5SER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Over 2.5 goals</div></div> },
            { count: arr.over_3_5SER, content: <div key="over_3_5SER" className={classes.Series}><div className={classes.count}>{arr.over_3_5SER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Over 3.5 goals</div></div> },
            { count: arr.over_4_5SER, content: <div key="over_4_5SER" className={classes.Series}><div className={classes.count}>{arr.over_4_5SER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Over 4.5 goals</div></div> },
            { count: arr.over_5_5SER, content: <div key="over_5_5SER" className={classes.Series}><div className={classes.count}>{arr.over_5_5SER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Over 5.5 goals</div></div> },
            { count: arr.under_1_5SER, content: <div key="under_1_5SER" className={classes.Series}><div className={classes.count}>{arr.under_1_5SER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Under 1.5 goals</div></div> },
            { count: arr.under_2_5SER, content: <div key="under_2_5SER" className={classes.Series}><div className={classes.count}>{arr.under_2_5SER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Under 2.5 goals</div></div> },
            { count: arr.over_0_5_HTSER, content: <div key="over_0_5_HTSER" className={classes.Series}><div className={classes.count}>{arr.over_0_5_HTSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Over 0.5 goals at HT</div></div> },
            { count: arr.over_1_5_HTSER, content: <div key="over_1_5_HTSER" className={classes.Series}><div className={classes.count}>{arr.over_1_5_HTSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Over 1.5 goals at HT</div></div> },
            { count: arr.over_2_5_HTSER, content: <div key="over_2_5_HTSER" className={classes.Series}><div className={classes.count}>{arr.over_2_5_HTSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Over 2.5 goals at HT</div></div> },
            { count: arr.win_BTTSSER, content: <div key="win_BTTSSER" className={classes.Series}><div className={classes.count}>{arr.win_BTTSSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Team won and BTTS</div></div> },
            { count: arr.draw_BTTSSER, content: <div key="draw_BTTSSER" className={classes.Series}><div className={classes.count}>{arr.draw_BTTSSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Draw and BTTS</div></div> },
            { count: arr.lose_BTTSSER, content: <div key="lose_BTTSSER" className={classes.Series}><div className={classes.count}>{arr.lose_BTTSSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Team lost and BTTS</div></div> },
            { count: arr.home_homeSER, content: <div key="home_homeSER" className={classes.Series}><div className={classes.count}>{arr.home_homeSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Win HT - Win FT</div></div> },
            { count: arr.home_drawSER, content: <div key="home_drawSER" className={classes.Series}><div className={classes.count}>{arr.home_drawSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Win HT - Draw FT</div></div> },
            { count: arr.home_awaySER, content: <div key="home_awaySER" className={classes.Series}><div className={classes.count}>{arr.home_awaySER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Win HT - Lose FT</div></div> },
            { count: arr.draw_homeSER, content: <div key="draw_homeSER" className={classes.Series}><div className={classes.count}>{arr.draw_homeSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Draw HT - Win FT</div></div> },
            { count: arr.draw_drawSER, content: <div key="draw_drawSER" className={classes.Series}><div className={classes.count}>{arr.draw_drawSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Draw HT - Draw FT</div></div> },
            { count: arr.draw_awaySER, content: <div key="draw_awaySER" className={classes.Series}><div className={classes.count}>{arr.draw_awaySER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Draw HT - Lose FT</div></div> },
            { count: arr.away_homeSER, content: <div key="away_homeSER" className={classes.Series}><div className={classes.count}>{arr.away_homeSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Lose HT - Win FT</div></div> },
            { count: arr.away_drawSER, content: <div key="away_drawSER" className={classes.Series}><div className={classes.count}>{arr.away_drawSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Lose HT - Draw FT</div></div> },
            { count: arr.away_awaySER, content: <div key="away_awaySER" className={classes.Series}><div className={classes.count}>{arr.away_awaySER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Lose HT - Lose FT</div></div> },
            { count: arr.win2SER, content: <div key="win2SER" className={classes.Series}><div className={classes.count}>{arr.win2SER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Win and over 1.5 goals</div></div> },
            { count: arr.draw2SER, content: <div key="draw2SER" className={classes.Series}><div className={classes.count}>{arr.draw2SER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Draw and over 1.5 goals</div></div> },
            { count: arr.lose2SER, content: <div key="lose2SER" className={classes.Series}><div className={classes.count}>{arr.lose2SER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Lose and over 1.5 goals</div></div> },
            { count: arr.over_0_5_SHSER, content: <div key="over_0_5_SHSER" className={classes.Series}><div className={classes.count}>{arr.over_0_5_SHSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Over 0.5 goals second half</div></div> },
            { count: arr.over_1_5_SHSER, content: <div key="over_1_5_SHSER" className={classes.Series}><div className={classes.count}>{arr.over_1_5_SHSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Over 1.5 goals second half</div></div> },
            { count: arr.over_2_5_SHSER, content: <div key="over_2_5_SHSER" className={classes.Series}><div className={classes.count}>{arr.over_2_5_SHSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Over 2.5 goals second half</div></div> },
            { count: arr.BTTS_SHSER, content: <div key="BTTS_SHSER" className={classes.Series}><div className={classes.count}>{arr.BTTS_SHSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>BTTS in the second half</div></div> },
            { count: arr.sinSHSER, content: <div key="sinSHSER" className={classes.Series}><div className={classes.count}>{arr.sinSHSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>Team Scored over 0.5 in SH</div></div> },
            { count: arr.more_FHSER, content: <div key="more_FHSER" className={classes.Series}><div className={classes.count}>{arr.more_FHSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>More goals in the first half</div></div> },
            { count: arr.more_SHSER, content: <div key="more_SHSER" className={classes.Series}><div className={classes.count}>{arr.more_SHSER}</div><i style={{margin: "5px"}} className="fa fa-long-arrow-right" aria-hidden="true"></i><div className={classes.txt}>More goals in the second half</div></div> },
        ];

        seriesOBJ.sort( compare );

        return (
            <div className={classes.SeriesBox}>
                <Title name="Series" />
                <div className={classes.overallButtons}>
                    <OverallButton o={state.all} click={setAll} name="All" />
                    <OverallButton o={state.single} click={setSingle} name={props.home_away} />
                </div>
                {seriesOBJ.map(element => {
                    if(element.count > 3 ) {ccc = false; return element.content; }
                    else return null;
                })}
                {ccc? <div className={classes.noSeries}>No interesting series at this moment.</div> : null}
            </div>
        );
}

export default Series;