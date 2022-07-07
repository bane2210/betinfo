import React from 'react';
import classes from './tipSingle.module.css';

import GamesCount from '../../gamesCount/gamesCount';

type Prop = {
    key: React.Key | undefined | null;
    br: number;
    current: string;
    nameSQL: string;
    name: any;
    click: () => void;
}
const TipSingle: React.FC<Prop> = (props) => {

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