import React from 'react';
import classes from './tipSingle.module.css';

import GamesCount from '../../gamesCount/gamesCount';

const TipSingle = (props) => {

    let style = classes.TipBlock;
    if(props.current === props.nameSQL){
        style = classes.TipBlock + " " + classes.Active;
    }


    return (
        <div className={style} onClick={props.click}>
            {props.name}
            <GamesCount isBig={false} count={props.br} />
        </div>
    );
}

export default TipSingle;