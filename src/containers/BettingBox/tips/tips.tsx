import React from 'react';
import classes from './tips.module.css';
import GamesCount from '../gamesCount/gamesCount';

type Prop<T, U, S> = {
    gamesCount: T;
    current: U;
    name: U;
    click: S;
}
const tips = (props: Prop<number, string, () => void>) => {

    let style = classes.TipBlock;
    if (props.current === props.name) {
        style = classes.TipBlock + " " + classes.Active;
    }


    return (
        <div className={style} onClick={props.click}>
            {props.name}
            <GamesCount isBig={true} count={props.gamesCount} />
        </div>
    );
}

export default tips;