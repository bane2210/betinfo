import { useDispatch } from "react-redux";
import { backdropAction } from "../../store/createSlice";
import classes from "./MatchSingle.module.css";
import Aux from "../AuxAux/AuxAux";
import ReactGA from "react-ga";

interface Prop<T, U, S> {
    key: React.Key | null | undefined;
    t: T;
    h: U;
    a: U;
    country: U;
    comp: U;
    date: S;
    simpleDate?: U;
}

const MatchSingle = (props: Prop<string, any, Date>) => {
  const dispatch = useDispatch();

  const openBackdrop = (backdropOBJ: any) => {
    ReactGA.event({
      category: "Games",
      action: "Clicked",
      label: props.h + " vs " + props.a,
    });

    const yPos = document.getElementById("body")!.getBoundingClientRect().top;
    /*
    const back = document.getElementById("backdrop");
    if (back !== null) back.style.display = "flex";
    document.getElementById("body").style.display = "none";
    */

    dispatch(backdropAction({ backdropOBJ: backdropOBJ, yPos: yPos, backVis: 1 }));

    //props.backdropSet(backdropOBJ, yPos);
    /*window.location.hash = "game";*/
  };
  //console.log(props);
  const backdropOBJ = {
    date: props.date.toString(),
    time: props.t,
    home: props.h,
    away: props.a,
    country: props.country,
    competition: props.comp,
    simpleDate: props.simpleDate,
  };

  return (
    <Aux>
      <div
        className={classes.Container}
        onClick={() => openBackdrop(backdropOBJ)}
      >
        <div className={classes.Date}>{props.t}</div>
        <div className={classes.GameInfo}>
          <div className={classes.homeTeam}>{props.h}</div>
          <div className={classes.vs}>{" vs "}</div>
          <div className={classes.awayTeam}>{props.a}</div>
        </div>
        <span className={classes.tooltiptext}>Click for full details!</span>
      </div>
    </Aux>
  );
};

export default MatchSingle;

/*
const mapDispatchToProps = dispatch => {
    return {
        backdropSet: (backdropOBJ, yPos) => dispatch({ type: "backdropSet", data: backdropOBJ, yPos: yPos })
    }
}
*/

// export default connect(null, mapDispatchToProps)(MatchSingle);
