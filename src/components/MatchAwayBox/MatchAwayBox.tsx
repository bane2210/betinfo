import classes from './MatchAwayBox.module.css';
import FormAwayBox from './FormAwayBox/FormAwayBox';
import SingleStats from './SingleStats/SingleStats';
import Series from '../MatchHomeBox/Series/Series';
import H2H from '../MatchHomeBox/H2H/H2H';
import {GameResponseType, MainOBject} from "../Backdrop/Backdrop";

interface Props {
    a: string;
    awayOBJAway: MainOBject;
    awayOBJAll: MainOBject;
    awayOBJAway_games: [] | GameResponseType[];
    awayOBJAll_games: [] | GameResponseType[];
    awayOBJAway_list: any;
    awayOBJAll_list: any;
    object: [] | GameResponseType[];
}



const MatchHomeBox = (props: Props) => {

    return (
        <div className={classes.awayBox}>
            <div id="awayTittle" className={classes.title}>
                {props.a}
            </div>
            <FormAwayBox
                away={props.awayOBJAway_games}
                all={props.awayOBJAll_games}
                name={props.a}
            />

            <H2H object={props.object} name={props.a} />

            <Series single={props.awayOBJAway} all={props.awayOBJAll} home_away="Away" />

            <SingleStats
                teamName={props.a}
                awayOBJAway={props.awayOBJAway}
                awayOBJAll={props.awayOBJAll}

                awayOBJAway_list={props.awayOBJAway_list}
                awayOBJAll_list={props.awayOBJAll_list}
            />
        </div>
    );
}

export default MatchHomeBox;
