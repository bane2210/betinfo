import React from 'react'
import classes from './OverallButton.module.css';

const overallButton = (props) => {

    let cls = classes.button;

    if(props.o){
        cls = classes.button + " " + classes.active;
    }

    return (

        <div className={cls} onClick={props.click}>
            {props.name}
        </div>

    );
}

export default overallButton;