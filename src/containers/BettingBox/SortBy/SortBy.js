import React from 'react';
import classes from './SortBy.module.css';

const sortBy = (props) => {

    let style = classes.element;

    if (props.current === props.br) {
        style = classes.element + " " + classes.Active;
    }


    return (
        <div className={style} onClick={props.click}>
            {props.name}
        </div>
    );
}

export default sortBy;
